import axios, { AxiosResponse } from 'axios';
import getApiClient from '../apiClient';
import Phone from '../../interface/model/Phone';
import Response from '../../interface/Response';

export class PhoneError extends Error {
  statusCode?: number;
  data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

const API_BASE_URL = '/api/phones';
const apiClient = getApiClient(process.env.REACT_APP_API_BASE_URL || '');

const handleApiError = (error: unknown, defaultMessage: string): never => {
  const message = error instanceof Error ? error.message : defaultMessage;

  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const detailedMessage = error.response?.data?.message || error.message;
    const data = error.response?.data;

    throw new PhoneError(
      detailedMessage
        ? `${defaultMessage}: ${detailedMessage}`
        : defaultMessage,
      statusCode,
      data
    );
  }

  throw new PhoneError(message, 500, {});
};

/**
 * Fetches all phones from the API
 * @returns Promise containing the response with phone data
 * @throws {PhoneError} If the request fails
 */
export const getAllPhones = async (): Promise<
  AxiosResponse<Response<Phone[]>>
> => {
  return apiClient
    .get(API_BASE_URL)
    .catch((error) => handleApiError(error, 'Failed to fetch phones'));
};

/**
 * Creates a new phone
 * @param data Phone data to create
 * @returns Promise containing the response with created phone data
 * @throws {PhoneError} If the request fails
 */
export const createPhone = async (
  data: Phone
): Promise<AxiosResponse<Phone>> => {
  return apiClient
    .post(API_BASE_URL, data)
    .catch((error) => handleApiError(error, 'Failed to create phone'));
};
