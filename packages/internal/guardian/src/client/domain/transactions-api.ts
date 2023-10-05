/* tslint:disable */
/* eslint-disable */
/**
 * Guardian
 * Guardian API
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: support@immutable.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { APIError400 } from '../models';
// @ts-ignore
import { APIError403 } from '../models';
// @ts-ignore
import { APIError404 } from '../models';
// @ts-ignore
import { APIError500 } from '../models';
// @ts-ignore
import { BasicAPIError } from '../models';
// @ts-ignore
import { Transaction } from '../models';
// @ts-ignore
import { TransactionApprovalRequest } from '../models';
// @ts-ignore
import { TransactionEvaluationRequest } from '../models';
// @ts-ignore
import { TransactionEvaluationResponse } from '../models';
/**
 * TransactionsApi - axios parameter creator
 * @export
 */
export const TransactionsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Approve a pending transaction
         * @summary Approve a pending transaction given chain
         * @param {string} payloadHash Hash for the payload
         * @param {TransactionApprovalRequest} transactionApprovalRequest request body for approving a pending transaction
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        approvePendingTransaction: async (payloadHash: string, transactionApprovalRequest: TransactionApprovalRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'payloadHash' is not null or undefined
            assertParamExists('approvePendingTransaction', 'payloadHash', payloadHash)
            // verify required parameter 'transactionApprovalRequest' is not null or undefined
            assertParamExists('approvePendingTransaction', 'transactionApprovalRequest', transactionApprovalRequest)
            const localVarPath = `/guardian/v1/transactions/{payloadHash}/approve`
                .replace(`{${"payloadHash"}}`, encodeURIComponent(String(payloadHash)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(transactionApprovalRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Check if the transaction is valid by transaction ID for both StarkEx and EVM
         * @summary Evaluate a transaction
         * @param {string} id Transaction identifier: payloadHash on StarkEx or EVM ID
         * @param {TransactionEvaluationRequest} transactionEvaluationRequest Specifies the kind of transaction
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        evaluateTransaction: async (id: string, transactionEvaluationRequest: TransactionEvaluationRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('evaluateTransaction', 'id', id)
            // verify required parameter 'transactionEvaluationRequest' is not null or undefined
            assertParamExists('evaluateTransaction', 'transactionEvaluationRequest', transactionEvaluationRequest)
            const localVarPath = `/guardian/v1/transactions/{id}/evaluate`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(transactionEvaluationRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get a transaction by payload hash
         * @summary Info for a specific transaction
         * @param {string} transactionID The id of the starkex transaction to retrieve
         * @param {'starkex' | 'evm'} chainType roll up type
         * @param {string} [chainID] ID of evm chain
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactionByID: async (transactionID: string, chainType: 'starkex' | 'evm', chainID?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'transactionID' is not null or undefined
            assertParamExists('getTransactionByID', 'transactionID', transactionID)
            // verify required parameter 'chainType' is not null or undefined
            assertParamExists('getTransactionByID', 'chainType', chainType)
            const localVarPath = `/guardian/v1/transactions/{transactionID}`
                .replace(`{${"transactionID"}}`, encodeURIComponent(String(transactionID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (chainType !== undefined) {
                localVarQueryParameter['chainType'] = chainType;
            }

            if (chainID !== undefined) {
                localVarQueryParameter['chainID'] = chainID;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TransactionsApi - functional programming interface
 * @export
 */
export const TransactionsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TransactionsApiAxiosParamCreator(configuration)
    return {
        /**
         * Approve a pending transaction
         * @summary Approve a pending transaction given chain
         * @param {string} payloadHash Hash for the payload
         * @param {TransactionApprovalRequest} transactionApprovalRequest request body for approving a pending transaction
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async approvePendingTransaction(payloadHash: string, transactionApprovalRequest: TransactionApprovalRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.approvePendingTransaction(payloadHash, transactionApprovalRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Check if the transaction is valid by transaction ID for both StarkEx and EVM
         * @summary Evaluate a transaction
         * @param {string} id Transaction identifier: payloadHash on StarkEx or EVM ID
         * @param {TransactionEvaluationRequest} transactionEvaluationRequest Specifies the kind of transaction
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async evaluateTransaction(id: string, transactionEvaluationRequest: TransactionEvaluationRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionEvaluationResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.evaluateTransaction(id, transactionEvaluationRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get a transaction by payload hash
         * @summary Info for a specific transaction
         * @param {string} transactionID The id of the starkex transaction to retrieve
         * @param {'starkex' | 'evm'} chainType roll up type
         * @param {string} [chainID] ID of evm chain
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTransactionByID(transactionID: string, chainType: 'starkex' | 'evm', chainID?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Transaction>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTransactionByID(transactionID, chainType, chainID, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TransactionsApi - factory interface
 * @export
 */
export const TransactionsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TransactionsApiFp(configuration)
    return {
        /**
         * Approve a pending transaction
         * @summary Approve a pending transaction given chain
         * @param {string} payloadHash Hash for the payload
         * @param {TransactionApprovalRequest} transactionApprovalRequest request body for approving a pending transaction
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        approvePendingTransaction(payloadHash: string, transactionApprovalRequest: TransactionApprovalRequest, options?: any): AxiosPromise<void> {
            return localVarFp.approvePendingTransaction(payloadHash, transactionApprovalRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * Check if the transaction is valid by transaction ID for both StarkEx and EVM
         * @summary Evaluate a transaction
         * @param {string} id Transaction identifier: payloadHash on StarkEx or EVM ID
         * @param {TransactionEvaluationRequest} transactionEvaluationRequest Specifies the kind of transaction
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        evaluateTransaction(id: string, transactionEvaluationRequest: TransactionEvaluationRequest, options?: any): AxiosPromise<TransactionEvaluationResponse> {
            return localVarFp.evaluateTransaction(id, transactionEvaluationRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * Get a transaction by payload hash
         * @summary Info for a specific transaction
         * @param {string} transactionID The id of the starkex transaction to retrieve
         * @param {'starkex' | 'evm'} chainType roll up type
         * @param {string} [chainID] ID of evm chain
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactionByID(transactionID: string, chainType: 'starkex' | 'evm', chainID?: string, options?: any): AxiosPromise<Transaction> {
            return localVarFp.getTransactionByID(transactionID, chainType, chainID, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for approvePendingTransaction operation in TransactionsApi.
 * @export
 * @interface TransactionsApiApprovePendingTransactionRequest
 */
export interface TransactionsApiApprovePendingTransactionRequest {
    /**
     * Hash for the payload
     * @type {string}
     * @memberof TransactionsApiApprovePendingTransaction
     */
    readonly payloadHash: string

    /**
     * request body for approving a pending transaction
     * @type {TransactionApprovalRequest}
     * @memberof TransactionsApiApprovePendingTransaction
     */
    readonly transactionApprovalRequest: TransactionApprovalRequest
}

/**
 * Request parameters for evaluateTransaction operation in TransactionsApi.
 * @export
 * @interface TransactionsApiEvaluateTransactionRequest
 */
export interface TransactionsApiEvaluateTransactionRequest {
    /**
     * Transaction identifier: payloadHash on StarkEx or EVM ID
     * @type {string}
     * @memberof TransactionsApiEvaluateTransaction
     */
    readonly id: string

    /**
     * Specifies the kind of transaction
     * @type {TransactionEvaluationRequest}
     * @memberof TransactionsApiEvaluateTransaction
     */
    readonly transactionEvaluationRequest: TransactionEvaluationRequest
}

/**
 * Request parameters for getTransactionByID operation in TransactionsApi.
 * @export
 * @interface TransactionsApiGetTransactionByIDRequest
 */
export interface TransactionsApiGetTransactionByIDRequest {
    /**
     * The id of the starkex transaction to retrieve
     * @type {string}
     * @memberof TransactionsApiGetTransactionByID
     */
    readonly transactionID: string

    /**
     * roll up type
     * @type {'starkex' | 'evm'}
     * @memberof TransactionsApiGetTransactionByID
     */
    readonly chainType: 'starkex' | 'evm'

    /**
     * ID of evm chain
     * @type {string}
     * @memberof TransactionsApiGetTransactionByID
     */
    readonly chainID?: string
}

/**
 * TransactionsApi - object-oriented interface
 * @export
 * @class TransactionsApi
 * @extends {BaseAPI}
 */
export class TransactionsApi extends BaseAPI {
    /**
     * Approve a pending transaction
     * @summary Approve a pending transaction given chain
     * @param {TransactionsApiApprovePendingTransactionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionsApi
     */
    public approvePendingTransaction(requestParameters: TransactionsApiApprovePendingTransactionRequest, options?: AxiosRequestConfig) {
        return TransactionsApiFp(this.configuration).approvePendingTransaction(requestParameters.payloadHash, requestParameters.transactionApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Check if the transaction is valid by transaction ID for both StarkEx and EVM
     * @summary Evaluate a transaction
     * @param {TransactionsApiEvaluateTransactionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionsApi
     */
    public evaluateTransaction(requestParameters: TransactionsApiEvaluateTransactionRequest, options?: AxiosRequestConfig) {
        return TransactionsApiFp(this.configuration).evaluateTransaction(requestParameters.id, requestParameters.transactionEvaluationRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get a transaction by payload hash
     * @summary Info for a specific transaction
     * @param {TransactionsApiGetTransactionByIDRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionsApi
     */
    public getTransactionByID(requestParameters: TransactionsApiGetTransactionByIDRequest, options?: AxiosRequestConfig) {
        return TransactionsApiFp(this.configuration).getTransactionByID(requestParameters.transactionID, requestParameters.chainType, requestParameters.chainID, options).then((request) => request(this.axios, this.basePath));
    }
}
