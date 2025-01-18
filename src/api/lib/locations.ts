import axios, { AxiosResponse } from 'axios';
import getApiClient from '../apiClient';
import Response from '../../interface/Response';
import Location from '../../interface/model/Location';

export class LocationError extends Error {
  statusCode?: number;
  data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

const API_BASE_URL = '/api/locations';
const apiClient = getApiClient(process.env.REACT_APP_API_BASE_URL || '');

const handleApiError = (error: unknown, defaultMessage: string): never => {
  const message = error instanceof Error ? error.message : defaultMessage;

  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const detailedMessage = error.response?.data?.message || error.message;
    const data = error.response?.data;

    throw new LocationError(
      detailedMessage
        ? `${defaultMessage}: ${detailedMessage}`
        : defaultMessage,
      statusCode,
      data
    );
  }

  throw new LocationError(message, 500, {});
};

/**
 * Fetches all locations from the API
 * @returns Promise containing the response with location data
 * @throws {LocationError} If the request fails
 */
export const getAllLocations = async (): Promise<
  AxiosResponse<Response<Location[]>>
> => {
  return apiClient
    .get(API_BASE_URL)
    .catch((error) => handleApiError(error, 'Failed to fetch locations'));
};

/**
 * Creates a new location
 * @param data Location data to create
 * @returns Promise containing the response with created location data
 * @throws {LocationError} If the request fails
 */
export const createLocation = async (
  data: Location
): Promise<AxiosResponse<Location>> => {
  return apiClient
    .post(API_BASE_URL, data)
    .catch((error) => handleApiError(error, 'Failed to create location'));
};
