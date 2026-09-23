import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnswerFirst } from '../components/AnswerFirst';
import { ContactCta } from '../components/ContactCta';
import { PageReviews } from '../components/PageReviews';
import { RelatedLinks } from '../components/RelatedLinks';
import { useSEO } from '../hooks/useSEO';

export const Foedselsdag = () => {
  useSEO('/dj-til-fodselsdag');

  return (
    <div className="service-page">
      <section className="page-head">
        <Breadcrumbs current="DJ til fødselsdag og privatfest" />

        <div className="section-label">Privatfest</div>
        <h1 className="page-title">
          DJ til fødselsdag og <em>privatfest</em>
        </h1>

        <AnswerFirst>
          Eske Hagen Events er en DJ fra Aarhus med over 22 års erfaring, der spiller til runde
          fødselsdage, jubilæer og andre private fester i hele Øst- og Midtjylland. Lyd, lys og
          special effekter kommer som én samlet løsning, og musikken vælges, så gæster i alle
          aldre bliver på dansegulvet — ikke kun de yngste.
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
              Runde fødselsdage har en helt særlig udfordring: selskabet er sammensat af familie,
              gamle venner, kollegaer og naboer, der sjældent er samlet ellers. Gæstelisten spænder
              fra børnebørn til jævnaldrende, og hvis musikken læner sig for hårdt til én
              generation, deler festen sig i to rum.
            </p>
            <p>
              Derfor er opgaven til en fødselsdag mere at holde selskabet samlet end at køre et
              bestemt sound igennem. Jeg tilpasser musikken løbende hen over aftenen og sørger
              for, at der er noget at danse til for alle — uden at det bliver en jukebox.
            </p>
            <p>
              Ud over fødselsdage spiller jeg til jubilæer og andre private fester, og jeg har
              blandt andet spillet til havefester og studentergilder.
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
            <li>Opsætning, afvikling og nedtagning</li>
            <li>Rådgivning om konfetti og andre effekter</li>
          </ul>
          <div className="prose" style={{ marginTop: '1.4rem' }}>
            <p>
              Lokalets størrelse er ikke vigtigt. Anlægget tilpasses altid, så et mindre
              rum ikke bliver overdøvet, og et stort rum ikke bliver for tomt.
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
              Et oplagt indslag til en fødselsdag er konfetti, timet til sidste vers af
              fødselsdagssangen eller til at åbne dansegulvet. Alle konfettirør er BAM-testede,
              brandhæmmende og udviklet til professionel brug, og konfettien fås blandt andet som
              biologisk nedbrydelig biofetti - praktisk, hvis lokalet har krav til oprydning eller det foregår udendørs.
            </p>
            <p>
              Skal fejringen have et ekstra løft, findes der også cold spark, CO2, sæbebobler, sne
              og skum. <Link to="/loesninger">Se alle løsninger og special effekter</Link>.
            </p>
          </div>
        </Reveal>
      </section>

      <PageReviews match={/fødselsdag/i} title="Anmeldelse fra en fødselsdagsfest" />

      <section style={{ paddingTop: '5rem' }}>
        <ContactCta
          heading="Skal jeg spille til din fest?"
          text="Send dato og sted, så vender jeg tilbage med et uforpligtende tilbud på din fest."
        />

        <RelatedLinks
          links={[
            {
              to: '/loesninger',
              title: 'Løsninger',
              desc: 'Lyd, lys og special effekter som konfetti, cold spark og sæbebobler.',
            },
            {
              to: '/dj-til-bryllup',
              title: 'DJ til bryllup',
              desc: 'Brudevals, musik og lys som én samlet løsning.',
            },
            {
              to: '/om-eske',
              title: 'Om Eske',
              desc: '22+ års erfaring som DJ — baggrund og kontakt.',
            },
            {
              to: '/faq',
              title: 'Ofte stillede spørgsmål',
              desc: 'Booking, betaling, musik og special effekter.',
            },
          ]}
        />
      </section>
    </div>
  );
};
