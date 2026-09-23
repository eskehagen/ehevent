import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnswerFirst } from '../components/AnswerFirst';
import { ContactCta } from '../components/ContactCta';
import { FaqCategory } from '../components/FaqCategory';
import { RelatedLinks } from '../components/RelatedLinks';
import { FAQ } from '../data/faq';
import { CONTENT_UPDATED } from '../seo/pages';
import { formatDanishMonthYear } from '../seo/site';
import { useSEO } from '../hooks/useSEO';

/**
 * Den samlede FAQ. Alle spørgsmål ligger i src/data/faq.ts og udvides dér —
 * siden, indholdsfortegnelsen og de strukturerede data følger automatisk med.
 */
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
          Her er svar på de spørgsmål, jeg oftest får: hvordan man booker, hvordan betaling og
          aflysning fungerer, hvordan musikken planlægges, hvad I selv skal sørge for, og hvordan
          special effekter som cold spark og konfetti fungerer. Står svaret ikke her, så send en besked eller ring, så finder vi ud af det sammen.
        </AnswerFirst>

        <ContactCta variant="inline" />

        {/* Genveje til kategorierne. Siden bliver lang, efterhånden som der
            kommer flere spørgsmål til. */}
        <nav className="faq-toc" aria-label="Kategorier">
          {FAQ.map((c) => (
            <a key={c.id} href={`#${c.id}`}>
              {c.title}
            </a>
          ))}
        </nav>

        <p className="updated-stamp">Senest opdateret: {formatDanishMonthYear(CONTENT_UPDATED)}</p>
      </section>

      <section className="faq-section">
        {FAQ.map((c) => (
          <FaqCategory key={c.id} category={c} />
        ))}
      </section>

      <section style={{ paddingTop: '2rem' }}>
        <ContactCta
          heading="Fandt du ikke svaret?"
          text="Ring, skriv eller send en forespørgsel, så vender jeg tilbage hurtigst muligt."
        />

        <RelatedLinks
          links={[
            {
              to: '/dj-til-bryllup',
              title: 'DJ til bryllup',
              desc: 'Hvad der er inkluderet, og brudevals med cold spark.',
            },
            {
              to: '/dj-til-firmafest',
              title: 'DJ til firmafest',
              desc: 'Julefrokost, sommerfest og faktura til virksomheden.',
            },
            {
              to: '/loesninger',
              title: 'Løsninger',
              desc: 'Lyd, lys og special effekter som cold spark, konfetti og røg.',
            },
            {
              to: '/handelsbetingelser',
              title: 'Handelsbetingelser',
              desc: 'De fulde vilkår for booking, betaling og aflysning.',
            },
          ]}
        />
      </section>
    </div>
  );
};
