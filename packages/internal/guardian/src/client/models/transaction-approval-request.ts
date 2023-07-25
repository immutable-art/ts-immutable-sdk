/* tslint:disable */
/* eslint-disable */
/**
 * Guardian
 * Guardian API
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: support@immutable.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface TransactionApprovalRequest
 */
export interface TransactionApprovalRequest {
    /**
     * rollup chain ID
     * @type {string}
     * @memberof TransactionApprovalRequest
     */
    'chainID'?: string;
    /**
     * chain type
     * @type {string}
     * @memberof TransactionApprovalRequest
     */
    'chainType': TransactionApprovalRequestChainTypeEnum;
    /**
     * otp string
     * @type {string}
     * @memberof TransactionApprovalRequest
     */
    'otp'?: string;
}

export const TransactionApprovalRequestChainTypeEnum = {
    Starkex: 'starkex',
    Evm: 'evm'
} as const;

export type TransactionApprovalRequestChainTypeEnum = typeof TransactionApprovalRequestChainTypeEnum[keyof typeof TransactionApprovalRequestChainTypeEnum];


