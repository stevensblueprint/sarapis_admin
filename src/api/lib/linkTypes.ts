import axios, { AxiosResponse } from 'axios';
import getApiClient from '../apiClient';
import Response from '../../interface/Response';
import { LinkTypeExchange } from '../../interface/model/Exchange';

export class LinkTypeError extends Error {
  statusCode?: number;
  data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

const LINK_TYPES_BASE_URL = '/link_types';

const handleApiError = (error: unknown, defaultMessage: string): never => {
  const message = error instanceof Error ? error.message : defaultMessage;

  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const detailedMessage = error.response?.data?.message || error.message;
    const data = error.response?.data;

    throw new LinkTypeError(
      detailedMessage
        ? `${defaultMessage}: ${detailedMessage}`
        : defaultMessage,
      statusCode,
      data
    );
  }

  throw new LinkTypeError(message, 500, {});
};

const apiClient = getApiClient(process.env.REACT_APP_API_BASE_URL || '');

export const getAllLinkTypes = async (): Promise<
  AxiosResponse<Response<LinkTypeExchange[]>>
> => {
  return apiClient
    .get(LINK_TYPES_BASE_URL)
    .catch((error) => handleApiError(error, 'Failed to fetch link types'));
};
