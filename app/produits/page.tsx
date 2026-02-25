import Link from "next/link";
import AffiliateButton from "@/components/AffiliateButton";
import { getAllProducts } from "@/lib/products";

export const metadata = {
  title: "Produits gaming recommandés | PrixMalin",
  description:
    "Sélection de produits gaming recommandés au Canada. Liens affiliés Amazon inclus.",
};

export default function ProduitsPage() {
  const products = getAllProducts();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Produits gaming recommandés</h1>
        <p className="mt-2 text-black/70">
          Sélection manuelle (MVP). Certains liens sont affiliés : en achetant via
          ces liens, tu soutiens PrixMalin sans coût supplémentaire.
        </p>
      </header>

      <section className="grid gap-6">
        {products.map((p) => (
          <article
            key={p.slug}
            className="rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              {/* Image */}
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
                      Image bientôt disponible
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

                <p className="mt-2 text-black/70">{p.shortDescription}</p>

                <p className="mt-3">
                  <Link
                    href={`/produit/${p.slug}`}
                    className="text-sm font-medium text-blue-700 hover:underline"
                  >
                    Voir la fiche →
                  </Link>
                </p>
              </div>

              <div className="sm:shrink-0">
                <AffiliateButton url={p.amazonUrl} label="Voir sur Amazon" />
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
