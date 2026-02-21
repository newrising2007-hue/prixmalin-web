import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PlayStation Plus Premium prix Canada (2026) | Comparatif",
  description:
    "Prix PlayStation Plus Premium au Canada : avantages, différences avec Essential/Extra, comparatif et où payer moins cher.",
  alternates: {
    canonical: "/playstation-plus-premium-prix-canada",
  },
};

export default function Page() {
  const affiliateUrl = "https://www.amazon.ca/dp/B0XXXX?tag=prixmalin-20";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "PlayStation Plus Premium",
    brand: { "@type": "Brand", name: "Sony" },
    description:
      "Abonnement PlayStation Plus Premium disponible au Canada : catalogue, classiques, essais de jeux et cloud (selon disponibilité).",
    offers: {
      "@type": "Offer",
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      url: affiliateUrl,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quel est le prix du PlayStation Plus Premium au Canada ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le prix dépend de la durée (mensuel, trimestriel ou annuel). Le tarif annuel est généralement le plus rentable.",
        },
      },
      {
        "@type": "Question",
        name: "Premium vaut-il mieux que Extra ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Premium ajoute surtout les classiques et essais de jeux. Si tu veux surtout le catalogue de jeux, Extra suffit souvent.",
        },
      },
      {
        "@type": "Question",
        name: "Comment payer moins cher ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Surveille les promos, bundles, et parfois les cartes cadeaux selon les périodes. Les deals peuvent varier au fil du temps.",
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Bloc deals + maillage interne */}
      <section className="rounded-2xl border bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">PrixMalin</p>
            <h2 className="mt-1 text-base font-semibold">
              Voir les deals PlayStation au Canada
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Codes et offres mis à jour + liens affiliés traçables.
            </p>
          </div>

          <Link
            href="/deals"
            className="rounded-2xl bg-green-600 px-6 py-4 text-center text-sm font-semibold text-white hover:bg-green-700"
          >
            Voir les deals
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link
            href="/playstation-plus-prix-canada"
            className="rounded-xl border p-4 text-sm font-semibold hover:bg-gray-50"
          >
            Guide PS+ (Canada)
          </Link>
          <Link
            href="/carte-psn-canada"
            className="rounded-xl border p-4 text-sm font-semibold hover:bg-gray-50"
          >
            Cartes PSN (Canada)
          </Link>
          <Link
            href="/abonnements-gaming-prix-canada"
            className="rounded-xl border p-4 text-sm font-semibold hover:bg-gray-50"
          >
            Guide complet
          </Link>
        </div>
      </section>

      <h1 className="text-3xl font-bold">PlayStation Plus Premium prix Canada</h1>

      {/* Prix officiel */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Prix indicatif au Canada</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>Mensuel : ≈ 20 CAD / mois</li>
          <li>Trimestriel : ≈ 55 CAD / 3 mois</li>
          <li>Annuel : ≈ 190 CAD / an</li>
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          Les prix peuvent évoluer. Le plan annuel est souvent le plus rentable si tu joues
          régulièrement.
        </p>
      </section>

      {/* Avantages */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Avantages Premium</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>Catalogue de jeux (comme Extra)</li>
          <li>Jeux classiques (selon la sélection)</li>
          <li>Essais de jeux (time trials)</li>
          <li>Fonctions cloud selon disponibilité</li>
        </ul>
      </section>

      {/* Comparatif */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Comparatif Essential vs Extra vs Premium</h2>

        <table className="mt-3 w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Formule</th>
              <th className="p-2 text-left">Prix (annuel)</th>
              <th className="p-2 text-left">Pour qui ?</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">Essential</td>
              <td className="p-2">≈ 95 CAD</td>
              <td className="p-2">Multijoueur + jeux mensuels</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Extra</td>
              <td className="p-2">≈ 155 CAD</td>
              <td className="p-2">Catalogue de jeux (meilleur équilibre)</td>
            </tr>
            <tr className="border-t font-semibold">
              <td className="p-2">Premium</td>
              <td className="p-2">≈ 190 CAD</td>
              <td className="p-2">Classiques + essais + options avancées</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* CTA affilié */}
      <a
        href={affiliateUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="block rounded-2xl bg-green-600 px-6 py-4 text-center font-semibold text-white hover:bg-green-700"
      >
        Voir les offres PlayStation Plus Premium
      </a>

      {/* Conseil + lien interne */}
      <section className="rounded-2xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">Premium est-il rentable ?</h2>
        <p className="mt-2 text-sm text-gray-700">
          Premium est intéressant si tu veux les classiques et les essais de jeux. Si ton objectif
          est surtout d’accéder au catalogue, Extra suffit souvent.
        </p>

        <Link
          href="/playstation-plus-prix-canada"
          className="mt-3 inline-block text-sm font-semibold underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
        >
          Voir le guide PS+ complet →
        </Link>
      </section>
    </main>
  );
}
