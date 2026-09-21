import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { BUSINESS } from '../seo/site';

/**
 * Kontakt-CTA. Bruges både øverst (variant="inline") og nederst
 * (variant="block") på hver ydelsesside, så der altid er en vej videre
 * uanset hvor langt man har læst.
 *
 * Telefon og mail står som rigtige tel:/mailto:-links, ikke som billeder
 * eller JS-handlere — det er dem AI-søgning trækker ud som kontaktinfo.
 */
export const ContactCta = ({
  variant = 'block',
  heading = 'Skal jeg spille til jeres fest?',
  text,
}: {
  variant?: 'inline' | 'block';
  heading?: string;
  text?: string;
}) => {
  const links = (
    <div className="cta-contact-links">
      <a href={`tel:${BUSINESS.phoneHref}`} className="contact-link">
        <Phone size={18} className="text-gold-ink" aria-hidden="true" />
        {BUSINESS.phoneDisplay}
      </a>
      <a href={`mailto:${BUSINESS.email}`} className="contact-link">
        <Mail size={18} className="text-gold-ink" aria-hidden="true" />
        {BUSINESS.email}
      </a>
    </div>
  );

  if (variant === 'inline') {
    return (
      <div className="cta-inline">
        <Link to="/kontakt" className="btn-primary">
          Få et tilbud
        </Link>
        {links}
      </div>
    );
  }

  return (
    <aside className="cta-block" aria-label="Kontakt">
      <h2 className="cta-title">{heading}</h2>
      {text && <p className="cta-text">{text}</p>}
      {links}
      <Link to="/kontakt" className="btn-primary cta-btn">
        Send en forespørgsel
      </Link>
    </aside>
  );
};
