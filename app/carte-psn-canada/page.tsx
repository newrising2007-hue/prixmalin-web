import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Carte PSN Canada (2026) | Où acheter moins cher",
  description:
    "Carte PlayStation Store Canada : prix, montants disponibles et où acheter moins cher avec des liens fiables.",
  alternates: {
    canonical: "/carte-psn-canada",
  },
};

export default function Page() {
  const affiliateUrl = "https://www.amazon.ca/dp/B0XXXX?tag=prixmalin-20";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Carte PlayStation Store",
    brand: { "@type": "Brand", name: "Sony" },
    description:
      "Carte cadeau PlayStation Store utilisable au Canada pour acheter jeux et abonnements.",
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
            href="/nintendo-switch-online-prix-canada"
            className="rounded-xl border p-4 text-sm font-semibold hover:bg-gray-50"
          >
            Nintendo Online (Canada)
          </Link>
        </div>
      </section>

      <h1 className="text-3xl font-bold">Carte PSN Canada</h1>

      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Montants disponibles</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>10 CAD</li>
          <li>25 CAD</li>
          <li>50 CAD</li>
          <li>100 CAD</li>
        </ul>
      </section>

      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Comparatif des cartes</h2>

        <table className="mt-3 w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Montant</th>
              <th className="p-2 text-left">Utilisation</th>
              <th className="p-2 text-left">Recommandé pour</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">10 CAD</td>
              <td className="p-2">Petits achats</td>
              <td className="p-2">DLC ou promotions</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">25 CAD</td>
              <td className="p-2">Jeux en promo</td>
              <td className="p-2">Budget moyen</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">50 CAD</td>
              <td className="p-2">Jeux complets</td>
              <td className="p-2">Meilleur compromis</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">100 CAD</td>
              <td className="p-2">Gros achats</td>
              <td className="p-2">Joueurs réguliers</td>
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
        Voir les cartes PlayStation
      </a>

      <section className="rounded-2xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">Pourquoi acheter une carte PSN ?</h2>

        <p className="mt-2 text-sm">
          Les cartes PlayStation Store permettent d’ajouter du crédit sur votre compte
          sans utiliser directement une carte bancaire. Elles peuvent aussi permettre
          de profiter de promotions selon les périodes.
        </p>
      </section>

      <section className="rounded-2xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">FAQ</h2>

        <p className="mt-2 text-sm">
          Les cartes n’expirent pas et doivent correspondre à la région du compte
          PlayStation.
        </p>
      </section>
    </main>
  );
}

