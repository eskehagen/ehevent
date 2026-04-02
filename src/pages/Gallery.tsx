import React, { useState, useEffect } from 'react';
import { Reveal } from '../components/Reveal';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

// Her definerer du stien til dine egne billeder. 
// Læg dine billeder i 'public/images/' mappen i VS Code, og skriv stien herunder.
const GALLERY_IMAGES = [
  { id: 0, src: "/images/events/anker1.jpg", alt: "Mellem størrelse setup. Resturant Anker, Aarhus" },
  { id: 1, src: "/images/events/martino1.jpg", alt: "Lille størrelse setup. Restaurant Martino, Aarhus" },
  { id: 2, src: "/images/events/martino-nytaar.jpg", alt: "Lounge og dansegulv. Restaurant Martino, Aarhus" },
  { id: 3, src: "/images/events/park13-glassal1.jpg", alt: "Stor bryllupsfest. Park13 Glassal, Aarhus" },
  { id: 4, src: "/images/events/park13-glassal2.jpg", alt: "Stor størrelse setup. Park13 Glassal, Aarhus" },
  { id: 5, src: "/images/events/park13-glassal3.jpg", alt: "Stort dansegulv. Park13 Glassal, Aarhus" },
  { id: 6, src: "/images/events/park13-glassal4.jpg", alt: "Stort dansegulv. Park13 Glassal, Aarhus" },
  { id: 7, src: "/images/events/park13-jul.jpg", alt: "Firma julefrokost. Park13 Glassal, Aarhus" },
  { id: 7, src: "/images/events/park13-jul2.jpg", alt: "Firma julefrokost. Park13 Glassal, Aarhus" },
  { id: 8, src: "/images/events/park13-welness1.jpg", alt: "Mellem størrelse setup. Park13 Wellness Huset , Aarhus" },
  { id: 8, src: "/images/events/park13-welness2.jpg", alt: "Mellem størrelse setup. Park13 Wellness Huset , Aarhus" },
  { id: 8, src: "/images/events/rockchok1.jpg", alt: "Stort lys setup til koncert. Sløjfen, Hadsten" },
  { id: 8, src: "/images/events/rockchok2.jpg", alt: "Stort lys setup til koncert. Sløjfen, Hadsten" },
  { id: 8, src: "/images/events/havefest1.jpg", alt: "Havefest / Studentergilde. Aarhus" },
  { id: 8, src: "/images/events/havefest2.jpg", alt: "Mellem størrelse setup. Studentergilde. Aarhus" },
  { id: 8, src: "/images/events/rockchok3.jpg", alt: "Stort lys setup til koncert. Sløjfen, Hadsten" },
  { id: 8, src: "/images/events/revy1.jpg", alt: "Scene opsætning med sparkular og baglys. Tivoli Friheden, Aarhus" },
  { id: 8, src: "/images/events/revy2.jpg", alt: "Scene opsætning med sparkular og baglys. Tivoli Friheden, Aarhus" },
];

export const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Håndter tastatur (Escape for at lukke, pile for at skifte)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev! + 1) % GALLERY_IMAGES.length);
      if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev! - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  // Forhindr scroll på baggrunden når modal er åben
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedIndex]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev! + 1) % GALLERY_IMAGES.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev! - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  return (
    <div className="gallery-page pt-32 pb-20 min-h-screen">
      <section id="galleri" className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Reveal>
            <div className="section-label justify-center">Galleri</div>
            <h2 className="section-title">Øjeblikke fra <em>Events</em></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted max-w-2xl mx-auto mt-6">
              Gå på opdagelse i billeder fra tidligere events. Alt fra DJ spillejobs til live koncerter. 
              <br />
              Klik på et billede for at se det i fuld størrelse.
            </p>
          </Reveal>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal key={img.id} delay={i * 0.05}>
              <motion.div 
                className="relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid bg-[#141414]"
                whileHover={{ y: -5 }}
                onClick={() => setSelectedIndex(i)}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-gold/90 text-white p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ZoomIn size={24} />
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setSelectedIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-gold transition-colors z-50 p-2"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={32} />
            </button>

            <button 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold transition-colors z-50 p-2 md:p-4"
              onClick={handlePrev}
            >
              <ChevronLeft size={40} />
            </button>

            <button 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold transition-colors z-50 p-2 md:p-4"
              onClick={handleNext}
            >
              <ChevronRight size={40} />
            </button>

            <motion.div 
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={GALLERY_IMAGES[selectedIndex].src} 
                alt={GALLERY_IMAGES[selectedIndex].alt} 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 left-0 right-0 text-center text-white/70 text-sm tracking-widest uppercase">
                {GALLERY_IMAGES[selectedIndex].alt} • {selectedIndex + 1} / {GALLERY_IMAGES.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
