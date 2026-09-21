import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Zap, PartyPopper } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ContactCta } from '../components/ContactCta';
import { RelatedLinks } from '../components/RelatedLinks';
import { useSEO } from '../hooks/useSEO';

export const Solutions = () => {
  useSEO('/loesninger');

  return (
    <div className="services-page pt-32 pb-20">
      <section id="services">
        <Breadcrumbs current="Løsninger" />
        <Reveal>
          <div className="section-label">Løsninger</div>
          <h1 className="page-title">Lyd, lys og <em>teknik</em></h1>
          <p className="answer-first">
            Eske Hagen Events medbringer professionelt lyd- og lysudstyr til bryllupper,
            firmafester og private fester i Aarhus og Østjylland. Anlægget tilpasses altid
            lokalets størrelse, og opsætning, afvikling og nedtagning er en del af
            løsningen — I skal kun sørge for plads og 230V strøm.
          </p>
          <ContactCta variant="inline" />
        </Reveal>

        <div className="services-section-wrap mt-16">
        <div className="services-grid">
          <Reveal delay={0.1}>
            <div className="service-card">
              <div className="service-icon-wrap"><Music className="service-icon" /></div>
              <div className="service-eyebrow">01</div>
              <div className="service-title">DJ &amp; Musik</div>
              <div className="service-divider" />
              <p className="service-desc">Jeg spiller til alle typer fester, med speciale i bryllupper, firma- og voksenfester. Jeg tilpasser altid musikken til stemningen og jeres ønsker. 
              <br /> <br />
              Lyd er ikke bare volumen. Det handler om klarhed og balance. Jeg medbringer altid udstyr fra anerkendte mærker, der sikrer at både taler kan høres tydeligt, og at dansegulvet har det rigtige tryk uden at det bliver ubehageligt.</p>
              <div className="mt-6">
                <h4 className="text-gold-ink text-sm uppercase tracking-wider mb-3">Hvad er inkluderet:</h4>
                <ul className="service-list">
                  <li>Professionelt lyd- og lysanlæg (tilpasset lokalestørrelse)</li>
                  <li>Musikgenre tilpasset jeres gæster og ønsker</li>
                  <li>Personligt planlægningsmøde før eventet</li>
                </ul>
              </div>
              <span className="service-num">01</span>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="service-card">
              <div className="service-icon-wrap"><PartyPopper className="service-icon" /></div>
              <div className="service-eyebrow">02</div>
              <div className="service-title">Special Effekter</div>
              <div className="service-divider" />
              <p className="service-desc">Drømmer du om noget ekstraordinært til dit event. Jeg tilbyder næsten alle former for special effekter og konfetti løsninger.
              <br /> <br />
              I samarbejde med <a href="https://www.showgear.dk" target="_blank" rel="noopener noreferrer" className="showgear-link">Showgear.dk</a> tilbyder jeg markedets bedste og største udvalg af special effekter og maskiner. Alt fra konfetti til indendørs fyrværkeri. Alt sammen til fordelagtige priser. Jeg rådgiver altid om bedste løsninger specifikt til dit event.</p>
              <div className="mt-6">
                <h4 className="text-gold-ink text-sm uppercase tracking-wider mb-3">I samarbejde med <a href="https://www.showgear.dk" target="_blank" rel="noopener noreferrer" className="showgear-link">Showgear.dk</a>:</h4>
                <ul className="service-list">
                  <li>Konfetti</li>
                  <li>Røg og CO2</li>
                  <li>Gnister / indendørs fyrværkeri</li>
                  <li>Sæbebobler</li>
                  <li>Sne og Skum</li>
                  <li>Rådgivning om teknisk setup</li>
                </ul>
              </div>
              <span className="service-num">02</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="service-card">
              <div className="service-icon-wrap"><Zap className="service-icon" /></div>
              <div className="service-eyebrow">03</div>
              <div className="service-title">Lysopsætning</div>
              <div className="service-divider" />
              <p className="service-desc">Professionel lysopsætning og -afvikling der forvandler et hvilket som helst rum. Fra ambient lys til fuldt showlys med bevægende effekter.
              <br /> <br />
              Med mange års erfaring med lyssætning og -design finder jeg altid den bedste og flotteste opsætning for dit event.</p>
              <div className="mt-6">
                <h4 className="text-gold-ink text-sm uppercase tracking-wider mb-3">Muligheder:</h4>
                <ul className="service-list">
                  <li>Bevægeligt lys</li>
                  <li>Spotlights</li>
                  <li>Advanceret computerstyring for perfekt timing</li>
                  <li>Alt fra scene- og koncert- til diskotek setups</li>
                  <li>Professionel opsætning</li>
                </ul>
              </div>
              <span className="service-num">03</span>
            </div>
          </Reveal>
        </div>
        </div>

        <div className="mt-32">
          <Reveal>
            <div className="section-label">Ekspertise</div>
            <h2 className="subsection-title">Special <em>Effekter</em></h2>
            <p className="prose">
              Ud over lyd og lys leverer jeg special effekter til alle typer events. I
              samarbejde med{' '}
              <a href="https://www.showgear.dk" target="_blank" rel="noopener noreferrer" className="showgear-link">
                Showgear.dk
              </a>{' '}
              har jeg adgang til markedets største udvalg — alt fra konfetti til indendørs
              fyrværkeri. Jeg rådgiver om hvad der kan lade sig gøre i jeres lokale og står
              selv for opsætning og afvikling.
            </p>
            <div className="mt-8 mb-12 showgear-logo-wrap">
              <a href="https://www.showgear.dk" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', display: 'block' }}>
                <div className="showgear-eyebrow">I samarbejde med</div>
                <img
                  src="/images/showgear-logo.jpg"
                  alt="Showgear.dk – leverandør af special effekter"
                  width={2824}
                  height={1644}
                  loading="lazy"
                  decoding="async"
                  style={{ height: '120px', width: 'auto', display: 'block' }}
                />
              </a>
            </div>
            <p className="prose">
              <Link to="/special-effekter">Se hele kataloget over special effekter</Link> —
              cold spark, konfetti, CO2, røg, sæbebobler, sne, skum, knæklys og holi powder.
            </p>
          </Reveal>

          <ContactCta
            heading="Skal vi finde det rigtige setup?"
            text="Fortæl om lokalet og antallet af gæster, så rådgiver jeg om hvilken opsætning der passer."
          />

          <RelatedLinks
            links={[
              { to: '/special-effekter', title: 'Special effekter', desc: 'Hele kataloget med billeder fra tidligere events.' },
              { to: '/dj-til-bryllup', title: 'DJ til bryllup', desc: 'Brudevals, musik og lys som én samlet løsning.' },
              { to: '/dj-til-firmafest', title: 'DJ til firmafest', desc: 'Julefrokost, sommerfest og jubilæum.' },
              { to: '/galleri', title: 'Galleri', desc: 'Se setups fra rigtige events.' },
            ]}
          />
        </div>

      </section>
    </div>
  );
};
