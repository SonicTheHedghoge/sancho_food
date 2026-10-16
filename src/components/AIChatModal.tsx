import React, { useState, useRef, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { sendChatMessage, ChatMessage } from '../api/chatClient';
import { MessageSquareText, X, Send, Sparkles, Phone, MessageCircle, Bot, User, RotateCcw } from 'lucide-react';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose, initialQuery }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Marhba bikom fi Sancho Food ! 🍕 Je suis **Chef Sancho**, votre assistant gourmand à Djerba Midoun. Que souhaitez-vous savoir sur nos pizzas, nos fameux makloub chauds ou pour préparer votre commande ?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestionChips = [
    '🌯 Quel est le meilleur sandwich ?',
    '🍕 Recommande-moi une pizza',
    '🕒 Êtes-vous ouverts tard ce soir ?',
    '🌶️ Vos plats sont-ils très piquants ?',
    '📍 Où se trouve Sancho Food à Midoun ?',
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
      scrollToBottom();
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSend(initialQuery);
    }
  }, [initialQuery, isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const replyText = await sendChatMessage(
        newHistory.map((m) => ({ role: m.role, content: m.content }))
      );

      const botMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content:
          "Désolé, j'étais occupé près du four à pizza ! Vous pouvez aussi joindre directement l'équipe au +216 28 884 401.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content:
          "Conversation réinitialisée ! Comment puis-je vous aider pour votre repas chez Sancho Food ?",
        timestamp: new Date(),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-neutral-950 border border-neutral-800 rounded-t-3xl sm:rounded-3xl max-w-lg w-full h-[88vh] sm:h-[620px] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-neutral-900 border-b border-neutral-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-500 bg-neutral-950">
                <img
                  src={RESTAURANT_INFO.logoUrl}
                  alt="Chef Sancho"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-neutral-900 rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-sm">Chef Sancho IA</span>
                <span className="bg-amber-500/20 text-amber-400 text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                  Gemini Flash
                </span>
              </div>
              <div className="text-[11px] text-neutral-400">
                Assistant Culinaire • Sancho Food Midoun
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleResetChat}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title="Nouvelle conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs shrink-0 mt-0.5 border border-amber-500/30">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 font-medium rounded-tr-none'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-tl-none whitespace-pre-wrap'
                  }`}
                >
                  {msg.content}

                  <div
                    className={`text-[9px] mt-1.5 ${
                      isUser ? 'text-neutral-900/70 text-right' : 'text-neutral-500'
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-neutral-400 text-xs py-2 px-3 bg-neutral-900/60 rounded-xl w-fit">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Chef Sancho prépare sa réponse...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2 border-t border-neutral-900 bg-neutral-950 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {suggestionChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="text-[11px] whitespace-nowrap bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-300 px-3 py-1.5 rounded-full border border-neutral-800 transition-colors shrink-0 cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Quick order shortcuts */}
        <div className="px-4 py-2 bg-neutral-900/40 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-400">
          <span className="text-[11px]">Commandes directes :</span>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Bonjour%20Sancho%20Food%20!%20Je%20souhaite%20passer%20une%20commande.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:underline font-bold text-[11px]"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Direct</span>
            </a>
            <span>•</span>
            <a
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 text-amber-400 hover:underline font-bold text-[11px]"
            >
              <Phone className="w-3 h-3" />
              <span>28 884 401</span>
            </a>
          </div>
        </div>

        {/* Input box */}
        <div className="p-3 bg-neutral-900 border-t border-neutral-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Posez votre question à Chef Sancho..."
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-40 text-neutral-950 flex items-center justify-center font-bold transition-all shadow-md shadow-amber-500/20 shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
