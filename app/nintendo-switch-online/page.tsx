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

const AFFILIATE_BTN = "inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-900 shadow-sm transition hover:bg-blue-100 hover:-translate-y-0.5 hover:shadow-md active:translate-y-px";

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
          Nintendo Switch Online permet de jouer en ligne sur Switch et d'accéder
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
      <section id="offres" className="mt-10 overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-red-50 via-orange-50 to-emerald-50 p-6 shadow-sm">
        <h2 className="text-xl font-bold">🎮 Offres Nintendo Switch Online</h2>
        <p className="mt-2 text-sm text-gray-600">
          Options pour acheter ou activer ton abonnement Nintendo Switch Online.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 items-stretch auto-rows-fr">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="font-semibold">Switch Online — 12 mois</div>
            <div className="text-sm text-gray-500">Online + rétro NES/SNES</div>
            <div className="mt-2 text-lg font-bold text-gray-900">24,99 $</div>
            <a
              href="https://www.amazon.ca/dp/B08VKL6C5H?tag=prixmalin20-20"
              target="_blank"
              rel="nofollow sponsored noopener"
              className={`mt-4 ${AFFILIATE_BTN}`}
            >
              Voir l&apos;offre →
            </a>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="font-semibold">Expansion Pack — 12 mois</div>
              <div className="shrink-0 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">Meilleur choix</div>
            </div>
            <div className="text-sm text-gray-500">N64 + GBA + DLC</div>
            <div className="mt-2 text-lg font-bold text-gray-900">59,99 $</div>
            <a
              href="https://www.amazon.ca/s?k=nintendo+switch+online+expansion+pack+12+mois&tag=prixmalin20-20"
              target="_blank"
              rel="nofollow sponsored noopener"
              className={`mt-4 ${AFFILIATE_BTN}`}
            >
              Voir l&apos;offre →
            </a>
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          PrixMalin est une plateforme d'affiliation. Certains liens peuvent être rémunérés.
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
              href="https://www.amazon.ca/dp/B08VKL6C5H?tag=prixmalin20-20"
              target="_blank"
              rel="nofollow sponsored noopener"
              className="mt-4 mt-auto inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700"
            >
              Voir sur Amazon.ca →
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
            </ul>
            <a
              href="https://www.amazon.ca/s?k=nintendo+switch+online+expansion+pack&tag=prixmalin20-20"
              target="_blank"
              rel="nofollow sponsored noopener"
              className="mt-4 mt-auto inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700"
            >
              Voir sur Amazon.ca →
            </a>
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
            L'abonnement familial peut réduire fortement le prix par personne.
          </li>
          <li>
            Tu peux aussi acheter une{" "}
            <a
              href="https://www.amazon.ca/dp/B08M8LLCPT?tag=prixmalin20-20"
              target="_blank"
              rel="nofollow sponsored noopener"
              className="font-semibold underline underline-offset-4"
            >
              carte Nintendo eShop
            </a>{" "}
            pour recharger ton compte et payer l'abonnement.
          </li>
        </ul>
      </section>

      <div className="mt-10 border-t pt-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/abonnements-gaming" className="font-semibold text-blue-700 hover:underline">
            ← Retour aux abonnements gaming
          </Link>
          <p className="text-xs text-gray-500">
            PrixMalin est une plateforme d'affiliation. Certains liens peuvent être affiliés.
          </p>
        </div>
      </div>
    </main>
  );
}
