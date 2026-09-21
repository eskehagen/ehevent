import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * Brødkrummer på undersider.
 *
 * Den synlige sti matcher BreadcrumbList-JSON-LD'en i src/seo/pages.ts —
 * begge er to niveauer: Forside → denne side.
 */
export const Breadcrumbs = ({ current }: { current: string }) => (
  <nav aria-label="Brødkrumme" className="breadcrumbs">
    <ol>
      <li>
        <Link to="/">Forside</Link>
      </li>
      <li aria-hidden="true">
        <ChevronRight size={13} strokeWidth={1.8} />
      </li>
      <li>
        <span aria-current="page">{current}</span>
      </li>
    </ol>
  </nav>
);
