// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllDeals } from "@/lib/deals";

export const metadata: Metadata = {
  title: "Deals gaming au Canada (2026) | PrixMalin",
  description:
    "Meilleurs deals gaming au Canada : PlayStation Plus, Xbox Game Pass, Nintendo Switch Online et cartes cadeaux. Liens fiables et prix vérifiés.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const deals = getAllDeals().slice(0, 6);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: deals.map((deal, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://prixmalin.ca/deals/${deal.slug}`,
      name: deal.title,
    })),
  };

  return (
    <main className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero */}
      <section className="rounded-2xl border bg-white p-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Deals gaming au Canada
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          PrixMalin est une plateforme d’affiliation : on partage des offres et
          codes gaming via des liens traçables. Prix affichés seulement si
          certains.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/deals"
            className="rounded-2xl bg-green-600 px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-green-700"
          >
            Voir les deals
          </Link>
          <Link
            href="/codes-bonus"
            className="rounded-2xl border px-6 py-3 text-center font-semibold transition hover:bg-gray-50"
          >
            Codes bonus
          </Link>
        </div>
      </section>

      {/* Deals récents */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Deals récents</h2>
          <Link href="/deals" className="text-sm text-gray-600 hover:underline">
            Voir tout
          </Link>
        </div>

        {deals.length === 0 ? (
          <div className="rounded-2xl border p-6">
            <p className="text-gray-700">Aucun deal pour le moment.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((deal) => (
              <li key={deal.slug} className="rounded-2xl border p-4">
                <Link href={`/deals/${deal.slug}`} className="block">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="mb-3 h-36 w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                  <p className="text-base font-semibold">{deal.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                    {deal.description}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">{deal.platform}</p>
                  {typeof deal.price === "number" && (
                    <p className="mt-3 text-lg font-semibold">
                      {deal.price} {deal.currency || "CAD"}
                    </p>
                  )}
                </Link>

                <a
                  href={deal.affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="mt-4 block rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Voir l’offre
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Guides populaires */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Guides populaires</h2>
          <Link href="/abonnements-gaming" className="text-sm text-gray-600 hover:underline">
            Guide complet
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li className="rounded-2xl border p-4">
            <Link href="/playstation-plus-prix-canada" className="block">
              <p className="font-semibold">PlayStation Plus prix Canada</p>
              <p className="mt-1 text-sm text-gray-600">
                Comparatif des abonnements et prix indicatifs.
              </p>
            </Link>
          </li>

          <li className="rounded-2xl border p-4">
            <Link href="/xbox-game-pass-prix-canada" className="block">
              <p className="font-semibold">Xbox Game Pass prix Canada</p>
              <p className="mt-1 text-sm text-gray-600">
                Toutes les formules disponibles au Canada.
              </p>
            </Link>
          </li>

          <li className="rounded-2xl border p-4">
            <Link href="/carte-psn-canada" className="block">
              <p className="font-semibold">Carte PSN Canada</p>
              <p className="mt-1 text-sm text-gray-600">
                Où acheter et quels montants choisir.
              </p>
            </Link>
          </li>

          <li className="rounded-2xl border p-4 sm:col-span-2 lg:col-span-3">
            <Link href="/abonnements-gaming" className="block">
              <p className="font-semibold">
                Guide complet : abonnements gaming (Canada)
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Compare PS+, Game Pass et Nintendo Online — puis va voir les deals actifs.
              </p>
              <p className="mt-2 text-sm font-semibold underline">
                Ouvrir le guide →
              </p>
            </Link>
          </li>
        </ul>
      </section>

      {/* Payer moins cher */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Payer ses abonnements gaming moins cher
        </h2>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li className="rounded-2xl border p-4">
            <Link href="/playstation-plus-pas-cher-canada" className="block">
              <p className="font-semibold">PlayStation Plus pas cher</p>
              <p className="mt-1 text-sm text-gray-600">
                Astuces pour économiser sur l’abonnement.
              </p>
            </Link>
          </li>

          <li className="rounded-2xl border p-4">
            <Link href="/xbox-game-pass-pas-cher-canada" className="block">
              <p className="font-semibold">Xbox Game Pass pas cher</p>
              <p className="mt-1 text-sm text-gray-600">
                Comment payer moins cher au Canada.
              </p>
            </Link>
          </li>

          <li className="rounded-2xl border p-4">
            <Link href="/nintendo-switch-online-pas-cher-canada" className="block">
              <p className="font-semibold">Nintendo Online pas cher</p>
              <p className="mt-1 text-sm text-gray-600">
                Les meilleures options pour économiser.
              </p>
            </Link>
          </li>

          <li className="rounded-2xl border p-4 sm:col-span-2 lg:col-span-3">
            <Link href="/abonnement-gaming-pas-cher" className="block">
              <p className="font-semibold">
                Comparatif : abonnement gaming pas cher (Canada)
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Vue d’ensemble rapide + liens vers les meilleurs guides.
              </p>
              <p className="mt-2 text-sm font-semibold underline">
                Voir le comparatif →
              </p>
            </Link>
          </li>
        </ul>
      </section>

      {/* Transparence */}
      <section className="rounded-2xl bg-gray-50 p-6">
        <h2 className="text-lg font-semibold">Transparence</h2>
        <p className="mt-2 text-sm text-gray-700">
          Certains liens sont affiliés : si tu achètes via ces liens, PrixMalin
          peut recevoir une commission, sans coût supplémentaire pour toi.
        </p>
      </section>
    </main>
  );
}
