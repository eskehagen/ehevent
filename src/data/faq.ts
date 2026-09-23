/**
 * Ofte stillede spørgsmål — vises på /faq.
 *
 * ─── SÅDAN TILFØJER DU ET SPØRGSMÅL ─────────────────────────────
 * Find den kategori, spørgsmålet hører til, og kopiér et objekt:
 *
 *   {
 *     q: 'Spørgsmålet, formuleret som kunden ville stille det?',
 *     a: 'Svaret i 2-4 sætninger.',
 *   },
 *
 * Skriv svaret, så det giver mening helt for sig selv. AI-søgemaskiner
 * (ChatGPT, Perplexity, Google) citerer ofte ét svar ad gangen uden
 * resten af siden.
 *
 * ─── SÅDAN TILFØJER DU EN KATEGORI ─────────────────────────────
 * Kopiér en hel blok { id, title, items: [...] }. `id` bruges i
 * adressen (fx eskehagenevents.dk/faq#booking), så skriv den med små
 * bogstaver, uden mellemrum og uden æ, ø og å.
 *
 * ─── GODT AT VIDE ──────────────────────────────────────────────
 * Både den synlige FAQ og de strukturerede data til Google (FAQPage)
 * bygges automatisk herfra. Du retter altså kun ét sted.
 *
 * Priser og spilletid nævnes bevidst ikke. De oplyses først i et konkret
 * tilbud ud fra kundens behov.
 */

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

export const FAQ: FaqCategory[] = [
  {
    id: 'booking',
    title: 'Booking og betaling',
    items: [
      {
        q: 'Hvad koster det at booke en DJ?',
        a: 'Der er ingen fast pris, fordi to fester sjældent er ens. Prisen afhænger af aftenens længde, lokation, udstyr og ønsker om special effekter som konfetti eller effektmaskiner. Derfor får I altid et specificeret tilbud ud fra netop jeres ønsker. Skriv eller ring, så finder vi ud af det sammen.',
      },
      {
        q: 'Hvordan booker jeg?',
        a: 'Skriv via kontaktformularen, send en mail eller ring med dato, lokation og type fest. Derefter tager vi en uforpligtende snak om jeres ønsker, og I får et tilbud. Datoen er først reserveret, når I har accepteret tilbuddet skriftligt.',
      },
      {
        q: 'Hvordan foregår betalingen?',
        a: 'Betalingsbetingelserne aftales individuelt, men sker normalt via bankoverførsel.',
      },
      {
        q: 'Kan vi få en faktura som virksomhed?',
        a: 'Ja. EH Events er et registreret dansk firma, og der faktureres til virksomheden. Betaling sker via bankoverførsel til kontonummeret på fakturaen.',
      },
      {
        q: 'Hvad sker der, hvis vi bliver nødt til at aflyse?',
        a: 'Aflysning skal ske skriftligt. Aflyses der med under 14 dage før eventet opkræves 50% af den aftalte pris, og fra 7 dage før opkræves 100%. Ændringer i tid, sted eller varighed aftales skriftligt og kan regulere prisen.',
      },
      {
        q: 'Hvad sker der, hvis DJ’en bliver syg?',
        a: 'I det ekstraordinære tilfælde, at jeg er nødt til at aflyse - for eksempel ved sygdom eller force majeure - bliver I orienteret hurtigst muligt, og alle indbetalte beløb refunderes fuldt ud. Vi vil samtidig forsøge at finde en anden DJ, der kan dække jeres event, men dette kan ikke garanteres.',
      },
    ],
  },
  {
    id: 'planlaegning',
    title: 'Musik og planlægning',
    items: [
      {
        q: 'Holder du et møde med os inden festen?',
        a: 'Ja. Jeg gør meget ud af en personlig planlægning. Derfor afholdes altid et personligt møde eller en grundig snak inden festen, hvor vi gennemgår forventninger, forløb og ønsker. Det bedste resultat opstår i tæt dialog, og så kan I koncentrere jer om jeres gæster på dagen.',
      },
      {
        q: 'Kan vi selv vælge musikken og lave en "spil ikke"-liste?',
        a: 'Ja. På planlægningsmødet gennemgår vi jeres ønsker, jeres gæster og det, I helst vil undgå. Særlige ønsker, spillelister og tekniske krav skal være meldt ind senest 7 dage før festen, så der er tid til at forberede aftenen ordentligt.',
      },
      {
        q: 'Hvordan rammer du musikken, når gæsterne er i meget forskellige aldre?',
        a: 'Ved at læse rummet løbende og skifte retning, før dansegulvet tømmes, i stedet for at køre en fast liste igennem. Målet er, at generationer mødes på dansegulvet, og at musikken binder selskabet sammen frem for at dele det op. Her kommer mine mange års erfaring i spil.',
      },
      {
        q: 'Spiller du også til brudevalsen?',
        a: 'Ja. Brudevalsen planlægger vi sammen på forhånd, så sang, lys og timing bliver som I ønsker. Den kan også lyses op med en cold spark-maskine, der sender kolde gnister op i luften som en stor stjernekaster - uden ild, røg eller brandfare.',
      },
    ],
  },
  {
    id: 'lyd-og-lys',
    title: 'Lyd, lys og lokale',
    items: [
      {
        q: 'Medbringer du selv lyd og lys?',
        a: 'Ja. Jeg medbringer altid et professionelt lyd- og lysanlæg, som tilpasses lokalets størrelse. Lyden er valgt, så taler kan høres tydeligt, og dansegulvet har det rigtige tryk uden at blive ubehageligt. I skal kun sørge for plads til opstilling og adgang til strøm.',
      },
      {
        q: 'Kan du spille i et mindre lokale eller en privat have?',
        a: 'Ja. Lyd- og lysanlægget tilpasses altid lokalets størrelse, så et mindre rum ikke bliver overdøvet, og jeg har blandt andet spillet til havefester. Der skal blot være plads til opstilling og adgang til strøm.',
      },
      {
        q: 'Hvad skal vi selv sørge for?',
        a: 'I skal sikre tilstrækkelig plads og adgang til opstilling af udstyret, adgang til 230V strømforsyning. Særlige ønsker, spillelister og tekniske krav skal meldes ind senest 7 dage før festen.',
      },
      {
        q: 'Hvor i landet spiller du?',
        a: 'Jeg har base i Aarhus og dækker hele Øst- og Midtjylland. Ligger jeres fest længere væk, er I velkomne til at kontakte mig alligevel.',
      },
    ],
  },
  {
    id: 'fester',
    title: 'Typer af fester',
    items: [
      {
        q: 'Spiller du til julefrokost og sommerfest?',
        a: 'Ja. Jeg spiller til julefrokoster, sommerfester og andre firmaevents. Holder I julefrokost i november eller december, så kontakt mig gerne i god tid.',
      },
      {
        q: 'Spiller du til runde fødselsdage?',
        a: 'Ja. Jeg spiller til runde fødselsdage, jubilæer og andre private fester og har blandt andet spillet til havefester og studentergilder. Når gæstelisten spænder fra børnebørn til kollegaer og gamle venner, tilpasser jeg musikken løbende, så selskabet holdes samlet.',
      },
    ],
  },
  {
    id: 'effekter',
    title: 'Special effekter',
    items: [
      {
        q: 'Hvad er en gnistmaskine (cold spark), og er den sikker indendørs?',
        a: 'En cold spark-maskine efterligner effekten af en fyrværkerifontæne, men uden at udlede ild, røg, lugt eller høje brag. I stedet sendes kolde gnister op i luften som en stor stjernekaster, og der er ikke brandfare. Derfor kan den bruges både indendørs og udendørs - for eksempel til brudevalsen.',
      },
      {
        q: 'Er konfettien sikker og til at rydde op efter?',
        a: 'Alle konfettirør er BAM-testede, brandhæmmende og udviklet til professionel brug. Konfettien fås i papir, metal-look og biologisk nedbrydelig biofetti, så I kan vælge en variant, der passer til lokationen og til stedets regler for oprydning.',
      },
      {
        q: 'Hvilke special effekter kan jeg vælge imellem?',
        a: 'Se alle løsninger på FAQ-siden. Effekterne leveres i samarbejde med Showgear.dk, som har et af markedets største udvalg.',
      },
      {
        q: 'Skal jeg selv bestille effekterne?',
        a: 'Nej. Effekterne bestilles gennem mig, og jeg rådgiver om, hvilke der giver mening til netop jeres fest og lokale. I skal kun forholde jer til, hvilke øjeblikke I gerne vil have løftet.',
      },
      {
        q: 'Kan man bruge røg og CO2 i alle lokaler?',
        a: 'Det afhænger blandt andet af ventilation, røgalarmer og regler. Derfor rådgiver jeg altid ud fra den konkrete lokation. Er røg ikke en mulighed, findes der næsten altid en anden effekt, der giver samme løft.',
      },
    ],
  },
];

/** Alle spørgsmål i én liste — bruges til FAQPage-JSON-LD. */
export const allFaqItems = (): FaqItem[] => FAQ.flatMap((c) => c.items);
