import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nintendo Switch Online prix Canada (2026) | Comparatif",
  description:
    "Prix Nintendo Switch Online au Canada : abonnement individuel et familial. Comparatif et informations pour payer moins cher.",
  alternates: {
    canonical: "/nintendo-switch-online-prix-canada",
  },
};

export default function Page() {
  const affiliateUrl = "https://www.amazon.ca/dp/B0XXXX?tag=prixmalin-20";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Nintendo Switch Online",
    brand: { "@type": "Brand", name: "Nintendo" },
    description:
      "Abonnement Nintendo Switch Online disponible au Canada avec plusieurs formules.",
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
            href="/xbox-game-pass-prix-canada"
            className="rounded-xl border p-4 text-sm font-semibold hover:bg-gray-50"
          >
            Xbox Game Pass (Canada)
          </Link>
          <Link
            href="/carte-psn-canada"
            className="rounded-xl border p-4 text-sm font-semibold hover:bg-gray-50"
          >
            Cartes PSN (Canada)
          </Link>
        </div>
      </section>

      <h1 className="text-3xl font-bold">Nintendo Switch Online prix Canada</h1>

      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Tarifs indicatifs</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>Individuel : ≈ 24,99 CAD / an</li>
          <li>Familial : ≈ 44,99 CAD / an</li>
          <li>Pack additionnel : ≈ 63,99 CAD / an</li>
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
              <td className="p-2">Individuel</td>
              <td className="p-2">≈ 24,99 CAD</td>
              <td className="p-2">Multijoueur + jeux rétro</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Familial</td>
              <td className="p-2">≈ 44,99 CAD</td>
              <td className="p-2">Jusqu’à 8 comptes</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Pack additionnel</td>
              <td className="p-2">≈ 63,99 CAD</td>
              <td className="p-2">DLC + N64 + GBA</td>
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
        Voir les offres Nintendo Switch Online
      </a>

      <section className="rounded-2xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">Quelle formule choisir ?</h2>

        <p className="mt-2 text-sm">
          La formule familiale est souvent la plus rentable si plusieurs joueurs
          utilisent l’abonnement. Le pack additionnel est intéressant pour les
          joueurs rétro et DLC.
        </p>
      </section>
    </main>
  );
}
