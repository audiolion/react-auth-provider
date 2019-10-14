import React from 'react';
import { usePrevious } from './usePrevious';
import { AuthContext } from './AuthContext';

export type AuthProviderProps = {
  defaultAuthenticated?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  defaultAuthenticated = false,
  onLogin,
  onLogout,
  children,
}) => {
  const [authenticated, setAuthenticated] = React.useState(
    defaultAuthenticated
  );

  const previousAuthenticated = usePrevious(authenticated);

  React.useEffect(() => {
    if (!previousAuthenticated && authenticated) {
      onLogin && onLogin();
    }
  }, [previousAuthenticated, authenticated, onLogin]);

  React.useEffect(() => {
    if (previousAuthenticated && !authenticated) {
      onLogout && onLogout();
    }
  }, [previousAuthenticated, authenticated, onLogout]);

  const contextValue = React.useMemo(
    () => ({
      authenticated,
      setAuthenticated,
    }),
    [authenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
