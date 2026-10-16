import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Phone, Clock, MapPin, ShoppingBag, MessageSquareText, Menu, X, Star } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-neutral-950/90 border-b border-neutral-800/80 transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 px-4 py-1.5 text-xs font-semibold text-neutral-950 text-center flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-950 animate-pulse"></span>
          <span>Ouvert 7j/7 jusqu'à 01h00 du matin</span>
        </span>
        <span className="hidden sm:inline opacity-70">•</span>
        <span className="hidden sm:inline-flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>Avenue de l'environnement, Djerba Midoun</span>
        </span>
        <span className="hidden md:inline opacity-70">•</span>
        <a
          href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
          className="hidden md:inline-flex items-center gap-1 underline hover:text-black font-bold"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{RESTAURANT_INFO.phoneFormatted}</span>
        </a>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand logo & name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/80 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300 bg-neutral-900">
            <img
              src={RESTAURANT_INFO.logoUrl}
              alt={RESTAURANT_INFO.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to placeholder if imgur blocked
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                {RESTAURANT_INFO.name}
              </span>
              <span className="inline-flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                4.7
              </span>
            </div>
            <span className="text-xs text-neutral-400 font-medium tracking-wide">
              Pizzeria & Fast Food • Djerba Midoun
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="#menu"
            className="text-sm font-semibold text-neutral-300 hover:text-amber-400 transition-colors"
          >
            Notre Menu
          </a>
          <a
            href="#avis"
            className="text-sm font-semibold text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <span>Avis Clients</span>
            <span className="bg-neutral-800 text-neutral-300 text-[11px] px-1.5 py-0.5 rounded-full font-mono">
              64+
            </span>
          </a>
          <a
            href="#galerie"
            className="text-sm font-semibold text-neutral-300 hover:text-amber-400 transition-colors"
          >
            Galerie & Ambiance
          </a>
          <a
            href="#localisation"
            className="text-sm font-semibold text-neutral-300 hover:text-amber-400 transition-colors"
          >
            Accès & Horaires
          </a>
          <button
            onClick={onOpenChat}
            className="text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/30 hover:bg-amber-500/20 transition-all cursor-pointer"
          >
            <MessageSquareText className="w-4 h-4" />
            <span>Assistant IA Chef Sancho</span>
          </button>
        </nav>

        {/* Action buttons (WhatsApp, Call, Cart) */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
            className="hidden sm:inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold border border-neutral-800 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>28 884 401</span>
          </a>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-bold px-4 py-2 rounded-xl text-sm transition-transform active:scale-95 shadow-md shadow-amber-500/25 cursor-pointer"
            aria-label="Voir la commande"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Commande</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center bg-neutral-950 text-amber-400 text-xs font-extrabold w-5 h-5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-900 border border-neutral-800"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drop-down menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/98 border-b border-neutral-800 px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top-3">
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-neutral-200 hover:text-amber-400 py-1"
          >
            🍕 Notre Menu & Spécialités
          </a>
          <a
            href="#avis"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-neutral-200 hover:text-amber-400 py-1 flex items-center justify-between"
          >
            <span>⭐ Avis Clients Certifiés Google</span>
            <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">
              4.7 / 5
            </span>
          </a>
          <a
            href="#galerie"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-neutral-200 hover:text-amber-400 py-1"
          >
            📸 Galerie & Ambiance
          </a>
          <a
            href="#localisation"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-neutral-200 hover:text-amber-400 py-1"
          >
            📍 Localisation & Horaires (Ferme à 01h00)
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenChat();
            }}
            className="w-full text-left text-base font-bold text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/30 flex items-center gap-2"
          >
            <MessageSquareText className="w-5 h-5" />
            <span>Discuter avec l'IA Chef Sancho</span>
          </button>

          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
            <a
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-sm text-neutral-300 font-semibold"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Appeler : {RESTAURANT_INFO.phoneFormatted}</span>
            </a>
            <span className="text-xs text-neutral-500">Midoun 4116</span>
          </div>
        </div>
      )}
    </header>
  );
};
