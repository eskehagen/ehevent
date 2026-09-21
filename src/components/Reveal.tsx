import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  /**
   * Lader kaldestedet give wrapper-div'en en klasse.
   * Nødvendigt inde i <dl>: dér må et <div> kun indeholde <dt>/<dd>, så
   * Reveal-div'en SKAL selv være gruppen — ikke endnu et lag udenom.
   */
  className?: string;
}

/**
 * Scroll-reveal der er sikker at prerendere.
 *
 * Tidligere satte denne komponent ALTID `initial={{ opacity: 0 }}`. Under
 * prerendering endte det som `style="opacity:0"` i den færdige HTML — altså
 * ville hele sidens tekst ligge usynlig i kilden for enhver crawler der ikke
 * kører JavaScript (og for brugere uden JS). Det er både dårlig
 * tilgængelighed og noget der kan læses som cloaking.
 *
 * Derfor:
 *   · Server og første klient-render: `initial={false}` → ingen inline opacity,
 *     indholdet står synligt i kilden, og hydreringen matcher.
 *   · Efter mount: kun elementer der IKKE allerede er i viewporten får
 *     animationen slået til. Elementer over folden ville ellers blinke ud og
 *     ind igen, og de er alligevel dem der betyder noget for LCP.
 */
export const Reveal = ({ children, delay = 0, className }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Brugere der har bedt om mindre bevægelse får slet ingen indflyvning.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!alreadyVisible) setAnimated(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={animated ? { opacity: 0, y: 30 } : false}
      whileInView={animated ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};
