/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ExoticComponent } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

const ViewApp: ExoticComponent<any> = React.lazy(() => import('./views/app'));
const ViewError: ExoticComponent<any> = React.lazy(() => import('./views/error'));
const ViewMain: ExoticComponent<any> = React.lazy(() => import('./views'));
const ViewAdmin: ExoticComponent<any> = React.lazy(() => import('./views/admin'));
const ViewForbidden: ExoticComponent<any> = React.lazy(() => import('./views/forbiddenView'));
const ViewOnboarding: ExoticComponent<any> = React.lazy(() => import('./views/onboarding'));

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route
        path="/onboarding"
        component={ViewOnboarding}
      />
      <Route
        path="/app"
        component={ViewApp}
      />
      <Route
        path="/forbidden"
        render={routeProps => <ViewForbidden {...routeProps} />}
      />
      <Route
        path="/admin"
        render={routeProps => <ViewAdmin {...routeProps} />}
      />
      <Route
        path="/error"
        render={routeProps => <ViewError {...routeProps} />}
      />
      <Route
        path="/"
        render={routeProps => <ViewMain {...routeProps} />}
      />
      <Redirect to="/error/admin" />
    </Switch>
  </Router>
);

export default Routes;
