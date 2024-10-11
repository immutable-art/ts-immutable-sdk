import { TokenBalance } from '@0xsquid/sdk/dist/types';
import { RouteResponse } from '@0xsquid/squid-types';

export type Token = {
  chainId: string;
  address: string;
  decimals: number;
  symbol?: string;
  name?: string;
  usdPrice: number;
  iconUrl: string;
};

export type Chain = {
  id: string;
  type: string;
  name: string;
  iconUrl: string;
  nativeCurrency: NativeCurrency;
};

export type NativeCurrency = {
  name: string;
  symbol: string;
  decimals: number;
  iconUrl:string;
};

export type AmountData = {
  fromToken: Token;
  fromAmount: string;
  toToken: Token;
  toAmount: string;
  balance: TokenBalance;
};

export type RouteData = {
  amountData: AmountData;
  route: RouteResponse;
};

export enum FiatOptionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum RiveStateMachineInput {
  START = 0,
  WAITING = 1,
  PROCESSING = 2,
  COMPLETED = 3,
  ERROR = 4,
}

export enum AddFundsErrorTypes {
  DEFAULT = 'DEFAULT_ERROR',
  INVALID_PARAMETERS = 'INVALID_PARAMETERS',
  SQUID_ROUTE_EXECUTION_FAILED = 'SQUID_ROUTE_EXECUTION_FAILED',
  SERVICE_BREAKDOWN = 'SERVICE_BREAKDOWN',
  WALLET_FAILED = 'WALLET_FAILED',
  WALLET_REJECTED = 'WALLET_REJECTED',
  WALLET_REJECTED_NO_FUNDS = 'WALLET_REJECTED_NO_FUNDS',
  WALLET_POPUP_BLOCKED = 'WALLET_POPUP_BLOCKED',
}
