import React from 'react';
import { Reveal } from '../components/Reveal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnswerFirst } from '../components/AnswerFirst';
import { ContactCta } from '../components/ContactCta';
import { RelatedLinks } from '../components/RelatedLinks';
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
          firmafester, julefrokoster, sommerfester og jubilæer i hele Øst- og Midtjylland. Lyd,
          lys og special effekter leveres som én samlet løsning af én leverandør, og der
          faktureres til virksomheden.
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
            <li>Faktura til virksomheden</li>
          </ul>
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <h2 className="subsection-title">
            Julefrokost, sommerfest og <em>jubilæum</em>
          </h2>
          <div className="prose">
            <p>
              <strong>Julefrokosten</strong> er svær at ramme: middagen trækker ud, stemningen
              svinger, og halvdelen af selskabet kender kun hinanden fra kontoret. Holder I julefrokost i
              november eller december, så kontakt mig gerne i god tid for at sikre jeres dato.
            </p>
            <p>
              <strong>Sommerfesten</strong> er ofte mere afslappet og ligger tit udendørs eller i
              telt. Her fungerer skum og holi powder godt, hvis I vil have et unikt indslag, der også
              involverer gæsterne.
            </p>
            <p>
              <strong>Jubilæer</strong> har typisk et program med taler, hvor teknikken skal kunne
              bære både tale og fest. Lyden er sat op, så en tale kan høres tydeligt i hele
              lokalet - ikke kun på de forreste rækker.
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
              Til en firmafest er gæstelisten ikke selvvalgt. Aldersspændet går typisk fra unge
              i tyverne til seniorer i tresserne, og musiksmagen følger med. Den eneste måde at
              holde alle på dansegulvet er at læse rummet løbende og skifte retning, <em>før</em>{' '}
              gulvet tømmes - ikke at køre en forudbestemt liste igennem.
            </p>
            <p>
              Med over 22 års erfaring fra både mobildiskotek og faste spillesteder i Aarhus og
              Randers er det den del, der er blevet rutine. Målet er, at generationer mødes på
              dansegulvet, og at musikken binder selskabet sammen.
            </p>
          </div>
        </Reveal>
      </section>

      <section style={{ paddingTop: '5rem' }}>
        <ContactCta
          heading="Skal jeg spille til jeres firmafest?"
          text="Send dato, sted og antal gæster, så vender jeg tilbage med et samlet tilbud. Faktura sendes til virksomheden."
        />

        <RelatedLinks
          links={[
            {
              to: '/loesninger',
              title: 'Løsninger',
              desc: 'Lyd, lys og special effekter som konfetti, CO2 og cold spark.',
            },
            {
              to: '/dj-til-fodselsdag',
              title: 'DJ til privatfest',
              desc: 'Runde fødselsdage, jubilæer og andre private fester.',
            },
            {
              to: '/om-eske',
              title: 'Om Eske',
              desc: '22+ års erfaring som DJ — baggrund og kontakt.',
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
