import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Xbox Game Pass prix Canada (2026) | Comparatif",
  description:
    "Prix Xbox Game Pass au Canada : Core, Console, PC et Ultimate. Comparatif et informations pour payer moins cher.",
  alternates: {
    canonical: "/xbox-game-pass-prix-canada",
  },
};

export default function Page() {
  const affiliateUrl = "https://www.amazon.ca/dp/B0XXXX?tag=prixmalin-20";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Xbox Game Pass",
    brand: { "@type": "Brand", name: "Microsoft" },
    description:
      "Abonnement Xbox Game Pass disponible au Canada avec plusieurs formules.",
    offers: {
      "@type": "Offer",
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      url: affiliateUrl,
    },
  };

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
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
            href="/playstation-plus-prix-canada"
            className="rounded-xl border p-4 text-sm font-semibold hover:bg-gray-50"
          >
            PlayStation Plus (Canada)
          </Link>
          <Link
            href="/carte-psn-canada"
            className="rounded-xl border p-4 text-sm font-semibold hover:bg-gray-50"
          >
            Cartes PSN (Canada)
          </Link>
          <Link
            href="/nintendo-switch-online-prix-canada"
            className="rounded-xl border p-4 text-sm font-semibold hover:bg-gray-50"
          >
            Nintendo Online (Canada)
          </Link>
        </div>
      </section>

      <h1 className="text-3xl font-bold">Xbox Game Pass prix Canada</h1>

      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Tarifs indicatifs</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>Game Pass Core : ≈ 74,99 CAD / an</li>
          <li>Game Pass Console : ≈ 16,99 CAD / mois</li>
          <li>Game Pass PC : ≈ 11,99 CAD / mois</li>
          <li>Game Pass Ultimate : ≈ 19,99 CAD / mois</li>
        </ul>
      </section>

      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Comparatif des formules</h2>

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
              <td className="p-2">Core</td>
              <td className="p-2">≈ 74,99 CAD</td>
              <td className="p-2">Multijoueur + jeux sélectionnés</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">PC</td>
              <td className="p-2">≈ 11,99 CAD/mois</td>
              <td className="p-2">Catalogue PC</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Console</td>
              <td className="p-2">≈ 16,99 CAD/mois</td>
              <td className="p-2">Catalogue console</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Ultimate</td>
              <td className="p-2">≈ 19,99 CAD/mois</td>
              <td className="p-2">Console + PC + Cloud gaming</td>
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
        Voir les offres Xbox Game Pass
      </a>

      <section className="rounded-2xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">
          Quelle formule Xbox Game Pass choisir ?
        </h2>

        <p className="mt-2 text-sm">
          Ultimate est la formule la plus complète avec accès console, PC et
          cloud gaming. Core convient aux joueurs multijoueur occasionnels.
        </p>
      </section>
    </main>
  );
}
