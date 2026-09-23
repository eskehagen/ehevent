import React from 'react';
import { Reveal } from '../components/Reveal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useSEO } from '../hooks/useSEO';

export const Privatlivspolitik = () => {
  useSEO('/privatlivspolitik');
  return (
    <div className="contact-page pt-32 pb-24">
      <section>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Breadcrumbs current="Privatlivspolitik" />
          <Reveal>
            <div className="section-label" style={{ justifyContent: 'center' }}>Juridisk</div>
            <h1 className="page-title" style={{ textAlign: 'center', marginBottom: '0.5rem', margin: '0 auto 0.5rem' }}>
              Privatlivs<em>politik</em>
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '3rem', fontSize: '0.95rem' }}>
              Senest opdateret: september 2026
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', lineHeight: 1.8 }}>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  1. Dataansvarlig
                </h3>
                <p>
                  Den dataansvarlige for behandling af dine personoplysninger er:
                </p>
                <p style={{ marginTop: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid var(--line)' }}>
                  <strong>EH Events</strong><br />
                  Aarhus, Danmark<br />
                  CVR: 46389344<br />
                  E-mail: <a href="mailto:eheventsdk@gmail.com" style={{ color: 'var(--gold)' }}>eheventsdk@gmail.com</a><br />
                  Telefon: <a href="tel:+4550935952" style={{ color: 'var(--gold)' }}>+45 50 93 59 52</a>
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  2. Hvilke oplysninger indsamler vi?
                </h3>
                <p>
                  Når du udfylder kontaktformularen på vores hjemmeside, indsamler vi følgende oplysninger:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <li>Navn</li>
                  <li>E-mailadresse</li>
                  <li>Telefonnummer</li>
                  <li>Eventdato og -sted</li>
                  <li>Eventtype og øvrige oplysninger du angiver i din besked</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  3. Formål med behandlingen
                </h3>
                <p>
                  Vi behandler dine personoplysninger med det formål at:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <li>Besvare din henvendelse og yde kundeservice</li>
                  <li>Udarbejde og sende tilbud</li>
                  <li>Administrere og opfylde en indgået aftale om booking</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  4. Retsgrundlag
                </h3>
                <p>
                  Behandlingen af dine personoplysninger er baseret på følgende retsgrundlag i henhold til
                  databeskyttelsesforordningen (GDPR):
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <li><strong>Art. 6(1)(b)</strong> – behandlingen er nødvendig for at opfylde en aftale eller for at træffe foranstaltninger forud for indgåelse af en aftale (ved booking).</li>
                  <li><strong>Art. 6(1)(f)</strong> – legitim interesse i at besvare henvendelser vedrørende vores ydelser.</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  5. Opbevaring
                </h3>
                <p>
                  Dine personoplysninger opbevares ikke længere end nødvendigt til de formål, de er indsamlet til.
                  Henvendelser uden efterfølgende booking slettes senest efter 6 måneder. Oplysninger tilknyttet
                  en booking opbevares i op til 5 år af hensyn til bogføringspligten.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  6. Videregivelse af oplysninger
                </h3>
                <p>
                  Vi sælger eller videregiver ikke dine personoplysninger til tredjepart med henblik på
                  markedsføring. Oplysninger kan videregives til databehandlere (fx e-mailudbydere) der
                  hjælper os med at drive hjemmesiden, dog udelukkende i det omfang det er nødvendigt og
                  på grundlag af en databehandleraftale.
                </p>
              </div>

              {/* Tilføjet da Vercel Web Analytics blev slået til. Formuleringerne
                  følger Vercels egen dokumentation for, hvad tjenesten indsamler:
                  https://vercel.com/docs/analytics/privacy-policy */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  7. Besøgsstatistik og cookies
                </h3>
                <p>
                  Hjemmesiden hostes hos Vercel, som også leverer vores besøgsstatistik
                  (Vercel Web Analytics). Vi bruger statistikken til at se, hvilke sider der bliver
                  besøgt, så vi kan forbedre indholdet.
                </p>
                <p style={{ marginTop: '0.75rem' }}>
                  Statistikken bruger ingen cookies. Registreringen af sidevisninger er anonym og
                  knyttes ikke til dig, din IP-adresse eller andre personlige kendetegn. Et besøg
                  genkendes i stedet ud fra en midlertidig kode, der beregnes ud fra din forespørgsel
                  og nulstilles automatisk hvert døgn. Du kan derfor ikke følges fra dag til dag eller
                  på tværs af andre hjemmesider. Behandlingen sker på grundlag af vores legitime
                  interesse i at forbedre hjemmesiden (GDPR art. 6(1)(f)).
                </p>
                <p style={{ marginTop: '0.75rem' }}>
                  Hvis du skifter mellem lyst og mørkt tema, gemmes dit valg lokalt i din browser, så
                  siden husker det næste gang. Oplysningen sendes ikke til os og bruges ikke til andet.
                </p>
                <p style={{ marginTop: '0.75rem' }}>
                  Vi bruger ingen cookies til markedsføring eller sporing.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  8. Dine rettigheder
                </h3>
                <p>
                  Du har følgende rettigheder i henhold til GDPR:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><strong>Indsigt</strong> – du kan til enhver tid anmode om indsigt i de oplysninger, vi behandler om dig.</li>
                  <li><strong>Berigtigelse</strong> – du kan få urigtige oplysninger rettet.</li>
                  <li><strong>Sletning</strong> – du kan anmode om sletning af dine oplysninger, medmindre vi er forpligtet til at opbevare dem.</li>
                  <li><strong>Begrænsning</strong> – du kan anmode om, at behandlingen begrænses i visse tilfælde.</li>
                  <li><strong>Indsigelse</strong> – du kan gøre indsigelse mod behandling baseret på legitim interesse.</li>
                  <li><strong>Dataportabilitet</strong> – du kan modtage dine oplysninger i et struktureret, maskinlæsbart format.</li>
                </ul>
                <p style={{ marginTop: '0.75rem' }}>
                  Kontakt os på <a href="mailto:eheventsdk@gmail.com" style={{ color: 'var(--gold)' }}>eheventsdk@gmail.com</a> for
                  at gøre brug af dine rettigheder.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                  9. Klage til Datatilsynet
                </h3>
                <p>
                  Hvis du er utilfreds med vores behandling af dine personoplysninger, har du ret til at indgive
                  en klage til <strong>Datatilsynet</strong>:
                </p>
                <p style={{ marginTop: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid var(--line)' }}>
                  Datatilsynet<br />
                  Carl Jacobsens Vej 35<br />
                  2500 Valby<br />
                  <a href="https://www.datatilsynet.dk" style={{ color: 'var(--gold)' }} target="_blank" rel="noopener noreferrer">www.datatilsynet.dk</a>
                </p>
              </div>

            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
