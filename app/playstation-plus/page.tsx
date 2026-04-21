import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PlayStation Plus au Canada (Essential, Extra, Premium) | PrixMalin",
  description:
    "Guide PlayStation Plus au Canada : différences entre Essential, Extra et Premium, conseils pour choisir, et options pour acheter/activer ton abonnement.",
  alternates: { canonical: "/playstation-plus" },
  openGraph: {
    title: "PlayStation Plus au Canada (Essential, Extra, Premium) | PrixMalin",
    description: "Comprendre PS Plus (Essential, Extra, Premium) au Canada + options d'achat/activation.",
    url: "/playstation-plus",
    type: "article",
  },
};

const AFFILIATE_BTN = "inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-900 shadow-sm transition hover:bg-blue-100 hover:-translate-y-0.5 hover:shadow-md active:translate-y-px";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "PlayStation Plus au Canada : Essential vs Extra vs Premium",
    description: "Guide PlayStation Plus au Canada : niveaux, différences, astuces et options pour acheter/activer.",
    mainEntityOfPage: { "@type": "WebPage", "@id": "/playstation-plus" },
    author: { "@type": "Organization", name: "PrixMalin" },
    publisher: { "@type": "Organization", name: "PrixMalin" },
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <JsonLd data={jsonLd} />

      <header className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">PlayStation Plus au Canada</h1>
        <p className="mt-3 text-base text-gray-700 sm:text-lg">
          PlayStation Plus (PS Plus) se décline en <strong>3 niveaux</strong> : Essential, Extra, Premium. Voici les différences et comment choisir — sans te perdre.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/abonnements-gaming" className="inline-flex items-center rounded-full border bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
            ← Retour abonnements gaming
          </Link>
        </div>
      </header>

      {/* Offres */}
      <section id="offres" className="mt-10 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-indigo-50 to-emerald-50 p-6 shadow-sm">
        <h2 className="text-xl font-bold">🎮 Offres PlayStation Plus disponibles</h2>
        <p className="mt-2 text-sm text-gray-600">Options pour acheter ou activer ton abonnement PlayStation Plus au Canada.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="font-semibold">PS Plus — 1 mois</div>
            <div className="text-sm text-gray-500">Online + jeux mensuels</div>
            <div className="mt-2 text-lg font-bold text-gray-900">19,99 $</div>
            <a href="https://www.amazon.ca/s?k=PlayStation+Plus+1+mois&tag=prixmalin20-20" target="_blank" rel="nofollow sponsored noopener" className={`mt-4 ${AFFILIATE_BTN}`}>
              Voir l&apos;offre →
            </a>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="font-semibold">PS Plus — 3 mois</div>
            <div className="text-sm text-gray-500">Online + jeux mensuels</div>
            <div className="mt-2 text-lg font-bold text-gray-900">44,99 $</div>
            <a href="https://www.amazon.ca/s?k=PlayStation+Plus+3+mois&tag=prixmalin20-20" target="_blank" rel="nofollow sponsored noopener" className={`mt-4 ${AFFILIATE_BTN}`}>
              Voir l&apos;offre →
            </a>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="font-semibold">PS Plus Premium — 12 mois</div>
              <div className="shrink-0 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">Meilleur choix</div>
            </div>
            <div className="text-sm text-gray-500">Cloud + rétro + catalogue</div>
            <div className="mt-2 text-lg font-bold text-gray-900">139,99 $</div>
            <a href="https://www.amazon.ca/s?k=PlayStation+Plus+Premium+12+mois&tag=prixmalin20-20" target="_blank" rel="nofollow sponsored noopener" className={`mt-4 ${AFFILIATE_BTN}`}>
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
        <h2 className="text-xl font-bold">Quel abonnement PlayStation Plus est fait pour toi ?</h2>
        <p className="mt-2 text-sm text-gray-600">Compare Essential, Extra et Premium pour trouver le meilleur choix selon ton budget.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-5 flex flex-col">
            <h3 className="text-lg font-bold">Essential</h3>
            <p className="mt-2 text-sm text-gray-700">Pour jouer en ligne et récupérer des jeux mensuels. Le minimum indispensable.</p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-gray-700">
              <li>Multijoueur en ligne</li>
              <li>Jeux mensuels</li>
              <li>Réductions PlayStation Store</li>
            </ul>
            <a href="https://www.amazon.ca/s?k=PlayStation+Plus+Essential&tag=prixmalin20-20" target="_blank" rel="nofollow sponsored noopener"
              className="mt-4 mt-auto inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700">
              Voir sur Amazon.ca →
            </a>
          </div>

          <div className="rounded-xl border p-5 flex flex-col">
            <h3 className="text-lg font-bold">Extra</h3>
            <p className="mt-2 text-sm text-gray-700">Le meilleur rapport catalogue/prix : un &ldquo;Netflix de jeux&rdquo; à la Sony.</p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-gray-700">
              <li>Tout Essential</li>
              <li>Catalogue PS4/PS5</li>
              <li>Idéal si tu joues souvent</li>
            </ul>
            <a href="https://www.amazon.ca/s?k=PlayStation+Plus+Extra&tag=prixmalin20-20" target="_blank" rel="nofollow sponsored noopener"
              className="mt-4 mt-auto inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700">
              Voir sur Amazon.ca →
            </a>
          </div>

          <div className="rounded-xl border p-5 flex flex-col">
            <h3 className="text-lg font-bold">Premium</h3>
            <p className="mt-2 text-sm text-gray-700">Pour le cloud gaming et certains contenus rétro/essais.</p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-gray-700">
              <li>Tout Extra</li>
              <li>Cloud gaming</li>
              <li>Rétro / essais de jeux</li>
            </ul>
            <a href="https://www.amazon.ca/s?k=PlayStation+Plus+Premium+12+mois&tag=prixmalin20-20" target="_blank" rel="nofollow sponsored noopener"
              className="mt-4 mt-auto inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700">
              Voir sur Amazon.ca →
            </a>
          </div>
        </div>
      </section>

      {/* Astuces */}
      <section className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-bold">Astuces pour payer moins (Canada)</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-gray-700">
          <li>Les cartes numériques et promotions varient — vérifie les <Link className="font-semibold underline underline-offset-4" href="/deals">deals actifs</Link>.</li>
          <li>Si tu veux juste jouer en ligne, <strong>Essential</strong> suffit.</li>
          <li>L&apos;abonnement 12 mois est toujours moins cher que mensuel — calcule avant d&apos;acheter.</li>
        </ul>
      </section>

      <div className="mt-10 border-t pt-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/abonnements-gaming" className="font-semibold text-blue-700 hover:underline">← Retour aux abonnements gaming</Link>
          <p className="text-xs text-gray-500">PrixMalin est une plateforme d&apos;affiliation. Certains liens peuvent être affiliés.</p>
        </div>
      </div>
    </main>
  );
}
