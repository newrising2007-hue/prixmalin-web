'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const CATEGORIES: Record<string, {
  label: string;
  icon: string;
  description: string;
  popularSearches: string[];
  cat: string;
  color: string;
  gradient: string;
}> = {
  epicerie: {
    label: 'Épicerie & Alimentation',
    icon: '🛒',
    description: 'Épiceries, boucheries, boulangeries et fruiteries près de chez vous.',
    popularSearches: ['pain', 'lait', 'viande', 'légumes', 'fromage', 'café', 'fruits', 'beurre', 'œufs', 'poulet'],
    cat: 'epicerie',
    color: '#16a34a',
    gradient: 'from-green-400/20 to-emerald-500/10',
  },
  electronique: {
    label: 'Électronique',
    icon: '⚡',
    description: 'Téléphones, ordinateurs, télévisions, audio et accessoires.',
    popularSearches: ['téléphone', 'laptop', 'télévision', 'tablette', 'casque', 'écouteurs', 'imprimante', 'caméra', 'clavier', 'souris'],
    cat: 'electro',
    color: '#2563eb',
    gradient: 'from-blue-400/20 to-indigo-500/10',
  },
  maison: {
    label: 'Maison & Déco',
    icon: '🏠',
    description: 'Meubles, décoration, literie et articles de cuisine.',
    popularSearches: ['meuble', 'canapé', 'lit', 'lampe', 'rideau', 'tapis', 'coussin', 'miroir', 'étagère', 'cadre'],
    cat: 'maison',
    color: '#d97706',
    gradient: 'from-amber-400/20 to-orange-500/10',
  },
  quincaillerie: {
    label: 'Quincaillerie & Outils',
    icon: '🔧',
    description: 'Outils, visserie, électricité, plomberie et matériel de bricolage.',
    popularSearches: ['marteau', 'perceuse', 'tournevis', 'vis', 'clou', 'peinture', 'ampoule', 'tuyau', 'scie', 'colle'],
    cat: 'quincaillerie',
    color: '#7c3aed',
    gradient: 'from-violet-400/20 to-purple-500/10',
  },
  mode: {
    label: 'Mode & Vêtements',
    icon: '👕',
    description: 'Vêtements homme, femme, enfants, chaussures et accessoires.',
    popularSearches: ['manteau', 'chemise', 'pantalon', 'robe', 'chaussures', 'bottes', 'veste', 'chandail', 'jeans', 'tuque'],
    cat: 'vetements',
    color: '#db2777',
    gradient: 'from-pink-400/20 to-rose-500/10',
  },
  sante: {
    label: 'Santé & Pharmacie',
    icon: '💊',
    description: 'Médicaments, vitamines, soins personnels et produits de santé.',
    popularSearches: ['vitamines', 'médicaments', 'shampooing', 'crème', 'dentifrice', 'rasoir', 'bandage', 'thermomètre'],
    cat: 'sante',
    color: '#0891b2',
    gradient: 'from-cyan-400/20 to-sky-500/10',
  },
  animaux: {
    label: 'Animaux',
    icon: '🐾',
    description: 'Nourriture, accessoires et produits pour vos animaux de compagnie.',
    popularSearches: ['nourriture chien', 'nourriture chat', 'litière', 'laisse', 'collier', 'jouet chien', 'aquarium', 'cage'],
    cat: 'animaux',
    color: '#b45309',
    gradient: 'from-amber-400/20 to-yellow-500/10',
  },
  sport: {
    label: 'Sport & Plein Air',
    icon: '🏃',
    description: 'Vélo, camping, ski, randonnée et équipements sportifs.',
    popularSearches: ['vélo', 'tente', 'ski', 'raquette', 'haltères', 'yoga', 'hockey', 'patin', 'ballon', 'sac à dos'],
    cat: 'sport',
    color: '#059669',
    gradient: 'from-emerald-400/20 to-green-500/10',
  },
  auto: {
    label: 'Auto & Véhicules',
    icon: '🚗',
    description: 'Concessionnaires, pièces auto, garages et accessoires.',
    popularSearches: ['pneus', 'huile moteur', 'batterie auto', 'essuie-glace', 'siège auto', 'ski-doo', 'can-am', 'yamaha'],
    cat: 'vehicules',
    color: '#dc2626',
    gradient: 'from-red-400/20 to-rose-500/10',
  },
  restaurants: {
    label: 'Restaurants & Cafés',
    icon: '🍽️',
    description: 'Restaurants locaux, cafés, traiteurs et cuisine de votre région.',
    popularSearches: ['restaurant', 'pizza', 'café', 'sushi', 'burger', 'poutine', 'boulangerie', 'traiteur'],
    cat: 'restaurants',
    color: '#ea580c',
    gradient: 'from-orange-400/20 to-amber-500/10',
  },
  loisirs: {
    label: 'Loisirs & Culture',
    icon: '🎨',
    description: 'Livres, jeux de société, artisanat et activités culturelles.',
    popularSearches: ['livre', 'jeu de société', 'puzzle', 'peinture acrylique', 'tricot', 'crayons', 'bricolage', 'musique'],
    cat: 'loisirs',
    color: '#7c3aed',
    gradient: 'from-purple-400/20 to-violet-500/10',
  },
  beaute: {
    label: 'Beauté & Spa',
    icon: '💆',
    description: 'Salons de coiffure, cosmétiques, soins et produits de beauté.',
    popularSearches: ['shampooing', 'fond de teint', 'mascara', 'parfum', 'crème visage', 'rouge à lèvres', 'vernis', 'sérum'],
    cat: 'beaute',
    color: '#be185d',
    gradient: 'from-pink-400/20 to-fuchsia-500/10',
  },
  renovation: {
    label: 'Rénovation',
    icon: '🏗️',
    description: 'Matériaux de construction, bois, plancher, portes, fenêtres et entrepreneurs.',
    popularSearches: ['bois', 'plancher', 'carrelage', 'portes', 'fenêtres', 'isolant', 'gypse', 'bardeau', 'béton', 'peinture'],
    cat: 'renovation',
    color: '#92400e',
    gradient: 'from-stone-400/20 to-amber-500/10',
  },
  bureautique: {
    label: 'Bureautique',
    icon: '💻',
    description: 'Imprimantes, papeterie, mobilier de bureau et fournitures.',
    popularSearches: ['imprimante', 'cartouche', 'papier', 'bureau', 'chaise bureau', 'classeur', 'cahier', 'stylo'],
    cat: 'bureautique',
    color: '#0369a1',
    gradient: 'from-sky-400/20 to-blue-500/10',
  },
};

export default function CategoriePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const cat = CATEGORIES[slug];
  const [search, setSearch] = useState('');

  if (!cat) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Catégorie introuvable</h1>
        <p className="text-gray-500 mb-6">Cette catégorie n'existe pas encore.</p>
        <Link href="/magasins" className="px-6 py-3 rounded-xl text-white font-semibold"
          style={{ background: 'linear-gradient(135deg, #16a34a, #059669)' }}>
          ← Retour Magasinage
        </Link>
      </main>
    );
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/magasins/recherche?q=${encodeURIComponent(search.trim())}&cat=${cat.cat}`);
    }
  };

  const handlePopular = (term: string) => {
    router.push(`/magasins/recherche?q=${encodeURIComponent(term)}&cat=${cat.cat}`);
  };

  return (
    <main className="relative min-h-screen"
      style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(255,255,255,0.97) 45%, rgba(34,197,94,0.06) 100%)' }}>
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* HEADER CATÉGORIE */}
        <div className={`flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br ${cat.gradient} border border-gray-100 mb-8`}>
          <div className="text-5xl">{cat.icon}</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{cat.label}</h1>
            <p className="text-gray-500 text-sm mt-1">{cat.description}</p>
          </div>
        </div>

        {/* BARRE DE RECHERCHE */}
        <form onSubmit={handleSearch} className="relative mb-8">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Rechercher dans ${cat.label}...`}
            className="w-full px-5 py-4 pr-28 rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-lg shadow-sm"
          />
          <button type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl text-white font-semibold text-sm"
            style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)` }}>
            Chercher
          </button>
        </form>

        {/* RECHERCHES POPULAIRES */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
            🔥 Recherches populaires
          </h2>
          <div className="flex flex-wrap gap-2">
            {cat.popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => handlePopular(term)}
                className="px-4 py-2 rounded-xl border-2 border-gray-100 bg-white hover:border-green-300 hover:shadow-sm transition-all text-sm text-gray-700 font-medium capitalize"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* CTA RECHERCHE COMPLÈTE */}
        <div className="p-5 rounded-2xl border border-gray-100 bg-white/60 text-center">
          <p className="text-gray-500 text-sm mb-3">
            Vous ne trouvez pas ce que vous cherchez ?
          </p>
          <Link href={`/magasins/recherche?cat=${cat.cat}`}
            className="inline-block px-6 py-2.5 rounded-xl text-white font-semibold text-sm"
            style={{ background: 'linear-gradient(135deg, #16a34a, #059669)' }}>
            🔍 Recherche libre dans {cat.label}
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link href="/magasins" className="text-sm text-gray-400 hover:text-green-600 transition-colors">
            ← Toutes les catégories
          </Link>
        </div>

      </div>
    </main>
  );
}
