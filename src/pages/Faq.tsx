import React from 'react';
import { Reveal } from '../components/Reveal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnswerFirst } from '../components/AnswerFirst';
import { ContactCta } from '../components/ContactCta';
import { FaqSection } from '../components/FaqSection';
import { RelatedLinks } from '../components/RelatedLinks';
import { FAQ_BRYLLUP, FAQ_EFFEKTER, FAQ_FIRMAFEST, FAQ_GENEREL } from '../seo/faqs';
import { CONTENT_UPDATED } from '../seo/pages';
import { formatDanishMonthYear } from '../seo/site';
import { useSEO } from '../hooks/useSEO';

export const Faq = () => {
  useSEO('/faq');

  return (
    <div className="service-page">
      <section className="page-head">
        <Breadcrumbs current="FAQ" />

        <div className="section-label">Spørgsmål og svar</div>
        <h1 className="page-title">
          Ofte stillede <em>spørgsmål</em>
        </h1>

        <AnswerFirst>
          Her er svar på det, jeg oftest bliver spurgt om: hvad det koster, hvordan man
          booker, hvordan betaling og aflysning fungerer, hvor langt jeg kører, og hvad I
          selv skal sørge for. Står svaret ikke her, så ring på +45 50 93 59 52 — så tager
          vi det over telefonen.
        </AnswerFirst>

        <ContactCta variant="inline" />

        <p className="updated-stamp">
          Senest opdateret: {formatDanishMonthYear(CONTENT_UPDATED)}
        </p>
      </section>

      <FaqSection items={FAQ_GENEREL} title="Booking, betaling og praktik" id="faq-generel" />

      {/* Gentagelserne herunder er bevidste: en side skal kunne stå alene for den,
          der lander direkte på /faq fra en søgning. FAQPage-JSON-LD'en for denne
          side indeholder kun FAQ_GENEREL, så de samme spørgsmål ikke markeres op
          to gange på tværs af sitet. */}
      <section style={{ paddingTop: '5rem', paddingBottom: 0 }}>
        <Reveal>
          <div className="section-label">Bryllup</div>
          <h2 className="subsection-title">
            Spørgsmål om <em>bryllup</em>
          </h2>
        </Reveal>
        <dl className="faq-list">
          {FAQ_BRYLLUP.slice(0, 3).map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i * 0.06, 0.2)}>
              <div className="faq-item">
                <dt className="faq-q">
                  <h3>{item.q}</h3>
                </dt>
                <dd className="faq-a">{item.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      <section style={{ paddingTop: '4rem', paddingBottom: 0 }}>
        <Reveal>
          <div className="section-label">Firmafest</div>
          <h2 className="subsection-title">
            Spørgsmål om <em>firmafest</em>
          </h2>
        </Reveal>
        <dl className="faq-list">
          {FAQ_FIRMAFEST.slice(0, 2).map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i * 0.06, 0.2)}>
              <div className="faq-item">
                <dt className="faq-q">
                  <h3>{item.q}</h3>
                </dt>
                <dd className="faq-a">{item.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      <section style={{ paddingTop: '4rem' }}>
        <Reveal>
          <div className="section-label">Special effekter</div>
          <h2 className="subsection-title">
            Spørgsmål om <em>special effekter</em>
          </h2>
        </Reveal>
        <dl className="faq-list">
          {FAQ_EFFEKTER.slice(0, 2).map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i * 0.06, 0.2)}>
              <div className="faq-item">
                <dt className="faq-q">
                  <h3>{item.q}</h3>
                </dt>
                <dd className="faq-a">{item.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <ContactCta
          heading="Fandt du ikke svaret?"
          text="Ring, skriv eller send en forespørgsel — så vender jeg tilbage hurtigst muligt."
        />

        <RelatedLinks
          links={[
            {
              to: '/dj-til-bryllup',
              title: 'DJ til bryllup',
              desc: 'Forløb, hvad der er inkluderet og brudevals med cold spark.',
            },
            {
              to: '/dj-til-firmafest',
              title: 'DJ til firmafest',
              desc: 'Julefrokost, sommerfest og faktura til virksomheden.',
            },
            {
              to: '/special-effekter',
              title: 'Special effekter',
              desc: 'Cold spark, konfetti, røg, bobler, sne og skum.',
            },
            {
              to: '/handelsbetingelser',
              title: 'Handelsbetingelser',
              desc: 'De fulde vilkår for tilbud, betaling og aflysning.',
            },
          ]}
        />
      </section>
    </div>
  );
};
