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


// May contain unused imports in some cases
// @ts-ignore
import { MarketPriceDetails } from './market-price-details';

/**
 * 
 * @export
 * @interface Bid
 */
export interface Bid {
    /**
     * Global Order identifier
     * @type {string}
     * @memberof Bid
     */
    'bid_id': string;
    /**
     * 
     * @type {MarketPriceDetails}
     * @memberof Bid
     */
    'price_details': MarketPriceDetails;
    /**
     * Token ID. Null for collection bids that can be fulfilled by any asset in the collection
     * @type {string}
     * @memberof Bid
     */
    'token_id': string | null;
    /**
     * ETH Address of collection that the asset belongs to
     * @type {string}
     * @memberof Bid
     */
    'contract_address': string;
    /**
     * ETH Address of listing creator
     * @type {string}
     * @memberof Bid
     */
    'creator': string;
    /**
     * Amount of token included in the listing
     * @type {string}
     * @memberof Bid
     */
    'amount': string;
}
