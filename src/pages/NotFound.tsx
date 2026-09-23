import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { BUSINESS } from '../seo/site';
import { RelatedLinks } from '../components/RelatedLinks';
import { useSEO } from '../hooks/useSEO';

export const NotFound = () => {
  useSEO('/404');

  return (
    <div className="service-page">
      <section className="page-head" style={{ paddingBottom: '6rem' }}>
        <div className="section-label">Fejl 404</div>
        <h1 className="page-title">
          Siden findes <em>ikke</em>
        </h1>

        <p className="answer-first">
          Adressen fører ingen steder hen — siden er enten flyttet eller har aldrig
          eksisteret. Herunder er vejene videre, og du er altid velkommen til at ringe
          eller skrive direkte.
        </p>

        <div className="cta-inline">
          <Link to="/" className="btn-primary">
            Til forsiden
          </Link>
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
        </div>

        <RelatedLinks
          links={[
            { to: '/dj-til-bryllup', title: 'DJ til bryllup', desc: 'Bryllupper i hele Øst- og Midtjylland.' },
            { to: '/dj-til-firmafest', title: 'DJ til firmafest', desc: 'Firmafest, julefrokost og sommerfest.' },
            { to: '/dj-til-fodselsdag', title: 'DJ til privatfest', desc: 'Runde fødselsdage og andre private fester.' },
            { to: '/loesninger', title: 'Løsninger', desc: 'Lyd, lys og special effekter.' },
            { to: '/galleri', title: 'Galleri', desc: 'Billeder fra tidligere events.' },
            { to: '/kontakt', title: 'Kontakt', desc: 'Send en forespørgsel og få et tilbud.' },
          ]}
        />
      </section>
    </div>
  );
};
