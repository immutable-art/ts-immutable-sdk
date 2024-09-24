/* tslint:disable */
/* eslint-disable */
/**
 * Immutable zkEVM API
 * Immutable Multi Rollup API
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
 * @interface StarkExTransactionEvaluationRequest
 */
export interface StarkExTransactionEvaluationRequest {
    /**
     * The ID of the chain
     * @type {string}
     * @memberof StarkExTransactionEvaluationRequest
     */
    'chainId'?: string;
    /**
     * The type of the chain
     * @type {string}
     * @memberof StarkExTransactionEvaluationRequest
     */
    'chainType': StarkExTransactionEvaluationRequestChainTypeEnum;
}

export const StarkExTransactionEvaluationRequestChainTypeEnum = {
    Starkex: 'starkex'
} as const;

export type StarkExTransactionEvaluationRequestChainTypeEnum = typeof StarkExTransactionEvaluationRequestChainTypeEnum[keyof typeof StarkExTransactionEvaluationRequestChainTypeEnum];

