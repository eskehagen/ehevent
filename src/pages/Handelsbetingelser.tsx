import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { useSEO } from '../hooks/useSEO';

export const Handelsbetingelser = () => {
  useSEO(
    'Handelsbetingelser – Eske Hagen Events',
    'Læs Eske Hagen Events handelsbetingelser for booking af DJ og eventydelser.'
  );
  return (
    <div className="contact-page pt-32 pb-24">
      <section>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Reveal>
            <div className="section-label" style={{ justifyContent: 'center' }}>Juridisk</div>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
              Handels<em>betingelser</em>
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '3rem', fontSize: '0.95rem' }}>
              Senest opdateret: april 2026
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', lineHeight: 1.8 }}>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  1. Parterne
                </h3>
                <p>
                  Disse handelsbetingelser gælder for alle aftaler indgået mellem:
                </p>
                <p style={{ marginTop: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid var(--line)' }}>
                  <strong>Eske Hagen Events</strong><br />
                  Aarhus, Danmark<br />
                  CVR: 46389344<br />
                  E-mail: <a href="mailto:eskehagen@gmail.com" style={{ color: 'var(--gold)' }}>eskehagen@gmail.com</a><br />
                  Telefon: <a href="tel:+4550935952" style={{ color: 'var(--gold)' }}>+45 50 93 59 52</a>
                </p>
                <p style={{ marginTop: '0.75rem' }}>
                  — og kunden (herefter &rdquo;kunden&rdquo;), der bestiller DJ- og eventydelser.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  2. Tilbud og booking
                </h3>
                <p>
                  En aftale anses for indgået, når kunden skriftligt har accepteret et fremsendt tilbud, og et
                  eventuelt depositum er modtaget. Tilbud er gyldige i 14 dage fra afsendelsesdatoen,
                  medmindre andet er angivet.
                </p>
                <p style={{ marginTop: '0.75rem' }}>
                  Datoen er kun reserveret, når der foreligger en skriftlig bekræftelse fra Eske Hagen Events.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  3. Betaling
                </h3>
                <p>
                  Betalingsbetingelserne aftales individuelt i forbindelse med tilbudsgivning, men vil typisk
                  følge dette mønster:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><strong>Depositum:</strong> 25% af den samlede pris ved bookingbekræftelse.</li>
                  <li><strong>Restbeløb:</strong> Betales senest 14 dage før eventdatoen, medmindre andet er aftalt.</li>
                </ul>
                <p style={{ marginTop: '0.75rem' }}>
                  Betaling sker via bankoverførsel til det kontonummer, der fremgår af fakturaen.
                  Ved sen betaling forbeholdes retten til at opkræve rykkergebyr i henhold til
                  rentelovens bestemmelser.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  4. Aflysning og ændringer — fra kunden
                </h3>
                <p>
                  Aflysning skal meddeles skriftligt. Følgende aflysningstakster gælder:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><strong>Mere end 90 dage før eventet:</strong> Depositum tilbageholdes.</li>
                  <li><strong>31–90 dage før eventet:</strong> 50% af den samlede aftalte pris opkræves.</li>
                  <li><strong>0–30 dage før eventet:</strong> 100% af den samlede aftalte pris opkræves.</li>
                </ul>
                <p style={{ marginTop: '0.75rem' }}>
                  Ændringer i tid, sted eller varighed skal aftales skriftligt og kan medføre regulering af prisen.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  5. Aflysning — fra Eske Hagen Events
                </h3>
                <p>
                  I det ekstraordinære tilfælde, at Eske Hagen Events er nødsaget til at aflyse en aftale
                  (fx ved sygdom eller force majeure), vil kunden hurtigst muligt blive orienteret, og alle
                  indbetalte beløb vil blive refunderet fuldt ud. Eske Hagen Events er ikke ansvarlig for
                  yderligere tab eller udgifter hos kunden som følge af aflysningen.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  6. Force majeure
                </h3>
                <p>
                  Ingen af parterne er ansvarlig for manglende opfyldelse af aftalen, hvis dette skyldes
                  forhold uden for partens rimelige kontrol, herunder men ikke begrænset til: naturkatastrofer,
                  brand, krig, strejke, myndighedspåbud, pandemi eller lignende ekstraordinære begivenheder.
                  Begge parter skal straks underrette hinanden skriftligt, hvis en force majeure-situation
                  opstår.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  7. Kundens forpligtelser
                </h3>
                <p>
                  Kunden er ansvarlig for at sikre:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>Tilstrækkelig plads og adgang til opstilling af udstyr.</li>
                  <li>Tilgængelighed af nødvendig strømforsyning (230V).</li>
                  <li>At eventlokalet har KODA/Gramex-tilladelse, hvis dette er et krav for det pågældende arrangement.</li>
                  <li>At information om særlige ønsker, spillelister eller tekniske krav meddeles senest 14 dage inden eventet.</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  8. Ansvarsbegrænsning
                </h3>
                <p>
                  Eske Hagen Events er ikke ansvarlig for indirekte tab, driftstab, mistet fortjeneste eller
                  andre følgeskader som følge af ydelsernes levering eller manglende levering.
                  Det samlede erstatningsansvar kan ikke overstige den aftalte pris for den pågældende ydelse.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  9. Persondata
                </h3>
                <p>
                  Vi behandler dine personoplysninger i overensstemmelse med vores{' '}
                  <Link to="/privatlivspolitik" style={{ color: 'var(--gold)' }}>
                    privatlivspolitik
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  10. Lovvalg og tvister
                </h3>
                <p>
                  Disse handelsbetingelser er underlagt dansk ret. Eventuelle tvister, der ikke kan løses
                  i mindelighed, afgøres ved de danske domstole med Retten i Aarhus som værneting.
                </p>
              </div>

            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
