import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AuthContext, AuthProvider, AuthProviderProps } from '../.';

function DisplayAuthenticated() {
  const { authenticated } = React.useContext(AuthContext);
  return <p data-testid="authenticated">{authenticated ? 'true' : 'false'}</p>;
}

function Button() {
  const { authenticated, setAuthenticated } = React.useContext(AuthContext);
  return (
    <button
      data-testid="button"
      type="button"
      onClick={() => setAuthenticated(!authenticated)}
    >
      Toggle Authenticated
    </button>
  );
}

function App({ onLogin, onLogout, defaultAuthenticated }: AuthProviderProps) {
  return (
    <AuthProvider
      onLogin={onLogin}
      onLogout={onLogout}
      defaultAuthenticated={defaultAuthenticated}
    >
      <DisplayAuthenticated />
      <Button />
    </AuthProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
