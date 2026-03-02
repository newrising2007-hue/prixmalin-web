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

function brandForHref(
  href: string
): { src: string; tint: "blue" | "green" | "red" } | null {
  if (href.includes("playstation"))
    return { src: "/images/deals/playstation.webp", tint: "blue" };
  if (href.includes("xbox")) return { src: "/images/deals/xbox.webp", tint: "green" };
  if (href.includes("nintendo"))
    return { src: "/images/deals/nintendo.webp", tint: "red" };
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
  if (p.includes("playstation") || p.includes("ps4") || p.includes("ps5"))
    return { href: "/playstation-plus-prix-canada", label: "Guide PS+ (Canada)" };
  if (p.includes("xbox"))
    return { href: "/xbox-game-pass-prix-canada", label: "Guide Game Pass (Canada)" };
  if (p.includes("nintendo") || p.includes("switch"))
    return { href: "/nintendo-switch-online-prix-canada", label: "Guide Nintendo Online" };
  return null;
}

const BADGE_COLORS: Record<string, string> = {
  Populaire: "bg-orange-100 text-orange-700",
  Nouveau: "bg-green-100 text-green-700",
  "Deal chaud": "bg-red-100 text-red-700",
  Exclusif: "bg-purple-100 text-purple-700",
};

const CTA_AFFILIATE_CLASSES =
  "flex-1 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-center text-sm font-semibold text-blue-900 shadow-sm shadow-blue-500/10 transition will-change-transform hover:bg-blue-100 hover:shadow-md hover:shadow-blue-500/15 hover:ring-2 hover:ring-blue-200/60 hover:-translate-y-0.5 active:translate-y-px active:shadow-sm";

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

      {/* Bloc liens internes global + hub */}
      <section id="guides" className="mb-8 rounded-2xl border bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">
              Cartes cadeaux & abonnements gaming
            </h2>
            <p className="text-sm text-gray-600">
              Pages SEO utiles pour comprendre les prix officiels et choisir le meilleur
              abonnement.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {SEO_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative min-h-[110px] overflow-hidden rounded-xl border bg-white/70 p-6 shadow-sm shadow-blue-500/5 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-white/80 hover:shadow-xl sm:last:mx-auto"
            >
              {(() => {
                const b = brandForHref(l.href);
                const tint = b?.tint;
                const overlay =
                  tint === "green"
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
                          className="absolute bottom-2 right-4 w-20 opacity-40 blur-[0.15px] mix-blend-multiply"
                          priority={false}
                        />
                      </div>
                    ) : null}
                    <div className="relative">
                      <div className="text-sm font-semibold text-gray-900">{l.title}</div>
                      <p className="mt-1 line-clamp-2 text-xs text-gray-600">{l.desc}</p>
                    </div>
                  </>
                );
              })()}
            </Link>
          ))}

          {/* Hub Abonnements */}
          <Link
            href="/abonnements-gaming"
            className="relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:shadow-xl hover:ring-1 hover:ring-emerald-200 sm:col-span-3"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 via-white/40 to-white/70" />
              <Image src="/images/deals/playstation.webp" alt="" width={520} height={520}
                className="absolute left-4 top-1/2 w-36 -translate-y-1/2 opacity-40 blur-[0.15px] mix-blend-multiply" priority={false} />
              <Image src="/images/deals/xbox.webp" alt="" width={520} height={520}
                className="absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2 opacity-40 blur-[0.15px] mix-blend-multiply" priority={false} />
              <Image src="/images/deals/nintendo.webp" alt="" width={520} height={520}
                className="absolute right-4 top-1/2 w-36 -translate-y-1/2 opacity-40 blur-[0.15px] mix-blend-multiply" priority={false} />
            </div>
            <div className="relative flex flex-col items-center gap-4 text-center">
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
            const badgeClass = deal.badge ? (BADGE_COLORS[deal.badge] ?? "bg-gray-100 text-gray-700") : null;

            return (
              <li
                key={deal.slug}
                className="relative rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:shadow-blue-500/10 hover:ring-1 hover:ring-blue-200/60"
              >
                {/* Badge */}
                {deal.badge && badgeClass && (
                  <span className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-xs font-semibold ${badgeClass}`}>
                    {deal.badge}
                  </span>
                )}

                <div>
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="mb-3 h-32 w-full rounded-xl bg-gradient-to-b from-white to-gray-50 p-2 object-contain shadow-inner ring-1 ring-black/5"
                    loading="lazy"
                  />
                  <h2 className="pr-16 text-base font-semibold leading-snug">{deal.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">{deal.description}</p>
                  <p className="mt-1 text-xs text-gray-400">{deal.platform}</p>

                  {/* Prix */}
                  <div className="mt-3 flex items-baseline gap-2">
                    {typeof deal.price === "number" && (
                      <p className="text-xl font-bold text-gray-900">
                        {deal.price.toFixed(2)} $
                      </p>
                    )}
                    {typeof deal.prixBarre === "number" && (
                      <p className="text-sm text-gray-400 line-through">
                        {deal.prixBarre.toFixed(2)} $
                      </p>
                    )}
                    {typeof deal.price === "number" && typeof deal.prixBarre === "number" && deal.prixBarre > deal.price && (
                      <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-700">
                        -{Math.round(((deal.prixBarre - deal.price) / deal.prixBarre) * 100)}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  {guide ? (
                    <Link
                      href={guide.href}
                      className="text-sm font-semibold text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
                    >
                      {guide.label}
                    </Link>
                  ) : null}

                  <div className="flex">
                    <a
                      href={deal.affiliateUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className={CTA_AFFILIATE_CLASSES}
                    >
                      Voir l&apos;offre
                    </a>
                  </div>

                  <Link
                    href={`/deals/${deal.slug}`}
                    className="text-xs font-semibold text-gray-700 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
                  >
                    Voir le détail
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <section className="mt-10 rounded-2xl bg-gray-50 p-5">
        <h2 className="text-lg font-semibold">Comment on sélectionne</h2>
        <p className="mt-2 text-sm text-gray-700">
          PrixMalin est une plateforme d&apos;affiliation : on partage des offres et codes
          gaming via des liens traçables. On affiche un prix uniquement quand il est certain.
        </p>
      </section>
    </main>
  );
}
