import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Star, MapPin, Phone, Clock, MessageCircle, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          
          {/* Brand & summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-500 bg-neutral-900">
                <img
                  src={RESTAURANT_INFO.logoUrl}
                  alt={RESTAURANT_INFO.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">{RESTAURANT_INFO.name}</h3>
                <p className="text-xs text-amber-400 font-semibold">
                  Pizzeria & Fast Food • Djerba Midoun
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              L'adresse incontournable à Djerba Midoun pour savourer des makloub généreux cuits minute, des pizzas dorées au four et des sandwichs chauds. Terrasse conviviale et salle climatisée.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-white font-bold">4.7 / 5</span>
              <span className="text-xs text-neutral-500">• 64 avis Google</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  🍕 Carte & Spécialités
                </a>
              </li>
              <li>
                <a href="#avis" className="hover:text-amber-400 transition-colors">
                  ⭐ Avis Clients Google Maps
                </a>
              </li>
              <li>
                <a href="#galerie" className="hover:text-amber-400 transition-colors">
                  📸 Galerie Photos & Terrasse
                </a>
              </li>
              <li>
                <a href="#localisation" className="hover:text-amber-400 transition-colors">
                  📍 Localisation & Accès
                </a>
              </li>
              <li>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  🗺️ Fiche Officielle Google Maps
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact & Horaires
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ouvert 7j/7 jusqu'à 01h00 du matin</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {RESTAURANT_INFO.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 font-semibold"
                >
                  WhatsApp Direct : +216 28 884 401
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Required mention */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-neutral-500 text-center sm:text-left">
            © {new Date().getFullYear()} Sancho Food. Tous droits réservés. Djerba Midoun, Tunisie.
          </div>

          {/* User Requested Credit */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-neutral-300 px-3 py-1.5 rounded-full font-medium shadow-sm hover:border-amber-500/40 transition-colors">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>demo par daghari adem</span>
            </span>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Retour en haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
