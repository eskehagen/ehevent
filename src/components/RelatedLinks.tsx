import React from 'react';
import { Link } from 'react-router-dom';

export interface RelatedLink {
  to: string;
  title: string;
  desc: string;
}

/**
 * Interne links mellem ydelsessiderne.
 *
 * Både for brugeren og for crawlerne: uden dem ville de nye sider kun kunne
 * nås fra menuen, og linkværdien fra forsiden ville ikke flyde videre.
 */
export const RelatedLinks = ({ links }: { links: RelatedLink[] }) => (
  <nav className="related-links" aria-labelledby="related-title">
    <h2 id="related-title">Læs også</h2>
    <div className="related-grid">
      {links.map((l) => (
        <Link key={l.to} to={l.to} className="related-card">
          <div className="related-card-title">{l.title}</div>
          <div className="related-card-desc">{l.desc}</div>
        </Link>
      ))}
    </div>
  </nav>
);
