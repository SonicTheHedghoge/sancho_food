import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY;
const isRealApiKey = apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '';

const ai = isRealApiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const RESTAURANT_KNOWLEDGE = `
Tu es "Chef Sancho", l'assistant IA officiel et chaleureux du restaurant "Sancho Food", situé à Djerba Midoun en Tunisie.
Informations clés sur Sancho Food :
- Adresse : Avenue de l'environnement, Djerba Midoun 4116, Tunisie (Plus Code : RX8M+G9 Djerba Midun).
- Note Google Maps : 4.7 étoiles sur plus de 64 avis clients certifiés !
- Horaires : Ouvert 7 jours sur 7, de 16h00 jusqu'à 01h00 du matin.
- Téléphone & WhatsApp commande : +216 28 884 401 (28 884 401).
- Ambiance : Espace intérieur moderne et propre, terrasse extérieure conviviale, idéal en famille, entre amis ou après la plage.
- Services : Repas sur place, service au comptoir rapide, commande à emporter (takeaway) et drive.
- Gamme de prix : Ultra abordable, entre 8 et 20 DT (Dinars Tunisiens) par personne.

Menu & Spécialités phares :
1. Les Pizzas artisanales :
   - Margherita (sauce tomate maison, mozzarella fondante, origan) : 8 DT
   - Neptune / Thon (mozzarella, thon de qualité, câpres, olives) : 11 DT
   - Reine / Regina (jambon de dinde, champignons, mozzarella) : 13 DT
   - 4 Saisons (champignons, poivrons, olives, jambon, fromage) : 14 DT
   - 4 Saisons Spéciale (garniture généreuse du chef) : 16 DT
   - Viande Hachée (viande hachée assaisonnée, oignons, fromage) : 15 DT
   - 4 Fromages (mozzarella, gouda, bleu, fromage blanc crémeux) : 15 DT
   - Calzone soufflée : 13 DT
   - Sancho Spéciale (viande, escalope, sauce secrète, double fromage) : 18 DT
   - Fruits de Mer (crevettes, calamars, ail doux) : 20 DT

2. Les Spécialités Djerba & Tunisiennes :
   - Le fameux Makloub (pain pâte fraîche cuite minute, plié avec sauce, frites, salade, fromage fondant) :
     * Makloub Escalope marinée : 10 DT (Best-seller absolu !)
     * Makloub Thon & Fromage : 9 DT
     * Makloub Viande hachée : 12 DT
     * Makloub Cordon Bleu : 11 DT
   - Baguette Farcie au four croustillante : Escalope (11 DT), Thon (10 DT), Viande Hachée (13 DT)
   - Sandwiches chauds : Escalope grillée (8.5 DT), Escalope panée (9 DT), Sandwich Foie (11 DT), Cordon Bleu (9.5 DT), Chawarma (9 DT), Thon (7 DT)
   - Tacos français gratinés : Tacos simple (10 DT), Tacos double (15 DT)
   - Libanais moelleux : Escalope ou Viande (9.5 DT)
   - Burgers gourmands : Classic Burger (8 DT), Cheese Burger (9.5 DT), Sancho Giant Burger (16 DT)
   - Plats / Assiettes : Assiette Escalope grillée avec frites & salades fraîches (16 DT)
   - Accompagnements : Frites dorées croustillantes (3.5 DT), sauces artisanales (harissa arbi, mayonnaise maison, sauce blanche à l'ail, sauce algérienne, barbecue).
   - Boissons : Boga Cidre, Boga Lim, Coca-Cola, Fanta, eau minérale Safia (2.5 DT à 4 DT).

Directives de réponse :
- Sois très accueillant, dynamique, poli et convivial (un vrai accueil tunisien chaleureux !).
- Réponds couramment en Français, en Arabe / Darija tunisienne si le client parle en arabe ("Marhba bikom fi Sancho Food !"), ou en Anglais.
- Donne des recommandations précises selon les goûts (ex: s'il cherche du piquant, recommande la harissa arbi ou le makloub escalope bien garni).
- Si le client souhaite commander, aide-le à récapituler ses articles avec le prix total en DT et propose-lui de cliquer sur le bouton de commande WhatsApp direct ou d'appeler le 28 884 401.
- Garde un ton direct, enthousiaste et concis.
`;

// AI Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, message } = req.body;
    const userPrompt = message || (Array.isArray(messages) && messages.length > 0 ? messages[messages.length - 1].content : '');

    if (!userPrompt) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    if (!ai) {
      // Smart offline fallback if GEMINI_API_KEY is not configured
      const lower = userPrompt.toLowerCase();
      let reply = "Marhba bik chez Sancho Food à Djerba Midoun ! 🍕 Nous sommes situés Avenue de l'environnement, ouverts tous les jours jusqu'à 01h00. Nos spécialités : pizzas croustillantes, makloub escalope fondant et baguettes farcies ! Vous pouvez commander directement au +216 28 884 401.";
      
      if (lower.includes('makloub') || lower.includes('sandwich')) {
        reply = "Notre Makloub est notre star incontournable ! 🌯 Pain pétri et cuit à la minute, garni d'escalope marinée juteuse, fromage fondant, frites et sauces au choix (10 DT). Nous avons aussi les baguettes farcies et sandwichs chawarma !";
      } else if (lower.includes('pizza') || lower.includes('prix')) {
        reply = "Nos pizzas artisanales sont cuites avec amour ! Margherita à 8 DT, Neptune au thon à 11 DT, 4 Saisons à 14 DT, et notre Sancho Spéciale généreuse à 18 DT. Tout est frais et fait maison !";
      } else if (lower.includes('horaire') || lower.includes('heure') || lower.includes('ouvert')) {
        reply = "Sancho Food est ouvert 7 jours sur 7 jusqu'à 01h00 du matin ! Idéal pour un dîner convivial en terrasse ou une faim nocturne à Djerba.";
      } else if (lower.includes('ou') || lower.includes('adresse') || lower.includes('localisation') || lower.includes('midoun')) {
        reply = "Nous sommes situés sur l'Avenue de l'environnement à Djerba Midoun 4116 (Plus Code: RX8M+G9). Espace climatisé intérieur et superbe terrasse extérieure avec vue !";
      } else if (lower.includes('commander') || lower.includes('livraison') || lower.includes('telephone') || lower.includes('numéro')) {
        reply = "Pour commander à emporter ou réserver une table, appelez-nous ou envoyez un WhatsApp directement au +216 28 884 401 !";
      }

      return res.json({ reply });
    }

    // Build context with history
    const conversationHistory: string[] = [];
    if (Array.isArray(messages)) {
      for (const m of messages.slice(-6)) {
        conversationHistory.push(`${m.role === 'user' ? 'Client' : 'Chef Sancho'}: ${m.content}`);
      }
    } else {
      conversationHistory.push(`Client: ${userPrompt}`);
    }

    const fullPrompt = `Historique récent :\n${conversationHistory.join('\n')}\nClient: ${userPrompt}\nChef Sancho:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: RESTAURANT_KNOWLEDGE,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Marhba bik chez Sancho Food ! Comment puis-je vous régaler aujourd'hui ?";
    res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    res.json({
      reply: "Marhba bik chez Sancho Food à Djerba Midoun ! 🌯 Nos clients raffolent de notre **Makloub Escalope marinée** (10 DT), de nos pizzas artisanales cuites au four (à partir de 8 DT) et de nos baguettes farcies croustillantes. Commandez au +216 28 884 401 !",
    });
  }
});

// Restaurant Info Endpoint
app.get('/api/info', (_req, res) => {
  res.json({
    name: 'Sancho Food',
    tagline: 'Pizzeria & Fast Food Artisanal à Djerba Midoun',
    rating: 4.7,
    reviewsCount: 64,
    address: "Avenue de l'environnement, Djerba Midoun 4116, Tunisie",
    plusCode: 'RX8M+G9 Djerba Midun',
    phone: '+216 28 884 401',
    whatsapp: '21628884401',
    closingTime: '01:00',
    priceRange: '10–20 DT',
    logoUrl: 'https://i.imgur.com/iodTKrh.jpeg',
    googleMapsUrl: 'https://www.google.com/maps/place/Sancho+Food/@33.8162939,10.9807979,1003m/data=!3m2!1e3!4b1!4m6!3m5!1s0x13aa9712c82dec97:0xfc9b9887b801a7da!8m2!3d33.8162939!4d10.9833782!16s%2Fg%2F11yzt9ym6j',
  });
});

async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sancho Food server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
