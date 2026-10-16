export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestedAction?: {
    type: 'whatsapp' | 'menu_category' | 'call';
    label: string;
    payload?: string;
  };
}

export async function sendChatMessage(messages: { role: string; content: string }[]): Promise<string> {
  const lastUserMessage = messages[messages.length - 1]?.content || '';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, message: lastUserMessage }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply) {
        return data.reply;
      }
    }
  } catch (err) {
    console.warn('Backend chat unreachable, utilizing local AI culinary engine:', err);
  }

  // Local fallback culinary response engine for Chef Sancho
  const lower = lastUserMessage.toLowerCase();

  if (lower.includes('bonjour') || lower.includes('salut') || lower.includes('hello') || lower.includes('aslema') || lower.includes('marhba')) {
    return "Marhba bikom fi Sancho Food ! 🍕 Bienvenue chez votre pizzeria & fast-food préféré à Djerba Midoun. Que souhaitez-vous déguster aujourd'hui ? Nos fameux Makloub, nos pizzas croustillantes ou un sandwich chaud ?";
  }

  if (lower.includes('makloub') || lower.includes('sandwich') || lower.includes('pain')) {
    return "Notre Makloub est la spécialité n°1 de Midoun ! 🔥 Pâte fraîche pétrie et cuite minute au four, garnie d'escalope marinée tendre (10 DT), de thon (9 DT) ou de viande hachée (12 DT), avec frites dorées, fromage filant et sauce piquante maison.";
  }

  if (lower.includes('pizza') || lower.includes('margherita') || lower.includes('fromage') || lower.includes('4 saison')) {
    return "Nos pizzas artisanales sont préparées avec amour ! Du classique Margherita (8 DT) à la riche 4 Saisons Spéciale (16 DT), ou encore la Neptune au thon de Méditerranée (11 DT). La pâte est légère, croustillante et bien garnie !";
  }

  if (lower.includes('prix') || lower.includes('combien') || lower.includes('tarif') || lower.includes('dinar') || lower.includes('dt')) {
    return "Nos prix sont très abordables pour une qualité maximale (entre 8 DT et 18 DT par plat, comptez 10 à 20 DT par personne avec boisson). Les pizzas commencent à 8 DT, les sandwiches à partir de 7 DT et le makloub à 9-10 DT !";
  }

  if (lower.includes('ouvert') || lower.includes('horaire') || lower.includes('ferme') || lower.includes('nuit')) {
    return "Nous sommes ouverts tous les jours 7j/7 de 16h00 jusqu'à 01h00 du matin ! Idéal pour un dîner en famille ou une pause gourmande nocturne à Midoun.";
  }

  if (lower.includes('ou') || lower.includes('adresse') || lower.includes('localis') || lower.includes('carte') || lower.includes('ou se trouve')) {
    return "Nous sommes situés sur l'Avenue de l'environnement, Djerba Midoun 4116 (Plus Code: RX8M+G9). Vous pouvez repérer notre grande enseigne lumineuse 'Sancho Food' et notre terrasse extérieure !";
  }

  if (lower.includes('commande') || lower.includes('livraison') || lower.includes('whatsapp') || lower.includes('appeler') || lower.includes('numéro')) {
    return "Pour passer commande à emporter ou réserver votre table, contactez-nous directement par WhatsApp ou appel au +216 28 884 401 ! Votre commande sera prête en quelques minutes.";
  }

  if (lower.includes('vegetarien') || lower.includes('sans viande')) {
    return "Nous proposons une délicieuse Pizza Margherita (8 DT), la Pizza 4 Fromages (15 DT), des salades fraîches tunisiennes ou notre Makloub végétarien au fromage fondant et légumes grillés.";
  }

  return "Marhba bik chez Sancho Food à Djerba Midoun ! Vous pouvez commander à emporter ou déguster sur notre terrasse au 28 884 401. Avez-vous une envie de pizza, makloub, baguette farcie ou burger ce soir ?";
}
