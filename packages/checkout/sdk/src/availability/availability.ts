import { Environment } from '@imtbl/config';
import axios from 'axios';
import { CheckoutError, CheckoutErrorType } from '../errors';
import { ENV_DEVELOPMENT, IMMUTABLE_API_BASE_URL } from '../env';

export type AvailabilityService = {
  checkDexAvailability: () => Promise<boolean>
  checkOnRampAvailability: () => Promise<boolean>
};

export const availabilityService = (
  isDevelopment: boolean,
  isProduction: boolean,
) => {
  const postEndpoint = () => {
    if (isDevelopment) return IMMUTABLE_API_BASE_URL[ENV_DEVELOPMENT];
    if (isProduction) return IMMUTABLE_API_BASE_URL[Environment.PRODUCTION];

    return IMMUTABLE_API_BASE_URL[Environment.SANDBOX];
  };

  const checkAvailability = async (endpoint: string): Promise<boolean> => {
    let response;

    try {
      response = await axios.post(endpoint);
    } catch (err: any) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      response = err.response;

      // If 403 then the service is geo-blocked
      if (response.status === 403) return false;

      throw new CheckoutError(
        `Error fetching from api: ${response.status} ${response.statusText}`,
        CheckoutErrorType.API_ERROR,
        { error: err },
      );
    }

    return true;
  };

  // eslint-disable-next-line max-len
  const checkDexAvailability = async (): Promise<boolean> => checkAvailability(`${postEndpoint()}/v1/availability/checkout/swap`);

  // eslint-disable-next-line max-len
  const checkOnRampAvailability = async (): Promise<boolean> => checkAvailability(`${postEndpoint()}/v1/availability/checkout/onramp`);

  return {
    checkDexAvailability,
    checkOnRampAvailability,
  };
};
