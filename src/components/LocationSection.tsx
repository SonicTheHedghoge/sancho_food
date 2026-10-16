import React, { useState } from 'react';
import { RESTAURANT_INFO, FAQS } from '../data/restaurantData';
import { MapPin, Phone, Clock, Navigation, Check, Copy, ChevronDown, ChevronUp, Car, Utensils, Wind, SunMedium } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.phoneFormatted);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="localisation" className="py-16 sm:py-24 bg-neutral-900/40 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>Nous Trouver Facilement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Localisation & Informations Pratiques
          </h2>
          <p className="text-sm text-neutral-400">
            Retrouvez-nous au cœur de Djerba Midoun sur l'Avenue de l'environnement, ouvert tous les soirs jusqu'à 01h00 du matin.
          </p>
        </div>

        {/* 2-column layout: Map & Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left: Contact & Hours Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address & Quick Actions Card */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">Adresse Principale</h3>
                  <p className="text-sm text-neutral-300 font-medium">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Plus Code Google Maps : <span className="font-mono text-neutral-400">{RESTAURANT_INFO.plusCode}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 border-t border-neutral-800">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-bold py-2.5 px-4 rounded-xl text-xs transition-transform active:scale-95 shadow-md shadow-amber-500/20"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Itinéraire Google Maps</span>
                </a>

                <button
                  onClick={handleCopyAddress}
                  className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-neutral-800 transition-colors"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone call & WhatsApp */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-bold">
                      Téléphone & WhatsApp
                    </div>
                    <a
                      href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                      className="text-sm font-extrabold text-white hover:text-amber-400 transition-colors"
                    >
                      {RESTAURANT_INFO.phoneFormatted}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white text-xs border border-neutral-800"
                  title="Copier le numéro"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Services badges */}
              <div className="pt-4 border-t border-neutral-800 space-y-2">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Services disponibles
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2 bg-neutral-900/60 p-2 rounded-xl border border-neutral-800/80">
                    <Utensils className="w-3.5 h-3.5 text-amber-400" />
                    <span>Repas sur place</span>
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-900/60 p-2 rounded-xl border border-neutral-800/80">
                    <Car className="w-3.5 h-3.5 text-amber-400" />
                    <span>Drive & À emporter</span>
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-900/60 p-2 rounded-xl border border-neutral-800/80">
                    <SunMedium className="w-3.5 h-3.5 text-amber-400" />
                    <span>Terrasse extérieure</span>
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-900/60 p-2 rounded-xl border border-neutral-800/80">
                    <Wind className="w-3.5 h-3.5 text-amber-400" />
                    <span>Salle climatisée</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Hours Table Card */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Horaires d'Ouverture</h3>
                  <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Ouvert actuellement • Ferme à 01h00</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {RESTAURANT_INFO.hours.days.map((d, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1.5 border-b border-neutral-800/60 last:border-0"
                  >
                    <span className="text-neutral-300 font-medium">{d.day}</span>
                    <span className="font-mono text-amber-400 font-bold">{d.hours}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Embedded Interactive Google Map */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl h-[520px] relative flex flex-col">
            <div className="p-4 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="font-bold text-white">Sancho Food sur la carte de Djerba Midoun</span>
              </div>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Agrandir le plan</span>
                <span>↗</span>
              </a>
            </div>

            <iframe
              title="Localisation Sancho Food Djerba Midoun"
              src={`https://maps.google.com/maps?q=${RESTAURANT_INFO.coordinates.lat},${RESTAURANT_INFO.coordinates.lng}&hl=fr&z=17&output=embed`}
              className="w-full flex-1 border-0 filter contrast-105"
              loading="lazy"
              allowFullScreen
            ></iframe>

            {/* Bottom map overlay tag */}
            <div className="p-4 bg-neutral-950/90 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <span className="font-bold text-white">Sancho Food</span>
                <span className="text-neutral-500">•</span>
                <span>Note Google Maps : ⭐ 4.7 / 5</span>
              </div>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-lg font-bold hover:bg-amber-500/20 transition-colors"
              >
                Ouvrir l'application Maps
              </a>
            </div>
          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto pt-6">
          <h3 className="text-2xl font-black text-white text-center mb-8">
            Foire Aux Questions (FAQ)
          </h3>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-bold text-white">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-900">
                      <p className="pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
