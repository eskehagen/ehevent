// Kunde-anmeldelser vist på forsiden og på /anmeldelser.
//
// Sådan tilføjer/redigerer du en anmeldelse:
// Kopiér et objekt herunder, og udskift name/event/rating/text/date.
// `rating` er antal stjerner (1-5). `event` er en kort label, fx "Bryllup, Aarhus".
// `date` er valgfri og vises som fx "Juni 2026".
//
// Du kan finde/sammenligne med de rigtige anmeldelser her:
// https://share.google/jyONMkaHh6qCOPWP2

export interface Review {
  name: string;
  event: string;
  rating: number;
  text: string;
  date?: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Lisbeth & Anders",
    event: "Bryllup, Aarhus",
    rating: 5,
    text: "Super professionel og nem at kommunikere med op til eventet. Lyd og lys var i topklasse, og han ramte musikken perfekt til vores blandede gæsteflok. Kan varmt anbefales!",
    date: "August 2025",
  },
  {
    name: "Julie & Mads",
    event: "Bryllupsfest, Aarhus",
    rating: 5,
    text: "Vi fik et personligt møde inden bryllupet, hvor vi planlagde aftenen sammen. Det betød at vi kunne fokusere på at nyde vores egen fest med vores gæster. Vi følte os helt trygge i Eskes hænder..",
    date: "Juni 2025",
  },
  {
    name: "Camilla S.",
    event: "Fødselsdagsfest, Aarhus",
    rating: 5,
    text: "Fantastisk energi og super fleksibel omkring vores ønskeliste. Dansegulvet var fyldt fra første til sidste sang. Stor anbefaling herfra!",
    date: "Marts 2025",
  },
  {
    name: "Sophie & Steven",
    event: "Bryllupsfest, PARK 13 Aarhus",
    rating: 5,
    text: "Vi havde en rigtig god oplevelse med Eske som DJ til vores bryllup. Han var gennem hele forløbet tilgængelig og fleksibel, og han tog sig tid til at tale med os om vores ønsker og forventninger til festen. Til selve festen var der rigtig god energi og der var masser af fest på dansegulvet. Vi kan varmt anbefale Eske.",
    date: "August 2026",
  },
];
