import axios, { AxiosRequestConfig } from 'axios';

const getApiClient = (baseUrl: string) => {
  const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  } satisfies AxiosRequestConfig);
  return apiClient;
};

export default getApiClient;
