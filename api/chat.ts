import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
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
- Adresse : Avenue de l'environnement, Djerba Midoun 4116, Tunisie (Plus Code : RX8M+G9 Djerba Midun).
- Note Google Maps : 4.7 étoiles sur plus de 64 avis clients certifiés !
- Horaires : Ouvert 7j/7 jusqu'à 01h00 du matin.
- Téléphone & WhatsApp commande : +216 28 884 401.
- Spécialités : Pizzas artisanales (Margherita 8 DT, Neptune 11 DT, 4 Saisons 14 DT, Sancho Spéciale 18 DT), Makloub chaud garni (Escalope 10 DT, Thon 9 DT, Viande 12 DT), Baguettes farcies, Tacos, Burgers, frites maison croustillantes et sauces tunisiennes.
- Prix moyen : 10 à 20 DT par personne.
- Réponds chaleureusement en Français, Arabe/Tunisien ou Anglais. Aide les clients à choisir et préparer leur commande WhatsApp au +216 28 884 401.
`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, message } = req.body || {};
    const userPrompt = message || (Array.isArray(messages) && messages.length > 0 ? messages[messages.length - 1].content : '');

    if (!userPrompt) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    if (!ai) {
      return res.status(200).json({
        reply: "Marhba bik chez Sancho Food à Djerba Midoun ! 🍕 Nous sommes ouverts tous les jours jusqu'à 01h00. Nos spécialités : pizzas croustillantes, makloub escalope fondant et baguettes farcies ! Commandez au +216 28 884 401.",
      });
    }

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
    return res.status(200).json({ reply });
  } catch (err: any) {
    return res.status(200).json({
      reply: "Marhba bik chez Sancho Food à Djerba Midoun ! Dégustez nos fameux makloub, pizzas au feu de bois et sandwichs au 28 884 401.",
    });
  }
}
