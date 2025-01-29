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
  register: () => Promise.resolve(),
  confirmRegistrationAndLogin: () => Promise.resolve(),
});
