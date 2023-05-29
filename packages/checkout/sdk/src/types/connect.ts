import { Web3Provider } from '@ethersproject/providers';
// TODO: fix circular dependency
// eslint-disable-next-line import/no-cycle
import { NetworkInfo, ProviderParams } from '.';

/**
 * Enum representing the list of default supported providers.
 */
export enum ConnectionProviders {
  METAMASK = 'metamask',
}

export interface ConnectParams extends ProviderParams {}

/**
 * Interface representing the result of {@link Checkout.connect}.
 * @property {Web3Provider} provider - The provider used to connect to the network.
 * @property {NetworkInfo} network - Information about the connected network.
 */
export interface ConnectResult {
  provider: Web3Provider;
  network: NetworkInfo;
}

export interface CheckConnectionParams extends ProviderParams {}

/**
 * Interface representing the result of {@link Checkout.checkIsWalletConnected}.
 * @property {boolean} isConnected - A boolean indicating the connection status of th Web3 provider.
 * @property {string} walletAddress - The wallet address used to check the connection.
 */
export interface CheckConnectionResult {
  isConnected: boolean;
  walletAddress: string;
}
