import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  OPEN_CONSENT_EVENT,
  adsEnabled,
  analyticsEnabled,
  googleTagEnabled,
  initGoogleTag,
  readConsent,
  saveConsent,
  trackPageView,
  type Consent,
} from '../analytics/googleTag';

interface Category {
  key: keyof Consent;
  enabled: boolean;
  label: string;
  /** Formålet som det står i bannerets første lag. */
  purpose: string;
  description: string;
}

const CATEGORIES: Category[] = [
  {
    key: 'statistics',
    enabled: analyticsEnabled,
    label: 'Statistik',
    purpose: 'statistik (Google Analytics)',
    description:
      'Google Analytics viser os, hvilke sider der bliver besøgt, og hvordan folk finder siden, fx via vores annoncer.',
  },
  {
    key: 'marketing',
    enabled: adsEnabled,
    label: 'Markedsføring',
    purpose: 'markedsføring (Google Ads)',
    description:
      'Google Ads måler, om vores annoncer fører til henvendelser, og gør det muligt at vise annoncerne igen til folk, der har besøgt siden.',
  },
];

const categories = CATEGORIES.filter((c) => c.enabled);

const NONE: Consent = { statistics: false, marketing: false };
const ALL: Consent = { statistics: true, marketing: true };

/**
 * Cookiebanner + Googles tags. Se src/analytics/googleTag.ts for baggrunden.
 *
 * Banneret vises først efter mount. Under prerendering findes localStorage
 * ikke, så den udsendte HTML indeholder aldrig banneret — ellers ville en
 * besøgende, der allerede har valgt, se det blinke frem og forsvinde, og
 * første klient-render ville ikke matche den prerenderede HTML.
 *
 * Første lag har "Afvis alle" og "Accepter alle" med samme udseende: et nej
 * skal være lige så let at give som et ja. "Vælg selv" — og linket i
 * footeren — viser et afkrydsningsfelt pr. formål, så man kan sige ja til
 * statistik uden at sige ja til markedsføring, eller omvendt.
 */
export const CookieConsent = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [draft, setDraft] = useState<Consent>(NONE);
  const regionRef = useRef<HTMLDivElement>(null);
  const firstOptionRef = useRef<HTMLInputElement>(null);
  /** Hvor fokus kom fra, når banneret åbnes fra footerens link. */
  const returnFocus = useRef<HTMLElement | null>(null);
  /** Sat af "Vælg selv": knappen forsvinder, så fokus skal flyttes til første valg. */
  const focusOptions = useRef(false);

  useEffect(() => {
    if (!googleTagEnabled) return;
    initGoogleTag();
    if (readConsent() === null) setOpen(true);

    const reopen = () => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setDraft(readConsent() ?? NONE);
      setCustomizing(true);
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

  useEffect(() => {
    if (customizing && focusOptions.current) {
      focusOptions.current = false;
      firstOptionRef.current?.focus();
    }
  }, [customizing]);

  // Komponenten står efter <main> i Layout, så sidens useSEO-effekt har
  // allerede sat den nye title, når denne effekt kører.
  useEffect(() => {
    trackPageView();
  }, [location.pathname]);

  if (!googleTagEnabled || !open) return null;

  const choose = (consent: Consent) => {
    saveConsent(consent);
    setOpen(false);
    setCustomizing(false);
    returnFocus.current?.focus();
    returnFocus.current = null;
  };

  const customize = () => {
    focusOptions.current = true;
    setCustomizing(true);
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
          Vi vil gerne bruge cookies fra Google til{' '}
          {categories.map((c) => c.purpose).join(' og ')}. Intet sendes til Google, før du har
          sagt ja. Du kan altid ændre dit valg under »Cookie-indstillinger« nederst på siden.{' '}
          <Link to="/privatlivspolitik">Læs mere i privatlivspolitikken</Link>.
        </p>
      </div>

      {customizing && (
        <fieldset className="cookie-consent-options">
          <legend className="sr-only">Vælg hvilke cookies du accepterer</legend>
          {categories.map((c, i) => (
            <label key={c.key} className="cookie-consent-option">
              <input
                ref={i === 0 ? firstOptionRef : undefined}
                type="checkbox"
                checked={draft[c.key]}
                onChange={(e) => setDraft({ ...draft, [c.key]: e.target.checked })}
              />
              <span>
                <strong>{c.label}</strong>
                {c.description}
              </span>
            </label>
          ))}
        </fieldset>
      )}

      <div className="cookie-consent-actions">
        {customizing ? (
          <button type="button" className="btn-ghost" onClick={() => choose(draft)}>
            Gem valg
          </button>
        ) : (
          <button type="button" className="btn-ghost" onClick={customize}>
            Vælg selv
          </button>
        )}
        <button type="button" className="btn-ghost" onClick={() => choose(NONE)}>
          Afvis alle
        </button>
        <button type="button" className="btn-ghost" onClick={() => choose(ALL)}>
          Accepter alle
        </button>
      </div>
    </div>
  );
};
