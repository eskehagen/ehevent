import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

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
 */
const readInitialTheme = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  // Al DOM-påvirkning sker her — ALDRIG inde i en state-updater. React kan
  // køre en updater eagerly, udskudt, eller (i StrictMode) to gange, så
  // sideeffekter derinde giver et attribut der driver fra state.
  // localStorage skrives bevidst IKKE her: det ville persistere temaet
  // allerede ved mount og dermed slå "følg styresystemet" fra efter første
  // sidevisning. Kun et aktivt klik må gemme et valg.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Følg styresystemet — men kun så længe brugeren ikke selv har valgt.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
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
