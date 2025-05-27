import axios, { AxiosResponse } from 'axios';
import getApiClient from '../apiClient';
import Response from '../../interface/Response';
import {
  TaxonomyExchange,
  TaxonomyTermExchange,
} from '../../interface/model/Exchange';

export class TaxonomyError extends Error {
  statusCode?: number;
  data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

const TAXONOMY_BASE_URL = '/taxonomies';
const TAXONOMY_TERM_BASE_URL = '/taxonomy_terms';

const handleApiError = (error: unknown, defaultMessage: string): never => {
  const message = error instanceof Error ? error.message : defaultMessage;

  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const detailedMessage = error.response?.data?.message || error.message;
    const data = error.response?.data;

    throw new TaxonomyError(
      detailedMessage
        ? `${defaultMessage}: ${detailedMessage}`
        : defaultMessage,
      statusCode,
      data
    );
  }

  throw new TaxonomyError(message, 500, {});
};

const apiClient = getApiClient(process.env.REACT_APP_API_BASE_URL || '');

export const getAllTaxonomies = async (): Promise<
  AxiosResponse<Response<TaxonomyExchange[]>>
> => {
  return apiClient
    .get(TAXONOMY_BASE_URL)
    .catch((error) => handleApiError(error, 'Failed to fetch taxonomies'));
};

export const getAllTaxonomyTerms = async (): Promise<
  AxiosResponse<Response<TaxonomyTermExchange[]>>
> => {
  return apiClient
    .get(TAXONOMY_TERM_BASE_URL)
    .catch((error) => handleApiError(error, 'Failed to fetch taxonomy terms'));
};
