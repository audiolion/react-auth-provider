import React from 'react';

export type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
};

/* istanbul ignore next */
const noop = () => {};

export const AuthContext = React.createContext<IAuthContext>({
  authenticated: false,
  setAuthenticated: noop,
});
