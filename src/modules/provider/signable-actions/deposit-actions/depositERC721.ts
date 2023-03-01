import {
  Contracts,
  DepositsApi,
  EncodingApi,
  ERC721Token,
  EthSigner,
  ImmutableXConfiguration,
  UsersApi
} from "@imtbl/core-sdk";
import { TransactionResponse } from "@ethersproject/providers";
import { getSignableRegistrationOnchain, isRegisteredOnChain } from "../registration";
import { Immutable } from "../../../apis/starkex";
import { validateChain } from "../helpers";


interface ERC721TokenData {
  token_id: string;
  token_address: string;
}

export async function depositERC721(
  signer: EthSigner,
  deposit: ERC721Token,
  imx:Immutable,
): Promise<TransactionResponse> {
  await validateChain(signer, imx.getConfiguration());

  const user = await signer.getAddress();
  const config = imx.getConfiguration();
  const depositsApi = new DepositsApi(config.apiConfiguration)
  const encodingApi = new EncodingApi(config.apiConfiguration)
  const usersApi = new UsersApi(config.apiConfiguration)

  const data: ERC721TokenData = {
    token_address: deposit.tokenAddress,
    token_id: deposit.tokenId,
  };

  const amount = '1';

  const getSignableDepositRequest = {
    user,
    token: {
      type: deposit.type,
      data,
    },
    amount: amount.toString(),
  };

  const signableDepositResult = await depositsApi.getSignableDeposit({
    getSignableDepositRequest,
  });

  // Perform encoding on asset details to get an assetType (required for stark contract request)
  const encodingResult = await encodingApi.encodeAsset({
    assetType: 'asset',
    encodeAssetRequest: {
      token: {
        type: deposit.type,
        data: {
          token_address: deposit.tokenAddress,
          token_id: deposit.tokenId,
        },
      },
    },
  });

  const assetType = encodingResult.data.asset_type;
  const starkPublicKey = signableDepositResult.data.stark_key;
  const vaultId = signableDepositResult.data.vault_id;

  const isRegistered = await isRegisteredOnChain(
    starkPublicKey,
    signer,
    config,
  );

  // Approve whether an amount of token from an account can be spent by a third-party account
  const tokenContract = Contracts.IERC721.connect(deposit.tokenAddress, signer);
  const operator = config.ethConfiguration.coreContractAddress;
  const isApprovedForAll = await tokenContract.isApprovedForAll(user, operator);
  if (!isApprovedForAll) {
    await tokenContract.setApprovalForAll(operator, true);
  }

  if (!isRegistered) {
    const signableResult = await getSignableRegistrationOnchain(
      user,
      starkPublicKey,
      usersApi,
    );

    const coreContract = Contracts.Core.connect(
      config.ethConfiguration.coreContractAddress,
      signer,
    );
    // Note: proxy registration contract registerAndDepositNft method is not used as it currently fails erc721 transfer ownership check
    await coreContract.registerUser(
      user,
      starkPublicKey,
      signableResult.operator_signature,
    );
  }

  return executeDepositERC721(
    signer,
    deposit.tokenId,
    assetType,
    starkPublicKey,
    vaultId,
    config,
  );
}

async function executeDepositERC721(
  signer: EthSigner,
  tokenId: string,
  assetType: string,
  starkPublicKey: string,
  vaultId: number,
  config: ImmutableXConfiguration
): Promise<TransactionResponse> {
  const coreContract = Contracts.Core.connect(
    config.ethConfiguration.coreContractAddress,
    signer,
  );
  const populatedTransaction = await coreContract.populateTransaction.depositNft(
    starkPublicKey,
    assetType,
    vaultId,
    tokenId,
  );

  return signer.sendTransaction(populatedTransaction);
}
