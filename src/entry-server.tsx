/**
 * Indgang for prerendering.
 *
 * Bygges med `vite build --ssr` til dist-ssr/ og kaldes derefter af
 * scripts/prerender.mjs én gang pr. rute. Output er ren HTML-streng, som
 * scriptet skriver ind i <div id="root"> i den færdige index.html.
 *
 * Bemærk: ingen StrictMode her. StrictMode dobbelt-renderer i udvikling og
 * giver intet under en ren renderToString — men det ville skjule fejl der
 * kun opstår ved præcis én render.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import { AppRoutes } from './App';

export function render(url: string): string {
  return renderToString(
    <ThemeProvider>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </ThemeProvider>,
  );
}
