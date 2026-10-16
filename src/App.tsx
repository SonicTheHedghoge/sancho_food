import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { AIChatModal } from './components/AIChatModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { MenuItem, RESTAURANT_INFO } from './data/restaurantData';
import { MessageSquareText, Sparkles, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState<string | undefined>(undefined);

  const cartTotalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleAddToCart = (item: MenuItem, quantity = 1, note?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((c) => c.item.id === item.id && c.note === note);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [...prev, { item, quantity, note }];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((c) => c.item.id !== itemId));
    } else {
      setCart((prev) =>
        prev.map((c) => (c.item.id === itemId ? { ...c, quantity: newQty } : c))
      );
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenChatWithQuery = (query: string) => {
    setChatInitialQuery(query);
    setIsChatOpen(true);
  };

  const handleScrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
      {/* Top Navbar */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChat={() => {
          setChatInitialQuery(undefined);
          setIsChatOpen(true);
        }}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero
          onOpenChat={() => {
            setChatInitialQuery(undefined);
            setIsChatOpen(true);
          }}
          onScrollToMenu={handleScrollToMenu}
        />

        <MenuSection
          onAddToCart={handleAddToCart}
          onOpenChatWithQuery={handleOpenChatWithQuery}
        />

        <ReviewsSection />

        <GallerySection />

        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Chat Assistant Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Floating Callout badge */}
        <div
          onClick={() => {
            setChatInitialQuery(undefined);
            setIsChatOpen(true);
          }}
          className="hidden sm:flex items-center gap-2 bg-neutral-900/95 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 px-3.5 py-1.5 rounded-full shadow-xl text-xs cursor-pointer animate-in fade-in slide-in-from-bottom-2 transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="font-semibold">Une envie ? Demandez à Chef Sancho IA !</span>
        </div>

        <button
          onClick={() => {
            setChatInitialQuery(undefined);
            setIsChatOpen(true);
          }}
          className="relative group w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 flex items-center justify-center shadow-2xl shadow-amber-500/40 hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-amber-300"
          aria-label="Discuter avec l'assistant IA Chef Sancho"
        >
          <div className="w-11 h-11 rounded-full overflow-hidden bg-neutral-950 flex items-center justify-center">
            <img
              src={RESTAURANT_INFO.logoUrl}
              alt="Sancho AI"
              className="w-full h-full object-cover"
              onError={(e) => {
                // fallback if image blocked
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Pulsing indicator */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-neutral-950 rounded-full flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
          </span>
        </button>
      </div>

      {/* Mobile Sticky Order Bar (if cart has items) */}
      {cartTotalCount > 0 && (
        <div className="sm:hidden fixed bottom-6 left-6 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-neutral-900 text-white border border-amber-500/50 px-4 py-3 rounded-full shadow-2xl text-xs font-bold"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Panier ({cartTotalCount})</span>
          </button>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* AI Chat Modal */}
      <AIChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialQuery={chatInitialQuery}
      />
    </div>
  );
}
