import React, { Suspense } from 'react';
import routes from './router';
import { useRoutes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Suspense fallback="loading...">{useRoutes(routes)}</Suspense>
    </div>
  );
}

export default App;
