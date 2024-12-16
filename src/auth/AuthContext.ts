import { createContext } from 'react';
import { AuthContextType } from './AuthProvider';
import { CognitoUser } from 'amazon-cognito-identity-js';

export interface State {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: CognitoUser | null;
}

export const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  method: 'cognito',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => { },
});

export const generateSecretHash = async (
  clientId: string,
  clientSecret: string,
  username: string
): Promise<string> => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(clientSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(username + clientId)
  );

  return btoa(String.fromCharCode(...new Uint8Array(signature)));
};