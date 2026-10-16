import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, MenuItem } from '../data/restaurantData';
import { Search, Flame, Sparkles, Plus, Check, Info, X } from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, quantity?: number, note?: string) => void;
  onOpenChatWithQuery?: (query: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, onOpenChatWithQuery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [itemNote, setItemNote] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Toute la Carte', icon: '🍽️' },
    { id: 'pizzas', label: 'Pizzas Artisanales', icon: '🍕' },
    { id: 'makloub', label: 'Makloub & Farcies', icon: '🌯' },
    { id: 'sandwiches', label: 'Sandwichs & Tacos', icon: '🥪' },
    { id: 'burgers', label: 'Burgers & Plats', icon: '🍔' },
    { id: 'drinks', label: 'Boissons & Frites', icon: '🍟' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Spicy filter
      if (filterSpicyOnly && !item.isSpicy) {
        return false;
      }
      // Veg filter
      if (filterVegOnly && !item.isVegetarian) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngr = item.ingredients.some((ing) => ing.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesIngr;
      }
      return true;
    });
  }, [activeCategory, searchQuery, filterSpicyOnly, filterVegOnly]);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item, 1);
    setAddedItemEffect(item.id);
    setTimeout(() => {
      setAddedItemEffect(null);
    }, 1200);
  };

  const handleOpenDetailModal = (item: MenuItem) => {
    setSelectedItemForModal(item);
    setItemQuantity(1);
    setItemNote('');
  };

  const handleConfirmModalAdd = () => {
    if (selectedItemForModal) {
      onAddToCart(selectedItemForModal, itemQuantity, itemNote);
      setAddedItemEffect(selectedItemForModal.id);
      setTimeout(() => setAddedItemEffect(null), 1200);
      setSelectedItemForModal(null);
    }
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-neutral-950 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>Frais, Cuit Minute & Généreux</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Notre Menu Gourmand
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            De nos fameux <strong className="text-neutral-200">Makloub chauds</strong> au pain cuit minute jusqu’à nos <strong className="text-neutral-200">pizzas artisanales</strong> croustillantes. Commandez à emporter ou dégustez sur notre terrasse à Djerba Midoun.
          </p>
        </div>

        {/* Search & filters bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-neutral-900/60 p-4 rounded-3xl border border-neutral-800">
          {/* Search box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une pizza, makloub, escalope..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs"
              >
                Effacer
              </button>
            )}
          </div>

          {/* Quick toggle chips */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
            <button
              onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                filterSpicyOnly
                  ? 'bg-red-500/20 text-red-400 border-red-500/50'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              <span>🌶️ Harissa / Épicé</span>
            </button>

            <button
              onClick={() => setFilterVegOnly(!filterVegOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                filterVegOnly
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              <span>🌱 Végétarien</span>
            </button>

            {onOpenChatWithQuery && (
              <button
                onClick={() => onOpenChatWithQuery("Recommande-moi les 3 meilleurs plats de Sancho Food pour ce soir")}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommandation IA</span>
              </button>
            )}
          </div>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 shadow-md shadow-amber-500/20'
                    : 'bg-neutral-900/80 text-neutral-300 hover:bg-neutral-800 border border-neutral-800/80'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu items grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="text-4xl">🔍</div>
            <h3 className="text-lg font-bold text-white">Aucun plat ne correspond à votre recherche</h3>
            <p className="text-sm text-neutral-400">
              Essayez d'ajuster vos filtres ou posez la question directement à notre chef virtuel.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setFilterSpicyOnly(false);
                setFilterVegOnly(false);
              }}
              className="text-xs font-bold text-amber-400 underline hover:text-amber-300 cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isAddedJustNow = addedItemEffect === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenDetailModal(item)}
                  className="group relative bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-amber-500/40 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-amber-500/10 cursor-pointer"
                >
                  <div>
                    {/* Image thumbnail & badges */}
                    <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent"></div>

                      {/* Badge indicator */}
                      {item.badge && (
                        <div className="absolute top-3 left-3 bg-amber-500/90 backdrop-blur-md text-neutral-950 font-black text-[11px] px-2.5 py-1 rounded-xl shadow-md">
                          {item.badge}
                        </div>
                      )}

                      {/* Spicy / Veg icon */}
                      <div className="absolute top-3 right-3 flex items-center gap-1">
                        {item.isSpicy && (
                          <span
                            title="Plat relevé / Harissa"
                            className="bg-red-950/80 border border-red-500/40 text-red-400 text-xs px-2 py-0.5 rounded-lg font-bold backdrop-blur-md"
                          >
                            🌶️
                          </span>
                        )}
                        {item.isVegetarian && (
                          <span
                            title="Végétarien"
                            className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs px-2 py-0.5 rounded-lg font-bold backdrop-blur-md"
                          >
                            🌱
                          </span>
                        )}
                      </div>

                      {/* Price pill */}
                      <div className="absolute bottom-3 right-3 bg-neutral-950/90 backdrop-blur-md border border-neutral-700/80 px-3 py-1 rounded-xl text-amber-400 font-black text-sm">
                        {item.price.toFixed(1)} DT
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </h3>
                      </div>

                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Ingredients tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.ingredients.slice(0, 3).map((ing, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-neutral-950 border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded-md"
                          >
                            {ing}
                          </span>
                        ))}
                        {item.ingredients.length > 3 && (
                          <span className="text-[10px] text-neutral-500 self-center">
                            +{item.ingredients.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card bottom actions */}
                  <div className="p-5 pt-0 border-t border-neutral-800/40 flex items-center justify-between gap-3 mt-3">
                    <span className="text-xs text-neutral-500 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      <span>Cliquer pour détails</span>
                    </span>

                    <button
                      onClick={(e) => handleQuickAdd(item, e)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isAddedJustNow
                          ? 'bg-emerald-500 text-neutral-950'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-neutral-950'
                      }`}
                    >
                      {isAddedJustNow ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Ajouté !</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Ajouter</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Item Detail & Customization Modal */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            {/* Close button */}
            <button
              onClick={() => setSelectedItemForModal(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-neutral-950/80 hover:bg-neutral-950 text-neutral-400 hover:text-white rounded-full flex items-center justify-center border border-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal image */}
            <div className="relative h-56 w-full">
              <img
                src={selectedItemForModal.image}
                alt={selectedItemForModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <span className="text-2xl font-black text-white">
                  {selectedItemForModal.name}
                </span>
                <div className="text-amber-400 font-extrabold text-lg">
                  {selectedItemForModal.price.toFixed(1)} DT
                </div>
              </div>
            </div>

            {/* Modal content */}
            <div className="p-6 space-y-4">
              <p className="text-sm text-neutral-300 leading-relaxed">
                {selectedItemForModal.description}
              </p>

              <div>
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Composition & Ingrédients
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItemForModal.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="text-xs bg-neutral-950 text-neutral-300 px-3 py-1 rounded-xl border border-neutral-800"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Special instructions note */}
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Préférences (sauces, harissa, sans oignons...)
                </label>
                <input
                  type="text"
                  value={itemNote}
                  onChange={(e) => setItemNote(e.target.value)}
                  placeholder="Ex: Harissa bien pimentée, beaucoup de mayonnaise, sans olives"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Quantity selector and submit */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 bg-neutral-950 px-3 py-1.5 rounded-2xl border border-neutral-800">
                  <button
                    onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white font-bold"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-white text-sm w-5 text-center">
                    {itemQuantity}
                  </span>
                  <button
                    onClick={() => setItemQuantity(itemQuantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleConfirmModalAdd}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black py-3 px-4 rounded-2xl text-sm transition-transform active:scale-98 shadow-md shadow-amber-500/20"
                >
                  Ajouter au panier ({(selectedItemForModal.price * itemQuantity).toFixed(1)} DT)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
