import axios, { AxiosResponse } from 'axios';
import getApiClient from '../apiClient';
import Response from '../../interface/Response';
import Organization from '../../interface/model/Organization';

export class OrganizationError extends Error {
  statusCode?: number;
  data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

const API_BASE_URL = '/organizations';
const apiClient = getApiClient(process.env.REACT_APP_API_BASE_URL || '');

const handleApiError = (error: unknown, defaultMessage: string): never => {
  const message = error instanceof Error ? error.message : defaultMessage;

  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const detailedMessage = error.response?.data?.message || error.message;
    const data = error.response?.data;

    throw new OrganizationError(
      detailedMessage
        ? `${defaultMessage}: ${detailedMessage}`
        : defaultMessage,
      statusCode,
      data
    );
  }
  throw new OrganizationError(message, 500, {});
};

/**
 * Fetches all organizations from the API
 * @param request - Authenticated request function
 * @returns Promise resolving to the API response
 * @throws {OrganizationError} When the API request fails
 */
export const getAllOrganizations = async (): Promise<
  AxiosResponse<Response<Organization[]>>
> => {
  return apiClient
    .get(API_BASE_URL)
    .catch((error) => handleApiError(error, 'Failed to fetch organizations'));
};

/**
 * Fetches organizations by search query
 * @param query - Search query
 * @returns Promise resolving to the API response
 * @throws {OrganizationError} When the API request fails
 */
export const getTextSearchOrganizations = async (
  query: string
): Promise<AxiosResponse<Organization[]>> => {
  return apiClient
    .get(`${API_BASE_URL}?query=${query}`)
    .catch((error) => handleApiError(error, 'Failed to fetch organizations'));
};

/**
 * Fetches an organization by its ID
 * @param id - Organization ID
 * @returns Promise resolving to the API response
 * @throws {OrganizationError} When the API request fails
 */
export const getOrganizationById = async (
  id: string
): Promise<AxiosResponse<Organization>> => {
  return apiClient
    .get(`${API_BASE_URL}/${id}`)
    .catch((error) => handleApiError(error, 'Failed to fetch organization'));
};
