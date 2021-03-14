/* eslint-disable @typescript-eslint/no-explicit-any */
// tslint:disable: no-any
import React, { Suspense, ExoticComponent } from 'react';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';

import UserLayout from '../../layout/UserLayout';

// webpack chunk names: folder becomes a word and slash becomes a dash
const Login: ExoticComponent<any> = React.lazy(() => import('./login'));
// const ForgotPassword: ExoticComponent<any> = React.lazy(() => import('./forgot'));
// const ResetPassword: ExoticComponent<any> = React.lazy(() => import('./reset'));
// const Register: ExoticComponent<any> = React.lazy(() => import('./register'));
// const Invitation: ExoticComponent<any> = React.lazy(() => import('./invitation'));

interface Props {
  match: {
    url: string;
  };
}

type RenderComponent = (props: RouteProps) => React.ReactNode;

const User: React.FC<Props> = ({ match }) => {
  const renderLogin: RenderComponent = (props: RouteProps) => <Login {...props} />;
  // const renderForgot: RenderComponent = (props: RouteProps) => <ForgotPassword {...props} />;
  // const renderReset: RenderComponent = (props: RouteProps) => <ResetPassword {...props} />;
  // const renderRegister: RenderComponent = (props: RouteProps) => <Register {...props} />;
  // const renderInvitation: RenderComponent = (props: RouteProps) => <Invitation {...props} />;

  return (
    <UserLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          {/* <Redirect exact={true} from={`${match.url}`} to={`${match.url}/login`} />
          <Route
            path={`${match.url}/reset/:token`}
            render={renderReset}
          />
          <Route
            path={`${match.url}/forgot`}
            render={renderForgot}
          />
          <Route
            path={`${match.url}/register`}
            render={renderRegister}
          />
          <Route
            path={`${match.url}/invitation`}
            render={renderInvitation}
          /> */}
          <Route
            path={`${match.url}/login`}
            render={renderLogin}
          />
          <Redirect to="/error/admin" />
        </Switch>
      </Suspense>
    </UserLayout>
  );
};

export default User;
