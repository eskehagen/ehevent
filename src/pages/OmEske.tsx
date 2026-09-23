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
          2004 — over 22 år bag pulten. Han driver EH Events (Eske Hagen Events) og spiller til
          bryllupper, firmafester og private fester i hele Øst- og Midtjylland, hvor musik, lys og
          special effekter leveres som én samlet løsning. Han har desuden arbejdet 1½ år hos
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
                Jeg hedder Eske Hagen Sinding. Jeg er 35 år og bor i Aarhus sammen med min
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
                {BUSINESS.name} (også kaldet {BUSINESS.alternateName})
              </span>
            </li>
            <li>
              <span className="fact-key">Base</span>
              <span className="fact-val">Aarhus</span>
            </li>
            <li>
              <span className="fact-key">Erfaring</span>
              <span className="fact-val">
                DJ siden {BUSINESS.djSince} — over {BUSINESS.yearsExperience} år bag pulten
              </span>
            </li>
            <li>
              <span className="fact-key">Baggrund</span>
              <span className="fact-val">
                Mobildiskotek, derefter fast DJ på etablerede spillesteder i Aarhus og
                Randers. Arbejdede {BUSINESS.martinProfessional}. I dag udelukkende events.
              </span>
            </li>
            <li>
              <span className="fact-key">Eventtyper</span>
              <span className="fact-val">
                Bryllupper, firmafester og julefrokoster, runde fødselsdage, jubilæer,
                studentergilder, havefester, koncerter og revyer
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
                Showgear.dk (special effekter) og PARK 13 – Den Japanske Have (lokation)
              </span>
            </li>
            <li>
              <span className="fact-key">Sådan booker du</span>
              <span className="fact-val">
                Ring på {BUSINESS.phoneDisplay}, skriv til {BUSINESS.email} eller brug{' '}
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
          <h2 className="subsection-title">
            Steder jeg har <em>spillet</em>
          </h2>
          <div className="prose">
            <p>
              Blandt de steder jeg har haft opgaver: Glassalen og Wellness-huset hos{' '}
              <strong>PARK 13 – Den Japanske Have</strong> i Aarhus, Restaurant Anker,
              Restaurant Martino, Sløjfen i Hadsten og Tivoli Friheden i Aarhus — både
              bryllupper, firmajulefrokoster, koncerter og revyer.{' '}
              <Link to="/galleri">Se billederne</Link>.
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
