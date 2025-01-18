import axios, { AxiosResponse } from 'axios';
import getApiClient from '../apiClient';
import RequiredDocument from '../../interface/model/RequiredDocument';
import Response from '../../interface/Response';

export class RequiredDocumentError extends Error {
  statusCode?: number;
  data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

const API_BASE_URL = '/api/requiredDocuments';
const apiClient = getApiClient(process.env.REACT_APP_API_BASE_URL || '');

const handleApiError = (error: unknown, defaultMessage: string): never => {
  const message = error instanceof Error ? error.message : defaultMessage;

  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const detailedMessage = error.response?.data?.message || error.message;
    const data = error.response?.data;

    throw new RequiredDocumentError(
      detailedMessage
        ? `${defaultMessage}: ${detailedMessage}`
        : defaultMessage,
      statusCode,
      data
    );
  }

  throw new RequiredDocumentError(message, 500, {});
};

/**
 * Fetches all required documents from the API
 * @returns Promise containing the response with required document data
 * @throws {RequiredDocumentError} If the request fails
 */
export const getAllRequiredDocuments = async (): Promise<
  AxiosResponse<Response<RequiredDocument[]>>
> => {
  return apiClient
    .get(API_BASE_URL)
    .catch((error) =>
      handleApiError(error, 'Failed to fetch required documents')
    );
};

/**
 * Creates a new required document
 * @param data Required document data to create
 * @returns Promise containing the response with created required document data
 * @throws {RequiredDocumentError} If the request fails
 */
export const createRequiredDocument = async (
  data: RequiredDocument
): Promise<AxiosResponse<RequiredDocument>> => {
  return apiClient
    .post(API_BASE_URL, data)
    .catch((error) =>
      handleApiError(error, 'Failed to create required document')
    );
};
