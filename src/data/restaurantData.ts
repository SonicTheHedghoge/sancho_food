export interface MenuItem {
  id: string;
  name: string;
  category: 'pizzas' | 'makloub' | 'sandwiches' | 'burgers' | 'drinks';
  price: number; // in DT (Tunisian Dinars)
  description: string;
  ingredients: string[];
  image: string;
  badge?: 'Best-Seller' | 'Spécialité du Chef' | 'Coup de Cœur' | 'Nouveau' | 'Recommandé' | 'Populaire';
  isSpicy?: boolean;
  isVegetarian?: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  avatar?: string;
  isLocalGuide?: boolean;
  guideStats?: string;
  rating: number; // 1 to 5
  date: string;
  content: string;
  pricePerPerson?: string;
  ratingsBreakdown?: {
    cuisine: number;
    service: number;
    ambiance: number;
    waitTime: string;
    seatingType: string;
  };
  photoUrl?: string;
  ownerReply?: {
    date: string;
    content: string;
  };
  likesCount?: number;
}

export const RESTAURANT_INFO = {
  name: 'Sancho Food',
  subtitle: 'Pizzeria & Fast Food Artisanal',
  tagline: 'Le Goût Authentique, Chaud et Généreux à Djerba Midoun',
  logoUrl: 'https://i.imgur.com/iodTKrh.jpeg',
  rating: 4.7,
  reviewsCount: 64,
  priceRange: '10–20 DT',
  phone: '28 884 401',
  phoneFormatted: '+216 28 884 401',
  whatsappNumber: '21628884401',
  address: "Avenue de l'environnement, Djerba Midoun 4116",
  city: 'Djerba Midoun',
  country: 'Tunisie',
  plusCode: 'RX8M+G9 Djerba Midun',
  coordinates: {
    lat: 33.8162939,
    lng: 10.9833782,
  },
  googleMapsUrl:
    'https://www.google.com/maps/place/Sancho+Food/@33.8162939,10.9807979,1003m/data=!3m2!1e3!4b1!4m6!3m5!1s0x13aa9712c82dec97:0xfc9b9887b801a7da!8m2!3d33.8162939!4d10.9833782!16s%2Fg%2F11yzt9ym6j',
  hours: {
    general: 'Tous les jours : 16h00 – 01h00 du matin',
    openUntil: '01:00',
    days: [
      { day: 'Lundi', hours: '16:00 – 01:00', isOpen: true },
      { day: 'Mardi', hours: '16:00 – 01:00', isOpen: true },
      { day: 'Mercredi', hours: '16:00 – 01:00', isOpen: true },
      { day: 'Jeudi', hours: '16:00 – 01:00', isOpen: true },
      { day: 'Vendredi', hours: '16:00 – 01:00', isOpen: true },
      { day: 'Samedi', hours: '16:00 – 01:00', isOpen: true },
      { day: 'Dimanche', hours: '16:00 – 01:00', isOpen: true },
    ],
  },
  services: [
    { label: 'Repas sur place', available: true, icon: 'Utensils' },
    { label: 'Service de drive & à emporter', available: true, icon: 'Car' },
    { label: 'Terrasse extérieure conviviale', available: true, icon: 'SunMedium' },
    { label: 'Espace climatisé intérieur', available: true, icon: 'Wind' },
    { label: 'Commande rapide WhatsApp', available: true, icon: 'MessageCircle' },
  ],
  authorCredit: 'demo par daghari adem',
};

export const MENU_ITEMS: MenuItem[] = [
  // PIZZAS
  {
    id: 'pizza-margherita',
    name: 'Pizza Margherita',
    category: 'pizzas',
    price: 8.0,
    description: 'Sauce tomate cuisinée maison, mozzarella fondante djerbienne, huile d’olive et origan séché au soleil.',
    ingredients: ['Sauce tomate maison', 'Mozzarella', 'Huile d’olive', 'Origan'],
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    badge: 'Coup de Cœur',
    isVegetarian: true,
  },
  {
    id: 'pizza-neptune',
    name: 'Pizza Neptune (Thon)',
    category: 'pizzas',
    price: 11.0,
    description: 'La favorite des Djerbiens : généreuse en thon de premier choix, mozzarella filante, câpres piquantes et olives noires.',
    ingredients: ['Sauce tomate', 'Mozzarella', 'Thon de Méditerranée', 'Câpres', 'Olives noires'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    badge: 'Best-Seller',
  },
  {
    id: 'pizza-4-saisons',
    name: 'Pizza 4 Saisons',
    category: 'pizzas',
    price: 14.0,
    description: 'Assortiment gourmand de champignons frais sautés, poivrons croquants, jambon de dinde, olives et fromage fondant.',
    ingredients: ['Sauce tomate', 'Mozzarella', 'Champignons', 'Poivrons', 'Jambon de dinde', 'Olives'],
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pizza-4-saisons-speciale',
    name: 'Pizza 4 Saisons Spéciale',
    category: 'pizzas',
    price: 16.0,
    description: 'Recette exclusive du chef avec double portion de fromage, mélange charcutier premium, légumes grillés et herbes aromatiques.',
    ingredients: ['Sauce tomate riche', 'Double mozzarella', 'Champignons', 'Jambon', 'Salami de boeuf', 'Poivrons', 'Olives'],
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80',
    badge: 'Spécialité du Chef',
  },
  {
    id: 'pizza-regina',
    name: 'Pizza Regina',
    category: 'pizzas',
    price: 13.0,
    description: 'La classique reine avec sauce tomate veloutée, jambon délicat, champignons frais et mozzarella dorée au four.',
    ingredients: ['Sauce tomate', 'Mozzarella', 'Jambon de dinde', 'Champignons de Paris', 'Origan'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pizza-viande-hachee',
    name: 'Pizza Viande Hachée',
    category: 'pizzas',
    price: 15.0,
    description: 'Viande hachée pur boeuf assaisonnée aux épices tunisiennes, oignons confits, persil frais et mozzarella.',
    ingredients: ['Sauce tomate', 'Mozzarella', 'Viande hachée pur bœuf', 'Oignons caramélisés', 'Épices'],
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pizza-4-fromages',
    name: 'Pizza 4 Fromages',
    category: 'pizzas',
    price: 15.0,
    description: 'Pour les amoureux de fromage : alliance savoureuse de mozzarella fondante, gouda affiné, bleu crémeux et emmental.',
    ingredients: ['Sauce tomate ou crème', 'Mozzarella', 'Gouda', 'Bleu', 'Emmental'],
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
  },
  {
    id: 'pizza-sancho-speciale',
    name: 'Pizza Sancho Spéciale',
    category: 'pizzas',
    price: 18.0,
    description: 'La création suprême de la maison : escalope marinée, viande hachée, poivrons sautés, sauce blanche maison et double fromage.',
    ingredients: ['Sauce tomate', 'Escalope marinée', 'Viande hachée', 'Poivrons', 'Sauce Sancho secrète', 'Double mozzarella'],
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    badge: 'Spécialité du Chef',
    isSpicy: true,
  },
  {
    id: 'pizza-fruits-de-mer',
    name: 'Pizza Fruits de Mer',
    category: 'pizzas',
    price: 20.0,
    description: 'Pêche fraîche méditerranéenne : crevettes marinées, calamars tendres, ail doux persillé et filet d’huile d’olive extra vierge.',
    ingredients: ['Sauce tomate', 'Mozzarella', 'Crevettes royales', 'Calamars', 'Ail doux', 'Persil frais'],
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    badge: 'Recommandé',
  },

  // MAKLOUB & BAGUETTES FARCIES
  {
    id: 'makloub-escalope',
    name: 'Makloub Escalope (Signature)',
    category: 'makloub',
    price: 10.0,
    description: 'L’étoile de Sancho Food : pâte fraîche cuite à la commande, garnie d’escalope de poulet marinée juteuse, fromage filant, frites chaudes, salade croquante et sauces au choix.',
    ingredients: ['Pain pâte fraîche minute', 'Escalope de poulet marinée', 'Fromage fondant', 'Frites dorées', 'Salade fraîche', 'Harissa arbi & Mayo'],
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    badge: 'Best-Seller',
    isSpicy: true,
  },
  {
    id: 'makloub-thon',
    name: 'Makloub Thon & Fromage',
    category: 'makloub',
    price: 9.0,
    description: 'Le grand classique tunisien dans sa pâte dorée croustillante à souhait : thon à l’huile, mozzarella, salade méchouia douce et frites.',
    ingredients: ['Pâte fraîche', 'Thon de Méditerranée', 'Mozzarella', 'Salade méchouia', 'Frites', 'Sauce blanche'],
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'makloub-viande-hachee',
    name: 'Makloub Viande Hachée',
    category: 'makloub',
    price: 12.0,
    description: 'Généreuse viande pur bœuf sautée aux oignons et persil, enfermée dans une pâte chaude débordante de fromage fondu.',
    ingredients: ['Pâte minute', 'Viande hachée assaisonnée', 'Double fromage', 'Frites', 'Salade croquante', 'Sauce algérienne'],
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
    badge: 'Recommandé',
  },
  {
    id: 'makloub-cordon-bleu',
    name: 'Makloub Cordon Bleu',
    category: 'makloub',
    price: 11.0,
    description: 'Cordon bleu croustillant tranché chaud avec cœur coulant de fromage, enveloppé dans la pâte signature de Sancho Food.',
    ingredients: ['Pâte minute', 'Cordon bleu doré', 'Cheddar fondant', 'Frites', 'Salade', 'Sauce barbecue & blanche'],
    image: 'https://images.unsplash.com/photo-1627042633706-01a5e0409843?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'baguette-farcie-escalope',
    name: 'Baguette Farcie Escalope au Four',
    category: 'makloub',
    price: 11.0,
    description: 'Pain baguette artisanal garni et gratiné au four : escalope, fromage râpé coulant, poivrons et frites.',
    ingredients: ['Baguette artisanale', 'Escalope marinée', 'Fromage gratiné', 'Frites', 'Sauce douce'],
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    badge: 'Coup de Cœur',
  },
  {
    id: 'baguette-farcie-viande',
    name: 'Baguette Farcie Viande Hachée',
    category: 'makloub',
    price: 13.0,
    description: 'Baguette bien dorée et croustillante au four, garnie de viande hachée savoureuse, sauce piquante et généreux fromage.',
    ingredients: ['Baguette artisanale', 'Viande hachée', 'Fromage fondu', 'Frites', 'Harissa arbi'],
    image: 'https://images.unsplash.com/photo-1549611016-3a70d82b5040?auto=format&fit=crop&w=800&q=80',
    isSpicy: true,
  },

  // SANDWICHES & TACOS
  {
    id: 'sandwich-escalope-grillee',
    name: 'Sandwich Escalope Grillée',
    category: 'sandwiches',
    price: 8.5,
    description: 'Escalope de poulet grillée à la plancha, assaisonnée de cumin et d’ail, servie avec frites croustillantes et salade.',
    ingredients: ['Pain frais', 'Escalope grillée', 'Salade', 'Tomates', 'Frites', 'Sauce au choix'],
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sandwich-escalope-panee',
    name: 'Sandwich Escalope Panée',
    category: 'sandwiches',
    price: 9.0,
    description: 'Escalope panée ultra croustillante, dorée à la perfection, servie bien chaude avec sauces gourmandes et frites.',
    ingredients: ['Pain croustillant', 'Escalope panée dorée', 'Fromage', 'Frites', 'Sauce tartare ou mayo'],
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sandwich-foie',
    name: 'Sandwich Foie Grillé',
    category: 'sandwiches',
    price: 11.0,
    description: 'Spécialité prisée : foie d’agneau sauté minute avec piments, oignons doux et persil, relevé à la harissa.',
    ingredients: ['Pain baguette', 'Foie sauté à la poêle', 'Piments verts grillés', 'Oignons', 'Cumin', 'Frites'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    badge: 'Spécialité du Chef',
    isSpicy: true,
  },
  {
    id: 'sandwich-cordon-bleu',
    name: 'Sandwich Cordon Bleu',
    category: 'sandwiches',
    price: 9.5,
    description: 'Cordon bleu savoureux, salade craquante, frites maison et mélange de sauces onctueuses.',
    ingredients: ['Pain artisanal', 'Cordon bleu', 'Fromage fondu', 'Frites', 'Sauce barbecue'],
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tacos-simple',
    name: 'Tacos Français Simple',
    category: 'sandwiches',
    price: 10.0,
    description: 'Galette toastée avec 1 viande au choix (escalope ou viande), frites intégrées et fameuse sauce fromagère maison fondante.',
    ingredients: ['Galette de blé', 'Escalope marinée', 'Frites', 'Sauce fromagère maison', 'Sauce algérienne'],
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tacos-double',
    name: 'Tacos Double Maxi Gratiné',
    category: 'sandwiches',
    price: 15.0,
    description: 'Le méga tacos pour les grands appétits : 2 viandes au choix, double dose de sauce fromagère, frites, gratiné au four avec fromage.',
    ingredients: ['Grande galette', 'Escalope & Viande hachée', 'Frites', 'Sauce fromagère', 'Fromage gratiné au four'],
    image: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=800&q=80',
    badge: 'Best-Seller',
  },
  {
    id: 'sandwich-libanais',
    name: 'Sandwich Pain Libanais',
    category: 'sandwiches',
    price: 9.5,
    description: 'Roulé dans un pain libanais fin et toasté, garni d’escalope marinée, de crudités fraîches et de sauce à l’ail.',
    ingredients: ['Pain libanais', 'Escalope émincée', 'Sauce à l’ail toum', 'Frites', 'Cornichons & tomates'],
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80',
  },

  // BURGERS & PLATS
  {
    id: 'burger-classic',
    name: 'Classic Burger',
    category: 'burgers',
    price: 8.0,
    description: 'Pain brioché moelleux, steak haché pur bœuf grillé, salade, tomate fraîche, oignons et sauce burger douce.',
    ingredients: ['Bun brioché', 'Steak haché de bœuf', 'Salade', 'Tomate', 'Sauce maison', 'Frites'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'burger-cheese',
    name: 'Cheese Burger Gourmand',
    category: 'burgers',
    price: 9.5,
    description: 'Double tranche de cheddar coulant sur steak juteux, oignons caramélisés et cornichons croquants.',
    ingredients: ['Bun brioché', 'Steak haché pur bœuf', 'Double cheddar', 'Oignons caramélisés', 'Frites'],
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    badge: 'Coup de Cœur',
  },
  {
    id: 'burger-sancho-giant',
    name: 'Sancho Giant Burger XXL',
    category: 'burgers',
    price: 16.0,
    description: 'Le colosse de Midoun : deux steaks de bœuf, galette de fromage fondue, bacon de boeuf halal, œuf au plat et sauce secrète.',
    ingredients: ['Pain brioché artisanal', '2x steaks 150g', 'Bacon de bœuf', 'Cheddar', 'Œuf au plat', 'Frites'],
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?auto=format&fit=crop&w=800&q=80',
    badge: 'Spécialité du Chef',
  },
  {
    id: 'plat-escalope-grillee',
    name: 'Assiette Escalope Grillée Royale',
    category: 'burgers',
    price: 16.0,
    description: 'Grande assiette complète servie à table ou en terrasse : escalopes grillées aux herbes, frites maison, salade tunisienne, salade méchouia et sauces.',
    ingredients: ['Escalopes marinées grillées', 'Portion généreuse de frites', 'Salade tunisienne', 'Salade méchouia', 'Pain chaud'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    badge: 'Recommandé',
  },

  // DRINKS & EXTRAS
  {
    id: 'portion-frites',
    name: 'Portion de Frites Maison Croustillantes',
    category: 'drinks',
    price: 3.5,
    description: 'Pommes de terre fraîches coupées, frites dans une huile neuve pour un doré croustillant dehors et fondant dedans.',
    ingredients: ['Pommes de terre fraîches', 'Assaisonnement herbes et sel fin', 'Sauces au choix'],
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'boga-cidre',
    name: 'Boga Cidre (Boisson Tunisienne)',
    category: 'drinks',
    price: 3.0,
    description: 'L’incontournable soda tunisien au goût caramel et cidre pétillant, servi glacé.',
    ingredients: ['Boisson gazeuse rafraîchissante'],
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    badge: 'Populaire',
  },
  {
    id: 'boga-lim',
    name: 'Boga Lim (Citron Pétillant)',
    category: 'drinks',
    price: 3.0,
    description: 'Soda pétillant frais aux saveurs vivifiantes de citron de Méditerranée.',
    ingredients: ['Soda au citron'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'coca-cola',
    name: 'Coca-Cola / Zero (Canette 33cl)',
    category: 'drinks',
    price: 3.0,
    description: 'Canette servie très fraîche avec rondelle de citron sur demande.',
    ingredients: ['Coca-Cola classique ou zéro'],
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'eau-safia',
    name: 'Eau Minérale Safia (0.5L / 1.5L)',
    category: 'drinks',
    price: 2.0,
    description: 'Eau minérale naturelle pure embouteillée à la source en Tunisie.',
    ingredients: ['Eau minérale'],
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
  },
];

export const AUTHENTIC_REVIEWS: CustomerReview[] = [
  {
    id: 'review-laetitia',
    author: 'Laetitia Flores',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    isLocalGuide: true,
    guideStats: 'Local Guide · 13 avis · 7 photos',
    rating: 5,
    date: 'il y a 6 mois',
    content:
      'Une première fois pour nous très bon vraiment frites sandwich excellent et chaud très bon accueil et très propre nous reviendrons....',
    pricePerPerson: '10–20 TND',
    ratingsBreakdown: {
      cuisine: 5,
      service: 5,
      ambiance: 5,
      waitTime: 'Aucune attente',
      seatingType: 'Espace repas intérieur, Terrasse/Patio extérieur',
    },
    photoUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    ownerReply: {
      date: 'il y a 6 mois',
      content:
        'Un grand merci pour votre magnifique avis ⭐⭐⭐⭐⭐ ! On se fait un plaisir de vous revoir très bientôt pour déguster d’autres spécialités !',
    },
    likesCount: 6,
  },
  {
    id: 'review-bilel',
    author: 'Bilel Lazaar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    guideStats: '2 avis · 5 photos',
    rating: 5,
    date: 'il y a 6 mois',
    content:
      'Cuisine délicieuse et bien préparée. Le service est rapide et le personnel très accueillant. Endroit propre avec une ambiance agréable.',
    pricePerPerson: '10–20 DT',
    ratingsBreakdown: {
      cuisine: 5,
      service: 5,
      ambiance: 5,
      waitTime: 'Rapide (< 10 min)',
      seatingType: 'Espace repas intérieur climatisé',
    },
    photoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    ownerReply: {
      date: 'il y a 6 mois',
      content: 'Merci beaucoup pour votre superbe avis et pour le partage de votre photo 📸 😊',
    },
    likesCount: 9,
  },
  {
    id: 'review-karim',
    author: 'Karim Ben Amor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    isLocalGuide: true,
    guideStats: 'Local Guide · 28 avis',
    rating: 5,
    date: 'il y a 3 mois',
    content:
      'Le meilleur Makloub de Djerba Midoun sans discussion possible ! Le pain est cuit sous nos yeux, croustillant et moelleux, fromage qui déborde et harissa arbi bien dosée. La terrasse le soir est super animée.',
    pricePerPerson: '10–20 DT',
    ratingsBreakdown: {
      cuisine: 5,
      service: 5,
      ambiance: 5,
      waitTime: '5 minutes',
      seatingType: 'Terrasse extérieure',
    },
    likesCount: 14,
  },
  {
    id: 'review-sarah',
    author: 'Sarah Dubois',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    guideStats: '4 avis · Djerba Vacances',
    rating: 5,
    date: 'il y a 2 mois',
    content:
      'De passage en vacances à Djerba, on cherchait un fast-food de qualité où manger tard le soir. Sancho Food était la recommandation de notre hôtel et quelle merveilleuse surprise ! Pizza 4 saisons excellente, prix imbattables et patrons adorables.',
    pricePerPerson: '10–20 TND',
    ratingsBreakdown: {
      cuisine: 5,
      service: 5,
      ambiance: 4,
      waitTime: 'Aucune attente',
      seatingType: 'Terrasse / Patio',
    },
    likesCount: 8,
  },
  {
    id: 'review-youssef',
    author: 'Youssef M.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    guideStats: '15 avis',
    rating: 5,
    date: 'il y a 4 mois',
    content:
      'Propreté 10/10, accueil chaleureux, les sandwichs sont servis bouillants avec des frites croustillantes. Le tacos double sauce fromagère est à tester absolument.',
    pricePerPerson: '10–15 DT',
    ratingsBreakdown: {
      cuisine: 5,
      service: 5,
      ambiance: 5,
      waitTime: 'Très rapide',
      seatingType: 'Espace intérieur',
    },
    likesCount: 5,
  },
  {
    id: 'review-emna',
    author: 'Emna K.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    isLocalGuide: false,
    guideStats: '6 avis',
    rating: 4,
    date: 'il y a 5 mois',
    content:
      'Très bonne adresse sur l’Avenue de l’environnement ! La baguette farcie est croustillante et généreuse. On reviendra avec grand plaisir.',
    pricePerPerson: '10–20 DT',
    ratingsBreakdown: {
      cuisine: 5,
      service: 4,
      ambiance: 4,
      waitTime: '10 min',
      seatingType: 'Terrasse extérieure',
    },
    likesCount: 3,
  },
];

export const GALLERY_PHOTOS = [
  {
    title: 'Façade illuminée et terrasse animée le soir à Midoun',
    subtitle: 'Une ambiance chaleureuse sous les lumières de Djerba',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    tag: 'Ambiance Soirée',
  },
  {
    title: 'Le Makloub chaud plié avec frites dorées et sauces',
    subtitle: 'Pain minute, fromage filant et escalope marinée',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=80',
    tag: 'Spécialité Maison',
  },
  {
    title: 'Pizzas artisanales fraîchement sorties du four',
    subtitle: 'Pâte aérienne, bords dorés et fromage crémeux',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    tag: 'Pizzas au Four',
  },
  {
    title: 'Espace comptoir & préparation sous vos yeux',
    subtitle: 'Hygiène irréprochable et ingrédients frais du jour',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    tag: 'Cuisine Ouverte',
  },
];

export const FAQS = [
  {
    q: 'Où se situe exactement le restaurant Sancho Food ?',
    a: "Sancho Food se trouve sur l'Avenue de l'environnement à Djerba Midoun 4116 en Tunisie (Plus Code Google Maps : RX8M+G9). Nous sommes très faciles d'accès avec stationnement disponible à proximité.",
  },
  {
    q: "Quels sont les horaires d'ouverture ?",
    a: "Nous sommes ouverts 7 jours sur 7, de 16h00 jusqu'à 01h00 du matin ! C'est l'endroit parfait pour un dîner après la plage ou une pause gourmande en fin de soirée.",
  },
  {
    q: 'Puis-je commander à l’avance par téléphone ou WhatsApp ?',
    a: 'Absolument ! Vous pouvez commander vos pizzas, makloub et sandwiches au +216 28 884 401 ou en un clic via notre bouton WhatsApp sur le site. Votre commande sera prête et bien chaude à votre arrivée.',
  },
  {
    q: "Quelles sont vos spécialités les plus recommandées ?",
    a: 'Nos clients adorent notre fameux Makloub Escalope (10 DT), notre Baguette Farcie au four croustillante (11 DT), et nos pizzas artisanales comme la Neptune au thon (11 DT) et la 4 Saisons Spéciale (16 DT).',
  },
  {
    q: 'Avez-vous des places assises sur place ?',
    a: "Oui ! Nous disposons d'une salle intérieure climatisée et propre, ainsi que d'une belle terrasse extérieure aménagée pour profiter de la douce brise de Djerba.",
  },
];
