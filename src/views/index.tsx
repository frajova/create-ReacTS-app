/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Redirect } from 'react-router-dom';

const Main: React.FC<any> = () => (
  <Redirect to="/app" />
);

export default Main;
