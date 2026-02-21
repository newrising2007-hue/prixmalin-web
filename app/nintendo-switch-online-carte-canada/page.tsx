import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Carte Nintendo Switch Online Canada : prix et abonnement",
  description:
    "Carte Nintendo Switch Online au Canada : prix, formules individuel et familial, et où acheter moins cher.",
  alternates: {
    canonical: "/nintendo-switch-online-carte-canada",
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
              Voir les deals Nintendo Online au Canada
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
            href="/nintendo-switch-online-prix-canada"
            className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Guide Nintendo Online
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
        Carte Nintendo Switch Online Canada
      </h1>

      {/* Prix */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Prix indicatif
        </h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>Individuel : ≈ 24,99 CAD / an</li>
          <li>Familial : ≈ 44,99 CAD / an</li>
          <li>Pack additionnel : ≈ 63,99 CAD / an</li>
        </ul>

        <p className="mt-3 text-sm text-gray-600">
          Les abonnements familiaux sont souvent les plus rentables par joueur.
        </p>
      </section>

      {/* Avantages */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Pourquoi acheter une carte Nintendo Online ?
        </h2>

        <ul className="mt-3 space-y-2 text-sm">
          <li>✔ Multijoueur en ligne Nintendo</li>
          <li>✔ Jeux rétro NES / SNES inclus</li>
          <li>✔ Partage familial jusqu’à 8 comptes</li>
          <li>✔ Contrôle du budget sans renouvellement automatique</li>
        </ul>
      </section>

      {/* CTA affilié */}
      <a
        href={affiliateUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="block rounded-2xl bg-green-600 px-6 py-4 text-center font-semibold text-white hover:bg-green-700"
      >
        Voir les cartes Nintendo Switch Online
      </a>

      {/* Guide interne */}
      <section className="rounded-2xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">
          Individuel ou familial ?
        </h2>

        <p className="mt-2 text-sm">
          La formule familiale devient très rentable si plusieurs joueurs
          utilisent l’abonnement sur différentes consoles.
        </p>

        <Link
          href="/nintendo-switch-online-prix-canada"
          className="mt-3 inline-block text-sm font-semibold underline"
        >
          Voir le guide Nintendo Online →
        </Link>
      </section>
    </main>
  );
}
