import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Carte PlayStation Plus Canada : prix et où acheter",
  description:
    "Carte PlayStation Plus au Canada : prix, durées disponibles et où acheter moins cher avec des liens fiables.",
  alternates: {
    canonical: "/carte-playstation-plus-canada",
  },
};

export default function Page() {
  const affiliateUrl =
    "https://www.amazon.ca/dp/B0XXXX?tag=prixmalin20-20";

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">

      {/* Bloc deals */}
      <section className="rounded-2xl border bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">PrixMalin</p>
            <h2 className="text-lg font-semibold">
              Voir les deals PlayStation Plus au Canada
            </h2>
            <p className="text-sm text-gray-600">
              Codes et offres mis à jour + liens affiliés traçables.
            </p>
          </div>

          <Link
            href="/deals"
            className="rounded-xl bg-green-600 px-6 py-3 text-center font-semibold text-white hover:bg-green-700"
          >
            Voir les deals
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/i/playstation-plus-prix-canada"
            className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Guide PS+ (Canada)
          </Link>

          <Link
            href="/i/carte-psn-25-canada"
            className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Cartes PSN
          </Link>
        </div>
      </section>

      <h1 className="text-3xl font-bold">
        Carte PlayStation Plus Canada
      </h1>

      {/* Durées */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Durées disponibles
        </h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>1 mois</li>
          <li>3 mois</li>
          <li>12 mois</li>
        </ul>

        <p className="mt-3 text-sm text-gray-600">
          Les cartes 12 mois sont souvent les plus rentables.
        </p>
      </section>

      {/* Avantages */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Pourquoi acheter une carte PlayStation Plus ?
        </h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>✔ Éviter le paiement mensuel automatique</li>
          <li>✔ Profiter de promotions ponctuelles</li>
          <li>✔ Cadeau facile pour joueurs PlayStation</li>
          <li>✔ Compatible PS4 et PS5</li>
        </ul>
      </section>

      {/* CTA affilié */}
      <a
        href={affiliateUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="block rounded-2xl bg-green-600 px-6 py-4 text-center font-semibold text-white hover:bg-green-700"
      >
        Voir les cartes PlayStation Plus
      </a>

      {/* Guide interne */}
      <section className="rounded-2xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">
          Carte PS+ ou abonnement direct ?
        </h2>

        <p className="mt-2 text-sm">
          Les cartes peuvent parfois coûter moins cher que l’abonnement
          direct selon les promotions. Elles permettent aussi de contrôler
          le budget.
        </p>

        <Link
          href="/i/playstation-plus-prix-canada"
          className="mt-3 inline-block text-sm font-semibold underline"
        >
          Voir le guide PlayStation Plus →
        </Link>
      </section>
    </main>
  );
}
