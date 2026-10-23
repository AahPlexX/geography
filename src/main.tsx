import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { LandingPage } from './components/LandingPage';
import { StandaloneMapPage } from './components/StandaloneMapPage';
import { UpdatePrompt } from './components/UpdatePrompt';
import { ExplorerPage } from './explorer/ExplorerPage';
import { resolveAppRoute } from './lib/app-route';
import './styles.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element.');

const route = resolveAppRoute(window.location.pathname, import.meta.env.BASE_URL);
const page = route === 'exam'
  ? <App defaultView="quiz" />
  : route === 'map'
    ? <StandaloneMapPage />
    : route === 'explore'
      ? <ExplorerPage />
      : <LandingPage />;

createRoot(root).render(
  <StrictMode>
    {page}
    <UpdatePrompt />
  </StrictMode>,
);
