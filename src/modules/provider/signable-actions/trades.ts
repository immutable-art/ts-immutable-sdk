import { CreateTradeResponse, GetSignableTradeRequest } from 'src/types';
import { Signers } from './types';
import { validateChain } from './helpers';
import { signRaw } from './utils';
import { Configuration } from 'src/config';
import { TradesApi } from '@imtbl/core-sdk';

type createTradeWorkflowParams = {
  signers: Signers;
  request: GetSignableTradeRequest;
  config: Configuration;
};

export async function createTrade({
  signers: { ethSigner, starkExSigner },
  request,
  config,
}: createTradeWorkflowParams): Promise<CreateTradeResponse> {
  await validateChain(ethSigner, config.getStarkExConfig());
  const ethAddress = await ethSigner.getAddress();
  const tradesApi = new TradesApi(config.getStarkExConfig().apiConfiguration);

  const signableResult = await tradesApi.getSignableTrade({
    getSignableTradeRequest: {
      user: ethAddress,
      order_id: request.order_id,
      fees: request.fees,
    },
  });

  const { signable_message: signableMessage, payload_hash: payloadHash } =
    signableResult.data;

  const ethSignature = await signRaw(signableMessage, ethSigner);

  const starkSignature = await starkExSigner.signMessage(payloadHash);

  const createTradeResponse = await tradesApi.createTrade({
    createTradeRequest: {
      amount_buy: signableResult.data.amount_buy,
      amount_sell: signableResult.data.amount_sell,
      asset_id_buy: signableResult.data.asset_id_buy,
      asset_id_sell: signableResult.data.asset_id_sell,
      expiration_timestamp: signableResult.data.expiration_timestamp,
      fee_info: signableResult.data.fee_info,
      fees: request.fees,
      include_fees: true,
      nonce: signableResult.data.nonce,
      order_id: request.order_id,
      stark_key: signableResult.data.stark_key,
      vault_id_buy: signableResult.data.vault_id_buy,
      vault_id_sell: signableResult.data.vault_id_sell,
      stark_signature: starkSignature,
    },
    xImxEthAddress: ethAddress,
    xImxEthSignature: ethSignature,
  });

  return createTradeResponse.data;
}
