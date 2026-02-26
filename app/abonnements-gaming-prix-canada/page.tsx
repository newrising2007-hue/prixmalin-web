import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Abonnements gaming : prix au Canada (2026)",
  description:
    "Comparatif PlayStation Plus, Xbox Game Pass et Nintendo Switch Online au Canada avec liens vers les deals actifs.",
  alternates: {
    canonical: "/abonnements-gaming-prix-canada",
  },
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://prixmalin.ca",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Abonnements gaming",
        item: "https://prixmalin.ca/abonnements-gaming-prix-canada",
      },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-8">

      {/* Schema Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold">
          Abonnements gaming : prix au Canada
        </h1>

        <p className="text-gray-600 max-w-2xl">
          Un guide simple pour comparer PlayStation Plus, Xbox Game Pass et
          Nintendo Switch Online — avec des liens vers les deals actifs.
        </p>

        <div className="flex gap-3">
          <Link
            href="/deals"
            className="rounded-2xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700"
          >
            Voir les deals
          </Link>

          <Link
            href="/"
            className="rounded-2xl border px-6 py-3 font-semibold hover:bg-gray-50"
          >
            Retour accueil
          </Link>
        </div>
      </header>

      {/* Comparatif rapide */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Comparatif rapide</h2>
        <p className="text-sm text-gray-600 mt-1">
          Choisis selon ta console principale et ton style de jeu.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <p className="font-semibold">PlayStation</p>
            <p className="text-sm text-gray-600 mt-1">
              PS+ pour multijoueur + catalogue (Extra/Premium).
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="font-semibold">Xbox / PC</p>
            <p className="text-sm text-gray-600 mt-1">
              Game Pass pour un gros catalogue + Ultimate (console/PC/cloud).
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="font-semibold">Nintendo</p>
            <p className="text-sm text-gray-600 mt-1">
              Online pour multijoueur + rétro, famille rentable.
            </p>
          </div>
        </div>
      </section>

      {/* Guides détaillés */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Guides détaillés</h2>

        <div className="grid gap-4 md:grid-cols-2">

          <Link
            href="/i/playstation-plus-prix-canada"
            className="rounded-2xl border p-5 hover:bg-gray-50"
          >
            <p className="font-semibold">
              PlayStation Plus : prix au Canada
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Essential / Extra / Premium : différences, prix indicatifs et conseils.
            </p>
            <p className="mt-3 text-sm font-semibold underline">
              Lire le guide →
            </p>
          </Link>

          <Link
            href="/i/carte-cadeau-xbox-50-canada"
            className="rounded-2xl border p-5 hover:bg-gray-50"
          >
            <p className="font-semibold">
              Xbox Game Pass : prix au Canada
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Core / Console / PC / Ultimate : quel plan choisir.
            </p>
            <p className="mt-3 text-sm font-semibold underline">
              Lire le guide →
            </p>
          </Link>

          <Link
            href="/i/carte-nintendo-eshop-20-canada"
            className="rounded-2xl border p-5 hover:bg-gray-50"
          >
            <p className="font-semibold">
              Nintendo Switch Online : prix au Canada
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Individuel / Famille / Pack additionnel.
            </p>
            <p className="mt-3 text-sm font-semibold underline">
              Lire le guide →
            </p>
          </Link>

          <Link
            href="/i/carte-psn-25-canada"
            className="rounded-2xl border p-5 hover:bg-gray-50"
          >
            <p className="font-semibold">
              Cartes PSN : guide Canada
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Où acheter et quels montants choisir.
            </p>
            <p className="mt-3 text-sm font-semibold underline">
              Lire le guide →
            </p>
          </Link>

        </div>
      </section>

    </main>
  );
}

