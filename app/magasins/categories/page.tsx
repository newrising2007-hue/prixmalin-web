"use client";

import Link from "next/link";

const categories = [
  { icon: "🛒", label: "Épicerie & Alimentation", slug: "epicerie", desc: "Épiceries, boucheries, boulangeries, fruiteries" },
  { icon: "🥩", label: "Boucherie & Charcuterie", slug: "boucherie", desc: "Boucheries, charcuteries, viandes locales" },
  { icon: "⚡", label: "Électronique", slug: "electronique", desc: "Téléphones, laptops, TV, audio" },
  { icon: "🏠", label: "Maison & Déco", slug: "maison", desc: "Meubles, déco, literie, cuisine" },
  { icon: "🛋️", label: "Meubles & Literie", slug: "meuble", desc: "Meubles, matelas, literie, rangement" },
  { icon: "🔧", label: "Quincaillerie & Outils", slug: "quincaillerie", desc: "Outils, matériaux, électricité, plomberie" },
  { icon: "🏗️", label: "Rénovation", slug: "renovation", desc: "Entrepreneurs, matériaux, design" },
  { icon: "👕", label: "Mode & Vêtements", slug: "mode", desc: "Homme, femme, enfants, chaussures" },
  { icon: "💊", label: "Santé & Pharmacie", slug: "sante", desc: "Médicaments, vitamines, optique" },
  { icon: "🐾", label: "Animaux", slug: "animaux", desc: "Nourriture, vétérinaires, accessoires" },
  { icon: "🏃", label: "Sport & Plein Air", slug: "sport", desc: "Vélo, camping, ski, randonnée" },
  { icon: "🚗", label: "Auto & Véhicules", slug: "auto", desc: "Concessionnaires, pièces, garages" },
  { icon: "🎨", label: "Loisirs & Culture", slug: "loisirs", desc: "Livres, jeux de société, artisanat" },
  { icon: "💆", label: "Beauté & Spa", slug: "beaute", desc: "Salons, cosmétiques, soins" },
  { icon: "💻", label: "Bureautique", slug: "bureautique", desc: "Imprimantes, papeterie, mobilier bureau" },
  { icon: "🔞", label: "Intimes", slug: "intimes", desc: "Jouets adultes, lubrifiants, lingerie coquine" },
];

export default function CategoriesPage() {
  return (
    <main className="relative min-h-screen"
      style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(255,255,255,0.97) 45%, rgba(34,197,94,0.08) 100%)" }}>
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">🗂️ Toutes les catégories</h1>
          <p className="text-gray-500 text-sm">Choisissez une catégorie pour trouver les meilleurs commerces près de vous</p>
        </div>

        {/* GRILLE */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/magasins/categorie/${cat.slug}`}
              className="group flex flex-col items-center text-center p-5 rounded-2xl border-2 border-gray-100 bg-white/80 hover:bg-white hover:border-green-300 hover:shadow-lg transition-all duration-200">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
              <span className="font-bold text-gray-800 text-sm leading-tight mb-1">{cat.label}</span>
              <span className="text-xs text-gray-400 leading-tight hidden sm:block">{cat.desc}</span>
              <span className="mt-2 text-xs text-green-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Explorer →</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/magasins" className="text-sm text-gray-400 hover:text-green-600 transition-colors">← Retour Magasinage</Link>
        </div>
      </div>
    </main>
  );
}
