import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PlayStation Plus pas cher Canada : comment payer moins",
  description:
    "Comment payer PlayStation Plus moins cher au Canada : astuces, cartes et meilleures options pour économiser.",
  alternates: {
    canonical: "/playstation-plus-pas-cher-canada",
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
            href="/i/playstation-plus-prix-canada"
            className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Guide PS+ prix
          </Link>

          <Link
            href="/carte-playstation-plus-canada"
            className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Cartes PS+
          </Link>
        </div>
      </section>

      <h1 className="text-3xl font-bold">
        PlayStation Plus pas cher Canada
      </h1>

      {/* Astuces */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Comment payer moins cher ?
        </h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>✔ Acheter des cartes en promotion</li>
          <li>✔ Profiter des soldes saisonnières</li>
          <li>✔ Choisir l’abonnement annuel</li>
          <li>✔ Surveiller les bundles consoles</li>
        </ul>
      </section>

      {/* Prix */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Prix officiels indicatifs
        </h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>Essential : ≈ 95 CAD / an</li>
          <li>Extra : ≈ 155 CAD / an</li>
          <li>Premium : ≈ 190 CAD / an</li>
        </ul>
      </section>

      {/* CTA affilié */}
      <a
        href={affiliateUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="block rounded-2xl bg-green-600 px-6 py-4 text-center font-semibold text-white hover:bg-green-700"
      >
        Voir les offres PlayStation Plus
      </a>

      {/* Guide interne */}
      <section className="rounded-2xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">
          Quelle formule choisir ?
        </h2>

        <p className="mt-2 text-sm">
          Extra est souvent le meilleur équilibre entre prix et contenu.
          Premium devient intéressant pour les joueurs rétro.
        </p>

        <Link
          href="/i/playstation-plus-prix-canada"
          className="mt-3 inline-block text-sm font-semibold underline"
        >
          Voir le guide complet →
        </Link>
      </section>
    </main>
  );
}
