import React, { useState } from 'react';
import { MenuItem, RESTAURANT_INFO } from '../data/restaurantData';
import { X, Trash2, Plus, Minus, MessageCircle, Phone, ShoppingBag, ArrowRight } from 'lucide-react';

export interface CartItem {
  item: MenuItem;
  quantity: number;
  note?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'emporter' | 'surplace'>('emporter');
  const [customerName, setCustomerName] = useState('');

  const totalPrice = cart.reduce((acc, current) => acc + current.item.price * current.quantity, 0);

  const generateWhatsAppMessage = () => {
    let msg = `*Nouvelle Commande Sancho Food - Djerba Midoun*\n`;
    if (customerName.trim()) {
      msg += `👤 Client : ${customerName.trim()}\n`;
    }
    msg += `📍 Type : ${orderType === 'emporter' ? 'À emporter / Drive' : 'Repas sur place'}\n\n`;
    msg += `*Détails des plats :*\n`;

    cart.forEach((c) => {
      msg += `• ${c.quantity}x ${c.item.name} (${(c.item.price * c.quantity).toFixed(1)} DT)\n`;
      if (c.note) {
        msg += `   _Note : ${c.note}_\n`;
      }
    });

    msg += `\n💰 *Total : ${totalPrice.toFixed(1)} DT*\n\n`;
    msg += `Merci de confirmer la commande et le temps de préparation !`;

    return encodeURIComponent(msg);
  };

  const handleWhatsAppOrder = () => {
    const encoded = generateWhatsAppMessage();
    const url = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-neutral-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Votre Commande</h3>
                <p className="text-xs text-neutral-400">
                  {cart.length === 0 ? 'Panier vide' : `${cart.reduce((a, b) => a + b.quantity, 0)} article(s)`}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-neutral-900 text-neutral-600 rounded-3xl flex items-center justify-center mx-auto text-2xl">
                  🍕
                </div>
                <h4 className="text-base font-bold text-white">Votre panier est encore vide</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  Découvrez nos makloub, pizzas croustillantes et sandwichs pour composer votre repas.
                </p>
                <button
                  onClick={onClose}
                  className="text-xs font-bold text-amber-400 underline hover:text-amber-300"
                >
                  Voir la carte du restaurant
                </button>
              </div>
            ) : (
              cart.map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="bg-neutral-900/80 border border-neutral-800/80 rounded-2xl p-4 flex gap-3.5 shadow-sm"
                >
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-neutral-950"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {cartItem.item.name}
                        </h4>
                        <span className="text-xs font-black text-amber-400 whitespace-nowrap">
                          {(cartItem.item.price * cartItem.quantity).toFixed(1)} DT
                        </span>
                      </div>
                      {cartItem.note && (
                        <p className="text-[11px] text-amber-300/80 italic mt-0.5">
                          "{cartItem.note}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-1 border-t border-neutral-800/60">
                      <div className="flex items-center gap-2 bg-neutral-950 px-2.5 py-1 rounded-xl border border-neutral-800">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                          className="text-neutral-400 hover:text-white p-0.5"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-white w-4 text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                          className="text-neutral-400 hover:text-white p-0.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, 0)}
                        className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout actions */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-neutral-800 bg-neutral-900/90 space-y-4">
              {/* Order options */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setOrderType('emporter')}
                    className={`p-2 rounded-xl border font-bold text-center cursor-pointer ${
                      orderType === 'emporter'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    🚗 À emporter / Drive
                  </button>
                  <button
                    onClick={() => setOrderType('surplace')}
                    className={`p-2 rounded-xl border font-bold text-center cursor-pointer ${
                      orderType === 'surplace'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    🍽️ Sur place (Terrasse)
                  </button>
                </div>

                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Votre nom ou numéro (facultatif)"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Total Row */}
              <div className="flex items-center justify-between text-sm pt-2 border-t border-neutral-800">
                <span className="text-neutral-400 font-semibold">Total estimé :</span>
                <span className="text-xl font-black text-amber-400">
                  {totalPrice.toFixed(1)} DT
                </span>
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black py-3 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-neutral-950" />
                  <span>Commander via WhatsApp Direct</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                    className="flex-1 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Appeler 28 884 401</span>
                  </a>

                  <button
                    onClick={onClearCart}
                    className="px-3 py-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-500 hover:text-red-400 rounded-xl text-xs"
                    title="Vider le panier"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
