import React, { Suspense } from 'react';
import {
  Switch,
  Route,
  RouteComponentProps,
  Redirect,
  RouteProps,
} from 'react-router-dom';

interface ErrorComponentProps {
  view: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ view }) => (
  <div>
    {view} error
  </div>
);

type RenderComponent = (view: string) => (props: RouteProps) => React.ReactNode;

const renderComponent: RenderComponent =
  (view: string) => (props: RouteProps) => <ErrorComponent view={view} {...props} />;

const Error: React.FC<RouteComponentProps> = ({ match }: RouteComponentProps) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact={true} from={`${match.url}`} to={`${match.url}`} />
      <Route path={`${match.url}/dashboard`} render={renderComponent('dashboard')} />
      <Route path={`${match.url}/users`} render={renderComponent('users')} />
      <Route path={`${match.url}/organizations`} render={renderComponent('organizations')} />
      <Route path={`${match.url}/admin`} render={renderComponent('admin')} />
      <Redirect to="/error/admin" />
    </Switch>
  </Suspense>
);

export default Error;
