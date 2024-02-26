/* tslint:disable */
/* eslint-disable */
/**
 * Immutable X API
 * Immutable X API
 *
 * The version of the OpenAPI document: 3.0.0
 * Contact: support@immutable.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface GetPrimarySaleInternalServerErrorBodyAllOf1
 */
export interface GetPrimarySaleInternalServerErrorBodyAllOf1 {
    /**
     * Error Code
     * @type {string}
     * @memberof GetPrimarySaleInternalServerErrorBodyAllOf1
     */
    'code': GetPrimarySaleInternalServerErrorBodyAllOf1CodeEnum;
    /**
     * Additional details to help resolve the error
     * @type {object}
     * @memberof GetPrimarySaleInternalServerErrorBodyAllOf1
     */
    'details': object | null;
}

export const GetPrimarySaleInternalServerErrorBodyAllOf1CodeEnum = {
    InternalServerError: 'INTERNAL_SERVER_ERROR'
} as const;

export type GetPrimarySaleInternalServerErrorBodyAllOf1CodeEnum = typeof GetPrimarySaleInternalServerErrorBodyAllOf1CodeEnum[keyof typeof GetPrimarySaleInternalServerErrorBodyAllOf1CodeEnum];

