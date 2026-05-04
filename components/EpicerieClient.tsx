"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { EpicerieItem } from "@/lib/epicerie";

const CATEGORIES: Record<string, string> = {
  "viandes-poissons": "🥩 Viandes & Poissons",
  "fruits-legumes": "🥦 Fruits & Légumes",
  "produits-laitiers": "🧀 Produits Laitiers",
  "epicerie-seche": "🌾 Épicerie Sèche",
  "condiments": "🧂 Condiments",
  "conserves": "🥫 Conserves",
  "tartinades": "🍯 Tartinades",
  "surgeles": "❄️ Surgelés",
  "boissons-alcoolisees": "🍺 Alcool",
  "boissons-non-alcoolisees": "🥤 Boissons",
  "hygiene-maison": "🧹 Hygiène & Maison",
  "collations": "🍿 Collations",
  "plats-prepares": "🍽️ Plats Préparés",
  "animaux": "🐾 Animaux",
};

type Labels = {
  toutes_regions: string;
  tous_marchands: string;
  toutes_cats: string;
  valide_jusqua: string;
  voir_tout: string;
  aucun_resultat: string;
  retour: string;
};

export default function EpicerieClient({
  items,
  labels,
  locale,
}: {
  items: EpicerieItem[];
  labels: Labels;
  locale: string;
}) {
  const regions  = useMemo(() => [...new Set(items.map(i => i.region))].sort(), [items]);
  const marchands = useMemo(() => [...new Set(items.map(i => i.marchand))].sort(), [items]);

  const [region,   setRegion]   = useState("toutes");
  const [marchand, setMarchand] = useState("tous");
  const [categorie, setCat]     = useState("toutes");

  const filtered = useMemo(() => {
    return items.filter(i => {
      if (region    !== "toutes" && i.region   !== region)   return false;
      if (marchand  !== "tous"   && i.marchand !== marchand) return false;
      if (categorie !== "toutes" && i.categorie !== categorie) return false;
      return true;
    }).sort((a, b) => a.prix - b.prix);
  }, [items, region, marchand, categorie]);

  const retourHref = locale === "fr" ? "/magasins" : `/${locale}/magasins`;

  return (
    <div>
      {/* Retour */}
      <Link href={retourHref}
        className="inline-block mb-6 text-sm text-green-700 hover:underline font-medium">
        {labels.retour}
      </Link>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-6">
        {/* Régions */}
        <select
          value={region}
          onChange={e => { setRegion(e.target.value); setMarchand("tous"); }}
          className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400">
          <option value="toutes">{labels.toutes_regions}</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        {/* Marchands */}
        <select
          value={marchand}
          onChange={e => setMarchand(e.target.value)}
          className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400">
          <option value="tous">{labels.tous_marchands}</option>
          {marchands.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        {/* Catégories */}
        <select
          value={categorie}
          onChange={e => setCat(e.target.value)}
          className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400">
          <option value="toutes">{labels.toutes_cats}</option>
          {Object.entries(CATEGORIES).map(([k, v]) =>
            <option key={k} value={k}>{v}</option>
          )}
        </select>
      </div>

      {/* Compteur */}
      <p className="text-sm text-gray-500 mb-4">{filtered.length} produit{filtered.length !== 1 ? "s" : ""}</p>

      {/* Grille */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">{labels.aucun_resultat}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map(item => (
            <div key={item.id}
              className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              {/* Image */}
              <div className="relative w-full aspect-square bg-gray-50">
                {item.image ? (
                  <Image src={item.image} alt={item.nom} fill
                    className="object-contain p-2" sizes="(max-width: 640px) 50vw, 25vw" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">🛒</div>
                )}
                {/* Badge marchand */}
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-green-600 text-white text-xs font-bold shadow">
                  {item.marchand}
                </span>
              </div>
              {/* Infos */}
              <div className="flex flex-col flex-1 p-2.5 gap-1">
                <p className="text-xs text-gray-700 font-medium leading-tight line-clamp-2">{item.nom}</p>
                {item.marque && <p className="text-xs text-gray-400">{item.marque}</p>}
                <p className="text-lg font-extrabold text-green-700 mt-auto">{item.prix.toFixed(2)} $</p>
                {item.unite && <p className="text-xs text-gray-400">{item.unite}</p>}
                <p className="text-xs text-gray-300">{labels.valide_jusqua} {item.valid_to}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
