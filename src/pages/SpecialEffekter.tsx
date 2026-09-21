import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnswerFirst } from '../components/AnswerFirst';
import { ContactCta } from '../components/ContactCta';
import { FaqSection } from '../components/FaqSection';
import { RelatedLinks } from '../components/RelatedLinks';
import { GalleryModal } from '../components/GalleryModal';
import { Picture } from '../components/Picture';
import { EFFECTS_DATA, type Effect } from '../data/effects';
import { FAQ_EFFEKTER } from '../seo/faqs';
import { useSEO } from '../hooks/useSEO';

export const SpecialEffekter = () => {
  useSEO('/special-effekter');
  const [selected, setSelected] = useState<Effect | null>(null);

  return (
    <div className="service-page">
      <section className="page-head">
        <Breadcrumbs current="Special effekter" />

        <div className="section-label">Special effekter</div>
        <h1 className="page-title">
          Cold spark, konfetti og <em>eventlys</em> til bryllup og fest
        </h1>

        <AnswerFirst>
          Eske Hagen Events leverer special effekter til bryllupper, firmafester og
          private fester i Aarhus og Østjylland: cold spark (indendørs fyrværkeri),
          konfetti, CO2, røg, sæbebobler, sne, skum, knæklys og holi powder. Effekterne
          leveres i samarbejde med Showgear.dk, og jeg står selv for rådgivning,
          opsætning og afvikling, så I kun skal beslutte hvilke øjeblikke der skal løftes.
        </AnswerFirst>

        <ContactCta variant="inline" />
      </section>

      <section style={{ paddingTop: '4rem' }}>
        <Reveal>
          <h2 className="subsection-title">
            Hvad en <em>gnistmaskine</em> er
          </h2>
          <div className="prose">
            <p>
              Cold spark — også kaldet gnistmaskine eller indendørs fyrværkeri — er den
              effekt, jeg oftest bliver spurgt om. Maskinen efterligner effekten af en
              fyrværkerifontæne, men <strong>uden at udlede ild, røg, lugt eller høje
              brag</strong>. I stedet sendes kolde gnister op i luften som en kæmpe
              stjernekaster.
            </p>
            <p>
              Fordi der ikke er brandfare, kan den bruges både indendørs og udendørs. Det
              er derfor, den er blevet standardvalget til brudevalsen: man får det
              visuelle løft fra fyrværkeri i et lokale, hvor rigtigt fyrværkeri aldrig
              ville være en mulighed.{' '}
              <Link to="/dj-til-bryllup">Læs mere om DJ til bryllup</Link>.
            </p>
          </div>
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <div className="section-label">Katalog</div>
          <h2 className="subsection-title">
            Alle <em>effekter</em>
          </h2>
          <p className="prose">
            Klik på en effekt for at se billeder fra tidligere events. I samarbejde med{' '}
            <a
              href="https://www.showgear.dk"
              target="_blank"
              rel="noopener noreferrer"
              className="showgear-link"
            >
              Showgear.dk
            </a>{' '}
            har jeg adgang til markedets største udvalg — alt fra konfetti til indendørs
            fyrværkeri.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {EFFECTS_DATA.map((effect, i) => (
            <Reveal key={effect.title} delay={Math.min(i * 0.07, 0.35)}>
              <button
                type="button"
                className="effect-item-card cursor-pointer group"
                onClick={() => setSelected(effect)}
              >
                <div className="effect-img-wrapper relative">
                  <Picture
                    src={effect.img}
                    alt={effect.alt}
                    priority={i < 3}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs uppercase tracking-widest font-medium bg-black/40 px-4 py-2 backdrop-blur-sm">
                      Se galleri
                    </span>
                  </div>
                </div>
                <div className="effect-info">
                  <h3 className="effect-title">{effect.title}</h3>
                  <p
                    className="text-muted text-sm mt-2"
                    dangerouslySetInnerHTML={{ __html: effect.description }}
                  />
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <GalleryModal
          isOpen={!!selected}
          onClose={() => setSelected(null)}
          title={selected?.title ?? ''}
          images={selected?.gallery ?? []}
          description={selected?.description}
        />
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <h2 className="subsection-title">
            Hvilken effekt passer til <em>hvilket øjeblik</em>?
          </h2>
          <ul className="service-list" style={{ maxWidth: '68ch' }}>
            <li>
              <strong>Brudevals:</strong> cold spark eller sæbebobler — begge virker
              indendørs og forstyrrer ikke musikken
            </li>
            <li>
              <strong>Brudeparrets indgang:</strong> konfetti eller håndholdte konfettirør
            </li>
            <li>
              <strong>Fødselsdagssangen:</strong> konfetti, timet til sidste vers
            </li>
            <li>
              <strong>Åbning af dansegulvet:</strong> CO2-gun eller konfettimaskine
            </li>
            <li>
              <strong>Hen over aftenen:</strong> røg, der får lyseffekterne til at træde
              frem i luften
            </li>
            <li>
              <strong>Sommerfest udendørs:</strong> skum eller holi powder
            </li>
            <li>
              <strong>Julefrokost og vinterfest:</strong> sne
            </li>
          </ul>
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <h2 className="subsection-title">
            Sikkerhed og <em>lokalet</em>
          </h2>
          <div className="prose">
            <p>
              Alle konfettirør er BAM-testede, brandhæmmende og udviklet til professionel
              brug. Konfettien fås i papir, metal-look og biologisk nedbrydelig biofetti,
              så der kan vælges en variant, der passer til stedets regler for oprydning.
              Skummet er allergivenligt, og holi powder er biologisk nedbrydeligt og
              sikkert for huden.
            </p>
            <p>
              Om en given effekt kan bruges, afhænger altid af lokalet — især ventilation
              og røgalarmer. Derfor gennemgår vi lokalet på forhånd, og jeg rådgiver om,
              hvad der konkret kan lade sig gøre det pågældende sted. Kan røg ikke bruges,
              findes der næsten altid en anden effekt, der giver samme løft.
            </p>
            {/* TODO ESKE: har du faste krav til loftshøjde eller sikkerhedsafstand ved
                cold spark? Det spørger både brudepar og venues om, og tallet findes
                ikke i koden, så det er udeladt frem for gættet. */}
          </div>
        </Reveal>
      </section>

      <FaqSection items={FAQ_EFFEKTER} title="Spørgsmål om special effekter" id="faq-effekter" />

      <section style={{ paddingTop: '5rem' }}>
        <ContactCta
          heading="Skal vi sætte jeres fest i scene?"
          text="Fortæl hvilket øjeblik der skal løftes, så rådgiver jeg om hvad der kan lade sig gøre i netop jeres lokale."
        />

        <RelatedLinks
          links={[
            {
              to: '/dj-til-bryllup',
              title: 'DJ til bryllup',
              desc: 'Brudevals, musik og lys som én samlet løsning i hele Østjylland.',
            },
            {
              to: '/dj-til-firmafest',
              title: 'DJ til firmafest',
              desc: 'Julefrokost, sommerfest og jubilæum — med faktura til virksomheden.',
            },
            {
              to: '/loesninger',
              title: 'Lyd, lys og teknik',
              desc: 'Udstyret bag effekterne og hvordan det tilpasses lokalet.',
            },
            {
              to: '/galleri',
              title: 'Galleri',
              desc: 'Billeder fra bryllupper, firmafester og koncerter.',
            },
          ]}
        />
      </section>
    </div>
  );
};
