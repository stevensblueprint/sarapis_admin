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

export class SessionManager {
  private static readonly TOKEN_KEY = 'cognitoTokens';

  static storeSession(session: CognitoUserSession) {
    const tokens = {
      idToken: session.getIdToken().getJwtToken(),
      accessToken: session.getAccessToken().getJwtToken(),
      refreshToken: session.getRefreshToken().getToken(),
    };
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokens));
  }

  static clearSession() {
    localStorage.removeItem(this.TOKEN_KEY);
    delete axios.defaults.headers.common.Authorization;
  }

  static getStoredTokens() {
    const tokenString = localStorage.getItem(this.TOKEN_KEY);
    return tokenString ? JSON.parse(tokenString) : null;
  }

  static isSessionValid(): boolean {
    const tokens = this.getStoredTokens();
    if (!tokens) {
      return false;
    }
    // TODO: Check if the token is expired
    return true;
  }

  static setupAxiosInterceptors() {
    const tokens = this.getStoredTokens();
    if (tokens) {
      axios.defaults.headers.common.Authorization = tokens.idToken;
    }
  }

  static async refreshSession(): Promise<boolean> {
    return new Promise((resolve) => {
      const user = UserPool.getCurrentUser();
      if (!user) {
        this.clearSession();
        resolve(false);
        return;
      }

      user.getSession(
        (err: Error | null, session: CognitoUserSession | null) => {
          if (err || !session) {
            this.clearSession();
            resolve(false);
            return;
          }

          this.storeSession(session);
          resolve(true);
        }
      );
    });
  }
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
    lastName: string,
  ) => Promise<void>;
  confirmRegistrationAndLogin: (
    email: string,
    password: string,
    verificationCode: string
  ) => Promise<CognitoUserSession | { message: string } | void>;
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
              console.error(error);
              SessionManager.clearSession();
              dispatch({
                type: 'AUTHENTICATE',
                payload: { isAuthenticated: false, user: null },
              });
              reject(error);
              return;
            }
            const attributes: UserAttributes = await getUserAttributes(user);
            SessionManager.storeSession(session as CognitoUserSession);
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
              headers: { Authorization: session.getIdToken().getJwtToken() },
              attributes,
            } as GetSessionResult);
          });
        } else {
          const tokens = SessionManager.getStoredTokens();
          if (tokens) {
            SessionManager.setupAxiosInterceptors();
          } else {
            dispatch({
              type: 'AUTHENTICATE',
              payload: {
                isAuthenticated: false,
                user: null,
              },
            });
          }
        }
      }),
    [getUserAttributes]
  );

  const initial = useCallback(async () => {
    if (SessionManager.isSessionValid()) {
      try {
        await getSession();
      } catch {
        SessionManager.clearSession();
      }
    } else {
      const isRefreshed = await SessionManager.refreshSession();
      if (!isRefreshed) {
        dispatch({
          type: 'AUTHENTICATE',
          payload: { isAuthenticated: false, user: null },
        });
      }
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
            SessionManager.storeSession(data as CognitoUserSession);
            await getSession();
            resolve(data as CognitoUserSession);
          },
          onFailure: (err) => {
            SessionManager.clearSession();
            reject(err);
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
      SessionManager.clearSession();
      dispatch({ type: 'LOGOUT' });
    }
  };
  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
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
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  };

  const confirmRegistrationAndLogin = async (
    email: string,
    password: string,
    verificationCode: string
  ): Promise<CognitoUserSession> => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      user.confirmRegistration(verificationCode, true, (err) => {
        if (err) {
          reject(err);
          return;
        }

        // log in user to grant session once email is verified 
        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        });

        user.authenticateUser(authDetails, {
          onSuccess: (session) => {
            SessionManager.storeSession(session);
            dispatch({
              type: 'AUTHENTICATE',
              payload: { isAuthenticated: true, user },
            });
            resolve(session);
          },
          onFailure: (err) => {
            reject(err);
          },
        });
      });
    });
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'cognito',
        login,
        logout,
        register,
        confirmRegistrationAndLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
