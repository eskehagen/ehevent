/**
 * Katalog over special effekter.
 *
 * Flyttet hertil fra Solutions.tsx, så både /special-effekter (det fulde
 * katalog) og /loesninger (kort omtale + link) kan læse fra samme kilde
 * uden at sige det samme to steder i HTML'en — duplikeret brødtekst på to
 * URL'er er præcis det Google straffer.
 *
 * Teksterne er uændrede fra den oprindelige side.
 */

export interface EffectImage {
  src: string;
  caption?: string;
}

export interface Effect {
  title: string;
  description: string;
  img: string;
  /** Beskrivende alt-tekst til gitterbilledet. */
  alt: string;
  gallery: EffectImage[];
}

export const EFFECTS_DATA: Effect[] = [
  { 
    title: "Konfetti", 
    alt: "Konfettimaskine skyder farvet konfetti ud over dansegulvet til en fest",
    description: "Alt fra håndholdte rør med konfetti, streamers eller biofetti - til elektriske rør i maskiner. Fås i mange størrelser, varianter og farver. Alle konfetti rør er BAM testet, brandhæmmende og udviklet til professionelle.",
    img: "/images/confetti.jpg",
    gallery: [
      { src: "/images/confetti.jpg",  caption: "Konfetti-maskiner til alle typer og størrelser events" },
      { src: "/images/confetti1.jpg", caption: "Konfetti-rør (håndholdt og elektrisk) i mange forskellige farver og typer (papir, bio, metal, streamer)" },
      { src: "/images/confetti2.jpg", caption: "Metal look konfetti (guld, sølv, bronze) Biologisk nedbrydelig" },
      { src: "/images/confetti3.jpg", caption: "Mikro-konfetti i mange forskellige farver" },
      { src: "/images/confetti4.jpg", caption: "Konfetti i bedste kvalitet til dit event" },
    ]
  },
  { 
    title: "Gnister / indendørs fyrværkeri", 
    alt: "Cold spark-maskine sender kolde gnister op i luften under en brudevals indendørs",
    description: "Gnistmaskine (cold spark) der efterligner effekten af fyrværkerifontæner uden at udlede ild, røg, lugt eller høje brag. I stedet sendes kolde gnister op i luften uden brandfare. Kan bruges både inde- og udendørs. Sæt prikken over i'et på brudevalsen eller løbende på dansegulvet.",
    img: "/images/spark.jpg",
    gallery: [
      { src: "/images/spark.jpg", caption: "Sparkular-maskiner til alle typer og størrelser events. Indendørs fyrværkeri uden brandfare." },
      { src: "/images/spark1.jpg", caption: "Maskinen skyder kolde gnister op i luften, som en kæmpe stjernekaster." },
      { src: "/images/spark2.jpg", caption: "Dans brudevalsen lyst op af et imponerende indendørs fyrværkeri." },
    ]
  },
  { 
    title: "Røg og CO2", 
    alt: "Røgmaskine fylder dansegulvet med røg, så lyseffekterne træder frem",
    description: "Professionelle røgmaskiner der skaber visuelle effekter, samt håndholdt CO2 guns der skyder hvid røg.",
    img: "/images/smoke.jpg",
    gallery: [
      { src: "/images/smoke.jpg", caption: "Professionelle røgmaskiner der fylder dansegulvet med røg og forstærker lyseffekterne." },
      { src: "/images/co2-1.jpg", caption: "Håndholdt CO2 gun der skyder hvid røg ud. Perfekt til at sætte ekstra gang i på dansegulvet.", },
      { src: "/images/co2-2.jpg", caption: "Håndholdt CO2 gun der skyder hvid røg ud. Perfekt til at sætte ekstra gang i på dansegulvet.", },
    ]
  },
  { 
    title: "Sæbebobler", 
    alt: "Boblemaskine sender tusindvis af sæbebobler ud over dansegulvet",
    description: "Professionelle boblemaskiner, der producerer tusindvis af bobler i minuttet. Fyld den røde løber eller dansegulvet med sæbebobler for at få en flot visuel effekt.",
    img: "/images/bubbles.jpg",
    gallery: [
      { src: "/images/bubbles.jpg", caption: "Professionelle sæbebobbel maskiner der sender en strøm af bobler ud over dansegulvet." },
      { src: "/images/bubbles1.jpg", caption: "Skab en magisk atmosfære med sæbebobler på dansegulvet eller under brudevalsen." },
    ]
  },
  { 
    title: "Sne", 
    alt: "Snemaskine lader skumbaserede snefnug dale ned over dansegulvet",
    description: "Skab en vinterlig stemning med kraftige snemaskiner. Få et realistisk snefald af skumbaserede fnug dalende ned over dansegulvet.",
    img: "/images/snow.jpg",
    gallery: [
      { src: "/images/snow.jpg", caption: "Kraftige snemaskiner der skaber en vinterlig stemning." },
      { src: "/images/snow1.jpg", caption: "Skab en magisk atmosfære med sne på dansegulvet for at skabe en vinterlig stemning." },
    ]
  },
  { 
    title: "Skum", 
    alt: "Skumkanon fylder festpladsen med hvidt skum til en skumfest",
    description: "Den ultimative feststarter til skumfester. Vores skumkanoner producerer enorme mængder allergivenligt og sikkert skum på kort tid. Perfekt til sommerfester og events.",
    img: "/images/foam.jpg",
    gallery: [
      { src: "/images/foam.jpg", caption: "Professionelle skumkanoner i forskellige størrelser, der producerer enorme mængder allergivenligt og sikkert skum på kort tid." },
      { src: "/images/foam1.jpg", caption: "Perfekt til sommerfester og events, hvor skum skaber en unik og sjov atmosfære." },
    ]
  },
  { 
    title: "Knæklys & UV", 
    alt: "Farverige knæklys og UV-tape lyser op i mørket til fest",
    description: "Klassiske knæklys i høj kvalitet til fester og events. Fås i mange farver og størrelser – perfekte til at skabe stemning på dansegulvet eller som festligt tilbehør til gæsterne. <br /> Farverigt UV-tape tilføjer ekstra effekt under UV lys.",
    img: "/images/knaklys.jpg",
    gallery: [
      { src: "/images/knaklys.jpg", caption: "Klassiske knæklys i høj kvalitet. Fås i forskellige farver og sammensætninger." },
      { src: "/images/uvtape.jpg", caption: "Farverigt UV-tape tilføjer ekstra effekt under UV lys." },
    ]
  },
  { 
    title: "Holi Powder", 
    alt: "Farverigt holi powder kastet i luften til et Color Run-event",
    description: "Farverigt holi powder. Biologisk nedbrydeligt og sikkert for huden. Brugt til fx det kendte Color Runs event.",
    img: "/images/holipowder.jpg",
    gallery: [
      { src: "/images/holipowder.jpg", caption: "Farverigt holi powder. Biologisk nedbrydeligt og sikkert for huden." },
      { src: "/images/colorrun.jpg", caption: "Holi powder i aktion til det kendte Color Runs event." },
      { src: "/images/holipowder2.jpg", caption: "Skab en farverig og festlig atmosfære med holi powder." },
    ]
  },
];
