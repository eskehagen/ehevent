import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnswerFirst, ProcessSteps } from '../components/AnswerFirst';
import { ContactCta } from '../components/ContactCta';
import { FaqSection } from '../components/FaqSection';
import { RelatedLinks } from '../components/RelatedLinks';
import { FAQ_FIRMAFEST } from '../seo/faqs';
import { useSEO } from '../hooks/useSEO';

export const Firmafest = () => {
  useSEO('/dj-til-firmafest');

  return (
    <div className="service-page">
      <section className="page-head">
        <Breadcrumbs current="DJ til firmafest" />

        <div className="section-label">Firmafest</div>
        <h1 className="page-title">
          DJ til firmafest og <em>julefrokost</em>
        </h1>

        <AnswerFirst>
          Eske Hagen Events er en DJ fra Aarhus med over 22 års erfaring, der spiller til
          firmafester, julefrokoster, sommerfester og jubilæer i hele Østjylland. Lyd, lys
          og special effekter leveres som én samlet løsning af én leverandør, og der
          faktureres til virksomheder på CVR 46389344.
        </AnswerFirst>

        <ContactCta variant="inline" />
      </section>

      <section>
        <Reveal>
          <h2 className="subsection-title">
            Hvad der er <em>inkluderet</em>
          </h2>
          <ul className="service-list" style={{ maxWidth: '68ch' }}>
            <li>Professionelt lydanlæg, tilpasset lokalets størrelse</li>
            <li>Lysopsætning fra diskret ambient lys til fuldt showlys</li>
            <li>Planlægningsmøde eller grundig snak inden festen</li>
            <li>Musik tilpasset medarbejderne og aftenens forløb</li>
            <li>Opsætning, afvikling og nedtagning</li>
            <li>Mikrofon til taler og prisoverrækkelser</li>
            <li>Faktura til virksomhed, CVR 46389344</li>
          </ul>
          {/* TODO ESKE: kan I tage imod EAN-fakturering til offentlige kunder? Det
              spørger kommuner og regioner altid om, og det står ikke i koden. */}
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <h2 className="subsection-title">
            Julefrokost, sommerfest og <em>jubilæum</em>
          </h2>
          <div className="prose">
            <p>
              <strong>Julefrokosten</strong> er årets sværeste firmafest at ramme: middagen
              trækker ud, stemningen svinger, og halvdelen af selskabet kender kun hinanden
              fra kontoret. Jeg har blandt andet spillet til firmajulefrokoster i Glassalen
              hos PARK 13 i Aarhus. November og december booker erfaringsmæssigt tidligt,
              så kontakt mig gerne i god tid.
            </p>
            <p>
              <strong>Sommerfesten</strong> er ofte mere afslappet og ligger tit udendørs
              eller i telt. Her fungerer skum og holi powder godt, hvis I vil have et
              indslag, der også involverer gæsterne.
            </p>
            <p>
              <strong>Jubilæer og receptioner</strong> har typisk et program med taler og
              overrækkelser, hvor teknikken skal kunne bære både tale og fest. Mikrofon og
              lyd er sat op, så en tale kan høres tydeligt i hele lokalet — ikke kun på de
              forreste rækker.
            </p>
          </div>
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <h2 className="subsection-title">
            Musik til en <em>blandet medarbejderskare</em>
          </h2>
          <div className="prose">
            <p>
              Til en firmafest er gæstelisten ikke selvvalgt. Aldersspændet går typisk fra
              elever i tyverne til ledelse i tresserne, og musiksmagen følger med. Den
              eneste måde at holde alle på dansegulvet er at læse rummet løbende og skifte
              retning, <em>før</em> gulvet tømmes — ikke at køre en forudbestemt liste
              igennem.
            </p>
            <p>
              Med over 22 års erfaring fra både mobildiskotek, faste spillesteder i Aarhus
              og Randers og hundredvis af events er det den del, der er blevet rutine.
              Resultatet I skal måle mig på er enkelt: hvor mange bliver stående, når
              klokken bliver mange.
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
                title: 'I sender en forespørgsel',
                body: 'Dato, sted, antal gæster og eventtype. Jeg svarer hurtigst muligt og siger til, hvis datoen er optaget.',
              },
              {
                title: 'Uforpligtende snak',
                body: 'Vi afklarer program, taler, tidsplan og hvilket lys og hvilke effekter der giver mening i lokalet.',
              },
              {
                title: 'Tilbud og bekræftelse',
                body: 'I får et samlet tilbud, gyldigt i 14 dage. Datoen er reserveret ved skriftlig accept og modtaget depositum på 25%.',
              },
              {
                title: 'Praktisk afklaring',
                body: 'Særlige ønsker, spillelister og tekniske krav meldes ind senest 14 dage før festen. Restbeløbet betales samtidig.',
              },
              {
                title: 'Festen',
                body: 'Jeg stiller op i god tid, lydtjekker og afvikler aftenen — inklusive taler, effekter og nedtagning.',
              },
            ]}
          />
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <h2 className="subsection-title">
            Hvad I selv skal <em>sørge for</em>
          </h2>
          <div className="prose">
            <p>
              Som kunde skal I sikre tilstrækkelig plads og adgang til opstilling af
              udstyret, adgang til 230V strømforsyning, og at eventlokalet har
              KODA/Gramex-tilladelse, hvis det er et krav for arrangementet. Er festen i
              et lejet lokale, kan stedet som regel oplyse det.
            </p>
            <p>
              Jeg dækker Aarhus, Skanderborg, Silkeborg, Randers, Horsens, Hadsten og
              resten af Østjylland inden for 150 km fra Aarhus.{' '}
              <Link to="/faq">Se flere spørgsmål og svar</Link>.
            </p>
          </div>
        </Reveal>
      </section>

      <FaqSection
        items={FAQ_FIRMAFEST}
        title="Spørgsmål om DJ til firmafest"
        id="faq-firmafest"
      />

      <section style={{ paddingTop: '5rem' }}>
        <ContactCta
          heading="Skal jeg spille til jeres firmafest?"
          text="Send dato, sted og antal gæster, så vender jeg tilbage med et samlet tilbud. Faktura sendes til virksomheden."
        />

        <RelatedLinks
          links={[
            {
              to: '/special-effekter',
              title: 'Special effekter',
              desc: 'Konfetti, CO2 og cold spark til at markere aftenens højdepunkter.',
            },
            {
              to: '/loesninger',
              title: 'Lyd, lys og teknik',
              desc: 'Udstyret der kommer med, og hvordan det skaleres til lokalet.',
            },
            {
              to: '/dj-til-fodselsdag',
              title: 'DJ til fødselsdag',
              desc: 'Runde fødselsdage, jubilæer og privatfester i Østjylland.',
            },
            {
              to: '/faq',
              title: 'Ofte stillede spørgsmål',
              desc: 'Booking, betaling, faktura og aflysning.',
            },
          ]}
        />
      </section>
    </div>
  );
};
