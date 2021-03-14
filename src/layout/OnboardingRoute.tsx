import React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';

import AuthHelper, { UserAuth } from '../helpers/AuthHelper';

export interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

type RenderRoute = (props: RouteProps) => React.ReactNode;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const renderRoute: RenderRoute = (props: RouteProps) => {
    if (AuthHelper.isLoggedIn()) {
      const userAuth: UserAuth = AuthHelper.getUserAuth();

      if (userAuth.activeProfile && userAuth.signupCompleted !== 'true') {
        return <Component {...props} />;
      }

      if (userAuth.signupCompleted === 'true') {
        return <Redirect to="/app" />;
      }
    }

    return <Redirect to="/admin/login" />;
  };

  return <Route {...rest} render={renderRoute} />;
};

export default ProtectedRoute;
