import React from 'react';
import { ImageIcon } from 'lucide-react';
import { Reveal } from '../components/Reveal';

export const Gallery = () => {
  return (
    <div className="gallery-page pt-32 pb-20">
      <section id="galleri">
        <div className="gallery-intro">
          <Reveal>
            <div className="section-label">Galleri</div>
            <h2 className="section-title">Fra <em>jobs &amp; events</em></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="gallery-note">Billeder tilføjes løbende — kontakt mig for referencer fra tidligere jobs.</p>
          </Reveal>
        </div>

        <div className="gallery-masonry">
          {["Bryllup", "Firmafest", "Lysshow", "Fødselsdag", 
            "DJ Setup", "Event", "Voksenfest", "Lys & Stemning"
          ].map((label, i) => (
            <div key={i}>
              <Reveal delay={i * 0.05}>
                <div className="gitem h-full min-h-[200px]">
                  <div className="gitem-inner">
                    <ImageIcon className="gitem-svg" />
                    <span className="gitem-ph-text">{label}</span>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
