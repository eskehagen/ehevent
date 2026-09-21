/**
 * FAQ-indhold, ét sted.
 *
 * VIGTIGT: både den synlige FAQ på siden og FAQPage-JSON-LD'en bygges ud af
 * præcis disse objekter. Google afviser FAQ-markup der ikke matcher det
 * synlige svar ordret, så de to må aldrig kunne komme til at drive fra
 * hinanden. Rediger her — begge steder følger med.
 *
 * Svarene er skrevet selvstændige (de giver mening løsrevet fra siden), fordi
 * det er sådan AI-assistenter citerer dem.
 *
 * Alle fakta stammer fra handelsbetingelserne, Solutions-siden og
 * forsideteksten. Hvor et tal mangler, står der en TODO ESKE-kommentar
 * i stedet for et gæt.
 */

export interface FaqItem {
  q: string;
  a: string;
}

/** Bruges på /dj-til-bryllup */
export const FAQ_BRYLLUP: FaqItem[] = [
  {
    q: 'Hvad koster en DJ til bryllup i Aarhus?',
    // TODO ESKE: hvis du på et tidspunkt vil vise en fra-pris, er det her og i
    // FAQ_PRIS nedenfor den skal stå. Lige nu er svaret bevidst uden tal.
    a: 'Prisen afhænger af aftenens længde, lokalets størrelse, hvor meget lys der skal til, og om I ønsker special effekter som konfetti eller cold spark. Derfor får I et konkret tilbud ud fra netop jeres bryllup frem for en standardpris. Skriv eller ring med dato og sted, så vender jeg tilbage med et samlet tilbud. Tilbuddet er gyldigt i 14 dage.',
  },
  {
    q: 'Medbringer du selv lyd og lys til brylluppet?',
    a: 'Ja. Jeg medbringer altid et komplet lyd- og lysanlæg, som tilpasses lokalets størrelse. Anlægget er valgt, så taler kan høres tydeligt under middagen, og dansegulvet har det rigtige tryk uden at blive ubehageligt. I skal kun sørge for plads til opstilling og adgang til 230V strøm.',
  },
  {
    q: 'Spiller du også til brudevalsen?',
    a: 'Ja. Brudevalsen planlægger vi sammen på forhånd, så sangen, lyset og timingen sidder præcist. Mange vælger at lyse brudevalsen op med en cold spark-maskine, der sender kolde gnister op i luften som en stor stjernekaster — uden ild, røg eller brandfare, så den kan bruges indendørs.',
  },
  {
    q: 'Kan vi selv vælge musikken og lave en "spil ikke"-liste?',
    a: 'Ja. Inden brylluppet holder vi et personligt planlægningsmøde, hvor vi gennemgår jeres ønsker, jeres gæster og det, I helst vil undgå. Særlige ønsker, spillelister og tekniske krav skal være meldt ind senest 14 dage før bryllupsdagen, så der er tid til at forberede aftenen ordentligt.',
  },
  {
    q: 'Hvor langt kører du til et bryllup?',
    a: 'Jeg har base i Aarhus og kører op til 150 km derfra. Det dækker hele Østjylland, blandt andet Skanderborg, Silkeborg, Randers, Horsens og Hadsten. Ligger jeres lokation længere væk, så spørg alligevel — det kan sagtens lade sig gøre.',
  },
  {
    q: 'Hvornår er vores dato reserveret?',
    a: 'Datoen er først reserveret, når I skriftligt har accepteret tilbuddet, og der er bekræftet skriftligt fra min side. Ved bookingbekræftelsen betales et depositum på 25% af den samlede pris, og restbeløbet betales senest 14 dage før bryllupsdagen.',
  },
];

/** Bruges på /dj-til-firmafest */
export const FAQ_FIRMAFEST: FaqItem[] = [
  {
    q: 'Kan vi få en faktura som virksomhed?',
    a: 'Ja. Eske Hagen Events er et registreret dansk firma med CVR-nummer 46389344, og betaling sker via bankoverførsel til det kontonummer, der fremgår af fakturaen. Fakturaen kan sendes til jeres bogholderi eller EAN-nummer efter aftale.',
  },
  {
    q: 'Spiller du til julefrokost og sommerfest?',
    a: 'Ja. Julefrokoster, sommerfester, receptioner og firmajubilæer er en fast del af året. Jeg har blandt andet spillet til firmajulefrokoster i Glassalen hos PARK 13 i Aarhus. Julefrokostsæsonen i november og december booker erfaringsmæssigt tidligt, så kontakt mig gerne i god tid.',
  },
  {
    q: 'Hvordan rammer I musikken, når gæsterne er i meget forskellige aldre?',
    a: 'Det er selve opgaven til en firmafest. Med over 22 års erfaring læser jeg rummet løbende og skifter retning, før dansegulvet tømmes, i stedet for at køre en fast liste igennem. Målet er, at generationer mødes på dansegulvet frem for at halvdelen sætter sig ned.',
  },
  {
    q: 'Hvad skal vi selv sørge for som virksomhed?',
    a: 'I skal sikre tilstrækkelig plads og adgang til opstilling af udstyret, adgang til 230V strømforsyning, og at lokalet har KODA/Gramex-tilladelse, hvis det er et krav for arrangementet. Resten — lyd, lys, opsætning og afvikling — står jeg for.',
  },
  {
    q: 'Kan I levere special effekter til en firmafest?',
    a: 'Ja. Gennem samarbejdet med Showgear.dk kan jeg levere konfetti, CO2, røg, sæbebobler, skum, sne og cold spark. Til firmafester bruges effekterne typisk til at markere et bestemt øjeblik — en tale, en prisoverrækkelse eller åbningen af dansegulvet.',
  },
];

/** Bruges på /dj-til-fodselsdag */
export const FAQ_FODSELSDAG: FaqItem[] = [
  {
    q: 'Spiller du til runde fødselsdage?',
    a: 'Ja. Runde fødselsdage — 30, 40, 50, 60 år og opefter — er en stor del af mine events, sammen med jubilæer, konfirmationer og studentergilder. Jeg har blandt andet spillet til havefester og studentergilder i Aarhus-området.',
  },
  {
    q: 'Kan du spille noget, alle aldre kan være med til?',
    a: 'Ja, og det er som regel præcis pointen til en fødselsdag. Når gæstelisten spænder fra børnebørn til kollegaer og gamle venner, tilpasser jeg musikken løbende hen over aftenen, så selskabet holdes samlet i stedet for at dele sig.',
  },
  {
    q: 'Kan I holde festen i privat regi — hjemme eller i et lejet lokale?',
    a: 'Ja. Jeg spiller både i forsamlingshuse, lejede lokaler, telte og private haver. Lyd- og lysanlægget tilpasses lokalets størrelse, så et mindre lokale ikke bliver overdøvet. Der skal blot være plads til opstilling og adgang til 230V strøm.',
  },
  {
    q: 'Kan vi få konfetti til fødselsdagssangen?',
    a: 'Ja. Konfetti er et af de mest brugte indslag til en fødselsdag, typisk timet til fødselsdagssangen eller til at åbne dansegulvet. Alle konfettirør er BAM-testede, brandhæmmende og udviklet til professionel brug, og konfettien fås blandt andet i biologisk nedbrydelige varianter.',
  },
];

/** Bruges på /special-effekter */
export const FAQ_EFFEKTER: FaqItem[] = [
  {
    q: 'Hvad er en gnistmaskine (cold spark), og er den sikker indendørs?',
    a: 'En cold spark-maskine efterligner effekten af en fyrværkerifontæne, men uden at udlede ild, røg, lugt eller høje brag. I stedet sendes kolde gnister op i luften som en stor stjernekaster, og der er ikke brandfare. Derfor kan den bruges både indendørs og udendørs — for eksempel til brudevalsen.',
  },
  {
    q: 'Er konfettien sikker og til at rydde op efter?',
    a: 'Alle konfettirør er BAM-testede, brandhæmmende og udviklet til professionel brug. Konfettien fås i papir, metal-look og biologisk nedbrydelig biofetti, så I kan vælge en variant der passer til lokalet og til stedets regler for oprydning.',
  },
  {
    q: 'Hvilke special effekter kan jeg vælge imellem?',
    a: 'Konfetti og streamers, cold spark (indendørs fyrværkeri), røgmaskiner og håndholdte CO2-guns, sæbebobler, sne, skum, knæklys og UV-tape samt holi powder. Effekterne leveres i samarbejde med Showgear.dk, som har et af markedets største udvalg.',
  },
  {
    q: 'Skal jeg selv bestille effekterne hos Showgear?',
    a: 'Nej. Jeg rådgiver om, hvilke effekter der giver mening til netop jeres event og lokale, og står selv for opsætning og afvikling. I skal kun forholde jer til, hvilke øjeblikke I gerne vil have løftet.',
  },
  {
    q: 'Kan man bruge røg og CO2 i alle lokaler?',
    a: 'Det afhænger af lokalet, blandt andet af ventilation og røgalarmer. Derfor gennemgår vi altid lokalet på forhånd, og jeg rådgiver om, hvad der kan lade sig gøre det pågældende sted. Er røg ikke en mulighed, findes der næsten altid en anden effekt der giver samme løft.',
  },
];

/** Bruges på /faq — den samlede side. */
export const FAQ_GENEREL: FaqItem[] = [
  {
    q: 'Hvad koster det at booke Eske Hagen Events?',
    a: 'Der er ingen fast pris, fordi to fester sjældent kræver det samme. Prisen sættes ud fra aftenens længde, lokalets størrelse, lysopsætningen og eventuelle special effekter. I får et samlet tilbud på jeres event, og tilbuddet er gyldigt i 14 dage fra afsendelsen.',
  },
  {
    q: 'Hvordan booker jeg?',
    a: 'Skriv via kontaktformularen, send en mail til eheventsdk@gmail.com eller ring på +45 50 93 59 52 med dato, sted og eventtype. Derefter tager vi en uforpligtende snak om jeres ønsker, og I får et tilbud. Aftalen er indgået, når tilbuddet er skriftligt accepteret og depositum er modtaget.',
  },
  {
    q: 'Hvordan foregår betalingen?',
    a: 'Betalingsbetingelserne aftales individuelt, men følger typisk samme mønster: 25% i depositum ved bookingbekræftelsen og restbeløbet senest 14 dage før eventet. Betaling sker via bankoverførsel til kontonummeret på fakturaen.',
  },
  {
    q: 'Hvad sker der, hvis vi bliver nødt til at aflyse?',
    a: 'Aflysning skal ske skriftligt. Aflyses der mere end 90 dage før eventet, tilbageholdes depositummet. Mellem 31 og 90 dage før opkræves 50% af den aftalte pris, og fra 30 dage før opkræves 100%. Ændringer i tid, sted eller varighed aftales skriftligt og kan regulere prisen.',
  },
  {
    q: 'Hvad sker der, hvis DJ’en bliver syg?',
    a: 'I det ekstraordinære tilfælde, at jeg er nødt til at aflyse — for eksempel ved sygdom eller force majeure — bliver I orienteret hurtigst muligt, og alle indbetalte beløb refunderes fuldt ud.',
  },
  {
    q: 'Holder I et møde inden festen?',
    a: 'Ja. Der indgår altid et personligt planlægningsmøde eller en grundig snak inden eventet, hvor vi gennemgår forventninger, forløb og musikønsker. Det er erfaringsmæssigt der, forskellen på en god og en rigtig god fest bliver lagt.',
  },
  {
    q: 'Hvor i landet spiller du?',
    a: 'Jeg har base i Aarhus og kører op til 150 km derfra, hvilket dækker hele Østjylland — blandt andet Skanderborg, Silkeborg, Randers, Horsens og Hadsten. Ligger jeres event længere væk, er I velkomne til at spørge alligevel.',
  },
  {
    q: 'Hvad skal vi selv sørge for?',
    a: 'I skal sikre tilstrækkelig plads og adgang til opstilling af udstyret, adgang til 230V strømforsyning, og at lokalet har KODA/Gramex-tilladelse, hvis det kræves for arrangementet. Særlige ønsker, spillelister og tekniske krav skal meldes ind senest 14 dage inden eventet.',
  },
];
