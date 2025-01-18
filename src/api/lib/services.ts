import axios, { AxiosResponse } from 'axios';
import getApiClient from '../apiClient';
import Response from '../../interface/Response';
import { Service } from '../../interface/model/Service';

export class ServiceError extends Error {
  statusCode?: number;
  data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

const API_BASE_URL = '/api/services';
const apiClient = getApiClient(process.env.REACT_APP_API_BASE_URL || '');

const handleApiError = (error: unknown, defaultMessage: string): never => {
  const message = error instanceof Error ? error.message : defaultMessage;

  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const detailedMessage = error.response?.data?.message || error.message;
    const data = error.response?.data;

    throw new ServiceError(
      detailedMessage
        ? `${defaultMessage}: ${detailedMessage}`
        : defaultMessage,
      statusCode,
      data
    );
  }

  throw new ServiceError(message, 500, {});
};

/**
 * Fetches all services from the API
 * @returns Promise containing the response with service data
 * @throws {ServiceError} If the request fails
 */
export const getAllServices = async (): Promise<
  AxiosResponse<Response<Service[]>>
> => {
  return apiClient
    .get(API_BASE_URL)
    .catch((error) => handleApiError(error, 'Failed to fetch services'));
};

export const getTextSearchServices = async (
  query: string
): Promise<AxiosResponse<Service[]>> => {
  return apiClient
    .get(`${API_BASE_URL}?query=${query}`)
    .catch((error) => handleApiError(error, 'Failed to fetch services'));
};
