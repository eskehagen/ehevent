import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Music, Zap, PartyPopper } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnswerFirst } from '../components/AnswerFirst';
import { ContactCta } from '../components/ContactCta';
import { RelatedLinks } from '../components/RelatedLinks';
import { GalleryModal } from '../components/GalleryModal';
import { Picture } from '../components/Picture';
import { EFFECTS_DATA, type Effect } from '../data/effects';
import { useSEO } from '../hooks/useSEO';

/**
 * Løsninger: én samlet side for lyd, lys og special effekter.
 *
 * Den tidligere /special-effekter er flettet ind her, så emnet kun har én
 * URL. Adressen /loesninger er bevaret, fordi den allerede er kendt af
 * Google fra det gamle sitemap.
 */
export const Solutions = () => {
  useSEO('/loesninger');
  const [selected, setSelected] = useState<Effect | null>(null);

  return (
    <div className="service-page">
      <section className="page-head">
        <Breadcrumbs current="Løsninger" />

        <div className="section-label">Løsninger</div>
        <h1 className="page-title">
          Lyd, lys og <em>special effekter</em>
        </h1>

        <AnswerFirst>
          Eske Hagen Events leverer lyd, lys og special effekter til bryllupper, firmafester og
          private fester i hele Øst- og Midtjylland. Lyd- og lysanlægget tilpasses altid lokalets
          størrelse, og special effekter som cold spark, konfetti, CO2, røg, sæbebobler, sne og
          skum leveres i samarbejde med Showgear.dk. Jeg rådgiver om, hvad der kan lade sig gøre i
          jeres lokale — I skal kun sørge for plads og 230V strøm.
        </AnswerFirst>

        <ContactCta variant="inline" />
      </section>

      <section id="services" style={{ paddingTop: '4rem' }}>
        <div className="services-section-wrap">
        <div className="services-grid">
          <Reveal delay={0.1}>
            <div className="service-card" data-ghost="01">
              <div className="service-icon-wrap"><Music className="service-icon" /></div>
              <div className="service-eyebrow">01</div>
              <h2 className="service-title">DJ &amp; Musik</h2>
              <div className="service-divider" />
              <p className="service-desc">Jeg spiller til alle typer fester, med speciale i bryllupper, firma- og voksenfester. Jeg tilpasser altid musikken til stemningen og jeres ønsker. 
              <br /> <br />
              Lyd er ikke bare volumen. Det handler om klarhed og balance. Jeg medbringer altid udstyr fra anerkendte mærker, der sikrer at både taler kan høres tydeligt, og at dansegulvet har det rigtige tryk uden at det bliver ubehageligt.</p>
              <div className="mt-6">
                <p className="text-gold-ink text-sm uppercase tracking-wider mb-3">Hvad er inkluderet:</p>
                <ul className="service-list">
                  <li>Professionelt lyd- og lysanlæg (tilpasset lokalestørrelse)</li>
                  <li>Musikgenre tilpasset jeres gæster og ønsker</li>
                  <li>Personligt planlægningsmøde før eventet</li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="service-card" data-ghost="02">
              <div className="service-icon-wrap"><PartyPopper className="service-icon" /></div>
              <div className="service-eyebrow">02</div>
              <h2 className="service-title">Special Effekter</h2>
              <div className="service-divider" />
              <p className="service-desc">Drømmer du om noget ekstraordinært til dit event. Jeg tilbyder næsten alle former for special effekter og konfetti løsninger.
              <br /> <br />
              I samarbejde med <a href="https://www.showgear.dk" target="_blank" rel="noopener noreferrer" className="showgear-link">Showgear.dk</a> tilbyder jeg markedets bedste og største udvalg af special effekter og maskiner. Alt fra konfetti til indendørs fyrværkeri. Alt sammen til fordelagtige priser. Jeg rådgiver altid om bedste løsninger specifikt til dit event.</p>
              <div className="mt-6">
                <p className="text-gold-ink text-sm uppercase tracking-wider mb-3">I samarbejde med <a href="https://www.showgear.dk" target="_blank" rel="noopener noreferrer" className="showgear-link">Showgear.dk</a>:</p>
                <ul className="service-list">
                  <li>Konfetti</li>
                  <li>Røg og CO2</li>
                  <li>Gnister / indendørs fyrværkeri</li>
                  <li>Sæbebobler</li>
                  <li>Sne og Skum</li>
                  <li>Rådgivning om teknisk setup</li>
                </ul>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="service-card" data-ghost="03">
              <div className="service-icon-wrap"><Zap className="service-icon" /></div>
              <div className="service-eyebrow">03</div>
              <h2 className="service-title">Lysopsætning</h2>
              <div className="service-divider" />
              <p className="service-desc">Professionel lysopsætning og -afvikling der forvandler et hvilket som helst rum. Fra ambient lys til fuldt showlys med bevægende effekter.
              <br /> <br />
              Med mange års erfaring med lyssætning og -design finder jeg altid den bedste og flotteste opsætning for dit event.</p>
              <div className="mt-6">
                <p className="text-gold-ink text-sm uppercase tracking-wider mb-3">Muligheder:</p>
                <ul className="service-list">
                  <li>Bevægeligt lys</li>
                  <li>Spotlights</li>
                  <li>Advanceret computerstyring for perfekt timing</li>
                  <li>Alt fra scene- og koncert- til diskotek setups</li>
                  <li>Professionel opsætning</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <h2 className="subsection-title">
            Hvad en <em>gnistmaskine</em> er
          </h2>
          <div className="prose">
            <p>
              Cold spark — også kaldet gnistmaskine eller indendørs fyrværkeri — efterligner
              effekten af en fyrværkerifontæne, men <strong>uden at udlede ild, røg, lugt eller
              høje brag</strong>. I stedet sendes kolde gnister op i luften som en kæmpe
              stjernekaster.
            </p>
            <p>
              Fordi der ikke er brandfare, kan den bruges både indendørs og udendørs. Derfor egner
              den sig godt til brudevalsen: man får det visuelle løft fra fyrværkeri i et lokale,
              hvor rigtigt fyrværkeri aldrig ville være en mulighed.{' '}
              <Link to="/dj-til-bryllup">Læs mere om DJ til bryllup</Link>.
            </p>
          </div>
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <div className="section-label">Katalog</div>
          <h2 className="subsection-title">
            Alle <em>special effekter</em>
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
            tilbyder jeg markedets bedste og største udvalg af special effekter og maskiner — alt
            fra konfetti til indendørs fyrværkeri.
          </p>
          <div className="mt-8 mb-4 showgear-logo-wrap">
            <a
              href="https://www.showgear.dk"
              target="_blank"
              rel="noopener noreferrer"
              style={{ position: 'relative', display: 'block' }}
            >
              <div className="showgear-eyebrow">I samarbejde med</div>
              <img
                src="/images/showgear-logo.jpg"
                alt="Showgear.dk – leverandør af special effekter"
                width={1600}
                height={931}
                loading="lazy"
                decoding="async"
                style={{ height: '120px', width: 'auto', display: 'block' }}
              />
            </a>
          </div>
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
              <strong>Brudevals:</strong> cold spark eller sæbebobler — begge kan bruges
              indendørs
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
              <strong>Hen over aftenen:</strong> røg, der får lyseffekterne til at træde frem i
              luften
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
              Alle konfettirør er BAM-testede, brandhæmmende og udviklet til professionel brug.
              Konfettien fås i papir, metal-look og biologisk nedbrydelig biofetti, så der kan
              vælges en variant, der passer til stedets regler for oprydning. Skummet er
              allergivenligt, og holi powder er biologisk nedbrydeligt og sikkert for huden.
            </p>
            <p>
              Om en given effekt kan bruges, afhænger altid af lokalet — især ventilation og
              røgalarmer. Derfor rådgiver jeg altid ud fra det konkrete lokale. Kan røg ikke
              bruges, findes der næsten altid en anden effekt, der giver samme løft.
            </p>
            {/* TODO ESKE: har du faste krav til loftshøjde eller sikkerhedsafstand ved
                cold spark? Det spørger både brudepar og venues om, og tallet findes
                ikke i koden, så det er udeladt frem for gættet. */}
          </div>
        </Reveal>
      </section>

      <section style={{ paddingTop: '2rem' }}>
        <ContactCta
          heading="Skal vi finde det rigtige setup?"
          text="Fortæl om lokalet og hvilke øjeblikke der skal løftes, så rådgiver jeg om, hvad der kan lade sig gøre."
        />

        <RelatedLinks
          links={[
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
              to: '/dj-til-fodselsdag',
              title: 'DJ til privatfest',
              desc: 'Runde fødselsdage, jubilæer og andre private fester.',
            },
            {
              to: '/galleri',
              title: 'Galleri',
              desc: 'Se setups og effekter fra rigtige events.',
            },
          ]}
        />
      </section>
    </div>
  );
};
