import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PlayStation Plus prix Canada (2026) | Comparatif",
  description:
    "Prix PlayStation Plus au Canada : Essential, Extra, Premium. Comparatif des abonnements et où acheter moins cher.",
  alternates: {
    canonical: "/playstation-plus-prix-canada",
  },
};

export default function Page() {
  const affiliateUrl = "https://www.amazon.ca/s?k=playstation+plus+canada&tag=prixmalin20-20";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "PlayStation Plus",
    brand: { "@type": "Brand", name: "Sony" },
    description:
      "Abonnement PlayStation Plus disponible au Canada avec plusieurs formules.",
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
        name: "Quel est le prix du PlayStation Plus au Canada ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le prix dépend du niveau (Essential, Extra ou Premium).",
        },
      },
      {
        "@type": "Question",
        name: "Peut-on payer moins cher ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, selon les promotions et cartes cadeaux disponibles.",
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

      {/* ✅ Maillage interne : retour vers deals + autres guides */}
      <section className="rounded-2xl border bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">PrixMalin</p>
            <h2 className="mt-1 text-base font-semibold">
              Voir les deals actifs au Canada
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
            href="/i/carte-cadeau-xbox-50-canada"
            className="rounded-xl border p-4 text-sm font-semibold hover:bg-gray-50"
          >
            Xbox Game Pass (Canada)
          </Link>
          <Link
            href="/i/carte-psn-25-canada"
            className="rounded-xl border p-4 text-sm font-semibold hover:bg-gray-50"
          >
            Cartes PSN (Canada)
          </Link>
          <Link
            href="/i/carte-nintendo-eshop-20-canada"
            className="rounded-xl border p-4 text-sm font-semibold hover:bg-gray-50"
          >
            Nintendo Online (Canada)
          </Link>
        </div>
      </section>

      <h1 className="text-3xl font-bold">PlayStation Plus prix Canada</h1>

      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Tarifs indicatifs</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>Essential : ≈ 94,99 CAD / an</li>
          <li>Extra : ≈ 154,99 CAD / an</li>
          <li>Premium : ≈ 189,99 CAD / an</li>
        </ul>
      </section>

      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Comparatif</h2>

        <table className="mt-3 w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Formule</th>
              <th className="p-2 text-left">Prix</th>
              <th className="p-2 text-left">Avantages</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">Essential</td>
              <td className="p-2">≈ 94,99 CAD</td>
              <td className="p-2">Jeux mensuels + multijoueur</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Extra</td>
              <td className="p-2">≈ 154,99 CAD</td>
              <td className="p-2">Catalogue de jeux</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Premium</td>
              <td className="p-2">≈ 189,99 CAD</td>
              <td className="p-2">Cloud gaming + rétro</td>
            </tr>
          </tbody>
        </table>
      </section>

      <a
        href={affiliateUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="block rounded-2xl bg-green-600 px-6 py-4 text-center font-semibold text-white hover:bg-green-700"
      >
        Voir les offres PlayStation Plus
      </a>

      <section className="rounded-2xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <p className="mt-2 text-sm">
          Essential convient aux joueurs occasionnels, Extra offre un bon
          équilibre, Premium propose l’expérience la plus complète.
        </p>
      </section>
    </main>
  );
}
