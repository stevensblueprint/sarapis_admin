import axios, { AxiosResponse } from 'axios';
import getApiClient from '../apiClient';
import Response from '../../interface/Response';
import { Exchange } from '../../interface/model/Exchange';

export class DatasyncError extends Error {
  statusCode?: number;
  data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

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
 * Fetches all source csv's (zipped) from the API
 * @returns Promise containing the response with source csv's
 * @throws {DatasyncError} If the request fails
 */
export const getAllFiles = async (data: {
  format: string;
  user_id: string;
  files: string[];
}): Promise<AxiosResponse<Blob>> => {
  return apiClient
    .post('/export', data, {
      responseType: 'blob',
      headers: {
        Accept: 'application/zip',
      },
    })
    .catch((error) => handleApiError(error, 'Failed to fetch files'));
};

/**
 * Fetches import/export history from the API
 * @returns Promise containing an array to populate the datasync table
 * @throws {DatasyncError} If the request fails
 */
export const getAllActions = async (data?: {
  userId?: string;
  page?: number;
  per_page?: number;
}): Promise<AxiosResponse<Response<Exchange[]>>> => {
  const params: Record<string, string | number | null> = {};

  if (data) {
    if (data.userId) params.userId = data.userId;
    if (data.page !== undefined) params.page = data.page;
    if (data.per_page !== undefined) params.per_page = data.per_page;
  }

  return apiClient
    .get('/exchanges', { params })
    .catch((error) => handleApiError(error, 'Failed to fetch action history'));
};
