import { AxiosResponse, AxiosError } from 'axios';
import getApiClient from '../apiClient';

interface OrganizationError extends Error {
  statusCode?: number;
}

const apiClient = getApiClient('http://localhost:8080');

/**
 * Fetches all organizations from the API
 * @param request - Authenticated request function
 * @returns Promise resolving to the API response
 * @throws {OrganizationError} When the API request fails
 */
export const getAllOrganizations = async (): Promise<AxiosResponse> => {
  try {
    return await apiClient.get('/api/organizations');
  } catch (error) {
    const organizationError: OrganizationError = new Error(
      (error as Error).message || 'Failed to fetch organizations'
    );

    if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError;
      organizationError.statusCode = axiosError.response?.status;
    }
    throw organizationError;
  }
};
