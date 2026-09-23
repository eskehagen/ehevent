import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;

/**
 * Sitet prerenderes til færdig HTML pr. rute (scripts/prerender.mjs).
 * Er indholdet der allerede, hydrerer vi det frem for at smide det væk og
 * tegne forfra — ellers ville den prerenderede HTML kun gavne crawlere og
 * ikke brugerne, og der ville komme et synligt glimt ved indlæsning.
 *
 * Fallback til createRoot dækker tilfældet hvor #root er tom (fx hvis en
 * rute mod forventning ikke blev prerenderet).
 */
if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
