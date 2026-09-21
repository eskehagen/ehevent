import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnswerFirst, ProcessSteps } from '../components/AnswerFirst';
import { ContactCta } from '../components/ContactCta';
import { FaqSection } from '../components/FaqSection';
import { PageReviews } from '../components/PageReviews';
import { RelatedLinks } from '../components/RelatedLinks';
import { FAQ_BRYLLUP } from '../seo/faqs';
import { useSEO } from '../hooks/useSEO';

export const Bryllup = () => {
  useSEO('/dj-til-bryllup');

  return (
    <div className="service-page">
      <section className="page-head">
        <Breadcrumbs current="DJ til bryllup" />

        <div className="section-label">Bryllup</div>
        <h1 className="page-title">
          DJ til bryllup i Aarhus og <em>Østjylland</em>
        </h1>

        <AnswerFirst>
          Eske Hagen Events er en DJ fra Aarhus med over 22 års erfaring, der spiller til
          bryllupper i hele Østjylland og leverer musik, lys og special effekter som én
          samlet løsning. Der indgår altid et personligt planlægningsmøde, hvor vi
          gennemgår brudevals, musikønsker og aftenens forløb, så I kan koncentrere jer
          om jeres gæster i stedet for om teknikken.
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
              Jeg kommer som én leverandør med det hele. I skal ikke koordinere mellem en
              DJ, en lysmand og en effektleverandør, der først mødes på dagen — alt er
              planlagt og afstemt på forhånd.
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
          {/* TODO ESKE: hvor mange timers spilletid indgår som standard, og hvad koster
              overtid hvis festen trækker ud? Det er et af de hyppigste spørgsmål, og
              svaret findes ikke i koden, så det er bevidst udeladt frem for gættet. */}
          {/* TODO ESKE: er kørsel inkluderet inden for de 150 km, eller kommer der
              transporttillæg? */}
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
                title: 'I skriver eller ringer',
                body: 'Send dato, sted og hvad I forestiller jer. Jeg svarer hurtigst muligt og siger ærligt til, hvis datoen allerede er optaget.',
              },
              {
                title: 'Uforpligtende snak',
                body: 'Vi tager en snak om aftenens forløb, jeres gæster og hvilket lys og hvilke effekter der giver mening i netop jeres lokale.',
              },
              {
                title: 'I får et tilbud',
                body: 'Tilbuddet er samlet og konkret, og det er gyldigt i 14 dage. Datoen er reserveret, når I har accepteret skriftligt og depositum er modtaget.',
              },
              {
                title: 'Planlægningsmødet',
                body: 'Inden bryllupsdagen gennemgår vi brudevals, musikønsker, tidsplan og en eventuel "spil ikke"-liste. Ønsker og spillelister skal være meldt ind senest 14 dage før.',
              },
              {
                title: 'Selve dagen',
                body: 'Jeg stiller op i god tid, lydtjekker, og sørger for at taler kan høres tydeligt under middagen. Derefter overtager dansegulvet.',
              },
            ]}
          />
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <h2 className="subsection-title">
            Brudevalsen og <em>special effekter</em>
          </h2>
          <div className="prose">
            <p>
              Brudevalsen er aftenens mest fotograferede øjeblik, og den tåler at blive
              sat i scene. Den mest brugte effekt er en{' '}
              <strong>cold spark-maskine</strong>: den sender kolde gnister op i luften som
              en stor stjernekaster, men uden ild, røg, lugt eller høje brag — og uden
              brandfare. Derfor kan den bruges indendørs, også i lokaler hvor rigtigt
              fyrværkeri aldrig ville komme på tale.
            </p>
            <p>
              <strong>Konfetti</strong> bruges typisk til brudeparrets indgang eller til at
              åbne dansegulvet. Alle konfettirør er BAM-testede, brandhæmmende og udviklet
              til professionel brug, og konfettien fås blandt andet som biologisk
              nedbrydelig biofetti, hvis stedet har krav til oprydning.{' '}
              <strong>Sæbebobler</strong> er et blødere alternativ, der fungerer godt på
              den røde løber eller hen over dansegulvet under selve valsen.
            </p>
            <p>
              Effekterne leveres i samarbejde med Showgear.dk. I skal ikke selv bestille
              noget — jeg rådgiver om hvad der kan lade sig gøre i jeres lokale, og står
              for opsætning og afvikling.{' '}
              <Link to="/special-effekter">Se alle special effekter</Link>.
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
              Et bryllup er det sværeste sted at spille, fordi gæstelisten er bredest.
              Bedsteforældre, kollegaer, studiekammerater og børn skal alle kunne være i
              samme rum hele aftenen. Opgaven er derfor ikke at spille en bestemt genre,
              men at læse rummet løbende og skifte retning, før dansegulvet tømmes.
            </p>
            <p>
              Med over 22 års erfaring — fra årene med mobildiskotek til fast DJ på
              etablerede spillesteder i Aarhus og Randers — er det netop den del, der er
              blevet rutine. Målet er, at generationer mødes på dansegulvet, og at musikken
              binder selskabet sammen frem for at dele det op.
            </p>
            <p>
              Lyd er heller ikke bare volumen. Anlægget er valgt, så taler kan høres
              tydeligt under middagen, og så dansegulvet har det rigtige tryk, uden at det
              bliver ubehageligt at stå tæt på.
            </p>
          </div>
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal>
          <h2 className="subsection-title">
            Hvor jeg spiller <em>bryllupper</em>
          </h2>
          <div className="prose">
            <p>
              Jeg har base i Aarhus og kører op til 150 km derfra. Det dækker hele
              Østjylland, blandt andet Skanderborg, Silkeborg, Randers, Horsens og Hadsten.
              Ligger jeres bryllupslokation længere væk, er I velkomne til at spørge
              alligevel.
            </p>
            <p>
              Jeg har blandt andet spillet til bryllupsfester i Glassalen hos PARK 13 i
              Aarhus samt på Restaurant Anker og Restaurant Martino.{' '}
              <Link to="/galleri">Se billeder fra tidligere events</Link>.
            </p>
          </div>
        </Reveal>
      </section>

      <PageReviews match={/bryllup/i} title="Brudepar der har haft mig med" />

      <FaqSection items={FAQ_BRYLLUP} title="Spørgsmål om DJ til bryllup" id="faq-bryllup" />

      <section style={{ paddingTop: '5rem' }}>
        <ContactCta
          heading="Skal jeg spille til jeres bryllup?"
          text="Send dato og sted, så vender jeg tilbage med et uforpligtende tilbud. Er datoen optaget, siger jeg det med det samme."
        />

        <RelatedLinks
          links={[
            {
              to: '/special-effekter',
              title: 'Special effekter',
              desc: 'Cold spark, konfetti, sæbebobler og røg til brudevals og dansegulv.',
            },
            {
              to: '/loesninger',
              title: 'Lyd, lys og teknik',
              desc: 'Hvilket udstyr der kommer med, og hvordan det tilpasses lokalet.',
            },
            {
              to: '/om-eske',
              title: 'Om Eske',
              desc: '22+ års erfaring som DJ — baggrund, dækningsområde og kontakt.',
            },
            {
              to: '/faq',
              title: 'Ofte stillede spørgsmål',
              desc: 'Booking, betaling, aflysning og hvad I selv skal sørge for.',
            },
          ]}
        />
      </section>
    </div>
  );
};
