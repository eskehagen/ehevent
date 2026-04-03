import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer>
      <Link to="/" className="footer-logo">
        <svg width="64" height="64" viewBox="0 0 100 100" className="inline-block mr-3 align-middle">
          <defs>
            <radialGradient id="footerLogoGradient" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
              <stop offset="0%" stopColor="#ff8a4d" />
              <stop offset="100%" stopColor="#E8621A" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill="#0f0e0c" />
          <g opacity="0.2">
            {[46, 44, 42].map(r => (
              <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#1c1a13" strokeWidth="0.5" />
            ))}
          </g>
          <circle cx="50" cy="50" r="38" fill="url(#footerLogoGradient)" />
          
          {/* Vinyl-like subtle rings */}
          <g opacity="0.1">
            {[15, 20, 25, 30, 35].map(r => (
              <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="white" strokeWidth="0.3" />
            ))}
          </g>

          {/* Custom Geometric EH Monogram - Thinner version */}
          <g fill="white">
            {/* E */}
            <path d="M28 35 H47 V38.5 H31.5 V48 H44 V51 H31.5 V61 H47 V64.5 H28 Z" />
            {/* H */}
            <path d="M52 35 H55.5 V48 H68.5 V35 H72 V64.5 H68.5 V51 H55.5 V64.5 H52 Z" />
          </g>
          
          <path d="M30 30 A28 28 0 0 1 70 30" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.15" />
        </svg>
        <span>EH Events</span>
      </Link>
      <div className="footer-copy">2026 Eske Hagen Events - Aarhus</div>
      <div className="footer-showgear"></div>
    </footer>
  );
};
