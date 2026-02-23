// app/deals/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllDeals } from "@/lib/deals";

export const metadata: Metadata = {
  title: "Deals gaming au Canada | PrixMalin",
  description:
    "Sélection de deals gaming et codes au Canada. Liens affiliés traçables. Prix affichés seulement si certains.",
  alternates: {
    canonical: "/deals",
    languages: {
      fr: "https://prixmalin.ca/deals",
      "x-default": "https://prixmalin.ca/deals",
    },
  },
};

const SEO_LINKS: Array<{ href: string; title: string; desc: string }> = [
  {
    href: "/playstation-plus-prix-canada",
    title: "PlayStation Plus : prix au Canada",
    desc: "Paliers + options pour payer moins.",
  },
  {
    href: "/xbox-game-pass-prix-canada",
    title: "Xbox Game Pass : prix au Canada",
    desc: "Ultimate / PC / Console + meilleures options.",
  },
  {
    href: "/carte-psn-canada",
    title: "Cartes PSN au Canada",
    desc: "Où acheter + conseils + taxes.",
  },
  {
    href: "/nintendo-switch-online-prix-canada",
    title: "Nintendo Switch Online : prix au Canada",
    desc: "Individuel / Famille + Extension Pack.",
  },
];

function guideForPlatform(platform: string): { href: string; label: string } | null {
  const p = platform.toLowerCase();

  // PlayStation
  if (p.includes("playstation") || p.includes("ps4") || p.includes("ps5") || p.includes("psn")) {
    if (p.includes("psn")) return { href: "/carte-psn-canada", label: "Guide cartes PSN" };
    return { href: "/playstation-plus-prix-canada", label: "Guide PS+ (Canada)" };
  }

  // Xbox
  if (p.includes("xbox")) {
    return { href: "/xbox-game-pass-prix-canada", label: "Guide Game Pass (Canada)" };
  }

  // Nintendo
  if (p.includes("nintendo") || p.includes("switch")) {
    return { href: "/nintendo-switch-online-prix-canada", label: "Guide Nintendo Online" };
  }

  return null;
}

export default function DealsPage() {
  const deals = getAllDeals();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: deals.slice(0, 50).map((deal, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://prixmalin.ca/deals/${deal.slug}`,
      name: deal.title,
    })),
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Deals gaming</h1>
        <p className="text-base text-gray-600">
          Liens affiliés traçables. Prix affichés seulement si certains.
        </p>
      </header>

      {/* ✅ Bloc liens internes global + hub */}
      <section className="mb-8 rounded-2xl border bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Guides & prix au Canada</h2>
            <p className="text-sm text-gray-600">
              Pages SEO utiles pour comprendre les prix officiels et choisir le meilleur
              abonnement.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/abonnements-gaming-prix-canada"
              className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
            >
              Guide complet
            </Link>
            <Link
              href="/"
              className="text-sm font-semibold text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
            >
              Accueil
            </Link>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SEO_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl border p-4 transition hover:bg-gray-50"
            >
              <div className="text-sm font-semibold text-gray-900">{l.title}</div>
              <div className="mt-1 text-sm text-gray-600">{l.desc}</div>
            </Link>
          ))}

          {/* ✅ Carte hub en plus */}
          <Link
            href="/abonnements-gaming-prix-canada"
            className="rounded-xl border p-4 transition hover:bg-gray-50 sm:col-span-2"
          >
            <div className="text-sm font-semibold text-gray-900">
              Guide complet : abonnements gaming (Canada)
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Compare PS+, Game Pass et Nintendo Online — puis va voir les deals actifs.
            </div>
            <div className="mt-3 text-sm font-semibold text-gray-900 underline decoration-gray-300 underline-offset-4">
              Ouvrir le guide →
            </div>
          </Link>
        </div>
      </section>

      {deals.length === 0 ? (
        <div className="rounded-2xl border p-6">
          <p className="text-gray-700">Aucun deal disponible pour le moment.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {deals.map((deal) => {
            const guide = guideForPlatform(deal.platform);

            return (
              <li key={deal.slug} className="rounded-2xl border p-4">
                <Link href={`/deals/${deal.slug}`} className="block">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="mb-3 h-40 w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                  <h2 className="text-lg font-semibold">{deal.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">{deal.description}</p>
                  <p className="mt-2 text-xs text-gray-500">{deal.platform}</p>

                  {typeof deal.price === "number" && (
                    <p className="mt-3 text-xl font-semibold">
                      {deal.price} {deal.currency || "CAD"}
                    </p>
                  )}
                </Link>

                <div className="mt-4 flex flex-col gap-2">
                  {guide ? (
                    <Link
                      href={guide.href}
                      className="text-sm font-semibold text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
                    >
                      {guide.label}
                    </Link>
                  ) : null}

                  <div className="flex gap-2">
                    <Link
                      href={`/deals/${deal.slug}`}
                      className="flex-1 rounded-xl border px-4 py-3 text-center text-sm font-semibold"
                    >
                      Détails
                    </Link>

                    <a
                      href={deal.affiliateUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className="flex-1 rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      Voir l’offre
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <section className="mt-10 rounded-2xl bg-gray-50 p-5">
        <h2 className="text-lg font-semibold">Comment on sélectionne</h2>
        <p className="mt-2 text-sm text-gray-700">
          PrixMalin est une plateforme d’affiliation : on partage des offres et codes gaming via
          des liens traçables. On affiche un prix uniquement quand il est certain.
        </p>
      </section>
    </main>
  );
}
