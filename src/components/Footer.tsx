import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { InstagramLink } from './InstagramLink';
import { BUSINESS } from '../seo/site';

/**
 * Footer med NAP (navn, område, telefon) — identisk på alle sider.
 *
 * NAP-konsistens er det, Google og AI-søgning matcher virksomheden på
 * tværs af hjemmeside, Google Business Profile og bookingportaler. Derfor
 * læses navn, telefon og mail fra src/seo/site.ts og ikke fra hardcodede
 * strenge, der kan nå at drive fra hinanden.
 *
 * Footeren er samtidig sitets fulde linkoversigt: alle sider skal kunne nås
 * herfra, også dem der ikke er plads til i hovedmenuen.
 */
export const Footer = () => {
  const location = useLocation();

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'auto' });
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="footer-logo" onClick={handleHomeClick}>
            <svg width="64" height="64" viewBox="0 0 100 100" className="inline-block mr-3 align-middle" aria-hidden="true">
              <defs>
                <radialGradient id="footerLogoGradient" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
                  <stop offset="0%" stopColor="#ff8a4d" />
                  <stop offset="100%" stopColor="#E8621A" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="48" fill="#0f0e0c" className="f-halo" />
              <g opacity="0.2">
                {[46, 44, 42].map((r) => (
                  <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#1c1a13" strokeWidth="0.5" className="f-halo-ring" />
                ))}
              </g>
              <circle cx="50" cy="50" r="38" fill="url(#footerLogoGradient)" />
              <g opacity="0.1">
                {[15, 20, 25, 30, 35].map((r) => (
                  <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="white" strokeWidth="0.3" />
                ))}
              </g>
              <g fill="white">
                <path d="M28 35 H47 V38.5 H31.5 V48 H44 V51 H31.5 V61 H47 V64.5 H28 Z" />
                <path d="M52 35 H55.5 V48 H68.5 V35 H72 V64.5 H68.5 V51 H55.5 V64.5 H52 Z" />
              </g>
              <path d="M30 30 A28 28 0 0 1 70 30" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.15" />
            </svg>
            <span>{BUSINESS.name}</span>
          </Link>

          {/* NAP — samme strenge som i JSON-LD */}
          <address className="footer-nap">
            <strong>{BUSINESS.name}</strong>
            <span>
              {BUSINESS.city} — DJ i hele {BUSINESS.coverage}
            </span>
            <a href={`tel:${BUSINESS.phoneHref}`}>
              <Phone size={15} aria-hidden="true" />
              {BUSINESS.phoneDisplay}
            </a>
            <a href={`mailto:${BUSINESS.email}`}>
              <Mail size={15} aria-hidden="true" />
              {BUSINESS.email}
            </a>
          </address>

          <div className="footer-social">
            <InstagramLink />
          </div>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <div className="footer-col">
            <h2>Ydelser</h2>
            <ul>
              <li><Link to="/dj-til-bryllup">DJ til bryllup</Link></li>
              <li><Link to="/dj-til-firmafest">DJ til firmafest</Link></li>
              <li><Link to="/dj-til-fodselsdag">DJ til privatfest</Link></li>
              <li><Link to="/loesninger">Løsninger</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h2>Om</h2>
            <ul>
              <li><Link to="/om-eske">Om Eske</Link></li>
              <li><Link to="/anmeldelser">Anmeldelser</Link></li>
              <li><Link to="/galleri">Galleri</Link></li>
              <li><Link to="/faq">Ofte stillede spørgsmål</Link></li>
              <li><Link to="/kontakt">Kontakt og booking</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h2>Juridisk</h2>
            <ul>
              <li><Link to="/handelsbetingelser">Handelsbetingelser</Link></li>
              <li><Link to="/privatlivspolitik">Privatlivspolitik</Link></li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="footer-copy">
        &copy; 2026 {BUSINESS.name} – {BUSINESS.city} &nbsp;|&nbsp; CVR: {BUSINESS.cvr}
      </div>
    </footer>
  );
};
