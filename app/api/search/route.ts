import { NextRequest, NextResponse } from 'next/server';

const AMAZON_TAG = 'prixmalin-20';

// ── TRADUCTION FR → EN ──
const FR_TO_EN: Record<string, string> = {
  'chemise': 'shirt', 'chemises': 'shirts',
  'pantalon': 'pants', 'pantalons': 'pants',
  'robe': 'dress', 'robes': 'dresses',
  'manteau': 'coat', 'manteaux': 'coats',
  'veste': 'jacket', 'vestes': 'jackets',
  'chandail': 'sweater', 'chandails': 'sweaters',
  'chaussures': 'shoes', 'chaussure': 'shoe',
  'bottes': 'boots', 'botte': 'boot',
  'chaussettes': 'socks', 'sous-vêtements': 'underwear',
  'jeans': 'jeans', 'short': 'shorts',
  'pain': 'bread', 'lait': 'milk', 'beurre': 'butter',
  'fromage': 'cheese', 'café': 'coffee', 'thé': 'tea',
  'sucre': 'sugar', 'farine': 'flour', 'riz': 'rice',
  'pâtes': 'pasta', 'jus': 'juice', 'chocolat': 'chocolate',
  'épices': 'spices', 'épice': 'spice', 'sel': 'salt', 'poivre': 'pepper',
  'huile': 'oil', 'vinaigre': 'vinegar', 'confiture': 'jam',
  'céréales': 'cereal', 'biscuits': 'cookies', 'chips': 'chips',
  'téléphone': 'phone', 'cellulaire': 'cell phone',
  'ordinateur': 'computer', 'tablette': 'tablet',
  'écran': 'monitor', 'clavier': 'keyboard', 'souris': 'mouse',
  'casque': 'headphones', 'écouteurs': 'earbuds',
  'télévision': 'television', 'télé': 'tv',
  'imprimante': 'printer', 'caméra': 'camera',
  'marteau': 'hammer', 'tournevis': 'screwdriver',
  'perceuse': 'drill', 'scie': 'saw', 'peinture': 'paint',
  'ampoule': 'light bulb', 'ampoules': 'light bulbs',
  'batterie': 'battery', 'batteries': 'batteries',
  'vélo': 'bike', 'tente': 'tent',
  'ballon': 'ball', 'yoga': 'yoga', 'haltères': 'dumbbells',
  'nourriture chien': 'dog food', 'nourriture chat': 'cat food',
  'laisse': 'leash', 'collier': 'collar', 'litière': 'cat litter',
  'vitamines': 'vitamins', 'vitamine': 'vitamin',
  'shampooing': 'shampoo', 'crème': 'cream',
  'rasoir': 'razor', 'dentifrice': 'toothpaste',
  'brosse à dents': 'toothbrush',
  'pneus': 'tires', 'pneu': 'tire', 'huile moteur': 'motor oil',
  'essuie-glace': 'windshield wiper', 'siège auto': 'car seat',
  'chaloupe': 'fishing boat', 'bateau': 'boat', 'kayak': 'kayak',
  'canot': 'canoe', 'moteur hors-bord': 'outboard motor',
  'réfrigérateur': 'refrigerator', 'laveuse': 'washing machine',
  'sécheuse': 'dryer', 'lave-vaisselle': 'dishwasher',
  'cuisinière': 'stove', 'micro-ondes': 'microwave',
  'tondeuse': 'lawn mower', 'souffleuse': 'snow blower',
  'canapé': 'sofa', 'lit': 'bed', 'matelas': 'mattress',
  'steak': 'steak', 'bœuf': 'beef', 'poulet': 'chicken',
  'porc': 'pork', 'saucisse': 'sausage', 'bacon': 'bacon',
};

function translateQuery(query: string): string {
  const lower = query.toLowerCase().trim();
  if (FR_TO_EN[lower]) return FR_TO_EN[lower];
  let translated = lower;
  Object.keys(FR_TO_EN)
    .sort((a, b) => b.length - a.length)
    .forEach(fr => {
      const regex = new RegExp(`\\b${fr}\\b`, 'gi');
      translated = translated.replace(regex, FR_TO_EN[fr]);
    });
  return translated;
}

// ── URLs AFFILIÉS ──
function getAmazonUrl(query: string, category: string): string {
  const categoryMap: Record<string, string> = {
    epicerie: 'grocery', electro: 'electronics',
    vetements: 'fashion', quincaillerie: 'tools',
    renovation: 'tools', loisirs: 'toys-and-games',
    animaux: 'pet-supplies', sante: 'hpc',
    sport: 'sporting-goods', vehicules: 'automotive',
    auto: 'automotive', pieces: 'automotive',
    beaute: 'beauty', maison: 'home', electromenager: 'appliances',
    jardin: 'lawn-garden', nautique: 'sports',
  };
  const params = new URLSearchParams({ k: translateQuery(query), tag: AMAZON_TAG });
  const cat = categoryMap[category];
  if (cat) params.append('i', cat);
  return `https://www.amazon.ca/s?${params.toString()}`;
}

function getWalmartUrl(query: string): string {
  return `https://www.walmart.ca/search?q=${encodeURIComponent(translateQuery(query))}`;
}

function getEbayUrl(query: string): string {
  return `https://www.ebay.ca/sch/i.html?_nkw=${encodeURIComponent(translateQuery(query))}&_sacat=0`;
}

function getFacebookUrl(query: string): string {
  return `https://www.facebook.com/marketplace/search/?query=${encodeURIComponent(query)}&location=canada`;
}

function getKijijiUrl(query: string): string {
  return `https://www.kijiji.ca/b-canada/${encodeURIComponent(translateQuery(query))}/k0l0`;
}

// ── RÉSULTATS EN LIGNE PAR CATÉGORIE ──
// Logique : certaines catégories ne méritent pas eBay/Kijiji
// Alimentation → locaux + Amazon + Walmart seulement
// Électro/pièces → Amazon + Walmart + eBay
// Véhicules/auto → Facebook + Kijiji en priorité
// Divers/reste → comportement standard

type OnlineResult = {
  id: string;
  store: string;
  logo: string;
  label: string;
  badge: string;
  url: string;
  type: string;
  color: string;
};

function getOnlineResults(query: string, category: string): OnlineResult[] {
  const amazon: OnlineResult = {
    id: 'amazon', store: 'Amazon.ca', logo: '📦',
    label: `Rechercher "${query}" sur Amazon.ca`,
    badge: 'Voir les prix', url: getAmazonUrl(query, category),
    type: 'online', color: '#FF9900',
  };
  const walmart: OnlineResult = {
    id: 'walmart', store: 'Walmart.ca', logo: '🛒',
    label: `Rechercher "${query}" sur Walmart.ca`,
    badge: 'Voir les prix', url: getWalmartUrl(query),
    type: 'online', color: '#0071CE',
  };
  const ebay: OnlineResult = {
    id: 'ebay', store: 'eBay.ca', logo: '🏷️',
    label: `Rechercher "${query}" sur eBay.ca`,
    badge: 'Bonnes affaires', url: getEbayUrl(query),
    type: 'online', color: '#E53238',
  };
  const facebook: OnlineResult = {
    id: 'facebook', store: 'Facebook Marketplace', logo: '📘',
    label: `Rechercher "${query}" près de chez vous`,
    badge: 'Occasion locale', url: getFacebookUrl(query),
    type: 'occasion', color: '#1877F2',
  };
  const kijiji: OnlineResult = {
    id: 'kijiji', store: 'Kijiji', logo: '📢',
    label: `Rechercher "${query}" sur Kijiji Canada`,
    badge: 'Occasion locale', url: getKijijiUrl(query),
    type: 'occasion', color: '#373373',
  };

  // ── ALIMENTATION → priorité locaux, Amazon + Walmart seulement ──
  if (['boucherie'].includes(category)) {
    return [];
  }

  if (['epicerie'].includes(category)) {
    return [amazon, walmart];
  }

  // ── ÉLECTRO / PIÈCES / ÉLECTROMÉNAGER → pas Kijiji, pas Facebook ──
  if (['electro', 'electromenager', 'pieces'].includes(category)) {
    return [amazon, walmart, ebay];
  }

  // ── VÉHICULES / AUTO → Facebook + Kijiji en priorité, Amazon quand même ──
  if (['vehicules', 'auto'].includes(category)) {
    return [facebook, kijiji, amazon];
  }

  // ── QUINCAILLERIE / RÉNOVATION / MAISON / JARDIN → pas Kijiji ──
  if (['quincaillerie', 'renovation', 'maison', 'jardin'].includes(category)) {
    return [amazon, walmart, ebay];
  }

  // ── VÊTEMENTS → pas Kijiji ──
  if (['vetements', 'mode'].includes(category)) {
    return [amazon, walmart, ebay];
  }

  // ── SPORT / LOISIRS / ANIMAUX / SANTÉ → standard sans Kijiji ──
  if (['sport', 'loisirs', 'animaux', 'sante'].includes(category)) {
    return [amazon, walmart, ebay];
  }

  // ── NAUTIQUE → Amazon + eBay + Kijiji (bateaux usagés = logique) ──
  if (category === 'nautique') {
    return [amazon, ebay, kijiji, facebook];
  }

  // ── DIVERS / DÉFAUT → comportement standard complet ──
  return [amazon, walmart, ebay, facebook, kijiji];
}

// ── HANDLER PRINCIPAL ──
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const category = searchParams.get('cat') || 'divers';
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!query.trim()) {
    return NextResponse.json({ error: 'Requête vide' }, { status: 400 });
  }

  const onlineResults = getOnlineResults(query, category);

  // Appel backend pour les locaux GPS si coordonnées disponibles
  let localResults: OnlineResult[] = [];
  if (lat && lng) {
    try {
      const backendUrl = `https://prixmalin-backend.onrender.com/api/search?q=${encodeURIComponent(query)}&cat=${category}&lat=${lat}&lng=${lng}`;
      const res = await fetch(backendUrl, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        localResults = data.results || [];
      }
    } catch {
      // Backend indisponible — on continue sans locaux
    }
  }

  return NextResponse.json({
    query,
    category,
    results: onlineResults,
    localResults,
  });
}
