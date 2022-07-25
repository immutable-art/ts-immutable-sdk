/* tslint:disable */
/* eslint-disable */
/**
 * Immutable X API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1
 * Contact: support@immutable.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface CreateTradeResponse
 */
export interface CreateTradeResponse {
    /**
     * Request ID that returns when a trade initiated through risk-manager
     * @type {string}
     * @memberof CreateTradeResponse
     */
    'request_id'?: string;
    /**
     * Current status of trade
     * @type {string}
     * @memberof CreateTradeResponse
     */
    'status': string;
    /**
     * ID of trade within Immutable X
     * @type {number}
     * @memberof CreateTradeResponse
     */
    'trade_id': number;
}

