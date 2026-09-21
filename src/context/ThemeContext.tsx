import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'eh-theme';
const THEME_COLOR = { light: '#faf7f4', dark: '#080808' } as const;

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Læser temaet fra det attribut som inline-scriptet i index.html allerede
 * har sat. Vi gætter aldrig her — et gæt der ikke matcher det malede DOM
 * ville give et synligt spring på første render.
 *
 * Under prerendering (Node, intet DOM) findes `document` ikke. Der falder vi
 * tilbage til 'dark', som også er den baggrund index.html maler, så den
 * prerenderede HTML og første klient-render er enige.
 */
const readInitialTheme = (): Theme => {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
};

const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Starter ALTID på 'dark' — samme værdi som prerenderingen brugte.
  // Ellers ville en bruger med lyst styresystem give en hydreringsfejl:
  // serverens HTML sagde mørk, klientens første render sagde lys, og React
  // ville kassere hele det prerenderede DOM. Effekten nedenfor retter state
  // til det faktiske tema umiddelbart efter mount. Selve sidens farver
  // styres af data-theme, som inline-scriptet allerede har sat før paint,
  // så der er intet synligt spring — kun temaknappens stilling.
  const [theme, setTheme] = useState<Theme>('dark');

  // Rækkefølgen af de to effekter nedenfor er betydningsbærende.
  //
  // State starter på 'dark' for hydreringens skyld, men inline-scriptet i
  // index.html kan allerede have malet siden lys. Synkroniseringen skal
  // derfor læse attributten FØR applyTheme-effekten når at overskrive den
  // med startværdien — ellers ville et lyst styresystem blive slået tilbage
  // til mørkt ved hver første sidevisning.
  const skipFirstApply = useRef(true);

  // 1) Læs det tema der faktisk blev malet, og ret state til det.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');

    const painted = readInitialTheme();
    setTheme((current) => (current === painted ? current : painted));

    const handleChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        /* private mode e.l. — behandl som "intet valg" */
      }
      if (stored === 'light' || stored === 'dark') return;
      const next: Theme = e.matches ? 'light' : 'dark';
      applyTheme(next);
      setTheme(next);
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  // 2) Skriv temaet til DOM'en — men først fra og med ANDEN kørsel.
  // Ved mount har inline-scriptet allerede sat det rigtige, og state er
  // stadig startværdien, så en skrivning her ville være forkert.
  //
  // Al DOM-påvirkning sker her — ALDRIG inde i en state-updater. React kan
  // køre en updater eagerly, udskudt, eller (i StrictMode) to gange, så
  // sideeffekter derinde giver et attribut der driver fra state.
  // localStorage skrives bevidst IKKE her: det ville persistere temaet
  // allerede ved mount og dermed slå "følg styresystemet" fra efter første
  // sidevisning. Kun et aktivt klik må gemme et valg.
  useEffect(() => {
    if (skipFirstApply.current) {
      skipFirstApply.current = false;
      return;
    }
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';

    // Blød overgang: midlertidig klasse frem for en permanent global
    // transition, som ville forstyrre de eksisterende hover-animationer.
    const root = document.documentElement;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('theme-transition');
      window.setTimeout(() => root.classList.remove('theme-transition'), 360);
    }

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* valget kan ikke gemmes — temaet virker stadig i denne session */
    }

    setTheme(next);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme skal bruges inde i en <ThemeProvider>');
  return ctx;
};
