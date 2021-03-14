import React, { Suspense } from 'react';
import Routes from './Routes';

const App: React.FC = () => (
  <Suspense fallback={<div className="loading" />}>
    <Routes />
  </Suspense>
);

export default App;
