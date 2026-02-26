import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nintendo Switch Online Canada : prix, abonnements et options (Individuel, Famille, Extension Pack)",
  description:
    "Guide Nintendo Switch Online au Canada : différences entre Individuel, Famille et Extension Pack, où s’abonner, et comment choisir la meilleure option.",
  keywords: [
    "Nintendo Switch Online Canada",
    "Nintendo Switch Online prix Canada",
    "Nintendo Switch Online Famille Canada",
    "Nintendo Switch Online Extension Pack Canada",
    "abonnement Nintendo Canada",
  ],
  alternates: {
    canonical: "/nintendo-switch-online",
    languages: {
      fr: "https://prixmalin.ca/nintendo-switch-online",
      "x-default": "https://prixmalin.ca/nintendo-switch-online",
    },
  },
  openGraph: {
    title: "Nintendo Switch Online Canada : prix et abonnements",
    description:
      "Compare Individuel, Famille et Extension Pack au Canada. Conseils + liens officiels.",
    url: "https://prixmalin.ca/nintendo-switch-online",
    siteName: "PrixMalin",
    locale: "fr_CA",
    type: "website",
  },
};

const OFFICIAL_NSO_URL = "https://www.nintendo.com/en-ca/switch/online/";
const OFFICIAL_NSO_PLANS_URL = "https://www.nintendo.com/en-ca/switch/online/#plans";

export default function NintendoSwitchOnlinePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Nintendo Switch Online Canada",
    url: "https://prixmalin.ca/nintendo-switch-online",
    inLanguage: "fr-CA",
    description:
      "Guide Nintendo Switch Online au Canada : Individuel, Famille, Extension Pack, et liens officiels.",
    isPartOf: {
      "@type": "WebSite",
      name: "PrixMalin",
      url: "https://prixmalin.ca",
    },
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-8">
        <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-900">
          Abonnements Gaming • Canada 🇨🇦
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Nintendo Switch Online Canada
        </h1>

        <p className="mt-3 text-base text-gray-600">
          Compare <strong>Individuel</strong>, <strong>Famille</strong> et{" "}
          <strong>Extension Pack</strong>, et choisis l’option la plus logique
          pour ton usage.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={OFFICIAL_NSO_URL}
            target="_blank"
            rel="nofollow noopener"
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-black"
          >
            Voir Nintendo Switch Online (officiel) →
          </a>

          <a
            href={OFFICIAL_NSO_PLANS_URL}
            target="_blank"
            rel="nofollow noopener"
            className="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Voir les plans (officiel)
          </a>

          <Link
            href="/nintendo-switch-online-prix-canada"
            className="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Guide prix Canada →
          </Link>
        </div>
      </header>

      <section className="rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-bold">Quelle version choisir ?</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-5">
            <h3 className="text-base font-semibold">Individuel</h3>
            <p className="mt-2 text-sm text-gray-600">
              Le plus simple pour une personne : jeu en ligne + fonctionnalités de base.
            </p>
            <a
              href={OFFICIAL_NSO_PLANS_URL}
              target="_blank"
              rel="nofollow noopener"
              className="mt-4 inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700"
            >
              Voir les plans officiels →
            </a>
          </div>

          <div className="rounded-xl border p-5">
            <h3 className="text-base font-semibold">Famille</h3>
            <p className="mt-2 text-sm text-gray-600">
              Idéal si vous êtes plusieurs (jusqu’à 8 comptes). Souvent le meilleur deal.
            </p>
            <a
              href={OFFICIAL_NSO_PLANS_URL}
              target="_blank"
              rel="nofollow noopener"
              className="mt-4 inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700"
            >
              Comparer sur le site officiel →
            </a>
          </div>

          <div className="rounded-xl border p-5">
            <h3 className="text-base font-semibold">Extension Pack</h3>
            <p className="mt-2 text-sm text-gray-600">
              Pour les catalogues rétro additionnels et avantages inclus selon l’offre.
            </p>
            <a
              href={OFFICIAL_NSO_PLANS_URL}
              target="_blank"
              rel="nofollow noopener"
              className="mt-4 inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700"
            >
              Détails Extension Pack →
            </a>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-bold">Astuces pour payer moins (Canada)</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-gray-700">
          <li>
            Consulte{" "}
            <Link className="font-semibold underline underline-offset-4" href="/nintendo-switch-online-prix-canada">
              Nintendo Switch Online : prix au Canada
            </Link>{" "}
            pour les options Individuel/Famille et l’Extension Pack.
          </li>
          <li>
            Pour plusieurs joueurs, l’abonnement Famille est souvent le plus rentable.
          </li>
          <li>
            Jette un œil aux{" "}
            <Link className="font-semibold underline underline-offset-4" href="/deals">
              deals actifs
            </Link>{" "}
            (cartes numériques et promos).
          </li>
        </ul>
      </section>

      <div className="mt-10 pt-6 border-t">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/abonnements-gaming" className="text-blue-700 font-semibold hover:underline">
            ← Retour aux abonnements gaming
          </Link>

          <p className="text-xs text-gray-500">
            PrixMalin est une plateforme d’affiliation. Certains liens peuvent être affiliés.
          </p>
        </div>
      </div>
    </main>
  );
}
