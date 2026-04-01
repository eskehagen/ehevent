import React, { useState } from 'react';
import { Music, Zap, PartyPopper } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { GalleryModal } from '../components/GalleryModal';

const EFFECTS_DATA = [
  { 
    title: "Konfetti", 
    description: "Alt fra håndholdte rør med konfetti, streamers eller biofetti - til elektriske rør i maskiner. Fås i mange størrelser, varianter og farver. Alle konfetti rør er BAM testet, brandhæmmende og udviklet til professionelle.",
    img: "https://picsum.photos/seed/confetti/600/400",
    gallery: [
      "https://picsum.photos/seed/confetti-tubes/1200/800",
      "https://picsum.photos/seed/confetti1/1200/800",
      "https://picsum.photos/seed/confetti2/1200/800",
      "https://picsum.photos/seed/confetti3/1200/800",
    ]
  },
  { 
    title: "Gnister / indendørs fyrværkeri", 
    description: "Gnistmaskine (cold spark) der efterligner effekten af fyrværkerifontæner uden at udlede ild, røg, lugt eller høje brag. I stedet sendes kolde gnister op i luften uden brandfare. Kan bruges både inde- og udendørs. Sæt prikken over i'et på brudevalsen eller løbende på dansegulvet.",
    img: "https://picsum.photos/seed/sparks/600/400",
    gallery: [
      "https://picsum.photos/seed/sparks1/1200/800",
      "https://picsum.photos/seed/sparks2/1200/800",
      "https://picsum.photos/seed/sparks3/1200/800",
    ]
  },
  { 
    title: "Røg og CO2", 
    description: "Professionelle røgmaskiner der skaber visuelle effekter, samt håndholdt CO2 guns der skyder hvid røg.",
    img: "https://picsum.photos/seed/smoke/600/400",
    gallery: [
      "https://picsum.photos/seed/smoke1/1200/800",
      "https://picsum.photos/seed/smoke2/1200/800",
      "https://picsum.photos/seed/smoke3/1200/800",
    ]
  },
  { 
    title: "Sæbebobler", 
    description: "Professionelle boblemaskiner, der producerer tusindvis af bobler i minuttet. Fyld den røde løber eller dansegulvet med sæbebobler for at få en flot visuel effekt.",
    img: "https://picsum.photos/seed/bubbles/600/400",
    gallery: [
      "https://picsum.photos/seed/bubbles1/1200/800",
      "https://picsum.photos/seed/bubbles2/1200/800",
    ]
  },
  { 
    title: "Sne", 
    description: "Skab en vinterlig stemning med kraftige snemaskiner. Få et realistisk snefald af skumbaserede fnug dalende ned over dansegulvet.",
    img: "https://picsum.photos/seed/snow/600/400",
    gallery: [
      "https://picsum.photos/seed/snow1/1200/800",
      "https://picsum.photos/seed/snow2/1200/800",
    ]
  },
  { 
    title: "Skum", 
    description: "Den ultimative feststarter til skumfester. Vores skumkanoner producerer enorme mængder allergivenligt og sikkert skum på kort tid. Perfekt til sommerfester og events.",
    img: "https://picsum.photos/seed/foam/600/400",
    gallery: [
      "https://picsum.photos/seed/foam1/1200/800",
      "https://picsum.photos/seed/foam2/1200/800",
    ]
  },
];

export const Solutions = () => {
  const [selectedEffect, setSelectedEffect] = useState<{title: string, gallery: string[]} | null>(null);

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
              I samarbejde med Showgear.dk tilbyder jeg markedets bedste og største udvalg af special effekter og maskiner. Alt fra konfetti til indendørs fyrværkeri. Alt sammen til fordelagtige priser. Jeg rådgiver altid om bedste løsninger specifikt til dit event.</p>
              <div className="mt-6">
                <h4 className="text-gold text-sm uppercase tracking-wider mb-3">I samarbejde med <a href="https://www.showgear.dk" target="_blank" rel="noopener noreferrer" className="hover:underline">Showgear.dk</a>:</h4>
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
              Se nærmere på alle de special effekter, som jeg tilbyder til alle typer events. I samarbejde med Showgear.dk sikrer jeg topprofessionelt udstyr og et kæmpe udvalg af muligheder. 
              <br />
              Alt fra konfetti til indendørs fyrværkeri.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {EFFECTS_DATA.map((effect, i) => (
                <div key={i}>
                  <Reveal delay={i * 0.1}>
                    <div 
                      className="effect-item-card cursor-pointer group"
                      onClick={() => setSelectedEffect({ title: effect.title, gallery: effect.gallery })}
                    >
                      <div className="effect-img-wrapper relative">
                        <img src={effect.img} alt={effect.title} referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs uppercase tracking-widest font-medium bg-black/40 px-4 py-2 backdrop-blur-sm">Se Galleri</span>
                        </div>
                      </div>
                      <div className="effect-info">
                        <h4 className="effect-title">{effect.title}</h4>
                        <p className="text-muted text-sm mt-2 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">{effect.description}</p>
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
        />
      </section>
    </div>
  );
};
