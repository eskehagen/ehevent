import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    closeMenu();
  }, [location.pathname]);

  return (
    <>
      <nav className={`${isScrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo">
          <svg width="56" height="56" viewBox="0 0 100 100" className="inline-block mr-2 align-middle">
            <defs>
              <radialGradient id="navLogoGradient" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
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
            <circle cx="50" cy="50" r="38" fill="url(#navLogoGradient)" />
            
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
          <span>Event</span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Forside</Link></li>
          <li><Link to="/loesninger">Løsninger</Link></li>
          <li><Link to="/galleri">Galleri</Link></li>
          <li><Link to="/kontakt">Kontakt</Link></li>
        </ul>
        <button 
          className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Link to="/" onClick={closeMenu}>Om mig</Link>
            <Link to="/loesninger" onClick={closeMenu}>Løsninger</Link>
            <Link to="/galleri" onClick={closeMenu}>Galleri</Link>
            <Link to="/kontakt" onClick={closeMenu}>Kontakt</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
