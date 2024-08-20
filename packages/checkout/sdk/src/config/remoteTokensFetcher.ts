import { Environment } from '@imtbl/config';
import { AxiosResponse } from 'axios';
import {
  ChainId, ChainSlug, ChainTokensConfig, ImxAddressConfig, TokenInfo,
} from '../types';
import { ENV_DEVELOPMENT, IMMUTABLE_API_BASE_URL } from '../env';
import { HttpClient } from '../api/http';
import { CheckoutError, CheckoutErrorType } from '../errors';
import { RemoteConfigFetcher } from './remoteConfigFetcher';

const chainSlugMap = new Map<ChainId, ChainSlug>([
  [ChainId.IMTBL_ZKEVM_MAINNET, ChainSlug.IMTBL_ZKEVM_MAINNET],
  [ChainId.IMTBL_ZKEVM_TESTNET, ChainSlug.IMTBL_ZKEVM_TESTNET],
  [ChainId.IMTBL_ZKEVM_DEVNET, ChainSlug.IMTBL_ZKEVM_DEVNET],
]);

type TokensEndpointResult = {
  chain: {
    id: string;
    name: string;
  };
  contract_address: string;
  decimals: number;
  image_url: string | null;
  is_canonical: boolean;
  name: string;
  symbol: string;
  root_chain_id: string | null;
  root_contract_address: string | null;
};

type TokensEndpointResponse = {
  result: TokensEndpointResult[];
};

export type RemoteConfigParams = {
  isDevelopment: boolean;
  isProduction: boolean;
};

export class RemoteTokensFetcher {
  private httpClient: HttpClient;

  private remoteConfig: RemoteConfigFetcher;

  private readonly isDevelopment: boolean;

  private readonly isProduction: boolean;

  private tokensCache: ChainTokensConfig | undefined;

  constructor(httpClient: HttpClient, remoteConfig: RemoteConfigFetcher, params: RemoteConfigParams) {
    this.isDevelopment = params.isDevelopment;
    this.isProduction = params.isProduction;
    this.httpClient = httpClient;
    this.remoteConfig = remoteConfig;
  }

  private getEndpoint = () => {
    if (this.isDevelopment) return IMMUTABLE_API_BASE_URL[ENV_DEVELOPMENT];
    if (this.isProduction) return IMMUTABLE_API_BASE_URL[Environment.PRODUCTION];
    return IMMUTABLE_API_BASE_URL[Environment.SANDBOX];
  };

  private async loadTokens(chainSlug: ChainSlug): Promise<ChainTokensConfig | undefined> {
    if (this.tokensCache) {
      return this.tokensCache;
    }

    let response: AxiosResponse;
    try {
      response = await this.httpClient.get(
        `${this.getEndpoint()}/v1/chains/${chainSlug}/tokens?verification_status=verified&is_canonical=true`,
      );
    } catch (err: any) {
      throw new CheckoutError(
        `Error: ${err.message}`,
        CheckoutErrorType.API_ERROR,
        { error: err },
      );
    }

    const responseData = this.parseResponse(response);

    this.tokensCache = await this.getMappingsForTokensResponse(responseData.result || []);

    return this.tokensCache;
  }

  public async getTokensConfig(chainId: ChainId): Promise<TokenInfo[]> {
    const chainSlug = chainSlugMap.get(chainId);
    if (!chainSlug) return [];

    const config = await this.loadTokens(chainSlug);
    if (!config || !config[chainId]) return [];

    return config[chainId] ?? [];
  }

  private async getMappingsForTokensResponse(tokenList: TokensEndpointResult[]): Promise<ChainTokensConfig> {
    const tokens: ChainTokensConfig = {};

    const imxMappings = await this.fetchIMXTokenMappings();

    Object.keys(imxMappings).forEach((chain) => {
      const chainId = parseInt(chain, 10) as ChainId;
      tokens[chainId] = [];

      tokens[chainId]?.push({
        address: imxMappings[chain],
        decimals: 18,
        name: 'IMX',
        symbol: 'IMX',
      });
    });

    tokenList.forEach((token) => {
      const chainId = parseInt(token.chain.id.split('eip155:').pop() || '', 10) as ChainId;

      if (!token.symbol || !token.decimals) {
        return;
      }

      if (!tokens[chainId]) {
        tokens[chainId] = [];
      }

      const tokenInfo: TokenInfo = {
        address: token.contract_address.toLowerCase(),
        decimals: token.decimals,
        name: token.name,
        symbol: token.symbol,
        icon: token.image_url ?? undefined,
      };

      tokens[chainId]?.push(tokenInfo);

      const rootChainId = parseInt(token.root_chain_id?.split('eip155:').pop() || '', 10) as ChainId;
      if (rootChainId && token.root_contract_address) {
        if (!tokens[rootChainId]) {
          tokens[rootChainId] = [];
        }

        tokens[rootChainId]?.push({
          ...tokenInfo,
          address: token.root_contract_address,
        });
      }
    });

    return tokens;
  }

  // eslint-disable-next-line class-methods-use-this
  private parseResponse(response: AxiosResponse<any, any>) {
    let responseData: TokensEndpointResponse = response.data;
    if (response.data && typeof response.data !== 'object') {
      try {
        responseData = JSON.parse(response.data);
      } catch (err: any) {
        throw new CheckoutError(
          'Invalid token data',
          CheckoutErrorType.API_ERROR,
          { error: err },
        );
      }
    }

    return responseData;
  }

  private async fetchIMXTokenMappings() {
    return (await this.remoteConfig.getConfig(
      'imxAddressMapping',
    )) as ImxAddressConfig;
  }
}
