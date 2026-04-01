import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: string[];
}

export const GalleryModal = ({ isOpen, onClose, title, images }: GalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

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

          <div className="relative w-full max-w-5xl aspect-video flex items-center justify-center">
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-0 md:-left-16 text-white/50 hover:text-white transition-colors p-2"
                >
                  <ChevronLeft size={48} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-0 md:-right-16 text-white/50 hover:text-white transition-colors p-2"
                >
                  <ChevronRight size={48} />
                </button>
              </>
            )}

            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={images[currentIndex]}
              alt={`${title} ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain shadow-2xl"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
