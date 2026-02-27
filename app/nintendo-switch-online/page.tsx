import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nintendo Switch Online au Canada (Standard & Expansion) | PrixMalin",
  description:
    "Guide Nintendo Switch Online au Canada : différences entre abonnement standard et Expansion Pack, conseils et options pour acheter/activer.",
  alternates: { canonical: "/nintendo-switch-online" },
  openGraph: {
    title: "Nintendo Switch Online au Canada | PrixMalin",
    description:
      "Comprendre Nintendo Switch Online (Standard vs Expansion) + options d'achat/activation.",
    url: "/nintendo-switch-online",
    type: "article",
  },
};

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Nintendo Switch Online au Canada : Standard vs Expansion Pack",
    description:
      "Guide Nintendo Switch Online au Canada : niveaux, différences et astuces pour payer moins.",
    mainEntityOfPage: { "@type": "WebPage", "@id": "/nintendo-switch-online" },
    author: { "@type": "Organization", name: "PrixMalin" },
    publisher: { "@type": "Organization", name: "PrixMalin" },
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <JsonLd data={jsonLd} />

      <header className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Nintendo Switch Online au Canada
        </h1>
        <p className="mt-3 text-base text-gray-700 sm:text-lg">
          Nintendo Switch Online permet de jouer en ligne sur Switch et d’accéder
          à des jeux rétro. Deux versions existent : <strong>Standard</strong> et{" "}
          <strong>Expansion Pack</strong>.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/abonnements-gaming"
            className="inline-flex items-center rounded-full border bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            ← Retour abonnements gaming
          </Link>
          <a
            href="#offres"
            className="inline-flex items-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
          >
            Voir les offres
          </a>
        </div>
      </header>

      {/* Offres */}
      <section id="offres" className="mt-10 rounded-2xl border bg-gradient-to-br from-red-50 to-orange-50 p-6">
        <h2 className="text-xl font-bold">🎮 Offres Nintendo Switch Online</h2>
        <p className="mt-2 text-sm text-gray-600">
          Options pour acheter ou activer ton abonnement Nintendo Switch Online.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 items-stretch auto-rows-fr">
          <a
            href="/deals#deals"
            className="rounded-xl border bg-white p-4 transition hover:shadow-md"
          >
            <div className="font-semibold">Switch Online</div>
            <div className="text-sm text-gray-500">Online + rétro NES/SNES</div>
            <div className="mt-2 text-blue-700 font-semibold">Voir l’offre →</div>
          </a>

          <a
            href="/deals#deals"
            className="rounded-xl border bg-white p-4 transition hover:shadow-md"
          >
            <div className="font-semibold">Expansion Pack</div>
            <div className="text-sm text-gray-500">N64 + GBA + DLC</div>
            <div className="mt-2 text-blue-700 font-semibold">Voir l’offre →</div>
          </a>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          PrixMalin est une plateforme d’affiliation. Certains liens peuvent être rémunérés.
        </p>
      </section>

      {/* Comprendre */}
      <section className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-bold">Quel abonnement Nintendo Switch Online est fait pour toi ?</h2>
        <p className="mt-2 text-sm text-gray-600">
          Compare Standard et Expansion Pack pour choisir selon ton budget et ton usage (online, rétro, DLC).
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 items-stretch auto-rows-fr">
          <div className="rounded-xl border p-5 flex flex-col">
            <h3 className="text-lg font-bold">Standard</h3>
            <p className="mt-2 text-sm text-gray-700">
              Suffisant pour jouer en ligne et profiter des jeux rétro de base.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-gray-700">
              <li>Multijoueur en ligne</li>
              <li>NES / SNES / Game Boy</li>
              <li>Sauvegarde cloud</li>
            </ul>
            <a
              href="https://www.nintendo.com/en-ca/switch/online/"
              target="_blank"
              rel="nofollow noopener"
              className="mt-4 mt-auto inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700"
            >
            </a>
            <a
              href="https://www.nintendo.com/en-ca/switch/online/"
              target="_blank"
              rel="nofollow noopener"
              className="mt-4 mt-auto inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700"
            >
              Voir sur Nintendo →
            </a>
          </div>

          <div className="rounded-xl border p-5 flex flex-col">
            <h3 className="text-lg font-bold">Expansion Pack</h3>
            <p className="mt-2 text-sm text-gray-700">
              Pour les fans de rétro et certains DLC inclus.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-gray-700">
              <li>Nintendo 64</li>
              <li>Game Boy Advance</li>
              <li>DLC bonus</li>
            <a
              href="https://www.nintendo.com/en-ca/switch/online/"
              target="_blank"
              rel="nofollow noopener"
              className="mt-4 mt-auto inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700"
            >
              Voir sur Nintendo →
            </a>

            </ul>
          </div>
        </div>
      </section>

      {/* Astuces */}
      <section className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-bold">Astuces pour payer moins (Canada)</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-gray-700">
          <li>
            Les cartes numériques sont souvent moins chères pendant les promos —
            vérifie les{" "}
            <Link className="font-semibold underline underline-offset-4" href="/deals">
              deals actifs
            </Link>
            .
          </li>
          <li>
            L’abonnement familial peut réduire fortement le prix par personne.
          </li>
          <li>
            Une page dédiée prix Canada sera ajoutée bientôt.
          </li>
        </ul>
      </section>

      <div className="mt-10 border-t pt-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/abonnements-gaming" className="font-semibold text-blue-700 hover:underline">
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
