import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PlayStation Plus Canada : prix, abonnements et options (Essential, Extra, Premium)",
  description:
    "Guide PlayStation Plus au Canada : différences entre Essential, Extra et Premium, où s’abonner, et comment choisir la meilleure option.",
  keywords: [
    "PlayStation Plus Canada",
    "PlayStation Plus prix Canada",
    "PS Plus Essential Canada",
    "PS Plus Extra Canada",
    "PS Plus Premium Canada",
  ],
  alternates: {
    canonical: "/playstation-plus",
    languages: {
      fr: "https://prixmalin.ca/playstation-plus",
      "x-default": "https://prixmalin.ca/playstation-plus",
    },
  },
  openGraph: {
    title: "PlayStation Plus Canada : prix et abonnements",
    description:
      "Compare Essential, Extra et Premium au Canada. Conseils + liens officiels.",
    url: "https://prixmalin.ca/playstation-plus",
    siteName: "PrixMalin",
    locale: "fr_CA",
    type: "website",
  },
};

const OFFICIAL_PS_PLUS_URL = "https://www.playstation.com/ps-plus/";
const OFFICIAL_PS_PLUS_PLANS_URL = "https://www.playstation.com/ps-plus/#subscriptions";

export default function PlayStationPlusPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "PlayStation Plus Canada",
    url: "https://prixmalin.ca/playstation-plus",
    inLanguage: "fr-CA",
    description:
      "Guide PlayStation Plus au Canada : Essential, Extra, Premium, et liens officiels.",
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
          PlayStation Plus Canada
        </h1>

        <p className="mt-3 text-base text-gray-600">
          Comprends les différences entre <strong>Essential</strong>,{" "}
          <strong>Extra</strong> et <strong>Premium</strong>, et choisis le bon
          plan selon ton style de jeu.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={OFFICIAL_PS_PLUS_URL}
            target="_blank"
            rel="nofollow noopener"
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-black"
          >
            Voir PS+ (officiel) →
          </a>

          <a
            href={OFFICIAL_PS_PLUS_PLANS_URL}
            target="_blank"
            rel="nofollow noopener"
            className="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Voir les plans (officiel)
          </a>

          <Link
            href="/playstation-plus-prix-canada"
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
            <h3 className="text-base font-semibold">Essential</h3>
            <p className="mt-2 text-sm text-gray-600">
              L’essentiel pour jouer en ligne + jeux mensuels. Bon choix si tu veux
              surtout le multijoueur.
            </p>
            <a
              href={OFFICIAL_PS_PLUS_PLANS_URL}
              target="_blank"
              rel="nofollow noopener"
              className="mt-4 inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700"
            >
              Voir les plans officiels →
            </a>
          </div>

          <div className="rounded-xl border p-5">
            <h3 className="text-base font-semibold">Extra</h3>
            <p className="mt-2 text-sm text-gray-600">
              Catalogue de jeux inclus en plus d’Essential. Le meilleur équilibre
              pour la plupart des joueurs.
            </p>
            <a
              href={OFFICIAL_PS_PLUS_PLANS_URL}
              target="_blank"
              rel="nofollow noopener"
              className="mt-4 inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700"
            >
              Comparer sur le site officiel →
            </a>
          </div>

          <div className="rounded-xl border p-5">
            <h3 className="text-base font-semibold">Premium</h3>
            <p className="mt-2 text-sm text-gray-600">
              Le plus complet : options supplémentaires et catalogue élargi selon disponibilité.
            </p>
            <a
              href={OFFICIAL_PS_PLUS_PLANS_URL}
              target="_blank"
              rel="nofollow noopener"
              className="mt-4 inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700"
            >
              Détails Premium →
            </a>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-bold">Astuces pour payer moins (Canada)</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-gray-700">
          <li>
            Consulte{" "}
            <Link className="font-semibold underline underline-offset-4" href="/playstation-plus-prix-canada">
              PlayStation Plus : prix au Canada
            </Link>{" "}
            pour les paliers et les meilleures options.
          </li>
          <li>
            Surveille aussi les{" "}
            <Link className="font-semibold underline underline-offset-4" href="/deals">
              deals actifs
            </Link>{" "}
            (cartes numériques et promos).
          </li>
          <li>
            Si tu veux le meilleur rapport contenu/prix, Extra est souvent le plus logique.
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
