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
 * @interface RejectPrimarySaleBadRequestBodyAllOf1
 */
export interface RejectPrimarySaleBadRequestBodyAllOf1 {
    /**
     * Error Code
     * @type {string}
     * @memberof RejectPrimarySaleBadRequestBodyAllOf1
     */
    'code': RejectPrimarySaleBadRequestBodyAllOf1CodeEnum;
    /**
     * Additional details to help resolve the error
     * @type {object}
     * @memberof RejectPrimarySaleBadRequestBodyAllOf1
     */
    'details': object | null;
}

export const RejectPrimarySaleBadRequestBodyAllOf1CodeEnum = {
    ValidationError: 'VALIDATION_ERROR'
} as const;

export type RejectPrimarySaleBadRequestBodyAllOf1CodeEnum = typeof RejectPrimarySaleBadRequestBodyAllOf1CodeEnum[keyof typeof RejectPrimarySaleBadRequestBodyAllOf1CodeEnum];

