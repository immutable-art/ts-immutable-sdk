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



/**
 * 
 * @export
 * @interface ExchangeCreateExchangeAndURLResponse
 */
export interface ExchangeCreateExchangeAndURLResponse {
    /**
     * Created transaction ID
     * @type {number}
     * @memberof ExchangeCreateExchangeAndURLResponse
     */
    'id'?: number;
    /**
     * Provider name (e.g. moonpay)
     * @type {string}
     * @memberof ExchangeCreateExchangeAndURLResponse
     */
    'provider'?: string;
    /**
     * Transaction type
     * @type {string}
     * @memberof ExchangeCreateExchangeAndURLResponse
     */
    'type'?: string;
    /**
     * Widget URL
     * @type {string}
     * @memberof ExchangeCreateExchangeAndURLResponse
     */
    'url'?: string;
    /**
     * Ethereum address of the user who created transaction
     * @type {string}
     * @memberof ExchangeCreateExchangeAndURLResponse
     */
    'wallet_address'?: string;
}

