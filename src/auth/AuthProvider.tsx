import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { AuthContext, State, initialState } from './AuthContext';
import { useCallback, useEffect, useReducer, PropsWithChildren } from 'react';
import axios from 'axios';

export const UserPool = new CognitoUserPool({
  UserPoolId: process.env.REACT_APP_USER_POOL_ID || '',
  ClientId: process.env.REACT_APP_CLIENT_ID || '',
});

interface Action {
  type: string;
  payload?: {
    isAuthenticated?: boolean;
    user?: CognitoUser | null;
  };
}

interface UserAttributes {
  [key: string]: string;
}

interface Session {
  getIdToken: () => {
    getJwtToken: () => string;
  };
}

interface GetSessionResult {
  user: CognitoUser;
  session: Session;
  headers: { Authorization: string };
  attributes: UserAttributes;
}

export interface AuthContextType extends State {
  method: 'cognito';
  login: (
    email: string,
    password: string
  ) => Promise<CognitoUserSession | { message: string } | void>;
  logout: () => void;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => void;
}

const handlers: { [key: string]: (state: State, action: Action) => State } = {
  AUTHENTICATE: (state: State, action: Action) => {
    const { isAuthenticated, user } = action.payload!;
    return {
      ...state,
      isAuthenticated: isAuthenticated!,
      isInitialized: true,
      user: user ?? null,
    };
  },
  LOGOUT: (state: State) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUserAttributes = useCallback(
    (currentUser: CognitoUser): Promise<UserAttributes> =>
      new Promise((resolve, reject) => {
        currentUser.getUserAttributes((err, attributes) => {
          if (err) {
            reject(err);
            return;
          }
          const results: UserAttributes = {};
          attributes?.forEach((attribute) => {
            results[attribute.Name] = attribute.Value;
          });
          resolve(results);
        });
      }),
    []
  );

  const getSession = useCallback(
    () =>
      new Promise((resolve, reject) => {
        const user = UserPool.getCurrentUser();
        if (user) {
          user.getSession(async (error: Error | null, session: Session) => {
            if (error) {
              dispatch({
                type: 'AUTHENTICATE',
                payload: { isAuthenticated: false, user: null },
              });
              reject(error);
              return;
            }
            const attributes: UserAttributes = await getUserAttributes(user);
            const token: string = session.getIdToken().getJwtToken();
            axios.defaults.headers.common.Authorization = token;
            localStorage.setItem('token', token);
            dispatch({
              type: 'AUTHENTICATE',
              payload: {
                isAuthenticated: true,
                user,
              },
            });
            resolve({
              user,
              session,
              headers: { Authorization: token },
              attributes,
            } as GetSessionResult);
          });
        } else {
          const storedToken = localStorage.getItem('token');
          if (storedToken) {
            axios.defaults.headers.common.Authorization = storedToken;
          }
          dispatch({
            type: 'AUTHENTICATE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      }),
    [getUserAttributes]
  );

  const initial = useCallback(async () => {
    try {
      await getSession();
    } catch {
      localStorage.removeItem('token');
      dispatch({
        type: 'AUTHENTICATE',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [getSession]);

  useEffect(() => {
    initial();
  }, [initial]);

  const login = useCallback(
    (
      email: string,
      password: string
    ): Promise<CognitoUserSession | { message: string }> =>
      new Promise((resolve, reject) => {
        const user = new CognitoUser({
          Username: email,
          Pool: UserPool,
        });

        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        });

        user.authenticateUser(authDetails, {
          onSuccess: async (data) => {
            await getSession();
            resolve(data as CognitoUserSession);
          },
          onFailure: (err) => {
            localStorage.removeItem('token');
            reject(err);
            return;
          },
          newPasswordRequired: () => {
            resolve({ message: 'newPasswordRequired' });
          },
        });
      }),
    [getSession]
  );

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      localStorage.removeItem('token');
      delete axios.defaults.headers.common.Authorization;
      dispatch({ type: 'LOGOUT' });
    }
  };

  const register = (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    UserPool.signUp(
      email,
      password,
      [
        new CognitoUserAttribute({ Name: 'email', Value: email }),
        new CognitoUserAttribute({
          Name: 'name',
          Value: `${firstName} ${lastName}`,
        }),
      ],
      [],
      (err) => {
        if (err) {
          throw err;
        }
        window.location.href = '/login';
      }
    );
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'cognito',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
