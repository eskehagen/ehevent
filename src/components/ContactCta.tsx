import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { BUSINESS } from '../seo/site';

/**
 * Kontakt-CTA.
 *
 * variant="inline" (øverst på siden): kun knappen "Få et tilbud". Telefon og
 * mail står bevidst ikke her, så toppen holdes ren.
 *
 * variant="block" (nederst på siden): overskrift, tekst, telefon, mail og
 * knap. Telefon og mail er rigtige tel:/mailto:-links — det er dem,
 * AI-søgning trækker ud som kontaktinfo. De står desuden i footeren.
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
  if (variant === 'inline') {
    return (
      <div className="cta-inline">
        <Link to="/kontakt" className="btn-primary">
          Få et tilbud
        </Link>
      </div>
    );
  }

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
