// app/deals/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

function brandForHref(href: string): { src: string; tint: "blue" | "green" | "red" } | null {
  if (href.includes("playstation")) return { src: "/images/deals/playstation.webp", tint: "blue" };
  if (href.includes("xbox")) return { src: "/images/deals/xbox.webp", tint: "green" };
  if (href.includes("nintendo")) return { src: "/images/deals/nintendo.webp", tint: "red" };
  return null;
}

const SEO_LINKS: Array<{ href: string; title: string; desc: string }> = [
  {
    href: "/playstation-plus-prix-canada",
    title: "Carte PlayStation Plus",
    desc: "Paliers + options pour payer moins.",
  },
  {
    href: "/xbox-game-pass-prix-canada",
    title: "Carte Xbox Game Pass",
    desc: "Ultimate / PC / Console + meilleures options.",
  },
  {
    href: "/nintendo-switch-online-prix-canada",
    title: "Carte Nintendo Switch Online",
    desc: "Individuel / Famille + Extension Pack.",
  },
];

function guideForPlatform(platform: string): { href: string; label: string } | null {
  const p = platform.toLowerCase();

  // PlayStation
  if (p.includes("playstation") || p.includes("ps4") || p.includes("ps5")) {
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
      <section id="guides" className="mb-8 rounded-2xl border bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Cartes cadeaux & abonnements gaming</h2>
            <p className="text-sm text-gray-600">
              Pages SEO utiles pour comprendre les prix officiels et choisir le meilleur
              abonnement.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {SEO_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative overflow-hidden rounded-xl border bg-white/70 backdrop-blur-sm p-6 min-h-[110px] shadow-sm shadow-blue-500/5 transition hover:shadow-md hover:bg-white/80 sm:last:mx-auto"
            >
              {(() => {
              const b = brandForHref(l.href);
              const tint = b?.tint;
              const overlay = tint === "green"
                ? "from-green-500/12 via-white/35 to-green-500/0"
                : tint === "red"
                ? "from-red-500/12 via-white/35 to-red-500/0"
                : "from-blue-500/12 via-white/35 to-blue-500/0";

              return (
                <>
                  {b ? (
                    <div className="pointer-events-none absolute inset-0">
                      <div className={`absolute inset-0 bg-gradient-to-br ${overlay}`} />
                      <Image
                        src={b.src}
                        alt=""
                        width={520}
                        height={520}
                        className="absolute right-4 top-[60%] w-16 -translate-y-1/2 opacity-25 blur-[0.3px]"
                        priority={false}
                      />
                    </div>
                  ) : null}

                  <div className="relative">
                    <div className="text-sm font-semibold text-gray-900">{l.title}</div>
                    <p className="mt-1 text-xs text-gray-600 line-clamp-2">{l.desc}</p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700">Voir le guide →</div>
                    
                  </div>
                </>
              );
            })()}
              
            </Link>
          ))}


          {/* ✅ Hub Abonnements (grosse carte) */}
          <Link
            href="/abonnements-gaming"
            className="relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md sm:col-span-3"
          >
            {/* Background logos */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 via-white/40 to-white/70" />
              <Image
                src="/images/deals/playstation.webp"
                alt=""
                width={520}
                height={520}
                className="absolute left-4 top-1/2 w-32 -translate-y-1/2 opacity-30 blur-[0.2px]"
                priority={false}
              />
              <Image
                src="/images/deals/xbox.webp"
                alt=""
                width={520}
                height={520}
                className="absolute left-1/2 top-1/2 w-32 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[0.2px]"
                priority={false}
              />
              <Image
                src="/images/deals/nintendo.webp"
                alt=""
                width={520}
                height={520}
                className="absolute right-4 top-1/2 w-32 -translate-y-1/2 opacity-30 blur-[0.2px]"
                priority={false}
              />
            </div>

            <div className="relative flex flex-col items-center text-center gap-4">
              <div>
                

                <h3 className="mt-3 text-xl font-bold tracking-tight text-gray-900">
                  Abonnements Gaming au Canada
                </h3>

                <p className="mt-1 max-w-2xl text-sm text-gray-600">
                  Accède aux hubs Xbox, PlayStation et Nintendo. Pages détaillées + offres à venir.
                </p>
              </div>

              
            </div>
          </Link>
        </div>
      </section>

      {deals.length === 0 ? (
        <div className="rounded-2xl border p-6">
          <p className="text-gray-700">Aucun deal disponible pour le moment.</p>
        </div>
      ) : (
        <ul id="deals" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {deals.map((deal) => {
            const guide = guideForPlatform(deal.platform);

            return (
              <li key={deal.slug} className="rounded-2xl border p-4">
                <Link href={`/deals/${deal.slug}`} className="block">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="mb-3 h-32 w-full rounded-xl object-contain bg-gradient-to-b from-white to-gray-50 p-2 shadow-inner ring-1 ring-black/5"
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
