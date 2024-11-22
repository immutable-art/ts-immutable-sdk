import { Web3Provider } from '@ethersproject/providers';
import { useContext } from 'react';
import { RouteResponse } from '@0xsquid/squid-types';
import { Squid } from '@0xsquid/sdk';
import { ethers } from 'ethers';
import { Environment } from '@imtbl/config';

import { StatusResponse } from '@0xsquid/sdk/dist/types';
import { isSquidNativeToken } from '../functions/isSquidNativeToken';
import { useError } from './useError';
import { AddTokensError, AddTokensErrorTypes } from '../types';
import { EventTargetContext } from '../../../context/event-target-context/EventTargetContext';
import { sendAddTokensFailedEvent } from '../AddTokensWidgetEvents';
import { retry } from '../../../lib/retry';
import { withMetricsAsync } from '../../../lib/metrics';
import { UserJourney } from '../../../context/analytics-provider/SegmentAnalyticsProvider';

const TRANSACTION_NOT_COMPLETED = 'transaction not completed';

export const useExecute = (contextId: string, environment: Environment) => {
  const { showErrorHandover } = useError(environment);
  const {
    eventTargetState: { eventTarget },
  } = useContext(EventTargetContext);

  const waitForReceipt = async (
    provider: Web3Provider,
    txHash: string,
    maxAttempts = 60,
  ) => {
    const result = await retry(
      async () => {
        const receipt = await provider.getTransactionReceipt(txHash);
        if (!receipt) {
          throw new Error('receipt not found');
        }
        if (receipt.status === 0) {
          throw new Error('status failed');
        }
        return receipt;
      },
      {
        retries: maxAttempts,
        retryIntervalMs: 1000,
        nonRetryable: (error) => error.message === 'status failed',
      },
    );

    if (!result) {
      throw new Error(
        `Transaction receipt not found after ${maxAttempts} attempts`,
      );
    }

    return result;
  };

  const handleTransactionError = (err: unknown) => {
    const reason = `${
      (err as any)?.reason || (err as any)?.message || ''
    }`.toLowerCase();

    let errorType = AddTokensErrorTypes.WALLET_FAILED;

    if (reason.includes('failed') && reason.includes('open confirmation')) {
      errorType = AddTokensErrorTypes.WALLET_POPUP_BLOCKED;
    }

    if (reason.includes('rejected') && reason.includes('user')) {
      errorType = AddTokensErrorTypes.WALLET_REJECTED;
    }

    if (
      reason.includes('failed to submit')
      && reason.includes('highest gas limit')
    ) {
      errorType = AddTokensErrorTypes.WALLET_REJECTED_NO_FUNDS;
    }

    if (
      reason.includes('status failed')
      || reason.includes('transaction failed')
    ) {
      errorType = AddTokensErrorTypes.TRANSACTION_FAILED;
      sendAddTokensFailedEvent(eventTarget, errorType);
    }

    if (
      reason.includes('unrecognized chain')
      || reason.includes('unrecognized chain')
    ) {
      errorType = AddTokensErrorTypes.UNRECOGNISED_CHAIN;
    }

    const error: AddTokensError = {
      type: errorType,
      data: { error: err },
    };

    showErrorHandover(errorType, { contextId, error });
  };

  // @TODO: Move to util function
  const checkProviderChain = async (
    provider: Web3Provider,
    chainId: string,
  ): Promise<boolean> => {
    if (!provider.provider.request) {
      throw new Error('provider does not have request method');
    }
    try {
      const fromChainHex = `0x${parseInt(chainId, 10).toString(16)}`;
      const providerChainId = await provider.provider.request({
        method: 'eth_chainId',
      });

      if (fromChainHex !== providerChainId) {
        await provider.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: fromChainHex,
            },
          ],
        });
        return true;
      }
      return true;
    } catch (error) {
      handleTransactionError(error);
      return false;
    }
  };

  const getAllowance = async (
    provider: Web3Provider,
    routeResponse: RouteResponse,
  ): Promise<ethers.BigNumber | undefined> => {
    try {
      if (!isSquidNativeToken(routeResponse?.route?.params.fromToken)) {
        const erc20Abi = [
          'function allowance(address owner, address spender) public view returns (uint256)',
        ];
        const fromToken = routeResponse?.route.params.fromToken;
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(fromToken, erc20Abi, signer);

        const ownerAddress = await signer.getAddress();
        const transactionRequestTarget = routeResponse?.route?.transactionRequest?.target;

        if (!transactionRequestTarget) {
          throw new Error('transactionRequest target is undefined');
        }

        const allowance = await tokenContract.allowance(
          ownerAddress,
          transactionRequestTarget,
        );
        return allowance;
      }

      return ethers.constants.MaxUint256; // no approval is needed for native tokens
    } catch (error) {
      showErrorHandover(AddTokensErrorTypes.DEFAULT, { contextId, error });
      return undefined;
    }
  };

  const callApprove = async (
    provider: Web3Provider,
    routeResponse: RouteResponse,
  ): Promise<ethers.providers.TransactionReceipt> => {
    const erc20Abi = [
      'function approve(address spender, uint256 amount) public returns (bool)',
    ];
    const fromToken = routeResponse?.route.params.fromToken;
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(fromToken, erc20Abi, signer);

    const fromAmount = routeResponse?.route.params.fromAmount;
    if (!fromAmount) {
      throw new Error('fromAmount is undefined');
    }

    const transactionRequestTarget = routeResponse?.route?.transactionRequest?.target;
    if (!transactionRequestTarget) {
      throw new Error('transactionRequest target is undefined');
    }

    const tx = await tokenContract.approve(
      transactionRequestTarget,
      fromAmount,
    );
    return await waitForReceipt(provider, tx.hash);
  };

  const approve = async (
    provider: Web3Provider,
    routeResponse: RouteResponse,
  ): Promise<ethers.providers.TransactionReceipt | undefined> => {
    try {
      if (!isSquidNativeToken(routeResponse?.route?.params.fromToken)) {
        return await withMetricsAsync(
          () => callApprove(provider, routeResponse),
          `${UserJourney.ADD_TOKENS}_Approve`,
        );
      }
      return undefined;
    } catch (error) {
      handleTransactionError(error);
      return undefined;
    }
  };

  const callExecute = async (
    squid: Squid,
    provider: Web3Provider,
    routeResponse: RouteResponse,
  ): Promise<ethers.providers.TransactionReceipt> => {
    const tx = (await squid.executeRoute({
      signer: provider.getSigner(),
      route: routeResponse.route,
    })) as unknown as ethers.providers.TransactionResponse;
    return await waitForReceipt(provider, tx.hash);
  };

  const execute = async (
    squid: Squid,
    provider: Web3Provider,
    routeResponse: RouteResponse,
  ): Promise<ethers.providers.TransactionReceipt | undefined> => {
    if (!provider.provider.request) {
      throw new Error('provider does not have request method');
    }
    try {
      return await withMetricsAsync(
        () => callExecute(squid, provider, routeResponse),
        `${UserJourney.ADD_TOKENS}_Execute`,
      );
    } catch (error) {
      handleTransactionError(error);
      return undefined;
    }
  };

  const getStatus = async (
    squid: Squid,
    transactionHash: string,
  ): Promise<StatusResponse | undefined> => {
    const completedTransactionStatus = [
      'success',
      'partial_success',
      'needs_gas',
      'not_found',
    ];
    try {
      return await retry(
        async () => {
          const result = await squid.getStatus({
            transactionId: transactionHash,
          });
          if (
            completedTransactionStatus.includes(
              result.squidTransactionStatus ?? '',
            )
          ) {
            return result;
          }
          return Promise.reject(TRANSACTION_NOT_COMPLETED);
        },
        {
          retries: 240,
          retryIntervalMs: 5000,
          nonRetryable: (err) => {
            if (err.response) {
              return err.response.status === 400 || err.response.status === 500;
            }
            return err !== TRANSACTION_NOT_COMPLETED;
          },
        },
      );
    } catch (error) {
      handleTransactionError(error);
      return undefined;
    }
  };

  return {
    checkProviderChain,
    getAllowance,
    approve,
    execute,
    getStatus,
  };
};
