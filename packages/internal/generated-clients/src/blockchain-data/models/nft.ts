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
import { Chain } from './chain';

/**
 * 
 * @export
 * @interface NFT
 */
export interface NFT {
    /**
     * 
     * @type {Chain}
     * @memberof NFT
     */
    'chain': Chain;
    /**
     * An `uint256` token id as string
     * @type {string}
     * @memberof NFT
     */
    'token_id': string;
    /**
     * The contract address of the NFT
     * @type {string}
     * @memberof NFT
     */
    'contract_address': string;
    /**
     * When the NFT was first indexed
     * @type {string}
     * @memberof NFT
     */
    'indexed_at': string;
    /**
     * When the NFT owner was last updated
     * @type {string}
     * @memberof NFT
     */
    'updated_at': string;
    /**
     * When NFT metadata was last synced
     * @type {string}
     * @memberof NFT
     */
    'metadata_synced_at': string | null;
    /**
     * The id of the metadata of this NFT
     * @type {string}
     * @memberof NFT
     */
    'metadata_id'?: string | null;
    /**
     * The name of the NFT
     * @type {string}
     * @memberof NFT
     */
    'name': string | null;
    /**
     * The description of the NFT
     * @type {string}
     * @memberof NFT
     */
    'description': string | null;
    /**
     * The image url of the NFT
     * @type {string}
     * @memberof NFT
     */
    'image': string | null;
    /**
     * The external website link of NFT
     * @type {string}
     * @memberof NFT
     */
    'external_link': string | null;
    /**
     * The animation url of the NFT
     * @type {string}
     * @memberof NFT
     */
    'animation_url': string | null;
    /**
     * The youtube URL of NFT
     * @type {string}
     * @memberof NFT
     */
    'youtube_url': string | null;
}
