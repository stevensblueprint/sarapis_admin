import axios, { AxiosResponse } from 'axios';
import getApiClient from '../apiClient';
import Response from '../../interface/Response';
import DatasyncSource from '../../interface/model/Datasync';

export class DatasyncError extends Error {
  statusCode?: number;
  data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

const API_BASE_URL = '/api/datasync';
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
  uuid: string;
  time_range: string;
  file_type: string;
  tables: string[];
}): Promise<AxiosResponse<Response<File>>> => {
  return apiClient
    .post(API_BASE_URL + '/export', data)
    .catch((error) => handleApiError(error, "Failed to fetch source csv's"));
};

/**
 * Fetches import/export history from the API
 * @returns Promise containing an array to populate the datasync table
 * @throws {DatasyncError} If the request fails
 */
export const getAllActions = async (): Promise<
  AxiosResponse<Response<DatasyncSource[]>>
> => {
  return apiClient
    .get(API_BASE_URL + '/export')
    .catch((error) => handleApiError(error, "Failed to fetch source csv's"));
};

/**
 * Adds new datasync source
 * @param data datasync source to add
 * @returns Promise containing the response with created datasync source
 * @throws {DatasyncError} If the request fails
 * Not yet implemented
 */
export const addNewFiles = async (data: {
  files: File[];
  uuid: string;
}): Promise<AxiosResponse<DatasyncSource>> => {
  return apiClient
    .post(API_BASE_URL + '/import', data)
    .catch((error) => handleApiError(error, 'Failed to create location'));
};

/**
 * Deletes files based on id
 * @param data ids of imports to delete
 * @throws {DatasyncError} If the request fails
 */
export const deleteFiles = async (
  data: string[]
): Promise<AxiosResponse<Response<void>>> => {
  return apiClient
    .delete(API_BASE_URL, { data: data })
    .catch((error) => handleApiError(error, "Failed to fetch source csv's"));
};
