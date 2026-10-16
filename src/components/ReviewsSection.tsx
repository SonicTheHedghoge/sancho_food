import React, { useState } from 'react';
import { AUTHENTIC_REVIEWS, CustomerReview, RESTAURANT_INFO } from '../data/restaurantData';
import { Star, MessageSquare, ThumbsUp, CheckCircle, ExternalLink, PenSquare, X, Camera } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(AUTHENTIC_REVIEWS);
  const [activeFilter, setActiveFilter] = useState<'all' | '5stars' | 'withPhotos' | 'localGuides'>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newContent, setNewContent] = useState('');
  const [newSeating, setNewSeating] = useState('Terrasse extérieure');
  const [newCuisineRating, setNewCuisineRating] = useState(5);
  const [hasSubmittedSuccess, setHasSubmittedSuccess] = useState(false);

  const filteredReviews = reviewsList.filter((rev) => {
    if (activeFilter === '5stars') return rev.rating === 5;
    if (activeFilter === 'withPhotos') return !!rev.photoUrl;
    if (activeFilter === 'localGuides') return !!rev.isLocalGuide;
    return true;
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) return;

    const created: CustomerReview = {
      id: `review-${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      date: "À l'instant",
      content: newContent.trim(),
      pricePerPerson: '10–20 DT',
      ratingsBreakdown: {
        cuisine: newCuisineRating,
        service: 5,
        ambiance: 5,
        waitTime: 'Rapide (< 10 min)',
        seatingType: newSeating,
      },
      likesCount: 1,
    };

    setReviewsList([created, ...reviewsList]);
    setHasSubmittedSuccess(true);
    setTimeout(() => {
      setHasSubmittedSuccess(false);
      setIsWriteModalOpen(false);
      setNewAuthor('');
      setNewContent('');
    }, 1500);
  };

  const handleLike = (id: string) => {
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likesCount: (r.likesCount || 0) + 1 } : r))
    );
  };

  return (
    <section id="avis" className="py-16 sm:py-24 bg-neutral-900/60 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title & rating summary */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Avis Google Maps Vérifiés</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ce que nos clients disent de nous
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Plus de 64 clients ont partagé leur expérience chez Sancho Food sur l'Avenue de l'environnement à Djerba Midoun.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <PenSquare className="w-4 h-4" />
              <span>Rédiger un avis</span>
            </button>

            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-neutral-700 transition-colors"
            >
              <span>Voir sur Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>
        </div>

        {/* Global Score Card & Breakdown Banner */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 mb-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Big 4.7 Rating */}
            <div className="md:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left border-b md:border-b-0 md:border-r border-neutral-800 pb-6 md:pb-0 md:pr-8">
              <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                4,7
              </span>
              <div className="flex items-center gap-1 my-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-neutral-400 font-medium">
                Basé sur <strong className="text-white">64 avis certifiés</strong> sur Google Maps
              </span>
              <div className="mt-3 text-[11px] text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl">
                Prix moyen : 10–20 DT par personne
              </div>
            </div>

            {/* Star Distribution Bars */}
            <div className="md:col-span-4 space-y-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="w-3 text-neutral-400 font-bold">5</span>
                <div className="flex-1 h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[85%]"></div>
                </div>
                <span className="text-neutral-400 font-mono text-[11px]">85%</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-3 text-neutral-400 font-bold">4</span>
                <div className="flex-1 h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400/80 rounded-full w-[12%]"></div>
                </div>
                <span className="text-neutral-400 font-mono text-[11px]">12%</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-3 text-neutral-400 font-bold">3</span>
                <div className="flex-1 h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400/60 rounded-full w-[3%]"></div>
                </div>
                <span className="text-neutral-400 font-mono text-[11px]">3%</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-3 text-neutral-400 font-bold">2</span>
                <div className="flex-1 h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400/30 rounded-full w-[0%]"></div>
                </div>
                <span className="text-neutral-400 font-mono text-[11px]">0%</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-3 text-neutral-400 font-bold">1</span>
                <div className="flex-1 h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400/20 rounded-full w-[0%]"></div>
                </div>
                <span className="text-neutral-400 font-mono text-[11px]">0%</span>
              </div>
            </div>

            {/* Sub-aspect ratings */}
            <div className="md:col-span-4 grid grid-cols-3 gap-2 text-center border-t md:border-t-0 md:border-l border-neutral-800 pt-6 md:pt-0 md:pl-8">
              <div className="bg-neutral-900/60 p-3 rounded-2xl border border-neutral-800">
                <div className="text-xl font-black text-amber-400">5.0</div>
                <div className="text-[11px] text-neutral-400 mt-1 font-semibold">Cuisine</div>
              </div>
              <div className="bg-neutral-900/60 p-3 rounded-2xl border border-neutral-800">
                <div className="text-xl font-black text-amber-400">5.0</div>
                <div className="text-[11px] text-neutral-400 mt-1 font-semibold">Service</div>
              </div>
              <div className="bg-neutral-900/60 p-3 rounded-2xl border border-neutral-800">
                <div className="text-xl font-black text-amber-400">5.0</div>
                <div className="text-[11px] text-neutral-400 mt-1 font-semibold">Ambiance</div>
              </div>
            </div>

          </div>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-amber-500 text-neutral-950 font-black'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            Tous les avis ({reviewsList.length})
          </button>
          <button
            onClick={() => setActiveFilter('5stars')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === '5stars'
                ? 'bg-amber-500 text-neutral-950 font-black'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            ⭐ 5 Étoiles
          </button>
          <button
            onClick={() => setActiveFilter('withPhotos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === 'withPhotos'
                ? 'bg-amber-500 text-neutral-950 font-black'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            📸 Avec photos des plats
          </button>
          <button
            onClick={() => setActiveFilter('localGuides')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === 'localGuides'
                ? 'bg-amber-500 text-neutral-950 font-black'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            🏅 Guides Locaux Google
          </button>
        </div>

        {/* Reviews Cards Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-neutral-950/90 border border-neutral-800/90 hover:border-neutral-700 rounded-3xl p-6 flex flex-col justify-between shadow-lg transition-all"
            >
              <div className="space-y-4">
                {/* Author row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {rev.avatar ? (
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        className="w-11 h-11 rounded-full object-cover border border-amber-500/40"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm border border-amber-500/30">
                        {rev.author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm">{rev.author}</span>
                        {rev.isLocalGuide && (
                          <span
                            title="Google Local Guide"
                            className="w-3.5 h-3.5 rounded-full bg-amber-400 flex items-center justify-center text-neutral-950 text-[9px] font-black"
                          >
                            ★
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {rev.guideStats || 'Client vérifié'}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] text-neutral-500 whitespace-nowrap font-medium">
                    {rev.date}
                  </span>
                </div>

                {/* Rating stars & price info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-neutral-800 text-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                  {rev.pricePerPerson && (
                    <span className="text-[11px] text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-lg border border-neutral-800">
                      {rev.pricePerPerson}
                    </span>
                  )}
                </div>

                {/* Content text */}
                <p className="text-neutral-200 text-sm leading-relaxed">
                  "{rev.content}"
                </p>

                {/* Attached user photo if available */}
                {rev.photoUrl && (
                  <div className="rounded-2xl overflow-hidden border border-neutral-800 h-44 bg-neutral-900 group relative">
                    <img
                      src={rev.photoUrl}
                      alt="Photo plat client"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-neutral-950/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-neutral-300 flex items-center gap-1">
                      <Camera className="w-3 h-3 text-amber-400" />
                      <span>Photo partagée par {rev.author.split(' ')[0]}</span>
                    </div>
                  </div>
                )}

                {/* Detailed criteria badge if available */}
                {rev.ratingsBreakdown && (
                  <div className="pt-2 flex flex-wrap gap-2 text-[10px] text-neutral-400">
                    <span className="bg-neutral-900 px-2 py-1 rounded-md border border-neutral-800">
                      Cuisine : <strong className="text-amber-400">{rev.ratingsBreakdown.cuisine}/5</strong>
                    </span>
                    <span className="bg-neutral-900 px-2 py-1 rounded-md border border-neutral-800">
                      Service : <strong className="text-amber-400">{rev.ratingsBreakdown.service}/5</strong>
                    </span>
                    <span className="bg-neutral-900 px-2 py-1 rounded-md border border-neutral-800">
                      Ambiance : <strong className="text-amber-400">{rev.ratingsBreakdown.ambiance}/5</strong>
                    </span>
                    {rev.ratingsBreakdown.waitTime && (
                      <span className="bg-neutral-900 px-2 py-1 rounded-md border border-neutral-800">
                        Attente : {rev.ratingsBreakdown.waitTime}
                      </span>
                    )}
                  </div>
                )}

                {/* Owner Reply */}
                {rev.ownerReply && (
                  <div className="mt-3 bg-neutral-900/90 border-l-2 border-amber-500 p-3 rounded-r-2xl text-xs space-y-1">
                    <div className="flex items-center justify-between text-neutral-400 font-bold text-[11px]">
                      <span className="text-amber-400">Réponse de Sancho Food</span>
                      <span>{rev.ownerReply.date}</span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed text-[11px]">
                      {rev.ownerReply.content}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom interactions */}
              <div className="pt-4 mt-4 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-500">
                <button
                  onClick={() => handleLike(rev.id)}
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>J'aime ({rev.likesCount || 0})</span>
                </button>

                <span className="text-[11px] text-neutral-500">Avis certifié Google</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold text-white mb-2">
              Partager votre avis sur Sancho Food
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Votre retour compte énormément pour toute l'équipe de Sancho Food à Djerba Midoun !
            </p>

            {hasSubmittedSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Merci pour votre avis !</h4>
                <p className="text-xs text-neutral-400">
                  Votre avis est maintenant affiché sur le site.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-400 mb-1">
                    Votre Nom ou Pseudo
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Ex: Mohamed K."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-400 mb-1">
                    Note globale
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-sm font-bold text-amber-400 ml-2">
                      {newRating} / 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-400 mb-1">
                    Votre expérience (pain, frites, service, ambiance...)
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Le Makloub était chaud et croustillant, service rapide et terrasse très agréable !"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-400 mb-1">
                    Espace repas
                  </label>
                  <select
                    value={newSeating}
                    onChange={(e) => setNewSeating(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Terrasse extérieure">Terrasse extérieure animée</option>
                    <option value="Salle intérieure climatisée">Salle intérieure climatisée</option>
                    <option value="À emporter / Drive">À emporter / Drive</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black py-3 rounded-xl text-sm transition-transform active:scale-98 shadow-md shadow-amber-500/20 cursor-pointer"
                  >
                    Publier mon avis
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
