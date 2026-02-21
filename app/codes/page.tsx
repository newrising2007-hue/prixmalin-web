import { Metadata } from "next";
import Link from "next/link";
import data from "@/data/gaming-codes.v2.json";
import AffiliateCtaBlock from "@/components/AffiliateCtaBlock";

type Deal = {
  id: string;
  title: string;
  description: string;
  badge?: string;
  platforms?: string[];
  type?: string;
  cta: {
    label: string;
    href: string;
  };
};

type Platform = {
  slug: string;
  name: string;
  short: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  topGames: {
    slug: string;
    name: string;
    priority: number;
    tags: string[];
    cta: {
      label: string;
      href: string;
    };
  }[];
  deals: Deal[];
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://prixmalin.ca";

export const metadata: Metadata = {
  title: "Codes bonus gaming par plateforme | PrixMalin",
  description:
    "Explore les codes bonus gaming par plateforme : PC, PlayStation, Xbox. Top jeux populaires en Amérique du Nord + accès rapide aux cartes cadeaux et abonnements.",
  alternates: {
    canonical: `${SITE_URL}/codes`
  },
  openGraph: {
    title: "Codes bonus gaming par plateforme | PrixMalin",
    description:
      "Codes bonus gaming par plateforme : PC, PlayStation, Xbox. Top jeux NA + CTA cartes cadeaux et abonnements.",
    url: `${SITE_URL}/codes`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Codes bonus gaming par plateforme | PrixMalin",
    description:
      "Codes bonus gaming par plateforme : PC, PlayStation, Xbox. Top jeux NA + CTA cartes cadeaux et abonnements."
  }
};

function pickFeaturedDeal(platform: Platform): Deal | null {
  if (!platform.deals || platform.deals.length === 0) return null;

  // Priorité: badge "Priorité" sinon premier deal
  const priority = platform.deals.find((d) =>
    (d.badge || "").toLowerCase().includes("priorité")
  );
  return priority ?? platform.deals[0] ?? null;
}

export default function CodesIndexPage() {
  const platforms = data.platforms as Platform[];

  const featured = platforms
    .map((p) => ({
      platform: p,
      deal: pickFeaturedDeal(p)
    }))
    .filter((x) => Boolean(x.deal));

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* HERO */}
      <section className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          Codes bonus gaming par plateforme
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Choisis ta plateforme pour accéder aux bonus disponibles, au top jeux
          populaires (Amérique du Nord) et aux offres utiles (cartes cadeaux &
          abonnements).
        </p>

        <AffiliateCtaBlock
          primaryHref="/cartes-cadeaux"
          primaryLabel="Cartes cadeaux gaming"
          secondaryHref="/abonnements"
          secondaryLabel="Abonnements gaming"
        />
      </section>

      {/* FEATURED DEALS */}
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">Bonus en vedette</h2>
          <p className="text-sm text-gray-500">
            Sélection éditoriale (liens traçables).
          </p>
        </div>

        {featured.length === 0 ? (
          <p className="text-gray-500">
            Aucun bonus mis en vedette pour l’instant.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {featured.map(({ platform, deal }) => {
              if (!deal) return null;

              return (
                <div
                  key={`${platform.slug}-${deal.id}`}
                  className="border rounded-2xl p-5 shadow-sm bg-white space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {platform.short}
                        </span>
                        {deal.badge && (
                          <span className="text-xs bg-yellow-200 px-2 py-1 rounded">
                            {deal.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold">{deal.title}</h3>
                    </div>

                    <Link
                      href={`/codes/${platform.slug}`}
                      className="text-sm underline text-gray-700"
                    >
                      Voir
                    </Link>
                  </div>

                  <p className="text-sm text-gray-600">{deal.description}</p>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={deal.cta.href}
                      className="bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition text-center"
                    >
                      {deal.cta.label}
                    </Link>

                    <a
                      href={`/codes/${platform.slug}#deals`}
                      className="border border-gray-300 py-2 rounded-xl hover:bg-gray-50 transition text-center"
                    >
                      Tous les bonus {platform.short}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* PLATFORMS GRID */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Plateformes</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {platforms.map((p) => {
            const top3 = [...p.topGames]
              .sort((a, b) => a.priority - b.priority)
              .slice(0, 3);

            return (
              <div key={p.slug} className="border rounded-2xl p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">{p.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {p.seo.description}
                    </p>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {p.short}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-800">
                    Top jeux (extrait)
                  </p>
                  {top3.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      À compléter dans le JSON.
                    </p>
                  ) : (
                    <ul className="text-sm text-gray-700 list-disc pl-5">
                      {top3.map((g) => (
                        <li key={g.slug}>{g.name}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href={`/codes/${p.slug}`}
                    className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition text-center"
                  >
                    Voir {p.name}
                  </Link>

                  <a
                    href={`/codes/${p.slug}#deals`}
                    className="border border-gray-300 py-2 rounded-xl hover:bg-gray-50 transition text-center"
                  >
                    Aller aux bonus
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SEO TEXT */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Comment ça marche ?</h2>
        <p className="text-gray-600 max-w-4xl">
          PrixMalin regroupe des codes bonus gaming et des offres utiles par
          plateforme. Pour soutenir le site, certains liens peuvent être des
          liens affiliés (sans surcoût pour toi). L’objectif : une navigation
          rapide, mobile-first, et des pages simples à maintenir.
        </p>
      </section>
    </main>
  );
}
