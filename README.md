# React Auth Provider

> Easy to integrate react authentication management through context.

[![codecov](https://codecov.io/gh/audiolion/react-auth-provider/branch/master/graph/badge.svg)](https://codecov.io/gh/audiolion/react-auth-provider) [![CircleCI](https://circleci.com/gh/audiolion/react-auth-provider/tree/master.svg?style=svg)](https://circleci.com/gh/audiolion/react-auth-provider/tree/master)

## Features

- Dead simple to integrate
- Properly memoized authenticated attribute that can be consumed by your app
- Hooks into `onLogin` and `onLogout`

## Install

```shell
$ yarn add @ryanar/react-auth-provider
```

## Usage

Add `AuthProvider` somewhere towards the top of your tree. You likely want to do some routing on login or logout so it should be below your routing context (e.g. react router's `Router` component).

```tsx
// App.tsx
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthProvider } from '@ryanar/react-auth-provider';

function App() {
  const history = useHistory();

  const handleLogin = () => {
    history.push('/');
  };

  const handleLogout = () => {
    history.push('/login');
  };

  return (
    <AuthProvider onLogin={handleLogin} onLogout={handleLogout} defaultAuthenticated={false}>
      <Route path="/login" exact component={Login} />
      <AuthRoute path="/" exact component={Dashboard} />
    </AuthProvider>
  );
}
```

Integrate `setAuthenticated` into your login and logout flow, here is an example of a login flow:

```tsx
// Login.tsx
import React from 'react';
import { AuthContext } from '@ryanar/react-auth-provider';

function Login(props: RouteComponentProps) {
  const { setAuthenticated } = React.useContext(AuthContext);
  return (
    <button type="button" onClick={() => setAuthenticated(true)}>
      Login
    </button>
  );
}
```

Optionally configure a route that checks for authenticated, here is an example using react router:

```tsx
// AuthRoute.tsx
import React from 'react';
import { AuthContext } from '@ryanar/react-auth-provider';

function AuthRoute(props: RouteComponentProps) {
  const { authenticated } = React.useContext(AuthContext);

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  const { component: Component, ...rest } = props;

  return <Component {...rest} />;
}
```
