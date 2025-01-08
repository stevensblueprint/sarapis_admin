import { AxiosResponse, AxiosError } from 'axios';
import { RequestParamsI } from '../../interface/Request';

interface ServiceError extends Error {
  statusCode?: number;
}

export const getAllServices = async (
  request: ({ method, uri, body }: RequestParamsI) => Promise<AxiosResponse>
): Promise<AxiosResponse> => {
  try {
    const response = await request({
      method: 'GET',
      uri: '/api/services',
      body: {},
    });
    return response;
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
  request: ({ method, uri, body }: RequestParamsI) => Promise<AxiosResponse>,
  query: string
): Promise<AxiosResponse> => {
  try {
    const response = await request({
      method: 'GET',
      uri: `/api/services?query=${query}`,
      body: {},
    });
    return response;
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
