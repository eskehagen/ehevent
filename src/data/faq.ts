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
        a: 'Der er ingen fast pris, fordi to fester sjældent kræver det samme. Prisen afhænger af aftenens længde, lokalets størrelse, lysopsætningen og om I ønsker special effekter som konfetti eller cold spark. Derfor får I et konkret tilbud ud fra netop jeres fest. Skriv eller ring med dato og sted, så vender jeg tilbage.',
      },
      {
        q: 'Hvordan booker jeg?',
        a: 'Skriv via kontaktformularen, send en mail til eheventsdk@gmail.com eller ring på +45 50 93 59 52 med dato, sted og type fest. Derefter tager vi en uforpligtende snak om jeres ønsker, og I får et tilbud. Datoen er først reserveret, når I har accepteret tilbuddet skriftligt.',
      },
      {
        q: 'Hvordan foregår betalingen?',
        a: 'Betalingsbetingelserne aftales individuelt, men følger typisk samme mønster: 25% i depositum ved bookingbekræftelsen og restbeløbet senest 14 dage før festen. Betaling sker via bankoverførsel til kontonummeret på fakturaen.',
      },
      {
        q: 'Kan vi få en faktura som virksomhed?',
        a: 'Ja. Eske Hagen Events er et registreret dansk firma, og der faktureres til virksomheden. Betaling sker via bankoverførsel til kontonummeret på fakturaen.',
      },
      {
        q: 'Hvad sker der, hvis vi bliver nødt til at aflyse?',
        a: 'Aflysning skal ske skriftligt. Aflyses der mere end 90 dage før festen, tilbageholdes depositummet. Mellem 31 og 90 dage før opkræves 50% af den aftalte pris, og fra 30 dage før opkræves 100%. Ændringer i tid, sted eller varighed aftales skriftligt og kan regulere prisen.',
      },
      {
        q: 'Hvad sker der, hvis DJ’en bliver syg?',
        a: 'I det ekstraordinære tilfælde, at jeg er nødt til at aflyse — for eksempel ved sygdom eller force majeure — bliver I orienteret hurtigst muligt, og alle indbetalte beløb refunderes fuldt ud.',
      },
    ],
  },
  {
    id: 'planlaegning',
    title: 'Musik og planlægning',
    items: [
      {
        q: 'Holder du et møde med os inden festen?',
        a: 'Ja. Der indgår altid et personligt planlægningsmøde eller en grundig snak inden festen, hvor vi gennemgår forventninger, forløb og musikønsker. Det bedste resultat opstår i tæt dialog, og så kan I koncentrere jer om jeres gæster på dagen.',
      },
      {
        q: 'Kan vi selv vælge musikken og lave en "spil ikke"-liste?',
        a: 'Ja. På planlægningsmødet gennemgår vi jeres ønsker, jeres gæster og det, I helst vil undgå. Særlige ønsker, spillelister og tekniske krav skal være meldt ind senest 14 dage før festen, så der er tid til at forberede aftenen ordentligt.',
      },
      {
        q: 'Hvordan rammer du musikken, når gæsterne er i meget forskellige aldre?',
        a: 'Ved at læse rummet løbende og skifte retning, før dansegulvet tømmes, i stedet for at køre en fast liste igennem. Målet er, at generationer mødes på dansegulvet, og at musikken binder selskabet sammen frem for at dele det op.',
      },
      {
        q: 'Spiller du også til brudevalsen?',
        a: 'Ja. Brudevalsen planlægger vi sammen på forhånd, så sang, lys og timing sidder, som I ønsker. Den kan også lyses op med en cold spark-maskine, der sender kolde gnister op i luften som en stor stjernekaster — uden ild, røg eller brandfare, så den kan bruges indendørs.',
      },
    ],
  },
  {
    id: 'lyd-og-lys',
    title: 'Lyd, lys og lokale',
    items: [
      {
        q: 'Medbringer du selv lyd og lys?',
        a: 'Ja. Jeg medbringer altid et professionelt lyd- og lysanlæg, som tilpasses lokalets størrelse. Lyden er valgt, så taler kan høres tydeligt, og dansegulvet har det rigtige tryk uden at blive ubehageligt. I skal kun sørge for plads til opstilling og adgang til 230V strøm.',
      },
      {
        q: 'Kan du spille i et mindre lokale eller en privat have?',
        a: 'Ja. Lyd- og lysanlægget tilpasses altid lokalets størrelse, så et mindre rum ikke bliver overdøvet, og jeg har blandt andet spillet til havefester. Der skal blot være plads til opstilling og adgang til 230V strøm.',
      },
      {
        q: 'Hvad skal vi selv sørge for?',
        a: 'I skal sikre tilstrækkelig plads og adgang til opstilling af udstyret, adgang til 230V strømforsyning, og at lokalet har KODA/Gramex-tilladelse, hvis det kræves for arrangementet. Særlige ønsker, spillelister og tekniske krav skal meldes ind senest 14 dage før festen.',
      },
      {
        q: 'Hvor i landet spiller du?',
        a: 'Jeg har base i Aarhus og dækker hele Øst- og Midtjylland. Ligger jeres fest længere væk, er I velkomne til at spørge alligevel.',
      },
    ],
  },
  {
    id: 'fester',
    title: 'Typer af fester',
    items: [
      {
        q: 'Spiller du til julefrokost og sommerfest?',
        a: 'Ja. Jeg spiller til julefrokoster, sommerfester og andre firmafester og har blandt andet spillet til firmajulefrokoster i Glassalen hos PARK 13. Holder I julefrokost i november eller december, så kontakt mig gerne i god tid.',
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
        a: 'En cold spark-maskine efterligner effekten af en fyrværkerifontæne, men uden at udlede ild, røg, lugt eller høje brag. I stedet sendes kolde gnister op i luften som en stor stjernekaster, og der er ikke brandfare. Derfor kan den bruges både indendørs og udendørs — for eksempel til brudevalsen.',
      },
      {
        q: 'Er konfettien sikker og til at rydde op efter?',
        a: 'Alle konfettirør er BAM-testede, brandhæmmende og udviklet til professionel brug. Konfettien fås i papir, metal-look og biologisk nedbrydelig biofetti, så I kan vælge en variant, der passer til lokalet og til stedets regler for oprydning.',
      },
      {
        q: 'Hvilke special effekter kan jeg vælge imellem?',
        a: 'Konfetti og streamers, cold spark (indendørs fyrværkeri), røgmaskiner og håndholdte CO2-guns, sæbebobler, sne, skum, knæklys og UV-tape samt holi powder. Effekterne leveres i samarbejde med Showgear.dk, som har et af markedets største udvalg.',
      },
      {
        q: 'Skal jeg selv bestille effekterne?',
        a: 'Nej. Effekterne bestilles gennem mig, og jeg rådgiver om, hvilke der giver mening til netop jeres fest og lokale. I skal kun forholde jer til, hvilke øjeblikke I gerne vil have løftet.',
      },
      {
        q: 'Kan man bruge røg og CO2 i alle lokaler?',
        a: 'Det afhænger af lokalet, blandt andet af ventilation og røgalarmer. Derfor rådgiver jeg altid ud fra det konkrete lokale. Er røg ikke en mulighed, findes der næsten altid en anden effekt, der giver samme løft.',
      },
    ],
  },
];

/** Alle spørgsmål i én liste — bruges til FAQPage-JSON-LD. */
export const allFaqItems = (): FaqItem[] => FAQ.flatMap((c) => c.items);
