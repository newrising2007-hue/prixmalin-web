import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Xbox Game Pass Ultimate Canada : prix et abonnement",
  description:
    "Xbox Game Pass Ultimate au Canada : prix mensuel, avantages et où acheter moins cher avec des liens fiables.",
  alternates: {
    canonical: "/xbox-game-pass-ultimate-canada",
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
              Voir les deals Game Pass Ultimate au Canada
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
            href="/xbox-game-pass-prix-canada"
            className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Guide Game Pass
          </Link>

          <Link
            href="/abonnements-gaming"
            className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Comparatif abonnements
          </Link>
        </div>
      </section>

      <h1 className="text-3xl font-bold">
        Xbox Game Pass Ultimate Canada
      </h1>

      {/* Prix */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Prix indicatif
        </h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>≈ 19,99 CAD / mois</li>
          <li>≈ 59,99 CAD / 3 mois</li>
        </ul>

        <p className="mt-3 text-sm text-gray-600">
          Les promotions permettent parfois de payer moins cher via des cartes.
        </p>
      </section>

      {/* Avantages */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Ce que comprend Game Pass Ultimate
        </h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>✔ Catalogue de jeux console et PC</li>
          <li>✔ Xbox Live Gold inclus</li>
          <li>✔ EA Play inclus</li>
          <li>✔ Cloud gaming</li>
          <li>✔ Nouveautés Xbox dès la sortie</li>
        </ul>
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

      {/* Guide interne */}
      <section className="rounded-2xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">
          Ultimate vaut-il le prix ?
        </h2>

        <p className="mt-2 text-sm">
          Ultimate est la formule la plus complète avec console, PC et cloud.
          Si tu joues régulièrement, c’est souvent le meilleur choix.
        </p>

        <Link
          href="/xbox-game-pass-prix-canada"
          className="mt-3 inline-block text-sm font-semibold underline"
        >
          Voir le guide Game Pass complet →
        </Link>
      </section>
    </main>
  );
}
