import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * Pille-switch til temaskift.
 *
 * Månen ligger fast til venstre, solen fast til højre, og den orange kugle
 * glider hen over det AKTIVE ikon. Det ikon der er synligt, er dermed altid
 * det du er på vej hen til.
 */
export const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();
  const reduced = useReducedMotion();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? 'Skift til mørkt tema' : 'Skift til lyst tema'}
      title={isLight ? 'Skift til mørkt tema' : 'Skift til lyst tema'}
      onClick={toggleTheme}
      className={`theme-toggle ${isLight ? 'is-light' : ''} ${className}`.trim()}
    >
      <span className="theme-toggle-icons" aria-hidden="true">
        <Moon size={13} strokeWidth={1.75} />
        <Sun size={13} strokeWidth={1.75} />
      </span>
      <motion.span
        className="theme-toggle-knob"
        layout
        transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 32 }}
        aria-hidden="true"
      />
    </button>
  );
};
