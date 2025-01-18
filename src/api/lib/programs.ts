import axios, { AxiosResponse } from 'axios';
import getApiClient from '../apiClient';
import Program from '../../interface/model/Program';
import Response from '../../interface/Response';

export class ProgramError extends Error {
  statusCode?: number;
  data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

const API_BASE_URL = '/api/programs';
const apiClient = getApiClient(process.env.REACT_APP_API_BASE_URL || '');

const handleApiError = (error: unknown, defaultMessage: string): never => {
  const message = error instanceof Error ? error.message : defaultMessage;

  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const detailedMessage = error.response?.data?.message || error.message;
    const data = error.response?.data;

    throw new ProgramError(
      detailedMessage
        ? `${defaultMessage}: ${detailedMessage}`
        : defaultMessage,
      statusCode,
      data
    );
  }

  throw new ProgramError(message, 500, {});
};

/**
 * Fetches all programs from the API
 * @returns Promise containing the response with program data
 * @throws {ProgramError} If the request fails
 */
export const getAllPrograms = async (): Promise<
  AxiosResponse<Response<Program[]>>
> => {
  return apiClient
    .get(API_BASE_URL)
    .catch((error) => handleApiError(error, 'Failed to fetch programs'));
};

/**
 * Creates a new program
 * @param data Program data to create
 * @returns Promise containing the response with created program data
 * @throws {ProgramError} If the request fails
 */
export const createProgram = async (
  data: Program
): Promise<AxiosResponse<Program>> => {
  return apiClient
    .post(API_BASE_URL, data)
    .catch((error) => handleApiError(error, 'Failed to create program'));
};

/**
 * Updates an existing program
 * @param id Program ID to update
 * @param data Updated program data
 * @returns Promise containing the response with updated program data
 * @throws {ProgramError} If the request fails
 */
export const updateProgram = (
  id: string,
  data: Partial<Program>
): Promise<AxiosResponse<Program>> => {
  return apiClient
    .put(`${API_BASE_URL}/${id}`, data)
    .catch((error) => handleApiError(error, 'Failed to update program'));
};

/**
 * Deletes a program
 * @param id Program ID to delete
 * @returns Promise containing the response
 * @throws {ProgramError} If the request fails
 */
export const deleteProgram = (id: string): Promise<AxiosResponse> => {
  return apiClient
    .delete(`${API_BASE_URL}/${id}`)
    .catch((error) => handleApiError(error, 'Failed to delete program'));
};
