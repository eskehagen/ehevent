import React, { useState } from 'react';
import { Music, Zap, PartyPopper } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { GalleryModal } from '../components/GalleryModal';
import { caption } from 'motion/react-client';

const EFFECTS_DATA = [
  { 
    title: "Konfetti", 
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
    description: "Professionelle boblemaskiner, der producerer tusindvis af bobler i minuttet. Fyld den røde løber eller dansegulvet med sæbebobler for at få en flot visuel effekt.",
    img: "/images/bubbles.jpg",
    gallery: [
      { src: "/images/bubbles.jpg", caption: "Professionelle sæbebobbel maskiner der sender en strøm af bobler ud over dansegulvet." },
      { src: "/images/bubbles1.jpg", caption: "Skab en magisk atmosfære med sæbebobler på dansegulvet eller under brudevalsen." },
    ]
  },
  { 
    title: "Sne", 
    description: "Skab en vinterlig stemning med kraftige snemaskiner. Få et realistisk snefald af skumbaserede fnug dalende ned over dansegulvet.",
    img: "/images/snow.jpg",
    gallery: [
      { src: "/images/snow.jpg", caption: "Kraftige snemaskiner der skaber en vinterlig stemning." },
      { src: "/images/snow1.jpg", caption: "Skab en magisk atmosfære med sne på dansegulvet for at skabe en vinterlig stemning." },
    ]
  },
  { 
    title: "Skum", 
    description: "Den ultimative feststarter til skumfester. Vores skumkanoner producerer enorme mængder allergivenligt og sikkert skum på kort tid. Perfekt til sommerfester og events.",
    img: "/images/foam.jpg",
    gallery: [
      { src: "/images/foam.jpg", caption: "Professionelle skumkanoner i forskellige størrelser, der producerer enorme mængder allergivenligt og sikkert skum på kort tid." },
      { src: "/images/foam1.jpg", caption: "Perfekt til sommerfester og events, hvor skum skaber en unik og sjov atmosfære." },
    ]
  },
  { 
    title: "Knæklys & UV", 
    description: "Klassiske knæklys i høj kvalitet til fester og events. Fås i mange farver og størrelser – perfekte til at skabe stemning på dansegulvet eller som festligt tilbehør til gæsterne. <br /> Farverigt UV-tape tilføjer ekstra effekt under UV lys.",
    img: "/images/knaklys.jpg",
    gallery: [
      { src: "/images/knaklys.jpg", caption: "Klassiske knæklys i høj kvalitet. Fås i forskellige farver og sammensætninger." },
      { src: "/images/uvtape.jpg", caption: "Farverigt UV-tape tilføjer ekstra effekt under UV lys." },
    ]
  },
  { 
    title: "Holi Powder", 
    description: "Farverigt holi powder. Biologisk nedbrydeligt og sikkert for huden. Brugt til fx det kendte Color Runs event.",
    img: "/images/holipowder.jpg",
    gallery: [
      { src: "/images/holipowder.jpg", caption: "Farverigt holi powder. Biologisk nedbrydeligt og sikkert for huden." },
      { src: "/images/colorrun.jpg", caption: "Holi powder i aktion til det kendte Color Runs event." },
      { src: "/images/holipowder2.jpg", caption: "Skab en farverig og festlig atmosfære med holi powder." },
    ]
  },
];

export const Solutions = () => {
  const [selectedEffect, setSelectedEffect] = useState<{title: string, gallery: {src: string; caption?: string}[], description: string} | null>(null);

  return (
    <div className="services-page pt-32 pb-20">
      <section id="services">
        <Reveal>
          <div className="section-label">Løsninger</div>
          <h2 className="section-title">Teknik, Udstyr &amp; <em>Ekspertise</em></h2>
          <p className="max-w-2xl mt-6 text-muted">Her kan du læse mere om de tekniske løsninger og udstyrspakker jeg tilbyder. Jeg lægger vægt på høj kvalitet og driftssikkerhed, så jeres event forløber fejlfrit.</p>
          
        </Reveal>

        <div className="services-grid mt-16">
          <Reveal delay={0.1}>
            <div className="service-card">
              <Music className="service-icon" />
              <div className="service-title">DJ &amp; Musik</div>
              <p className="service-desc">Jeg spiller til alle typer fester, med speciale i bryllupper, firma- og voksenfester. Jeg tilpasser altid musikken til stemningen og jeres ønsker. 
              <br /> <br />
              Lyd er ikke bare volumen. Det handler om klarhed og balance. Jeg medbringer altid udstyr fra anerkendte mærker, der sikrer at både taler kan høres tydeligt, og at dansegulvet har det rigtige tryk uden at det bliver ubehageligt.</p>
              <div className="mt-6">
                <h4 className="text-gold text-sm uppercase tracking-wider mb-3">Hvad er inkluderet:</h4>
                <ul className="service-list">
                  <li>Professionelt lyd- og lysanlæg (tilpasset lokalestørrelse)</li>
                  <li>Musikgenre tilpasset jeres gæster og ønsker</li>
                  <li>Personligt planlægningsmøde før eventet</li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="service-card">
              <PartyPopper className="service-icon" />
              <div className="service-title">Special Effekter</div>
              <p className="service-desc">Drømmer du om noget ekstraordinært til dit event. Jeg tilbyder næsten alle former for special effekter og konfetti løsninger.
              <br /> <br />
              I samarbejde med <a href="https://www.showgear.dk" target="_blank" rel="noopener noreferrer" className="showgear-link">Showgear.dk</a> tilbyder jeg markedets bedste og største udvalg af special effekter og maskiner. Alt fra konfetti til indendørs fyrværkeri. Alt sammen til fordelagtige priser. Jeg rådgiver altid om bedste løsninger specifikt til dit event.</p>
              <div className="mt-6">
                <h4 className="text-gold text-sm uppercase tracking-wider mb-3">I samarbejde med <a href="https://www.showgear.dk" target="_blank" rel="noopener noreferrer" className="showgear-link">Showgear.dk</a>:</h4>
                <ul className="service-list">
                  <li>Konfetti</li>
                  <li>Røg og CO2</li>
                  <li>Gnister / indendørs fyrværkeri</li>
                  <li>Sæbebobler</li>
                  <li>Sne og Skum</li>
                  <li>Rådgivning om teknisk setup</li>
                </ul>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="service-card">
              <Zap className="service-icon" />
              <div className="service-title">Lysopsætning</div>
              <p className="service-desc">Professionel lysopsætning og -afvikling der forvandler et hvilket som helst rum. Fra ambient lys til fuldt showlys med bevægende effekter.
              <br /> <br />
              Med mange års erfaring med lyssætning og -design finder jeg altid den bedste og flotteste opsætning for dit event.</p>
              <div className="mt-6">
                <h4 className="text-gold text-sm uppercase tracking-wider mb-3">Muligheder:</h4>
                <ul className="service-list">
                  <li>Bevægeligt lys</li>
                  <li>Spotlights</li>
                  <li>Advanceret computerstyring for perfekt timing</li>
                  <li>Alt fra scene- og koncert- til diskotek setups</li>
                  <li>Professionel opsætning</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-32">
          <Reveal>
            <div className="section-label">Ekspertise</div>
            <h2 className="section-title mb-6">Special <em>Effekter</em></h2>
            <p className="max-w-3xl text-muted mb-12 leading-relaxed">
              Se nærmere på alle de special effekter, som jeg tilbyder til alle typer events. I samarbejde med <a href="https://www.showgear.dk" target="_blank" rel="noopener noreferrer" className="showgear-link">Showgear.dk</a> sikrer jeg topprofessionelt udstyr og et kæmpe udvalg af muligheder. 
              <br />
              Alt fra konfetti til indendørs fyrværkeri.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {EFFECTS_DATA.map((effect, i) => (
                <div key={i}>
                  <Reveal delay={i * 0.1}>
                    <div 
                      className="effect-item-card cursor-pointer group"
                      onClick={() => setSelectedEffect({ title: effect.title, gallery: effect.gallery, description: effect.description })}
                    >
                      <div className="effect-img-wrapper relative">
                        <img src={effect.img} alt={effect.title} referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs uppercase tracking-widest font-medium bg-black/40 px-4 py-2 backdrop-blur-sm">Se Galleri</span>
                        </div>
                      </div>
                      <div className="effect-info">
                        <h4 className="effect-title">{effect.title}</h4>
                        <p className="text-muted text-sm mt-2 line-clamp-3 group-hover:line-clamp-none transition-all duration-300" dangerouslySetInnerHTML={{ __html: effect.description }} />
                      </div>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <GalleryModal 
          isOpen={!!selectedEffect}
          onClose={() => setSelectedEffect(null)}
          title={selectedEffect?.title || ''}
          images={selectedEffect?.gallery || []}
          description={selectedEffect?.description}
        />
      </section>
    </div>
  );
};
