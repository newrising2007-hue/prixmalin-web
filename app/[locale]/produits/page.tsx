"use client";
import Link from "next/link";
import AffiliateButton from "@/components/AffiliateButton";
import { getAllProducts } from "@/lib/products";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const CATEGORIES = [
  { slug: "toutes", label: "toutes" },
  { slug: "audio", label: "🎧 Audio" },
  { slug: "souris", label: "🖱️ Souris" },
  { slug: "claviers", label: "⌨️ Claviers" },
  { slug: "manettes", label: "🎮 Manettes" },
  { slug: "accessoires", label: "🎒 Accessoires" },
  { slug: "chaises", label: "🪑 Chaises" },
  { slug: "ecrans", label: "🖥️ Écrans" },
  { slug: "boitiers", label: "🖥️ Boîtiers PC" },
];

export default function ProduitsPage() {
  const products = getAllProducts();
  const [filtre, setFiltre] = useState("toutes");
  const locale = useLocale();
  const t = useTranslations("produits");

  const filtered = filtre === "toutes"
    ? products
    : products.filter(p => p.category === filtre);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{t("titre")}</h1>
        <p className="mt-2 text-black/70">
          {t("description")}
        </p>
      </header>

      {/* FILTRES */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat.slug}
            onClick={() => setFiltre(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              filtre === cat.slug
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-black/70 border-black/20 hover:border-orange-400"
            }`}
          >
            {cat.slug === "toutes" ? t("toutes") : cat.label}
          </button>
        ))}
      </div>

      {/* COMPTEUR */}
      <p className="text-sm text-black/50 mb-4">{filtered.length} {filtered.length > 1 ? t("compteur_pluriel") : t("compteur")}</p>

      <section className="grid gap-6">
        {filtered.map((p) => (
          <article
            key={p.slug}
            className="rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="w-full sm:w-40">
                <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-white">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-contain p-3"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-sm text-black/50">
                      {t("image_bientot")}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold">
                  <Link href={`/produit/${p.slug}`} className="hover:underline">
                    {p.title}
                  </Link>
                </h2>
                {p.category && (
                  <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                    {p.category}
                  </span>
                )}
                <p className="mt-2 text-black/70">{(p as any)[`shortDescription_${locale}`] || p.shortDescription}</p>
                {p.prix && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-orange-600">{p.prix}$</span>
                    {p.prixBarre && <span className="text-sm line-through text-black/40">{p.prixBarre}$</span>}
                  </div>
                )}
                <p className="mt-3">
                  <Link href={`/produit/${p.slug}`} className="text-sm font-medium text-blue-700 hover:underline">
                    {t("voir_fiche")}
                  </Link>
                </p>
              </div>
              <div className="sm:shrink-0">
                <AffiliateButton url={p.amazonUrl} label={t("voir_amazon")} />
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
