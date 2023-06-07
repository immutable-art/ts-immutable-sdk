/* tslint:disable */
/* eslint-disable */
/**
 * Immutable X API
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
import { ActivityToken } from './activity-token';
// May contain unused imports in some cases
// @ts-ignore
import { ActivityType } from './activity-type';

/**
 * The transfer activity details
 * @export
 * @interface Transfer
 */
export interface Transfer {
    /**
     * 
     * @type {ActivityType}
     * @memberof Transfer
     */
    'activity_type': ActivityType;
    /**
     * The account address the token was transferred from
     * @type {string}
     * @memberof Transfer
     */
    'from': string;
    /**
     * The account address the token was transferred to
     * @type {string}
     * @memberof Transfer
     */
    'to': string;
    /**
     * The amount of tokens transferred
     * @type {string}
     * @memberof Transfer
     */
    'amount': string;
    /**
     * 
     * @type {ActivityToken}
     * @memberof Transfer
     */
    'token': ActivityToken;
}

