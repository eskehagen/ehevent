import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnswerFirst } from '../components/AnswerFirst';
import { ContactCta } from '../components/ContactCta';
import { RelatedLinks } from '../components/RelatedLinks';
import { BUSINESS } from '../seo/site';
import { CONTENT_UPDATED } from '../seo/pages';
import { formatDanishMonthYear } from '../seo/site';
import { Picture } from '../components/Picture';
import { useSEO } from '../hooks/useSEO';

interface Venue {
  name: string;
  city: string;
  /** Sættes kun hvor stedet er mere end en enkeltstående opgave. */
  tag?: string;
}

/** Lokationer jeg spiller på i dag — sidens referenceliste. */
const CURRENT_VENUES: Venue[] = [
  { name: 'PARK 13 - Den Japanske Have', city: 'Aarhus', tag: 'Fast samarbejde' },
  { name: 'Restaurant Anker', city: 'Aarhus' },
  { name: 'Restaurant Martino', city: 'Aarhus' },
  { name: 'Sløjfen', city: 'Hadsten' },
  { name: 'Tivoli Friheden', city: 'Aarhus' },
];

/** Årene med mobildiskotek og faste diskoteksaftener. */
const PAST_VENUES: Venue[] = [
  { name: 'Mobildiskotek Black Flash', city: 'Hadsten' },
  { name: 'Diskotek Excalibur', city: 'Randers' },
  { name: 'Diskotek Goggen', city: 'Hadsten' },
  { name: 'Diskotek Hr. Nielsen', city: 'Randers' },
  { name: 'Diskotek Social Club', city: 'Aarhus' },
  { name: 'Diskotek Supreme', city: 'Øster Hurup' },
];

/**
 * E-E-A-T-siden: hvem står bag, og hvorfor kan man stole på det.
 *
 * Fakta-blokken er bevidst i punktform. Det er det format AI-assistenter
 * lettest trækker enkeltudsagn ud af, når nogen spørger "hvem er DJ i Aarhus".
 */
export const OmEske = () => {
  useSEO('/om-eske');

  return (
    <div className="service-page">
      <section className="page-head">
        <Breadcrumbs current="Om Eske" />

        <div className="section-label">Om mig</div>
        <h1 className="page-title">
          Om <em>Eske Hagen</em>
        </h1>

        <AnswerFirst>
          Eske Hagen Sinding er DJ og eventspecialist med base i Aarhus og har været DJ siden
          2004 - over 22 år bag pulten og planlægning af events. Han driver EH Events og spiller til
          bryllupper, firmafester og private fester i hele Øst- og Midtjylland, hvor musik, lys og
          special effekter leveres som én samlet løsning. Han har desuden arbejdet 1,5 år hos
          lysproducenten Martin Professional.
        </AnswerFirst>

        <ContactCta variant="inline" />
      </section>

      <section>
        <div className="about-grid">
          <Reveal>
            <h2 className="subsection-title">
              Musikken har altid <em>drevet mig</em>
            </h2>
            <div className="prose">
              <p>
                Jeg hedder Eske Hagen Sinding. Jeg er 36 år og bor i Aarhus sammen med min
                familie. Musikken har altid været et centralt omdrejningspunkt i mit liv.
              </p>
              <p>
                Min erfaring spænder bredt fra årene med mobildiskotek til fast DJ på
                etablerede spillesteder i Aarhus og Randers. I dag fokuserer jeg
                udelukkende på events, som jeg planlægger i samarbejde med dig.
              </p>
              <p>
                Du får altid en professionel løsning, hvor kompromisløs kvalitet er i
                centrum. Overlad trygt ansvaret til mig og nyd en uforglemmelig tid med
                dine gæster.
              </p>
              <p>
                Jeg sikrer, at generationer mødes på dansegulvet, og at musikken binder
                selskabet sammen. For at skabe den helt rigtige stemning medbringer jeg
                altid et kvalitetsbevidst og stilrent setup af lyd og lys.
              </p>
              <p>
                Det bedste resultat opstår i tæt dialog, og derfor tager jeg altid et
                personligt møde eller en snak med dig om dine forventninger, så vi sammen
                kan skræddersy dit event.
              </p>
            </div>
          </Reveal>

          <div className="about-right">
            <Reveal delay={0.2}>
              <div
                className="mt-10"
                style={{
                  border: '2px solid var(--gold)',
                  boxShadow: '6px 6px 0px var(--gold)',
                  display: 'inline-block',
                  lineHeight: 0,
                }}
              >
                <Picture
                  src="/images/eske1.jpg"
                  alt="Eske Hagen Sinding, DJ og eventspecialist fra Aarhus"
                  style={{ display: 'block', width: '100%', maxWidth: '360px', height: 'auto' }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <div className="section-label">Fakta</div>
          <h2 className="subsection-title">
            Kort <em>fortalt</em>
          </h2>
          <ul className="fact-list">
            <li>
              <span className="fact-key">Navn</span>
              <span className="fact-val">
                {BUSINESS.founder} — {BUSINESS.jobTitle}
              </span>
            </li>
            <li>
              <span className="fact-key">Firma</span>
              <span className="fact-val">
                {BUSINESS.name}
              </span>
            </li>
            <li>
              <span className="fact-key">Base</span>
              <span className="fact-val">Aarhus</span>
            </li>
            <li>
              <span className="fact-key">Erfaring</span>
              <span className="fact-val">
                DJ siden {BUSINESS.djSince} - over {BUSINESS.yearsExperience} år bag pulten
              </span>
            </li>
            <li>
              <span className="fact-key">Baggrund</span>
              <span className="fact-val">
                Mange års mobildiskotek, derefter fast DJ på etablerede spillesteder i Aarhus og
                Randers. Arbejdede {BUSINESS.martinProfessional}. Laver i dag udelukkende events for private og erhverv.
              </span>
            </li>
            <li>
              <span className="fact-key">Eventtyper</span>
              <span className="fact-val">
                Bryllupper, firmafester og julefrokoster, fødselsdage, jubilæer,
                studentergilder, havefester og koncerter
              </span>
            </li>
            <li>
              <span className="fact-key">Dækningsområde</span>
              <span className="fact-val">
                Hele Øst- og Midtjylland
              </span>
            </li>
            <li>
              <span className="fact-key">Leverer</span>
              <span className="fact-val">
                Lyd, lys og special effekter som én samlet løsning, inklusive opsætning og
                afvikling
              </span>
            </li>
            <li>
              <span className="fact-key">Samarbejder med</span>
              <span className="fact-val">
                Showgear.dk (special effekter) og PARK 13 - Den Japanske Have (lokation)
              </span>
            </li>
            <li>
              <span className="fact-key">Sådan booker du</span>
              <span className="fact-val">
                Ring, skriv eller brug{' '}
                <Link to="/kontakt">kontaktformularen</Link>
              </span>
            </li>
          </ul>

          <p className="updated-stamp">
            Senest opdateret: {formatDanishMonthYear(CONTENT_UPDATED)}
          </p>
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <div className="section-label">Spillesteder</div>
          <h2 className="subsection-title">
            Steder jeg har <em>spillet</em>
          </h2>
          <div className="prose">
            <p>
              Fra mobildiskotek og faste diskoteksaftener til de lokationer, jeg kommer
              på i dag — både bryllupper, firmajulefrokoster, koncerter og revyer.
            </p>
          </div>

          <div className="venues">
            <div className="venue-group">
              <div className="venue-group-head">
                <span className="venue-group-label">Her spiller jeg i dag</span>
                <span className="venue-group-rule" />
                <span className="venue-group-count">{CURRENT_VENUES.length} steder</span>
              </div>
              <ul className="venue-grid">
                {CURRENT_VENUES.map((venue) => (
                  <li key={venue.name} className="venue-card">
                    <span className="venue-name">{venue.name}</span>
                    <span className="venue-city">{venue.city}</span>
                    {venue.tag && <span className="venue-tag">{venue.tag}</span>}
                  </li>
                ))}
              </ul>
            </div>

            <div className="venue-group">
              <div className="venue-group-head">
                <span className="venue-group-label">Før i tiden</span>
                <span className="venue-group-rule" />
                <span className="venue-group-count">{PAST_VENUES.length} steder</span>
              </div>
              <ul className="venue-chips">
                {PAST_VENUES.map((venue) => (
                  <li key={venue.name} className="venue-chip">
                    <span className="venue-chip-name">{venue.name}</span>
                    <span className="venue-chip-city">{venue.city}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="prose venues-note">
            <p>
              <Link to="/galleri">Se billederne fra events</Link>.
            </p>
          </div>
        </Reveal>
      </section>

      <section style={{ paddingTop: '2rem' }}>
        <ContactCta
          heading="Skal vi tage en uforpligtende snak?"
          text="Fortæl om dit event, så vender jeg tilbage hurtigst muligt med et tilbud."
        />

        <RelatedLinks
          links={[
            {
              to: '/anmeldelser',
              title: 'Anmeldelser',
              desc: 'Hvad tidligere kunder siger om samarbejdet.',
            },
            {
              to: '/dj-til-bryllup',
              title: 'DJ til bryllup',
              desc: 'Brudevals, musik og lys som én samlet løsning.',
            },
            {
              to: '/dj-til-firmafest',
              title: 'DJ til firmafest',
              desc: 'Julefrokost, sommerfest og jubilæum.',
            },
            {
              to: '/faq',
              title: 'Ofte stillede spørgsmål',
              desc: 'Booking, betaling, aflysning og dækningsområde.',
            },
          ]}
        />
      </section>
    </div>
  );
};
