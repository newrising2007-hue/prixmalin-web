import { NextRequest, NextResponse } from 'next/server';

const AMAZON_TAG = 'prixmalin-20';

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

function getAmazonUrl(query: string, category: string): string {
  const categoryMap: Record<string, string> = {
    epicerie: 'grocery', electro: 'electronics',
    vetements: 'fashion', quincaillerie: 'tools',
    loisirs: 'toys-and-games', animaux: 'pet-supplies',
    sante: 'hpc', sport: 'sporting-goods',
    vehicules: 'automotive', beaute: 'beauty',
  };
  const params = new URLSearchParams({ k: translateQuery(query), tag: AMAZON_TAG });
  const cat = categoryMap[category];
  if (cat) params.append('i', cat);
  return `https://www.amazon.ca/s?${params.toString()}`;
}

function getWalmartUrl(query: string): string {
  return `https://www.walmart.ca/search?q=${encodeURIComponent(translateQuery(query))}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const category = searchParams.get('cat') || 'divers';

  if (!query.trim()) {
    return NextResponse.json({ error: 'Requête vide' }, { status: 400 });
  }

  const results = [
    {
      id: 'amazon',
      store: 'Amazon.ca',
      logo: '📦',
      label: `Rechercher "${query}" sur Amazon.ca`,
      badge: 'Voir les prix',
      url: getAmazonUrl(query, category),
      type: 'online',
      color: '#FF9900',
    },
    {
      id: 'walmart',
      store: 'Walmart.ca',
      logo: '🛒',
      label: `Rechercher "${query}" sur Walmart.ca`,
      badge: 'Voir les prix',
      url: getWalmartUrl(query),
      type: 'online',
      color: '#0071CE',
    },
  ];

  return NextResponse.json({ query, category, results });
}
