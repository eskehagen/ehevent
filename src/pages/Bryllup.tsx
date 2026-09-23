import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnswerFirst } from '../components/AnswerFirst';
import { ContactCta } from '../components/ContactCta';
import { PageReviews } from '../components/PageReviews';
import { RelatedLinks } from '../components/RelatedLinks';
import { useSEO } from '../hooks/useSEO';

export const Bryllup = () => {
  useSEO('/dj-til-bryllup');

  return (
    <div className="service-page">
      <section className="page-head">
        <Breadcrumbs current="DJ til bryllup" />

        <div className="section-label">Bryllup</div>
        <h1 className="page-title">
          DJ til bryllup i Øst- og <em>Midtjylland</em>
        </h1>

        <AnswerFirst>
          Eske Hagen Events er en DJ fra Aarhus med over 22 års erfaring, der spiller til
          bryllupper i hele Øst- og Midtjylland og leverer musik, lys og special effekter som én
          samlet løsning. Der indgår altid et personligt planlægningsmøde, hvor vi gennemgår
          brudevals, musikønsker og aftenens forløb, så I kan koncentrere jer om jeres gæster i
          stedet for om teknikken.
        </AnswerFirst>

        <ContactCta variant="inline" />
      </section>

      <section>
        <Reveal>
          <h2 className="subsection-title">
            Hvad der er <em>inkluderet</em>
          </h2>
          <div className="prose">
            <p>
              Jeg kommer som én leverandør med det hele. I skal ikke koordinere mellem en DJ, en
              lysmand og en effektleverandør, der først mødes på dagen — alt er planlagt og
              afstemt på forhånd.
            </p>
          </div>
          <ul className="service-list" style={{ maxWidth: '68ch' }}>
            <li>Professionelt lydanlæg, tilpasset lokalets størrelse</li>
            <li>Lysopsætning fra diskret ambient lys til fuldt showlys</li>
            <li>Personligt planlægningsmøde inden bryllupsdagen</li>
            <li>Musik tilpasset jeres ønsker og jeres gæster</li>
            <li>Opsætning, afvikling og nedtagning</li>
            <li>Rådgivning om special effekter til brudevals og dansegulv</li>
          </ul>
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <h2 className="subsection-title">
            Brudevalsen og <em>special effekter</em>
          </h2>
          <div className="prose">
            <p>
              Brudevalsen er et af aftenens store øjeblikke, og den tåler at blive sat i scene. En
              oplagt effekt er en <strong>cold spark-maskine</strong>: den sender kolde gnister op
              i luften som en stor stjernekaster, men uden ild, røg, lugt eller høje brag — og
              uden brandfare. Derfor kan den bruges indendørs, også i lokaler hvor rigtigt
              fyrværkeri aldrig ville komme på tale.
            </p>
            <p>
              <strong>Konfetti</strong> passer til brudeparrets indgang eller til at åbne
              dansegulvet. Alle konfettirør er BAM-testede, brandhæmmende og udviklet til
              professionel brug, og konfettien fås blandt andet som biologisk nedbrydelig
              biofetti, hvis stedet har krav til oprydning. <strong>Sæbebobler</strong> er et
              blødere alternativ, der fungerer godt på den røde løber eller hen over dansegulvet
              under selve valsen.
            </p>
            <p>
              Effekterne leveres i samarbejde med Showgear.dk. I skal ikke selv bestille noget —
              jeg rådgiver om, hvad der kan lade sig gøre i jeres lokale.{' '}
              <Link to="/loesninger">Se alle løsninger og special effekter</Link>.
            </p>
          </div>
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <h2 className="subsection-title">
            Musik der samler <em>hele selskabet</em>
          </h2>
          <div className="prose">
            <p>
              Til et bryllup er gæstelisten bred. Bedsteforældre, kollegaer, studiekammerater og
              børn skal alle kunne være i samme rum hele aftenen. Opgaven er derfor ikke at
              spille en bestemt genre, men at læse rummet løbende og skifte retning, før
              dansegulvet tømmes.
            </p>
            <p>
              Med over 22 års erfaring — fra årene med mobildiskotek til fast DJ på etablerede
              spillesteder i Aarhus og Randers — er det netop den del, der er blevet rutine.
              Målet er, at generationer mødes på dansegulvet, og at musikken binder selskabet
              sammen frem for at dele det op.
            </p>
            <p>
              Lyd er heller ikke bare volumen. Anlægget er valgt, så taler kan høres tydeligt, og
              så dansegulvet har det rigtige tryk, uden at det bliver ubehageligt at stå tæt på.
            </p>
          </div>
        </Reveal>
      </section>

      <PageReviews match={/bryllup/i} title="Brudepar der har haft mig med" />

      <section style={{ paddingTop: '5rem' }}>
        <ContactCta
          heading="Skal jeg spille til jeres bryllup?"
          text="Send dato og sted, så vender jeg tilbage med et uforpligtende tilbud."
        />

        <RelatedLinks
          links={[
            {
              to: '/loesninger',
              title: 'Løsninger',
              desc: 'Lyd, lys og special effekter som cold spark, konfetti og sæbebobler.',
            },
            {
              to: '/galleri',
              title: 'Galleri',
              desc: 'Billeder fra bryllupper og fester.',
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
