import { AxiosResponse, AxiosError } from 'axios';
import getApiClient from '../apiClient';

interface ServiceError extends Error {
  statusCode?: number;
}

const apiClient = getApiClient('http://localhost:8080');

export const getAllServices = async (): Promise<AxiosResponse> => {
  try {
    return await apiClient.get('/api/services');
  } catch (error) {
    const serviceError: ServiceError = new Error(
      (error as Error).message || 'Failed to fetch services'
    );

    if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError;
      serviceError.statusCode = axiosError.response?.status;
    }
    throw serviceError;
  }
};

export const getTextSearchServices = async (
  query: string
): Promise<AxiosResponse> => {
  try {
    return await apiClient.get(`/api/services?query=${query}`);
  } catch (error) {
    const serviceError: ServiceError = new Error(
      (error as Error).message || 'Failed to fetch services'
    );
    if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError;
      serviceError.statusCode = axiosError.response?.status;
    }
    throw serviceError;
  }
};
