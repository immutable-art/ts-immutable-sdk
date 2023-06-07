/* tslint:disable */
/* eslint-disable */
/**
 * Immutable X API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 3.0
 * Contact: support@immutable.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { OrderFeeInfoToken } from './order-fee-info-token';

/**
 * 
 * @export
 * @interface OrderFeeInfo
 */
export interface OrderFeeInfo {
    /**
     * Address of the fee recipient
     * @type {string}
     * @memberof OrderFeeInfo
     */
    'address'?: string;
    /**
     * Fee amount
     * @type {string}
     * @memberof OrderFeeInfo
     */
    'amount'?: string;
    /**
     * 
     * @type {OrderFeeInfoToken}
     * @memberof OrderFeeInfo
     */
    'token'?: OrderFeeInfoToken;
    /**
     * Fee type
     * @type {string}
     * @memberof OrderFeeInfo
     */
    'type'?: string;
}

