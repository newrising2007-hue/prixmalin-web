"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const categories = [
  { icon: "🛒", label: "Épicerie & Alimentation", slug: "epicerie", desc: "Épiceries, boucheries, boulangeries, fruiteries" },
  { icon: "⚡", label: "Électronique", slug: "electronique", desc: "Téléphones, laptops, TV, audio, jeux, jouets" },
  { icon: "🏠", label: "Maison & Déco", slug: "maison", desc: "Meubles, déco, literie, cuisine" },
  { icon: "🔧", label: "Quincaillerie & Outils", slug: "quincaillerie", desc: "Outils, matériaux, électricité, plomberie" },
  { icon: "👕", label: "Mode & Vêtements", slug: "mode", desc: "Homme, femme, enfants, chaussures" },
  { icon: "💊", label: "Santé & Pharmacie", slug: "sante", desc: "Médicaments, vitamines, optique" },
  { icon: "🐾", label: "Animaux", slug: "animaux", desc: "Nourriture, vétérinaires, accessoires" },
  { icon: "🏃", label: "Sport & Plein Air", slug: "sport", desc: "Vélo, camping, ski, randonnée" },
  { icon: "🚗", label: "Auto & Véhicules", slug: "auto", desc: "Concessionnaires, pièces, garages" },
  { icon: "🍽️", label: "Restaurants & Cafés", slug: "restaurants", desc: "Cuisine locale, cafés, traiteurs" },
  { icon: "🎨", label: "Loisirs & Culture", slug: "loisirs", desc: "Livres, jeux de société, artisanat" },
  { icon: "💆", label: "Beauté & Spa", slug: "beaute", desc: "Salons, cosmétiques, soins" },
  { icon: "🏗️", label: "Rénovation", slug: "renovation", desc: "Entrepreneurs, matériaux, design" },
  { icon: "💻", label: "Bureautique", slug: "bureautique", desc: "Imprimantes, papeterie, mobilier bureau" },
];

const mainSections = [
  {
    icon: "🔍",
    label: "Recherche Produits",
    desc: "Trouvez n'importe quel produit — neuf, local ou d'occasion",
    href: "/magasins/recherche",
    glow: "rgba(34,197,94,0.5)",
    gradient: "from-green-400/20 to-emerald-500/10",
    border: "border-green-200 hover:border-green-400",
  },
  {
    icon: "📰",
    label: "Circulaires",
    desc: "IGA, Metro, Canadian Tire, Walmart et plus — cette semaine",
    href: "/magasins/circulaires",
    glow: "rgba(16,185,129,0.5)",
    gradient: "from-emerald-400/20 to-teal-500/10",
    border: "border-emerald-200 hover:border-emerald-400",
  },
  {
    icon: "🍽️",
    label: "Restaurants",
    desc: "Restos locaux près de vous — menus, distance et spécialités",
    href: "/magasins/restaurants",
    glow: "rgba(5,150,105,0.5)",
    gradient: "from-teal-400/20 to-green-500/10",
    border: "border-teal-200 hover:border-teal-400",
  },
  {
    icon: "✂️",
    label: "Coupons & Rabais",
    desc: "Codes promo des grands détaillants canadiens",
    href: "/magasins/coupons",
    glow: "rgba(52,211,153,0.5)",
    gradient: "from-green-300/20 to-emerald-400/10",
    border: "border-green-200 hover:border-green-400",
  },
];

export default function MagasinsPage() {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/magasins/recherche?q=${encodeURIComponent(search.trim())}`;
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* FOND DÉGRADÉ BLEU → BLANC → VERT (couleurs logo PrixMalin) */}
      <div className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(255,255,255,0.95) 45%, rgba(34,197,94,0.15) 100%)"
        }}
      />
      {/* Glow ambiant */}
      <div className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: "radial-gradient(800px circle at 10% 20%, rgba(59,130,246,0.08), transparent 60%), radial-gradient(900px circle at 90% 80%, rgba(34,197,94,0.10), transparent 60%)"
        }}
      />

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative pt-16 pb-10 px-6 text-center">

        {/* Logo avec glow vert */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(circle, rgba(34,197,94,0.6), transparent 70%)" }}
          />
          <Image
            src="/prixmalin-logo.png"
            alt="PrixMalin Magasinage"
            width={110}
            height={110}
            className="relative drop-shadow-lg"
            priority
          />
        </div>

        {/* Slogan */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">
          Magasinez{" "}
          <span className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #16a34a, #059669)" }}>
            Malin
          </span>
        </h1>

        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-2">
          Votre outil de magasinage canadien par excellence — local, en ligne, toujours au meilleur prix.
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Commerces locaux · Amazon · Walmart · Circulaires · Coupons · Occasion
        </p>

        {/* BARRE DE RECHERCHE CENTRALE */}
        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
          <div className="relative flex items-center">
            <span className="absolute left-4 text-gray-400 text-xl">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit, un commerce..."
              className="w-full pl-12 pr-32 py-4 rounded-2xl border-2 border-green-200 bg-white/80 backdrop-blur-sm shadow-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all text-base"
            />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2.5 rounded-xl font-semibold text-white shadow-md transition-all hover:scale-105 active:scale-95 text-sm"
              style={{ background: "linear-gradient(135deg, #16a34a, #059669)" }}
            >
              Chercher
            </button>
          </div>
        </form>

      </section>

      {/* ═══════════════════════════════════════
          4 GROS BOUTONS PRINCIPAUX
      ═══════════════════════════════════════ */}
      <section className="px-6 pb-14 max-w-5xl mx-auto">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {mainSections.map((section) => (
            <Link
              key={section.label}
              href={section.href}
              className={`group relative flex flex-col items-center text-center p-6 rounded-2xl border-2 bg-white/70 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${section.border}`}
            >
              {/* Glow au hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                style={{ background: `radial-gradient(circle, ${section.glow}, transparent 70%)` }}
              />

              {/* Icône avec glow permanent subtil */}
              <div className="relative mb-4">
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-30 group-hover:opacity-70 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle, ${section.glow}, transparent 70%)` }}
                />
                <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {section.icon}
                </div>
              </div>

              <h3 className="font-bold text-gray-800 text-sm sm:text-base leading-tight mb-2">
                {section.label}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed hidden sm:block">
                {section.desc}
              </p>

              {/* Flèche au hover */}
              <span className="mt-3 text-green-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Explorer →
              </span>
            </Link>
          ))}
        </div>

      </section>

      {/* ═══════════════════════════════════════
          CATÉGORIES
      ═══════════════════════════════════════ */}
      <section className="px-6 pb-14 max-w-5xl mx-auto">

        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-green-200" />
          <h2 className="text-xl font-bold text-gray-800 whitespace-nowrap">
            🗂️ Toutes les catégories
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-green-200" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/magasins/categorie/${cat.slug}`}
              className="group flex flex-col items-center text-center p-3 rounded-xl border border-gray-100 bg-white/60 hover:bg-white hover:border-green-200 hover:shadow-md transition-all duration-200"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                {cat.icon}
              </span>
              <span className="text-xs font-medium text-gray-700 leading-tight">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>

      </section>

      {/* ═══════════════════════════════════════
          ALERTES DE PRIX — BIENTÔT DISPONIBLE
      ═══════════════════════════════════════ */}
      <section className="px-6 pb-14 max-w-3xl mx-auto">
        <div className="relative rounded-3xl border-2 border-dashed border-amber-200 bg-amber-50/50 backdrop-blur-sm p-8 text-center overflow-hidden">

          {/* Badge bientôt */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-white text-xs font-bold shadow-sm">
              🚀 Bientôt disponible
            </span>
          </div>

          {/* Glow ambiant */}
          <div className="absolute inset-0 rounded-3xl opacity-20 blur-2xl -z-10"
            style={{ background: "radial-gradient(circle, rgba(251,191,36,0.6), transparent 70%)" }}
          />

          <div className="text-4xl mb-3">🔔</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Alertes de Prix</h2>
          <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
            Entrez un produit et votre prix cible — on vous avertit par courriel dès que le prix baisse. Fini de surveiller manuellement !
          </p>

          {/* Formulaire désactivé */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto opacity-60 cursor-not-allowed">
            <input
              type="text"
              disabled
              placeholder="Ex: iPhone 15 Pro"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-amber-200 bg-white text-gray-400 text-sm cursor-not-allowed"
            />
            <input
              type="text"
              disabled
              placeholder="Prix cible $"
              className="w-32 px-4 py-3 rounded-xl border-2 border-amber-200 bg-white text-gray-400 text-sm cursor-not-allowed"
            />
            <button
              disabled
              className="px-5 py-3 rounded-xl font-semibold text-white text-sm cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
            >
              M&apos;alerter
            </button>
          </div>

          <p className="text-xs text-amber-600 mt-4 font-medium">
            ⚡ Disponible prochainement — Amazon, Walmart, Best Buy et plus
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          QUI SOMMES-NOUS
      ═══════════════════════════════════════ */}
      <section className="px-6 pb-16 max-w-3xl mx-auto text-center">

        <div className="relative rounded-3xl border border-green-100 bg-white/60 backdrop-blur-sm p-10 shadow-sm overflow-hidden">

          {/* Déco coins */}
          <div className="absolute top-0 left-0 w-32 h-32 rounded-br-full opacity-10"
            style={{ background: "linear-gradient(135deg, #3b82f6, #16a34a)" }}
          />
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-10"
            style={{ background: "linear-gradient(315deg, #3b82f6, #16a34a)" }}
          />

          <div className="relative">
            <span className="text-4xl mb-4 block">🍁</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Notre mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              PrixMalin est une plateforme canadienne indépendante qui rassemble en un seul endroit les meilleurs outils pour magasiner intelligemment — qu&apos;il s&apos;agisse d&apos;un commerce de votre quartier, d&apos;un achat en ligne ou d&apos;une occasion à saisir.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Nous valorisons les commerces locaux canadiens, particulièrement en région. Chaque résultat, chaque circulaire et chaque coupon est sélectionné pour vous aider à économiser sans effort.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="px-4 py-2 rounded-full bg-green-50 text-green-700 border border-green-100 font-medium">🏪 Commerces locaux</span>
              <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium">📦 Amazon & Walmart</span>
              <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium">📍 GPS & Distance</span>
              <span className="px-4 py-2 rounded-full bg-teal-50 text-teal-700 border border-teal-100 font-medium">🇨🇦 100% Canadien</span>
            </div>
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════
          CTA APP MOBILE
      ═══════════════════════════════════════ */}
      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <div className="rounded-3xl p-8 text-center text-white overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #15803d 100%)" }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          />
          <div className="relative">
            <Image src="/prixmalin-logo.png" alt="App PrixMalin" width={70} height={70} className="mx-auto mb-4 drop-shadow-lg" />
            <h3 className="text-xl font-bold mb-2">Bientôt sur Android</h3>
            <p className="text-white/80 text-sm mb-4">
              L&apos;app PrixMalin — GPS, recherche locale et deals en temps réel dans votre poche.
            </p>
            <span className="inline-block px-6 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white font-semibold text-sm backdrop-blur-sm">
              📱 Disponible bientôt sur Google Play
            </span>
          </div>
        </div>
      </section>

    </main>
  );
}
