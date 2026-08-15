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

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="galleri" element={<Gallery />} />
            <Route path="loesninger" element={<Solutions />} />
            <Route path="anmeldelser" element={<Reviews />} />
            <Route path="kontakt" element={<Contact />} />
            <Route path="privatlivspolitik" element={<Privatlivspolitik />} />
            <Route path="handelsbetingelser" element={<Handelsbetingelser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
