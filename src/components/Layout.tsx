import React from 'react';
import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-bg text-cream font-body font-light">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
};
