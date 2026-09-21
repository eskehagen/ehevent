import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnswerFirst, ProcessSteps } from '../components/AnswerFirst';
import { ContactCta } from '../components/ContactCta';
import { FaqSection } from '../components/FaqSection';
import { PageReviews } from '../components/PageReviews';
import { RelatedLinks } from '../components/RelatedLinks';
import { FAQ_FODSELSDAG } from '../seo/faqs';
import { useSEO } from '../hooks/useSEO';

export const Foedselsdag = () => {
  useSEO('/dj-til-fodselsdag');

  return (
    <div className="service-page">
      <section className="page-head">
        <Breadcrumbs current="DJ til fødselsdag" />

        <div className="section-label">Fødselsdag og privatfest</div>
        <h1 className="page-title">
          DJ til fødselsdag og <em>privatfest</em>
        </h1>

        <AnswerFirst>
          Eske Hagen Events er en DJ fra Aarhus med over 22 års erfaring, der spiller til
          runde fødselsdage, jubilæer, konfirmationer og private fester i hele Østjylland.
          Lyd, lys og special effekter kommer som én samlet løsning, og musikken vælges, så
          gæster i alle aldre bliver på dansegulvet — ikke kun de yngste.
        </AnswerFirst>

        <ContactCta variant="inline" />
      </section>

      <section>
        <Reveal>
          <h2 className="subsection-title">
            30, 40, 50, 60 år — og <em>alt derimellem</em>
          </h2>
          <div className="prose">
            <p>
              Runde fødselsdage har en helt særlig udfordring: selskabet er sammensat af
              familie, gamle venner, kollegaer og naboer, der sjældent er samlet ellers.
              Gæstelisten spænder fra børnebørn til jævnaldrende, og hvis musikken læner
              sig for hårdt til én generation, deler festen sig i to rum.
            </p>
            <p>
              Derfor er opgaven til en fødselsdag mere at holde selskabet samlet end at
              køre et bestemt sound igennem. Jeg tilpasser musikken løbende hen over
              aftenen og sørger for, at der er noget at danse til for alle — uden at det
              bliver en jukebox.
            </p>
            <p>
              Ud over fødselsdage spiller jeg også til jubilæer, konfirmationer,
              studentergilder og havefester. Jeg har blandt andet spillet til havefester og
              studentergilder i Aarhus-området.
            </p>
          </div>
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <h2 className="subsection-title">
            Hvad der er <em>inkluderet</em>
          </h2>
          <ul className="service-list" style={{ maxWidth: '68ch' }}>
            <li>Professionelt lydanlæg, tilpasset lokalets størrelse</li>
            <li>Lysopsætning — fra stemningslys til fuldt dansegulvslys</li>
            <li>Personlig snak om ønsker og forløb inden festen</li>
            <li>Mikrofon til taler og sange</li>
            <li>Opsætning, afvikling og nedtagning</li>
            <li>Rådgivning om konfetti og andre effekter</li>
          </ul>
          {/* TODO ESKE: hvor mange timers spilletid indgår til en privatfest, og hvad
              koster overtid, hvis festen trækker ud? */}
          <div className="prose" style={{ marginTop: '1.4rem' }}>
            <p>
              Lokalet behøver ikke være stort. Jeg spiller både i forsamlingshuse, lejede
              lokaler, telte og private haver — anlægget skaleres, så et mindre lokale
              ikke bliver overdøvet. Der skal blot være plads til opstilling og adgang til
              230V strøm.
            </p>
          </div>
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <h2 className="subsection-title">
            Konfetti til <em>fødselsdagssangen</em>
          </h2>
          <div className="prose">
            <p>
              Det mest brugte indslag til en fødselsdag er konfetti, timet til sidste vers
              af fødselsdagssangen eller til at åbne dansegulvet. Alle konfettirør er
              BAM-testede, brandhæmmende og udviklet til professionel brug, og konfettien
              fås blandt andet som biologisk nedbrydelig biofetti — praktisk hvis lokalet
              har krav til oprydning.
            </p>
            <p>
              Skal fejringen have et ekstra løft, findes der også cold spark, CO2,
              sæbebobler, sne og skum.{' '}
              <Link to="/special-effekter">Se alle special effekter</Link>.
            </p>
          </div>
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <h2 className="subsection-title">
            Fra forespørgsel til <em>fest</em>
          </h2>
          <ProcessSteps
            steps={[
              {
                title: 'Skriv eller ring',
                body: 'Send dato, sted og hvilken slags fest det er. Jeg svarer hurtigst muligt.',
              },
              {
                title: 'Uforpligtende snak',
                body: 'Vi taler om gæsterne, aftenens forløb og hvad I gerne vil høre — og hvad I helst vil undgå.',
              },
              {
                title: 'Tilbud',
                body: 'I får et samlet tilbud på jeres fest. Tilbuddet er gyldigt i 14 dage, og datoen er reserveret ved skriftlig accept og depositum.',
              },
              {
                title: 'Festen',
                body: 'Jeg stiller op i god tid, lydtjekker og afvikler aftenen fra første sang til sidste gæst.',
              },
            ]}
          />
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <h2 className="subsection-title">
            Hvor jeg <em>spiller</em>
          </h2>
          <p className="prose">
            Jeg har base i Aarhus og kører op til 150 km derfra — det dækker Aarhus,
            Skanderborg, Silkeborg, Randers, Horsens, Hadsten og resten af Østjylland.
            Ligger festen længere væk, er I velkomne til at spørge alligevel.{' '}
            <Link to="/galleri">Se billeder fra tidligere events</Link>.
          </p>
        </Reveal>
      </section>

      <PageReviews match={/fødselsdag/i} title="Anmeldelse fra en fødselsdagsfest" />

      <FaqSection
        items={FAQ_FODSELSDAG}
        title="Spørgsmål om DJ til fødselsdag"
        id="faq-fodselsdag"
      />

      <section style={{ paddingTop: '5rem' }}>
        <ContactCta
          heading="Skal jeg spille til din fødselsdag?"
          text="Send dato og sted, så vender jeg tilbage med et uforpligtende tilbud på din fest."
        />

        <RelatedLinks
          links={[
            {
              to: '/special-effekter',
              title: 'Special effekter',
              desc: 'Konfetti, cold spark og sæbebobler til festens højdepunkter.',
            },
            {
              to: '/dj-til-bryllup',
              title: 'DJ til bryllup',
              desc: 'Brudevals, musik og lys som én samlet løsning.',
            },
            {
              to: '/om-eske',
              title: 'Om Eske',
              desc: '22+ års erfaring som DJ i Aarhus og Østjylland.',
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
