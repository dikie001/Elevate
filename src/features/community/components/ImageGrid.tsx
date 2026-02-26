import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGridProps {
  images: string[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (images.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="mt-2 border-y border-border">
      {/* Grid Layout */}
      <div
        className={`grid gap-0.5 overflow-hidden ${
          images.length === 1
            ? "grid-cols-1"
            : images.length === 2
              ? "grid-cols-2"
              : "grid-cols-2"
        }`}
        style={{ height: images.length === 1 ? "auto" : "400px" }}
      >
        {images.slice(0, 4).map((img, idx) => (
          <div
            key={idx}
            className={`relative cursor-pointer hover:opacity-95 transition-opacity ${
              images.length === 3 && idx === 0 ? "row-span-2" : ""
            } ${images.length > 4 && idx === 3 ? "brightness-50" : ""}`}
            onClick={() => setSelectedImage(idx)}
          >
            <img
              src={img}
              alt={`Post content ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            {images.length > 4 && idx === 3 && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                +{images.length - 4}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 lg:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-8 w-8" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  className="absolute left-6 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-[110]"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="h-10 w-10" />
                </button>
                <button
                  className="absolute right-6 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-[110]"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-10 w-10" />
                </button>
              </>
            )}

            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={images[selectedImage]}
              alt="Full size"
              className="max-w-full max-h-full object-contain cursor-default"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
