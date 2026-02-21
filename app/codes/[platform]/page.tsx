import { Metadata } from "next";
import Link from "next/link";
import data from "@/data/gaming-codes.v2.json";
import AffiliateCtaBlock from "@/components/AffiliateCtaBlock";

type Params = {
  params: {
    platform: string;
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
  deals: {
    id: string;
    title: string;
    description: string;
    badge?: string;
    platforms: string[];
    type: string;
    cta: {
      label: string;
      href: string;
    };
  }[];
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://prixmalin.ca";

function getPlatform(slug: string): Platform | undefined {
  return (data.platforms as Platform[]).find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return (data.platforms as Platform[]).map((p) => ({ platform: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const platform = getPlatform(params.platform);

  if (!platform) {
    return {
      title: "Codes bonus gaming | PrixMalin",
      description: "Codes bonus jeux vidéo et offres gaming.",
      robots: { index: false, follow: false }
    };
  }

  const url = `${SITE_URL}/codes/${platform.slug}`;

  return {
    title: platform.seo.title,
    description: platform.seo.description,
    keywords: platform.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: platform.seo.title,
      description: platform.seo.description,
      url,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: platform.seo.title,
      description: platform.seo.description
    }
  };
}

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default async function PlatformPage({ params }: Params) {
  const platform = getPlatform(params.platform);

  if (!platform) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Plateforme introuvable</h1>
        <p className="mt-2 text-gray-600">
          Essaie :{" "}
          <Link className="underline" href="/codes/pc">
            PC
          </Link>
          ,{" "}
          <Link className="underline" href="/codes/playstation">
            PlayStation
          </Link>{" "}
          ou{" "}
          <Link className="underline" href="/codes/xbox">
            Xbox
          </Link>
          .
        </p>
      </div>
    );
  }

  const sortedTopGames = [...platform.topGames].sort(
    (a, b) => a.priority - b.priority
  );

  const canonicalUrl = `${SITE_URL}/codes/${platform.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Codes",
        item: `${SITE_URL}/codes`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: platform.name,
        item: canonicalUrl
      }
    ]
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Top jeux ${platform.name} (Amérique du Nord)`,
    itemListOrder: "Ascending",
    numberOfItems: sortedTopGames.length,
    itemListElement: sortedTopGames.map((g, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: g.name,
      url: `${SITE_URL}${g.cta.href}`
    }))
  };

  const featuredGame =
    platform.slug === "pc"
      ? sortedTopGames.find((g) => g.slug === "world-of-tanks") ||
        sortedTopGames.find((g) => g.priority === 1)
      : null;

  const featuredDeal =
    platform.slug === "pc"
      ? platform.deals.find((d) => d.id === "wot-bonus-pack") || null
      : null;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* JSON-LD */}
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      {/* HERO + NAV */}
      <section className="space-y-4">
        <nav className="text-sm text-gray-500">
          <Link className="hover:underline" href="/">
            Accueil
          </Link>{" "}
          <span className="mx-1">/</span>
          <Link className="hover:underline" href="/codes">
            Codes
          </Link>{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-700">{platform.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Codes bonus {platform.name}
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Bonus, cartes cadeaux et abonnements utiles pour {platform.name}.
              Mise à jour éditoriale (sans comparateur de prix live).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/cartes-cadeaux"
              className="bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700 transition text-center"
            >
              Cartes cadeaux
            </Link>
            <Link
              href="/abonnements"
              className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition text-center"
            >
              Abonnements
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            href="/codes/pc"
            className={cx(
              "px-3 py-2 rounded-lg border text-sm",
              platform.slug === "pc"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white hover:bg-gray-50"
            )}
          >
            PC
          </Link>
          <Link
            href="/codes/playstation"
            className={cx(
              "px-3 py-2 rounded-lg border text-sm",
              platform.slug === "playstation"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white hover:bg-gray-50"
            )}
          >
            PlayStation
          </Link>
          <Link
            href="/codes/xbox"
            className={cx(
              "px-3 py-2 rounded-lg border text-sm",
              platform.slug === "xbox"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white hover:bg-gray-50"
            )}
          >
            Xbox
          </Link>

          <a
            className="px-3 py-2 rounded-lg border text-sm bg-white hover:bg-gray-50"
            href="#deals"
          >
            Bonus
          </a>
        </div>
      </section>

      {/* FEATURED (PC only) */}
      {platform.slug === "pc" && (featuredGame || featuredDeal) && (
        <section className="rounded-2xl border p-6 shadow-sm bg-gradient-to-b from-gray-50 to-white space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs bg-yellow-200 px-2 py-1 rounded">
                  À ne pas manquer
                </span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  PC
                </span>
              </div>
              <h2 className="text-2xl font-bold">
                {featuredGame?.name ?? "World of Tanks"}
              </h2>
              <p className="text-gray-600 max-w-3xl">
                Priorité PC : accès rapide aux bonus et offres utiles. (Tu peux
                enrichir la description dans le JSON si besoin.)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#deals"
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition text-center"
              >
                Voir les bonus
              </a>
              <Link
                href="/cartes-cadeaux?cat=steam"
                className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50 transition text-center"
              >
                Carte cadeau Steam
              </Link>
            </div>
          </div>

          {featuredDeal && (
            <div className="rounded-xl border bg-white p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-yellow-200 px-2 py-1 rounded">
                    {featuredDeal.badge ?? "Priorité"}
                  </span>
                  <span className="text-sm font-semibold">{featuredDeal.title}</span>
                </div>
                <p className="text-sm text-gray-600">{featuredDeal.description}</p>
              </div>

              <Link
                href={featuredDeal.cta.href}
                className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition text-center"
              >
                {featuredDeal.cta.label}
              </Link>
            </div>
          )}
        </section>
      )}

      {/* TOP GAMES */}
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">Top jeux populaires (NA)</h2>
          <a className="text-sm underline text-gray-700" href="#deals">
            Aller aux bonus
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTopGames.map((game) => (
            <div
              key={game.slug}
              className={cx(
                "border rounded-xl p-4 flex flex-col justify-between shadow-sm",
                platform.slug === "pc" && game.slug === "world-of-tanks"
                  ? "border-yellow-300 bg-yellow-50/40"
                  : "bg-white"
              )}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-lg">{game.name}</h3>
                  {platform.slug === "pc" && game.slug === "world-of-tanks" && (
                    <span className="text-xs bg-yellow-200 px-2 py-1 rounded">
                      Priorité
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={game.cta.href}
                className="mt-4 inline-block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {game.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* DEALS */}
      <section id="deals" className="space-y-6">
        <h2 className="text-2xl font-semibold">Bonus disponibles</h2>

        {platform.deals.length === 0 && (
          <p className="text-gray-500">Aucun bonus disponible actuellement.</p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {platform.deals.map((deal) => (
            <div
              key={deal.id}
              className="border rounded-xl p-4 shadow-sm space-y-3 bg-white"
            >
              <div className="flex items-center justify-between gap-3">
                {deal.badge ? (
                  <span className="text-xs bg-yellow-200 px-2 py-1 rounded">
                    {deal.badge}
                  </span>
                ) : (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    Bonus
                  </span>
                )}
                <span className="text-xs text-gray-500">
                  {platform.short}
                </span>
              </div>

              <h3 className="font-semibold">{deal.title}</h3>
              <p className="text-sm text-gray-600">{deal.description}</p>

              <Link
                href={deal.cta.href}
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                {deal.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </section>

<AffiliateCtaBlock
  primaryHref="/cartes-cadeaux"
  primaryLabel="Voir cartes cadeaux"
  secondaryHref="/abonnements"
  secondaryLabel="Voir abonnements"
/>

</main>
);
}
