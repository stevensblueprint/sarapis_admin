import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import getApiClient from '../api/apiClient';
import { RequestParamsI } from '../interface/Request';

const apiClient = getApiClient('https://localhost:8080');

export const useAuthenticatedClient = (): ((
  params: RequestParamsI
) => Promise<AxiosResponse>) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const request = async ({
    method,
    uri,
    body,
  }: RequestParamsI): Promise<AxiosResponse> => {
    if (!isAuthenticated || !user) {
      throw new Error('User is not authenticated');
    }

    return new Promise((resolve, reject) => {
      user.getSession(
        (
          err: Error | null,
          session: { getIdToken: () => { getJwtToken: () => string } }
        ) => {
          if (err) {
            reject(err);
            return;
          }

          const token = session.getIdToken().getJwtToken();
          const config: AxiosRequestConfig = {
            method,
            url: uri,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: body,
          };
          apiClient
            .request(config)
            .then(resolve)
            .catch((error) => {
              switch (error.response.status) {
                case 400:
                  reject(new Error('Bad Request'));
                  break;
                case 401:
                  reject(new Error('Unauthorized'));
                  break;
                case 403:
                  reject(new Error('Forbidden'));
                  break;
                default:
                  reject(error);
              }
            });
        }
      );
    });
  };
  return request;
};
