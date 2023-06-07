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
 * @interface CreateProjectRequest
 */
export interface CreateProjectRequest {
    /**
     * The company name
     * @type {string}
     * @memberof CreateProjectRequest
     */
    'company_name': string;
    /**
     * The project contact email (must be registered as a developer account with Immutable at https://hub.immutable.com)
     * @type {string}
     * @memberof CreateProjectRequest
     */
    'contact_email': string;
    /**
     * The project name
     * @type {string}
     * @memberof CreateProjectRequest
     */
    'name': string;
}

