import React, { Suspense } from 'react';
import routes from './router';
import { useRoutes } from 'react-router-dom';
import AppHeader from './components/app-header';
import AppFooter from './components/app-footer';
import AppPlayerBar from './views/player/c-cpns/app-player-bar';
function App() {
  return (
    <div className="App">
      <AppHeader />
      <Suspense fallback="loading...">{useRoutes(routes)}</Suspense>
      <AppFooter />
      <AppPlayerBar />
    </div>
  );
}

export default App;
