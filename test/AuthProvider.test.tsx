import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AuthProvider, AuthContext, AuthProviderProps } from '../src';

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

describe('AuthProvider', () => {
  it('defaults to unauthenticated', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId(/authenticated/).textContent).toEqual('false');
  });

  it('accepts defaultAuthenticated', () => {
    const { getByTestId } = render(<App defaultAuthenticated={true} />);
    expect(getByTestId(/authenticated/).textContent).toEqual('true');
  });

  it('updates authenticated through setAuthenticated', async () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(/button/));

    expect(getByTestId(/authenticated/).textContent).toEqual('true');
  });

  it('calls onLogin', () => {
    const onLoginMock = jest.fn();

    const { getByTestId } = render(<App onLogin={onLoginMock} />);

    fireEvent.click(getByTestId(/button/));

    expect(onLoginMock).toHaveBeenCalledTimes(1);
  });

  it('calls onLogout', () => {
    const onLogoutMock = jest.fn();

    const { getByTestId } = render(
      <App defaultAuthenticated={true} onLogout={onLogoutMock} />
    );

    fireEvent.click(getByTestId(/button/));

    expect(onLogoutMock).toHaveBeenCalledTimes(1);
  });
});
