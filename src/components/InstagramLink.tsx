import { Instagram } from 'lucide-react';

/* Ét sted at rette profiladressen, så footer, kontaktside og de
   strukturerede data i index.html ikke kan komme til at pege hvert sit sted. */
export const INSTAGRAM_URL = 'https://www.instagram.com/ehevents.dk/';
export const INSTAGRAM_HANDLE = '@ehevents.dk';

type InstagramLinkProps = {
  /** 'chip' = kun ikonet (footeren) · 'labelled' = ikon + handle (kontaktsiden) */
  variant?: 'chip' | 'labelled';
};

export const InstagramLink = ({ variant = 'chip' }: InstagramLinkProps) => (
  <a
    href={INSTAGRAM_URL}
    target="_blank"
    /* rel="me" markerer profilen som sitets egen – noopener/noreferrer af sikkerhed. */
    rel="me noopener noreferrer"
    className={`ig-link ig-link--${variant}`}
    aria-label={`Følg EH Events på Instagram, ${INSTAGRAM_HANDLE} – åbner i nyt vindue`}
  >
    <span className="ig-chip">
      <Instagram size={20} strokeWidth={1.6} aria-hidden="true" />
    </span>
    {variant === 'labelled' && <span className="ig-handle">{INSTAGRAM_HANDLE}</span>}
  </a>
);
