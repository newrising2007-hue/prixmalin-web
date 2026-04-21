import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Xbox Game Pass Canada : prix, abonnements et options (Ultimate, Core, PC)",
  description:
    "Guide Xbox Game Pass au Canada : différences entre Ultimate, Core et PC Game Pass, où s'abonner, et comment choisir la meilleure option.",
  keywords: [
    "Xbox Game Pass Canada",
    "Xbox Game Pass prix Canada",
    "Game Pass Ultimate Canada",
    "Game Pass Core Canada",
    "PC Game Pass Canada",
  ],
  alternates: {
    canonical: "/xbox-game-pass",
    languages: {
      fr: "https://prixmalin.ca/xbox-game-pass",
      "x-default": "https://prixmalin.ca/xbox-game-pass",
    },
  },
  openGraph: {
    title: "Xbox Game Pass Canada : prix et abonnements",
    description: "Compare Ultimate, Core et PC Game Pass au Canada. Conseils + liens officiels.",
    url: "https://prixmalin.ca/xbox-game-pass",
    siteName: "PrixMalin",
    locale: "fr_CA",
    type: "website",
  },
};

const AFFILIATE_BTN = "inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-900 shadow-sm transition hover:bg-blue-100 hover:-translate-y-0.5 hover:shadow-md active:translate-y-px";

export default function XboxGamePassPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Xbox Game Pass Canada",
    url: "https://prixmalin.ca/xbox-game-pass",
    inLanguage: "fr-CA",
    description: "Guide Xbox Game Pass au Canada : options Ultimate, Core et PC Game Pass, et liens officiels.",
    isPartOf: { "@type": "WebSite", name: "PrixMalin", url: "https://prixmalin.ca" },
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="mb-8">
        <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-900">
          Abonnements Gaming • Canada 🇨🇦
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Xbox Game Pass Canada</h1>
        <p className="mt-3 text-base text-gray-600">
          Comprends les différences entre <strong>Ultimate</strong>,{" "}
          <strong>Core</strong> et <strong>PC Game Pass</strong>, et choisis la meilleure option pour ton budget.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/abonnements-gaming" className="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50">
            ← Retour abonnements gaming
          </Link>
          <a href="#offres" className="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50">
            Voir toutes les offres
          </a>
          <Link href="/xbox-game-pass-prix-canada" className="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50">
            Guide prix Canada →
          </Link>
        </div>
      </header>

      {/* Offres */}
      <section id="offres" className="mt-10 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-indigo-50 to-emerald-50 p-6 shadow-sm">
        <h2 className="text-xl font-bold">🎮 Offres Xbox Game Pass disponibles</h2>
        <p className="mt-2 text-sm text-gray-600">
          Options pour acheter ou activer ton abonnement Xbox Game Pass au Canada.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="font-semibold">Xbox Game Pass Ultimate — 3 mois</div>
              <div className="shrink-0 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">Meilleur choix</div>
            </div>
            <div className="text-sm text-gray-500">Console + PC + Cloud</div>
            <div className="mt-2 text-lg font-bold text-gray-900">49,99 $</div>
            <a
              href="https://www.amazon.ca/dp/B08M7HPLXS?tag=prixmalin20-20"
              target="_blank"
              rel="nofollow sponsored noopener"
              className={`mt-4 ${AFFILIATE_BTN}`}
            >
              Voir l&apos;offre →
            </a>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="font-semibold">Xbox Game Pass Ultimate — 1 mois</div>
            <div className="text-sm text-gray-500">Console + PC + Cloud</div>
            <div className="mt-2 text-lg font-bold text-gray-900">19,99 $</div>
            <a
              href="https://www.amazon.ca/dp/B08M8WSRX9?tag=prixmalin20-20"
              target="_blank"
              rel="nofollow sponsored noopener"
              className={`mt-4 ${AFFILIATE_BTN}`}
            >
              Voir l&apos;offre →
            </a>
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          PrixMalin est une plateforme d&apos;affiliation. Certains liens peuvent être rémunérés.
        </p>
      </section>

      {/* Comprendre */}
      <section className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-bold">Quel abonnement Xbox Game Pass est fait pour toi ?</h2>
        <p className="mt-2 text-sm text-gray-600">
          Compare Ultimate, Core et PC Game Pass pour trouver le meilleur choix selon ton budget et ta façon de jouer.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-5 flex flex-col">
            <h3 className="text-base font-semibold">Ultimate</h3>
            <p className="mt-2 text-sm text-gray-600">L&apos;option la plus complète : console + PC + cloud, avec avantages inclus.</p>
            <a href="https://www.amazon.ca/dp/B08M7HPLXS?tag=prixmalin20-20" target="_blank" rel="nofollow sponsored noopener"
              className="mt-4 inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700">
              Voir sur Amazon.ca →
            </a>
          </div>
          <div className="rounded-xl border p-5 flex flex-col">
            <h3 className="text-base font-semibold">Core</h3>
            <p className="mt-2 text-sm text-gray-600">Pour jouer en ligne et accéder à une sélection de jeux (catalogue réduit).</p>
            <a href="https://www.amazon.ca/s?k=xbox+game+pass+core+canada&tag=prixmalin20-20" target="_blank" rel="nofollow sponsored noopener"
              className="mt-4 inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700">
              Voir sur Amazon.ca →
            </a>
          </div>
          <div className="rounded-xl border p-5 flex flex-col">
            <h3 className="text-base font-semibold">PC Game Pass</h3>
            <p className="mt-2 text-sm text-gray-600">Idéal si tu joues surtout sur PC. Catalogue dédié, souvent très bon rapport qualité/prix.</p>
            <a href="https://www.amazon.ca/s?k=pc+game+pass+canada&tag=prixmalin20-20" target="_blank" rel="nofollow sponsored noopener"
              className="mt-4 inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700">
              Voir sur Amazon.ca →
            </a>
          </div>
        </div>
      </section>

      {/* Astuces */}
      <section className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-bold">Astuces pour payer moins (Canada)</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-gray-700">
          <li>Consulte notre page <Link className="font-semibold underline underline-offset-4" href="/xbox-game-pass-prix-canada">Xbox Game Pass : prix au Canada</Link> pour comprendre les paliers et options.</li>
          <li>Les cartes numériques et promotions peuvent varier — vérifie aussi les <Link className="font-semibold underline underline-offset-4" href="/deals">deals actifs</Link>.</li>
          <li>Commence par Ultimate si tu veux le plus simple (console + PC + cloud), sinon PC Game Pass si tu joues surtout sur ordinateur.</li>
        </ul>
      </section>

      <div className="mt-10 pt-6 border-t">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/abonnements-gaming" className="text-blue-700 font-semibold hover:underline">← Retour aux abonnements gaming</Link>
          <p className="text-xs text-gray-500">PrixMalin est une plateforme d&apos;affiliation. Certains liens peuvent être affiliés.</p>
        </div>
      </div>
    </main>
  );
}
