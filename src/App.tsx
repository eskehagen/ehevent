/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { Solutions } from './pages/Solutions';
import { Reviews } from './pages/Reviews';
import { Contact } from './pages/Contact';
import { Privatlivspolitik } from './pages/Privatlivspolitik';
import { Handelsbetingelser } from './pages/Handelsbetingelser';
import { Bryllup } from './pages/Bryllup';
import { Firmafest } from './pages/Firmafest';
import { Foedselsdag } from './pages/Foedselsdag';
import { SpecialEffekter } from './pages/SpecialEffekter';
import { OmEske } from './pages/OmEske';
import { Faq } from './pages/Faq';
import { NotFound } from './pages/NotFound';

/**
 * Rutetræet uden router omkring sig.
 *
 * Det er trukket ud, fordi prerenderingen (scripts/prerender.mjs) skal kunne
 * montere præcis samme træ i en StaticRouter i Node, mens browseren bruger
 * BrowserRouter nedenfor. Ét rutetræ — to indgange.
 */
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="dj-til-bryllup" element={<Bryllup />} />
      <Route path="dj-til-firmafest" element={<Firmafest />} />
      <Route path="dj-til-fodselsdag" element={<Foedselsdag />} />
      <Route path="special-effekter" element={<SpecialEffekter />} />
      <Route path="loesninger" element={<Solutions />} />
      <Route path="om-eske" element={<OmEske />} />
      <Route path="faq" element={<Faq />} />
      <Route path="galleri" element={<Gallery />} />
      <Route path="anmeldelser" element={<Reviews />} />
      <Route path="kontakt" element={<Contact />} />
      <Route path="privatlivspolitik" element={<Privatlivspolitik />} />
      <Route path="handelsbetingelser" element={<Handelsbetingelser />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
