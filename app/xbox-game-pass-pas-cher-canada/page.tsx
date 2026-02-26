import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Xbox Game Pass pas cher Canada : comment économiser",
  description:
    "Comment payer Xbox Game Pass moins cher au Canada : astuces, cartes et meilleures options pour économiser sur l’abonnement.",
  alternates: {
    canonical: "/xbox-game-pass-pas-cher-canada",
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
              Voir les deals Game Pass au Canada
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
            href="/i/carte-cadeau-xbox-50-canada"
            className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Guide Game Pass prix
          </Link>

          <Link
            href="/xbox-game-pass-ultimate-canada"
            className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Game Pass Ultimate
          </Link>
        </div>
      </section>

      <h1 className="text-3xl font-bold">
        Xbox Game Pass pas cher Canada
      </h1>

      {/* Astuces */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Comment payer moins cher ?
        </h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>✔ Acheter des cartes en promotion</li>
          <li>✔ Profiter des offres Ultimate</li>
          <li>✔ Choisir des abonnements longue durée</li>
          <li>✔ Surveiller les promotions Microsoft</li>
        </ul>
      </section>

      {/* Prix */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Prix officiels indicatifs
        </h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>Core : ≈ 75 CAD / an</li>
          <li>PC : ≈ 12 CAD / mois</li>
          <li>Console : ≈ 17 CAD / mois</li>
          <li>Ultimate : ≈ 20 CAD / mois</li>
        </ul>
      </section>

      {/* CTA affilié */}
      <a
        href={affiliateUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="block rounded-2xl bg-green-600 px-6 py-4 text-center font-semibold text-white hover:bg-green-700"
      >
        Voir les offres Game Pass
      </a>

      {/* Guide interne */}
      <section className="rounded-2xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">
          Quelle formule choisir ?
        </h2>

        <p className="mt-2 text-sm">
          Ultimate est souvent la formule la plus rentable si tu joues
          sur console et PC avec cloud gaming inclus.
        </p>

        <Link
          href="/i/carte-cadeau-xbox-50-canada"
          className="mt-3 inline-block text-sm font-semibold underline"
        >
          Voir le guide complet →
        </Link>
      </section>
    </main>
  );
}
