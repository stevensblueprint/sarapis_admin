import { AxiosResponse, AxiosError } from 'axios';
import { RequestParamsI } from '../../interface/Request';

interface OrganizationError extends Error {
  statusCode?: number;
}

/**
 * Fetches all organizations from the API
 * @param request - Authenticated request function
 * @returns Promise resolving to the API response
 * @throws {OrganizationError} When the API request fails
 */
export const getAllOrganizations = async (
  request: ({ method, uri, body }: RequestParamsI) => Promise<AxiosResponse>
): Promise<AxiosResponse> => {
  try {
    const response = await request({
      method: 'GET',
      uri: '/api/organizations',
      body: {},
    });
    return response;
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
