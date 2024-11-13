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


// @ts-ignore
import { APIError400 } from '../models';
// @ts-ignore
import { APIError401 } from '../models';
// @ts-ignore
import { APIError403 } from '../models';
// @ts-ignore
import { APIError404 } from '../models';
// @ts-ignore
import { APIError429 } from '../models';
// @ts-ignore
import { APIError500 } from '../models';
// @ts-ignore
import { QuotesForNFTsResult } from '../models';
// @ts-ignore
import { QuotesForStacksResult } from '../models';
// @ts-ignore
export type { APIError400 } from '../models';
// @ts-ignore
export type { APIError401 } from '../models';
// @ts-ignore
export type { APIError403 } from '../models';
// @ts-ignore
export type { APIError404 } from '../models';
// @ts-ignore
export type { APIError429 } from '../models';
// @ts-ignore
export type { APIError500 } from '../models';
// @ts-ignore
export type { QuotesForNFTsResult } from '../models';
// @ts-ignore
export type { QuotesForStacksResult } from '../models';

/**
 * Request parameters for quotesForNFTs operation in PricingApi.
 * @export
 * @interface QuotesForNFTsRequest
 */
export interface QuotesForNFTsRequestParams {
    /**
     * The name of chain
     * @type {string}
     * @memberof QuotesForNFTs
     */
    readonly chainName: string

    /**
     * Contract address for collection that these token ids are on
     * @type {string}
     * @memberof QuotesForNFTs
     */
    readonly contractAddress: string

    /**
     * List of token ids to get pricing data for
     * @type {Array<string>}
     * @memberof QuotesForNFTs
     */
    readonly tokenId: Array<string>

    /**
     * Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
     * @type {string}
     * @memberof QuotesForNFTs
     */
    readonly pageCursor?: string
}

/**
 * Request parameters for quotesForStacks operation in PricingApi.
 * @export
 * @interface QuotesForStacksRequest
 */
export interface QuotesForStacksRequestParams {
    /**
     * The name of chain
     * @type {string}
     * @memberof QuotesForStacks
     */
    readonly chainName: string

    /**
     * Contract address for collection that these stacks are on
     * @type {string}
     * @memberof QuotesForStacks
     */
    readonly contractAddress: string

    /**
     * List of stack ids to get pricing data for
     * @type {Array<string>}
     * @memberof QuotesForStacks
     */
    readonly stackId: Array<string>

    /**
     * Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
     * @type {string}
     * @memberof QuotesForStacks
     */
    readonly pageCursor?: string
}


