import axios, { AxiosResponse } from 'axios';
import getApiClient from '../apiClient';
import Response from '../../interface/Response';
import DatasyncSource from '../../interface/model/DatasyncSource';

export class DatasyncError extends Error {
  statusCode?: number;
  data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

const API_BASE_URL = '/api/export/csv';
const apiClient = getApiClient(process.env.REACT_APP_API_BASE_URL || '');

const handleApiError = (error: unknown, defaultMessage: string): never => {
  const message = error instanceof Error ? error.message : defaultMessage;

  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const detailedMessage = error.response?.data?.message || error.message;
    const data = error.response?.data;

    throw new DatasyncError(
      detailedMessage
        ? `${defaultMessage}: ${detailedMessage}`
        : defaultMessage,
      statusCode,
      data
    );
  }

  throw new DatasyncError(message, 500, {});
};

/**
 * Fetches all datasync sources from the API
 * @returns Promise containing the response with datasync sources
 * @throws {DatasyncError} If the request fails
 */
export const getAllFiles = async (): Promise<
  AxiosResponse<Response<DatasyncSource[]>>
> => {
  return apiClient
    .get(API_BASE_URL)
    .catch((error) => handleApiError(error, "Failed to fetch source csv's"));
};

/**
 * Adds new datasync source
 * @param data datasync source to add
 * @returns Promise containing the response with created datasync source
 * @throws {DatasyncError} If the request fails
 */
export const addNewFiles = async (
  data: DatasyncSource
): Promise<AxiosResponse<DatasyncSource>> => {
  return apiClient
    .post(API_BASE_URL, data)
    .catch((error) => handleApiError(error, 'Failed to create location'));
};
