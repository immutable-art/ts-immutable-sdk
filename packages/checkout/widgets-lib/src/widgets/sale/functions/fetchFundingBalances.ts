import { Web3Provider } from '@ethersproject/providers';
import { Checkout, TransactionRequirement } from '@imtbl/checkout-sdk';
import { Environment } from '@imtbl/config';
import {
  OrderQuoteCurrency,
  FundingBalance,
  FundingBalanceResult,
} from '../types';
import {
  getAlternativeFundingSteps,
  getERC20ItemRequirement,
  getFnToPushAndSortFundingBalances,
  getFundingBalances,
  getGasEstimate,
  wrapPromisesWithOnResolve,
} from './fetchFundingBalancesUtils';

export type FundingBalanceParams = {
  provider: Web3Provider;
  checkout: Checkout;
  currencies: OrderQuoteCurrency[];
  baseCurrency: OrderQuoteCurrency;
  routingOptions: { bridge: boolean; onRamp: boolean; swap: boolean };
  getAmountByCurrency: (currency: OrderQuoteCurrency) => string;
  getIsGasless: () => boolean;
  onFundingBalance: (balances: FundingBalance[]) => void;
  onFundingRequirement: (
    fundingItemRequirement: TransactionRequirement
  ) => void;
  onComplete?: (balances: FundingBalance[]) => void;
};

export const fetchFundingBalances = async (
  params: FundingBalanceParams,
): Promise<FundingBalanceResult[]> => {
  const {
    provider,
    checkout,
    currencies,
    baseCurrency,
    onFundingBalance,
    getAmountByCurrency,
    getIsGasless,
    onComplete,
    onFundingRequirement,
  } = params;

  const signer = provider?.getSigner();
  const spenderAddress = (await signer?.getAddress()) || '';
  const environment = checkout.config.environment as Environment;

  const pushToFoundBalances = getFnToPushAndSortFundingBalances(baseCurrency);
  const updateFundingBalances = (balances: FundingBalance[] | null) => {
    if (Array.isArray(balances) && balances.length > 0) {
      onFundingBalance(pushToFoundBalances(balances));
    }
  };

  const balancePromises: Promise<FundingBalanceResult>[] = currencies
    .map(async (currency) => {
      const amount = getAmountByCurrency(currency);

      if (!amount) {
        return null;
      }

      const itemRequirements = getERC20ItemRequirement(
        amount,
        spenderAddress,
        currency.address,
      );

      const transactionOrGasAmount = getIsGasless()
        ? undefined
        : getGasEstimate();

      const smartCheckoutResult = await checkout.smartCheckout({
        provider,
        itemRequirements,
        transactionOrGasAmount,
        routingOptions: { bridge: false, onRamp: false, swap: true },
        fundingRouteFullAmount: true,
        onComplete: () => {
          onComplete?.(pushToFoundBalances([]));
        },
        onFundingRoute: (route) => {
          updateFundingBalances(
            getAlternativeFundingSteps([route], environment),
          );
        },
      });

      return { currency, smartCheckoutResult };
    })
    .filter(Boolean) as Promise<FundingBalanceResult>[];

  const results = await wrapPromisesWithOnResolve(
    balancePromises,
    ({ currency, smartCheckoutResult }) => {
      updateFundingBalances(
        getFundingBalances(smartCheckoutResult, environment),
      );

      if (currency.base) {
        const fundingItemRequirement = smartCheckoutResult.transactionRequirements[0];
        onFundingRequirement(fundingItemRequirement);
      }
    },
  );

  return results;
};