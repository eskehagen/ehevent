import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

/** Undermenuen "Fester". Rækkefølgen her er rækkefølgen i menuen. */
const FESTER = [
  { to: '/dj-til-bryllup', label: 'Bryllup' },
  { to: '/dj-til-firmafest', label: 'Firmafest' },
  { to: '/dj-til-fodselsdag', label: 'Privatfest' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [festerOpen, setFesterOpen] = useState(false);
  const festerRef = useRef<HTMLLIElement>(null);
  const festerToggleRef = useRef<HTMLButtonElement>(null);
  // Hvilken slags input der trykkede på knappen: mus, touch eller tastatur.
  const lastPointer = useRef('');
  const location = useLocation();
  const festerActive = FESTER.some((f) => location.pathname === f.to);

  // Luk "Fester" ved klik udenfor eller Escape. Kun aktiv mens den er åben.
  useEffect(() => {
    if (!festerOpen) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (festerRef.current && !festerRef.current.contains(e.target as Node)) setFesterOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setFesterOpen(false);
      // Stod fokus inde i menuen, sendes det tilbage til knappen — ellers
      // ville tastaturbrugeren stå på et link, der lige er blevet skjult.
      if (festerRef.current?.contains(document.activeElement)) festerToggleRef.current?.focus();
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('touchstart', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('touchstart', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [festerOpen]);

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

  const handleHomeClick = (event?: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      event?.preventDefault();
      closeMenu();
      window.scrollTo({ top: 0, behavior: 'auto' });
      window.history.pushState(null, '', '/');
    }
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    closeMenu();
    setFesterOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className={`site-nav ${isScrolled ? 'scrolled' : ''}`} aria-label="Hovedmenu">
        <Link to="/" className="nav-logo" onClick={handleHomeClick} aria-label="EH Events – til forsiden">
          <svg width="44" height="44" viewBox="0 0 100 100" className="inline-block mr-2 align-middle">
            <defs>
              <radialGradient id="navLogoGradient" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
                <stop offset="0%" stopColor="#ff8a4d" />
                <stop offset="100%" stopColor="#E8621A" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="50" fill="url(#navLogoGradient)" />
            {/* EH Monogram */}
            <g fill="white">
              {/* E */}
              <path d="M28 35 H47 V38.5 H31.5 V48 H44 V51 H31.5 V61 H47 V64.5 H28 Z" />
              {/* H */}
              <path d="M52 35 H55.5 V48 H68.5 V35 H72 V64.5 H68.5 V51 H55.5 V64.5 H52 Z" />
            </g>
          </svg>
          <span>Events</span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/" onClick={handleHomeClick}>Forside</Link></li>
          {/* Dropdown: åbner ved hover med mus og ved klik/tryk/Enter. Linkene
              står altid i HTML'en (skjult med CSS), så crawlere kan følge dem. */}
          {/* Hover styres i JS og ikke med CSS :hover. Så kan et klik på et
              underpunkt lukke menuen, selvom musen stadig står over den —
              med CSS-hover blev den hængende åben efter navigationen. */}
          <li
            ref={festerRef}
            className={`nav-dropdown ${festerOpen ? 'open' : ''}`}
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') setFesterOpen(true);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') setFesterOpen(false);
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setFesterOpen(false);
            }}
          >
            <button
              ref={festerToggleRef}
              type="button"
              className={`nav-dropdown-toggle ${festerActive ? 'active' : ''}`}
              aria-expanded={festerOpen}
              aria-controls="menu-fester"
              onPointerDown={(e) => {
                lastPointer.current = e.pointerType;
              }}
              onClick={() => {
                // Med mus er menuen allerede åbnet af hover — et klik skal ikke
                // lukke den igen. Touch og tastatur skifter mellem åben og lukket.
                const viaMouse = lastPointer.current === 'mouse';
                lastPointer.current = '';
                setFesterOpen((o) => (viaMouse ? true : !o));
              }}
            >
              Fester
              <ChevronDown size={14} strokeWidth={2} aria-hidden="true" />
            </button>
            <ul id="menu-fester" className="nav-dropdown-menu">
              {FESTER.map((f) => (
                <li key={f.to}>
                  <Link to={f.to}>{f.label}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li><Link to="/loesninger">Løsninger</Link></li>
          <li><Link to="/galleri">Galleri</Link></li>
          <li><Link to="/anmeldelser">Anmeldelser</Link></li>
          <li><Link to="/kontakt">Kontakt</Link></li>
          <li className="nav-toggle-li"><ThemeToggle /></li>
        </ul>
        <button 
          className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Luk menu' : 'Åbn menu'}
          aria-expanded={isMenuOpen}
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
            <Link to="/" onClick={(event) => { handleHomeClick(event); closeMenu(); }}>Forside</Link>
            {/* På mobil er der ingen hover, så "Fester" vises som en gruppe
                med underpunkterne altid synlige. */}
            <div className="mobile-menu-group" role="group" aria-labelledby="mobil-fester">
              <span id="mobil-fester" className="mobile-menu-group-label">Fester</span>
              {FESTER.map((f) => (
                <Link key={f.to} to={f.to} onClick={closeMenu}>{f.label}</Link>
              ))}
            </div>
            <Link to="/loesninger" onClick={closeMenu}>Løsninger</Link>
            <Link to="/galleri" onClick={closeMenu}>Galleri</Link>
            <Link to="/anmeldelser" onClick={closeMenu}>Anmeldelser</Link>
            <Link to="/kontakt" onClick={closeMenu}>Kontakt</Link>
            <div className="mobile-menu-theme">
              <span className="mobile-menu-theme-label">Tema</span>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
