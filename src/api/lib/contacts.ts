import axios, { AxiosResponse } from 'axios';
import getApiClient from '../apiClient';
import Response from '../../interface/Response';
import Contact from '../../interface/model/Contact';

export class ContactError extends Error {
  statusCode?: number;
  data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

const API_BASE_URL = '/api/contacts';
const apiClient = getApiClient(process.env.REACT_APP_API_BASE_URL || '');

const handleApiError = (error: unknown, defaultMessage: string): never => {
  const message = error instanceof Error ? error.message : defaultMessage;

  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const detailedMessage = error.response?.data?.message || error.message;
    const data = error.response?.data;

    throw new ContactError(
      detailedMessage
        ? `${defaultMessage}: ${detailedMessage}`
        : defaultMessage,
      statusCode,
      data
    );
  }

  throw new ContactError(message, 500, {});
};

/**
 * Fetches all contacts from the API
 * @returns Promise containing the response with contact data
 * @throws {ContactError} If the request fails
 */
export const getAllContacts = async (): Promise<
  AxiosResponse<Response<Contact[]>>
> => {
  return apiClient
    .get(API_BASE_URL)
    .catch((error) => handleApiError(error, 'Failed to fetch contacts'));
};

/**
 * Creates a new contact
 * @param data Contact data to create
 * @returns Promise containing the response with created contact data
 * @throws {ContactError} If the request fails
 */
export const createContact = async (
  data: Contact
): Promise<AxiosResponse<Contact>> => {
  return apiClient
    .post(API_BASE_URL, data)
    .catch((error) => handleApiError(error, 'Failed to create contact'));
};
