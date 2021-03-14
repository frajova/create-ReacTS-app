import React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';

import AuthHelper, { UserAuth } from '../helpers/AuthHelper';
import { ProfileType } from '../constants/views';

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
      const { activeProfile }: UserAuth = AuthHelper.getUserAuth();
      const forbidden: boolean =
        activeProfile === (ProfileType.NOT_PROFILE) || !activeProfile;

      if (forbidden) {
        return <Redirect to={{ pathname: '/forbidden', state: { from: props.location } }} />;
      }

      return <Component {...props} />;
    }

    return (
      <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />
    );
  };

  return <Route {...rest} render={renderRoute} />;
};

export default ProtectedRoute;
