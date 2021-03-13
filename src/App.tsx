import React, { Suspense } from 'react';
import Routes from './Routes';

const App: React.FC = () => (
  <div className="h-100" data-test="appComponent">
    <Suspense fallback={<div className="loading" />}>
      <Routes />
    </Suspense>
  </div>
);

export default App;
