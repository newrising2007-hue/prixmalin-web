import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Xbox Game Pass Ultimate prix Canada (2026) | Comparatif",
  description:
    "Prix Xbox Game Pass Ultimate au Canada : abonnement mensuel, avantages, comparatif avec les autres formules et où payer moins cher.",
  alternates: {
    canonical: "/xbox-game-pass-ultimate-prix-canada",
  },
};

export default function Page() {
  const affiliateUrl =
    "https://www.amazon.ca/dp/B0XXXX?tag=prixmalin20-20";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Xbox Game Pass Ultimate",
    brand: { "@type": "Brand", name: "Microsoft" },
    description:
      "Abonnement Xbox Game Pass Ultimate disponible au Canada avec accès console, PC et cloud gaming.",
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      {/* CTA deals */}
      <section className="rounded-2xl border p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-semibold text-gray-900">PrixMalin</p>
            <h2 className="text-lg font-semibold">
              Voir les deals Game Pass Ultimate au Canada
            </h2>
            <p className="text-sm text-gray-600">
              Codes et offres mis à jour + liens affiliés traçables.
            </p>
          </div>

          <Link
            href="/deals"
            className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
          >
            Voir les deals
          </Link>
        </div>
      </section>

      <h1 className="text-3xl font-bold">
        Xbox Game Pass Ultimate prix Canada
      </h1>

      {/* Prix */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Prix officiel</h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>≈ 19,99 CAD / mois</li>
          <li>≈ 204 CAD / an (équivalent)</li>
        </ul>
      </section>

      {/* Avantages */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Ce que comprend Game Pass Ultimate
        </h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>Accès catalogue Xbox console</li>
          <li>Accès catalogue PC</li>
          <li>Xbox Cloud Gaming</li>
          <li>EA Play inclus</li>
          <li>Multijoueur Xbox Live</li>
        </ul>
      </section>

      {/* Comparatif */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Comparatif avec les autres formules
        </h2>

        <table className="mt-3 w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Formule</th>
              <th className="p-2 text-left">Prix</th>
              <th className="p-2 text-left">Contenu</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-2">Core</td>
              <td className="p-2">≈ 74,99 CAD/an</td>
              <td className="p-2">Multijoueur + jeux limités</td>
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

            <tr className="border-t font-semibold">
              <td className="p-2">Ultimate</td>
              <td className="p-2">≈ 19,99 CAD/mois</td>
              <td className="p-2">Console + PC + Cloud + EA Play</td>
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
        Voir les offres Game Pass Ultimate
      </a>

      {/* Lien interne */}
      <section className="rounded-2xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">
          Guide complet Game Pass
        </h2>

        <p className="mt-2 text-sm">
          Consulte aussi le comparatif complet des abonnements Xbox Game Pass
          pour choisir la meilleure formule selon ton usage.
        </p>

        <Link
          href="/i/carte-cadeau-xbox-50-canada"
          className="mt-3 inline-block text-sm font-semibold underline"
        >
          Voir le guide Game Pass →
        </Link>
      </section>

    </main>
  );
}
