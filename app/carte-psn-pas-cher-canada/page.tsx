import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Carte PSN pas cher Canada : où acheter moins cher",
  description:
    "Carte PlayStation Store pas chère au Canada : astuces, prix et meilleures options pour économiser sur les cartes PSN.",
  alternates: {
    canonical: "/carte-psn-pas-cher-canada",
  },
};

export default function Page() {
  const affiliateUrl =
    "https://www.amazon.ca/dp/B0XXXX?tag=prixmalin-20";

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">

      {/* Bloc deals */}
      <section className="rounded-2xl border bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">PrixMalin</p>
            <h2 className="text-lg font-semibold">
              Voir les deals cartes PSN au Canada
            </h2>
            <p className="text-sm text-gray-600">
              Offres mises à jour + liens affiliés traçables.
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
            href="/i/carte-psn-25-canada"
            className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Guide cartes PSN
          </Link>

          <Link
            href="/playstation-plus-pas-cher-canada"
            className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            PS+ pas cher
          </Link>
        </div>
      </section>

      <h1 className="text-3xl font-bold">
        Carte PSN pas cher Canada
      </h1>

      {/* Astuces */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Comment payer moins cher ?
        </h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>✔ Acheter pendant les promotions</li>
          <li>✔ Surveiller les bundles consoles</li>
          <li>✔ Profiter des offres saisonnières</li>
          <li>✔ Acheter en ligne avec livraison instantanée</li>
        </ul>
      </section>

      {/* Montants */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Montants disponibles
        </h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>10 CAD</li>
          <li>25 CAD</li>
          <li>50 CAD</li>
          <li>100 CAD</li>
        </ul>
      </section>

      {/* CTA affilié */}
      <a
        href={affiliateUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="block rounded-2xl bg-green-600 px-6 py-4 text-center font-semibold text-white hover:bg-green-700"
      >
        Voir les cartes PlayStation Store
      </a>

      {/* Guide interne */}
      <section className="rounded-2xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">
          Carte PSN ou abonnement ?
        </h2>

        <p className="mt-2 text-sm">
          Les cartes PSN permettent d’acheter jeux, DLC ou abonnements
          PlayStation Plus sans utiliser directement une carte bancaire.
        </p>

        <Link
          href="/i/carte-psn-25-canada"
          className="mt-3 inline-block text-sm font-semibold underline"
        >
          Voir le guide complet →
        </Link>
      </section>
    </main>
  );
}
