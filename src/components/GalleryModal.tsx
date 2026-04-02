import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  caption?: string;
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: GalleryImage[];
  description?: string;
}

export const GalleryModal = ({ isOpen, onClose, title, images, description }: GalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % images.length);
      else if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, onClose]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 md:p-10"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[210]"
          >
            <X size={32} />
          </button>

          <div className="absolute top-6 left-6 z-[210]">
            <h3 className="font-head text-2xl text-white">{title}</h3>
            <p className="text-white/50 text-sm mt-1">{currentIndex + 1} / {images.length}</p>
          </div>

          <div className="relative w-full max-w-5xl aspect-video flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-0 md:-left-16 text-white/50 hover:text-white transition-colors p-2 z-10"
                  >
                    <ChevronLeft size={48} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 md:-right-16 text-white/50 hover:text-white transition-colors p-2 z-10"
                  >
                    <ChevronRight size={48} />
                  </button>
                </>
              )}

              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={images[currentIndex].src}
                alt={images[currentIndex].caption || `${title} ${currentIndex + 1}`}
                className="max-h-full max-w-full object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />

              {(images[currentIndex].caption || description) && (
                <motion.div
                  key={`caption-${currentIndex}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 pt-10 pb-4 pointer-events-none"
                >
                  <p
                    className="text-white/90 text-sm text-center leading-relaxed drop-shadow"
                    dangerouslySetInnerHTML={{ __html: images[currentIndex].caption || description || '' }}
                  />
                </motion.div>
              )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
