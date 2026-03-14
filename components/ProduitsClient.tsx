"use client";
import Link from "next/link";
import { useState } from "react";

type Props = {
  products: any[];
  categorySlugs: string[];
  labels: Record<string, string>;
  locale: string;
};

export default function ProduitsClient({ products, categorySlugs, labels, locale }: Props) {
  const [filtre, setFiltre] = useState("toutes");

  const filtered = filtre === "toutes"
    ? products
    : products.filter((p: any) => p.category === filtre);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {categorySlugs.map(slug => (
          <button
            key={slug}
            onClick={() => setFiltre(slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${filtre === slug ? "bg-orange-500 text-white border-orange-500" : "bg-white text-black/70 border-black/20 hover:border-orange-400"}`}
          >
            {labels[`cat_${slug}`] || labels[slug] || slug}
          </button>
        ))}
      </div>

      <p className="text-sm text-black/50 mb-4">
        {filtered.length} {filtered.length > 1 ? labels["compteur_pluriel"] : labels["compteur"]}
      </p>

      <section className="grid gap-6">
        {filtered.map((p: any) => (
          <article key={p.slug} className="rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="w-full sm:w-40">
                <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-white">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="h-full w-full object-contain p-3" loading="lazy" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-sm text-black/50">
                      {labels["image_bientot"]}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold">
                  <Link href={`/${locale}/produit/${p.slug}`} className="hover:underline">{p.title}</Link>
                </h2>
                {p.category && (
                  <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                    {labels[`cat_${p.category}`] || p.category}
                  </span>
                )}
                <p className="mt-2 text-black/70">{p[`shortDescription_${locale}`] || p.shortDescription}</p>
                {p.prix && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-orange-600">{p.prix}$</span>
                    {p.prixBarre && <span className="text-sm line-through text-black/40">{p.prixBarre}$</span>}
                  </div>
                )}
                <p className="mt-3">
                  <Link href={`/${locale}/produit/${p.slug}`} className="text-sm font-medium text-blue-700 hover:underline">
                    {labels["voir_fiche"]}
                  </Link>
                </p>
              </div>
              <div className="sm:shrink-0 flex flex-col items-end gap-1">
                {p.prixVerifieLe && (
                  <span className="text-xs text-black/40">✓ Prix vérifié : {p.prixVerifieLe ? new Date(p.prixVerifieLe + "T12:00:00").toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" }) : ""}</span>
                )}
                <a href={p.amazonUrl} target="_blank" rel="nofollow sponsored noopener" className="block rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
                  {labels["voir_amazon"]}
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
