import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  OPEN_CONSENT_EVENT,
  googleTagEnabled,
  initGoogleTag,
  readConsent,
  saveConsent,
  trackPageView,
  type ConsentChoice,
} from '../analytics/googleTag';

/**
 * Cookiebanner + Google-tag. Se src/analytics/googleTag.ts for baggrunden.
 *
 * Banneret vises først efter mount. Under prerendering findes localStorage
 * ikke, så den udsendte HTML indeholder aldrig banneret — ellers ville en
 * besøgende, der allerede har valgt, se det blinke frem og forsvinde, og
 * første klient-render ville ikke matche den prerenderede HTML.
 *
 * "Afvis" og "Accepter" har bevidst samme udseende: et nej skal være lige så
 * let at give som et ja.
 */
export const CookieConsent = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ConsentChoice | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  /** Hvor fokus kom fra, når banneret åbnes fra footerens link. */
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!googleTagEnabled) return;
    initGoogleTag();
    if (readConsent() === null) setOpen(true);

    const reopen = () => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setCurrent(readConsent());
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // Åbnet fra footeren: flyt fokus hertil, så tastatur- og skærmlæserbrugere
  // lander i banneret frem for at skulle lede efter det.
  useEffect(() => {
    if (open && returnFocus.current) regionRef.current?.focus();
  }, [open]);

  // Komponenten står efter <main> i Layout, så sidens useSEO-effekt har
  // allerede sat den nye title, når denne effekt kører.
  useEffect(() => {
    trackPageView();
  }, [location.pathname]);

  if (!googleTagEnabled || !open) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setOpen(false);
    returnFocus.current?.focus();
    returnFocus.current = null;
  };

  return (
    <div
      ref={regionRef}
      className="cookie-consent"
      role="region"
      aria-labelledby="cookie-consent-title"
      tabIndex={-1}
    >
      <div>
        <h2 id="cookie-consent-title">Må vi bruge cookies?</h2>
        <p>
          Siger du ja, sætter Google cookies, så vi kan se, om vores annoncer på Google fører til
          henvendelser, og vise annoncerne igen til folk, der har besøgt siden. Siger du nej, sendes
          der intet til Google. Du kan altid ændre dit valg under »Cookie-indstillinger« nederst på
          siden. <Link to="/privatlivspolitik">Læs mere i privatlivspolitikken</Link>.
        </p>
        {current && (
          <p className="cookie-consent-current">
            Dit nuværende valg: {current === 'granted' ? 'accepteret' : 'afvist'}.
          </p>
        )}
      </div>
      <div className="cookie-consent-actions">
        <button type="button" className="btn-ghost" onClick={() => choose('denied')}>
          Afvis
        </button>
        <button type="button" className="btn-ghost" onClick={() => choose('granted')}>
          Accepter
        </button>
      </div>
    </div>
  );
};
