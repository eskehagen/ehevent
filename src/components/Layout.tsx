import React from 'react';
import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-bg text-cream font-body font-light">
      {/* Springlink: tastaturbrugere skulle ellers gennem hele menuen på
          hver eneste sidevisning, før de nåede indholdet. */}
      <a href="#indhold" className="skip-link">
        Spring til indhold
      </a>
      <Navbar />
      <main id="indhold">
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
};
