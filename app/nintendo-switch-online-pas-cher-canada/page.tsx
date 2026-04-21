import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nintendo Switch Online pas cher Canada : comment payer moins",
  description:
    "Comment payer Nintendo Switch Online moins cher au Canada : astuces, prix et options pour économiser sur l’abonnement.",
  alternates: {
    canonical: "/nintendo-switch-online-pas-cher-canada",
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
              Voir les deals Nintendo Online au Canada
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
            href="/i/carte-nintendo-eshop-20-canada"
            className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Guide Nintendo Online
          </Link>

          <Link
            href="/nintendo-switch-online-carte-canada"
            className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Cartes Nintendo
          </Link>
        </div>
      </section>

      <h1 className="text-3xl font-bold">
        Nintendo Switch Online pas cher Canada
      </h1>

      {/* Astuces */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Comment payer moins cher ?
        </h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>✔ Choisir l’abonnement familial</li>
          <li>✔ Partager avec plusieurs joueurs</li>
          <li>✔ Profiter des promotions saisonnières</li>
          <li>✔ Acheter des cartes en promotion</li>
        </ul>
      </section>

      {/* Prix */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Prix officiels indicatifs
        </h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>Individuel : ≈ 25 CAD / an</li>
          <li>Familial : ≈ 45 CAD / an</li>
          <li>Pack additionnel : ≈ 64 CAD / an</li>
        </ul>
      </section>

      {/* CTA affilié */}
      <a
        href={affiliateUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="block rounded-2xl bg-green-600 px-6 py-4 text-center font-semibold text-white hover:bg-green-700"
      >
        Voir les offres Nintendo Online
      </a>

      {/* Guide interne */}
      <section className="rounded-2xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">
          Individuel ou familial ?
        </h2>

        <p className="mt-2 text-sm">
          L’abonnement familial devient très rentable si plusieurs joueurs
          utilisent le service sur différentes consoles.
        </p>

        <Link
          href="/i/carte-nintendo-eshop-20-canada"
          className="mt-3 inline-block text-sm font-semibold underline"
        >
          Voir le guide complet →
        </Link>
      </section>
    </main>
  );
}
