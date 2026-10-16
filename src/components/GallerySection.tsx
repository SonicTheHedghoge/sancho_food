import React, { useState } from 'react';
import { GALLERY_PHOTOS } from '../data/restaurantData';
import { Sparkles, X, ZoomIn, Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY_PHOTOS)[0] | null>(null);

  return (
    <section id="galerie" className="py-16 sm:py-24 bg-neutral-950 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atmosphère & Délices</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            L'Ambiance Sancho Food en Images
          </h2>
          <p className="text-sm text-neutral-400">
            Une ambiance chaleureuse le soir sous les lumières de Djerba Midoun, des ingrédients frais préparés sous vos yeux et un service aux petits soins.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GALLERY_PHOTOS.map((photo, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(photo)}
              className="group relative h-72 rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              {/* Tag chip */}
              <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-xl">
                {photo.tag}
              </div>

              {/* Hover icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-neutral-950/80 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-amber-400" />
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {photo.title}
                </h4>
                <p className="text-xs text-neutral-400 line-clamp-1">
                  {photo.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl cursor-default"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-neutral-900/90 text-neutral-300 hover:text-white flex items-center justify-center border border-neutral-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>

            <div className="p-6 bg-neutral-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-900">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 block">
                  {selectedImage.tag}
                </span>
                <h3 className="text-lg font-bold text-white">{selectedImage.title}</h3>
                <p className="text-xs text-neutral-400 mt-1">{selectedImage.subtitle}</p>
              </div>

              <div className="text-xs text-neutral-500 bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800 whitespace-nowrap self-start sm:self-center">
                Sancho Food • Djerba Midoun
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
