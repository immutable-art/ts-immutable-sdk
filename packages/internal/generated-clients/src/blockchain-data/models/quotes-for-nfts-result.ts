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
import { NFTQuoteResult } from './nftquote-result';
// May contain unused imports in some cases
// @ts-ignore
import { Page } from './page';

/**
 * Quotes for NFTs result
 * @export
 * @interface QuotesForNFTsResult
 */
export interface QuotesForNFTsResult {
    /**
     * List of quotes
     * @type {Array<NFTQuoteResult>}
     * @memberof QuotesForNFTsResult
     */
    'result': Array<NFTQuoteResult>;
    /**
     * 
     * @type {Page}
     * @memberof QuotesForNFTsResult
     */
    'page': Page;
}
