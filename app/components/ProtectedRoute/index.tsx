import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import { userIsAuthenticated } from 'security/utils';

interface IProtectedRouteProps extends RouteProps {
  redirectTo?: string;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = (props: IProtectedRouteProps): React.ReactElement => {
  const { redirectTo = '/' } = props;

  const isAuthenticated = userIsAuthenticated();

  if (!isAuthenticated) {
    return <Redirect to={{ pathname: redirectTo }} />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
