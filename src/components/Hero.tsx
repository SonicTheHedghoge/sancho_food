import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Star, MapPin, Clock, Phone, Sparkles, Flame, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenChat: () => void;
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat, onScrollToMenu }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-amber-500/15 via-orange-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-amber-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left content column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Trust badge / Google Rating */}
            <div className="inline-flex flex-wrap items-center gap-2.5">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-300 transition-all hover:bg-neutral-800/80 group shadow-sm"
              >
                <div className="flex items-center gap-0.5 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="font-bold text-white">4.7 / 5</span>
                <span className="text-neutral-400">({RESTAURANT_INFO.reviewsCount} avis Google)</span>
                <span className="text-amber-400 text-xs ml-1 group-hover:translate-x-0.5 transition-transform">→</span>
              </a>

              <span className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Ouvert • Ferme à 01h00</span>
              </span>
            </div>

            {/* Main title */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-sm font-black uppercase tracking-widest flex items-center gap-1.5">
                  <Flame className="w-4 h-4 fill-amber-400" />
                  Djerba Midoun • Fast Food & Pizzeria
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Le Goût Authentique & Généreux chez{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
                  Sancho Food
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed">
              Venez savourer nos <strong className="text-white font-semibold">makloub chauds préparés à la minute</strong>, nos <strong className="text-white font-semibold">pizzas croustillantes au four</strong>, baguettes farcies dorées et sandwichs savoureux. Ambiance conviviale en terrasse ou en salle climatisée à Midoun.
            </p>

            {/* Key info chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-neutral-900/70 border border-neutral-800/80 p-3 rounded-2xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Pâte Fraîche Minute</div>
                  <div className="text-[11px] text-neutral-400">Pétrie & cuite au four</div>
                </div>
              </div>

              <div className="bg-neutral-900/70 border border-neutral-800/80 p-3 rounded-2xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Prix Doux Djerba</div>
                  <div className="text-[11px] text-neutral-400">10 à 20 DT / pers.</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-neutral-900/70 border border-neutral-800/80 p-3 rounded-2xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Service Nocturne</div>
                  <div className="text-[11px] text-neutral-400">Ouvert jusqu'à 01h00</div>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onScrollToMenu}
                className="flex items-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black px-6 py-3.5 rounded-2xl text-base shadow-lg shadow-amber-500/20 active:scale-98 transition-all cursor-pointer"
              >
                <span>Découvrir la Carte</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenChat}
                className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold px-5 py-3.5 rounded-2xl text-base border border-amber-500/30 hover:border-amber-400/50 shadow-sm transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Conseils Chef Sancho (IA)</span>
              </button>

              <a
                href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 px-4 py-3.5 rounded-2xl text-sm font-semibold border border-neutral-800 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{RESTAURANT_INFO.phoneFormatted}</span>
              </a>
            </div>

            {/* Address subtitle */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 pt-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Avenue de l'environnement, Djerba Midoun 4116 (Plus Code: RX8M+G9)</span>
            </div>
          </div>

          {/* Right visual card showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main feature image card */}
              <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                  alt="Sancho Food Ambiance Restaurant"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>

                {/* Restaurant Logo badge overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-3 bg-neutral-950/90 backdrop-blur-md p-2 rounded-2xl border border-neutral-700/80 shadow-lg">
                  <img
                    src={RESTAURANT_INFO.logoUrl}
                    alt="Sancho Logo"
                    className="w-10 h-10 rounded-xl object-cover border border-amber-500/50"
                  />
                  <div>
                    <div className="text-xs font-black text-white">Sancho Food</div>
                    <div className="text-[10px] text-amber-400 font-bold">Midoun Djerba</div>
                  </div>
                </div>

                {/* Floating highlight badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-neutral-900/95 backdrop-blur-md border border-neutral-800 p-4 rounded-2xl flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-800 shrink-0 border border-neutral-700">
                      <img
                        src="https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=200&q=80"
                        alt="Makloub Escalope"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">Makloub Escalope</span>
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded">
                          N°1
                        </span>
                      </div>
                      <div className="text-xs text-neutral-400">Pain minute + frites + fromage</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-amber-400">10 DT</span>
                    <div className="text-[10px] text-neutral-400">Cuit à la minute</div>
                  </div>
                </div>
              </div>

              {/* Floating review preview snippet */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-neutral-950/95 backdrop-blur-md border border-neutral-800 p-3.5 rounded-2xl items-center gap-3 shadow-2xl max-w-xs animate-bounce-subtle">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80"
                  alt="Laetitia Flores"
                  className="w-9 h-9 rounded-full object-cover border border-amber-500/60 shrink-0"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-white">Laetitia Flores</span>
                    <span className="text-[10px] text-amber-400">★ 5.0</span>
                  </div>
                  <p className="text-[11px] text-neutral-300 line-clamp-1">
                    "Très bon vraiment, frites et sandwich chaud, accueil très propre !"
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
