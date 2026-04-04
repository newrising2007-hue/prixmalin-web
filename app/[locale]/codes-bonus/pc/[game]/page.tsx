import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
export const dynamic = "force-static";
import Link from "next/link";
import { notFound } from "next/navigation";

// Important: on lit des données LOCALES (pas de backend, pas de scraping)
import { PC_GAMES as pcGames } from "@/src/data/codes-bonus/pc-games";
import codesData from "@/src/data/bonus-codes/codes.json";

type BonusCodeItem = {
  id: string;
  gameSlug: string;
  platform?: string;
  method?: string;
  code?: string | null;
  sourceLabel?: string;
  isActive?: boolean;
  expiresAtISO?: string | null;
  updatedAt?: string;

  title?: string;
  description?: string;
  steps?: string[];
  note?: string;
};

type PcGame = {
  slug: string;
  name: string;
  description?: string;
  relatedSlugs?: string[];
};

function normalizePcGames(input: unknown): PcGame[] {
  // pc-games.js peut exporter un array, ou { games: [...] }
  if (Array.isArray(input)) return input as PcGame[];
  if (input && typeof input === "object" && "games" in (input as any) && Array.isArray((input as any).games)) {
    return (input as any).games as PcGame[];
  }
  return [];
}

function normalizeCodes(input: unknown): BonusCodeItem[] {
  // codes.json peut être un array direct, ou { codes: [...] }
  if (Array.isArray(input)) return input as BonusCodeItem[];
  if (input && typeof input === "object" && "codes" in (input as any) && Array.isArray((input as any).codes)) {
    return (input as any).codes as BonusCodeItem[];
  }
  return [];
}

function titleCaseSlug(slug?: string): string {
  if (!slug) return "";
  return slug
    .split("-")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export async function generateStaticParams() {
  const games = normalizePcGames(pcGames);
  return games.map((g) => ({ game: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ game: string }> }): Promise<Metadata> {
  const { game: gameSlug } = await params;
  const games = normalizePcGames(pcGames);
  const game = games.find((g) => g.slug === gameSlug);

  const name = game?.name ?? titleCaseSlug(gameSlug);
  const title = `Codes bonus ${name} (PC) | PrixMalin`;
  const description =
    game?.description ??
    `Liste de codes bonus et méthodes pour obtenir des récompenses sur ${name} (PC). Mise à jour régulière.`;

  return {
    title,
    description,
    alternates: { canonical: `/codes-bonus/pc/${gameSlug}` },
    openGraph: {
      title,
      description,
      url: `/codes-bonus/pc/${gameSlug}`,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ game: string, locale: string }> }) {
  const { game: gameSlug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'codes_bonus' });
  function loc(it: any, field: string): string {
    if (locale && locale !== "fr") {
      const k = `${field}_${locale}`;
      if (it[k]) return it[k];
    }
    return it[field] ?? "";
  }
  const games = normalizePcGames(pcGames);
  const codes = normalizeCodes(codesData);

  const game = games.find((g) => g.slug === gameSlug);
  if (!game) notFound();

  const todayISO = new Date().toISOString().slice(0, 10);

  const items = codes
    .filter((c: any) => c?.gameSlug === gameSlug && c?.platform === "pc" && c?.isActive !== false)
    .filter((c: any) => !c?.expiresAtISO || c.expiresAtISO >= todayISO)
    .sort((a: any, b: any) => {
      const ae = a?.expiresAtISO || "9999-12-31";
      const be = b?.expiresAtISO || "9999-12-31";
      return String(ae).localeCompare(String(be));
    });


  // JSON-LD simple (SEO): ItemList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Codes bonus ${game.name} (PC)`,
    itemListElement: items.slice(0, 30).map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.title ?? it.id,
      url: `/codes-bonus/pc/${gameSlug}#${it.id}`,
    })),
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-6 text-sm text-neutral-600">
        <Link className="hover:underline" href={locale === "fr" ? "/codes-bonus" : `/${locale}/codes-bonus`}>
          {t("titre")}
        </Link>
        <span className="mx-2">/</span>
        <Link className="hover:underline" href={locale === "fr" ? "/codes-bonus/pc" : `/${locale}/codes-bonus/pc`}>
          PC
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">{game.name}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("codes_jeu_pc", { nom: game.name })}
        </h1>
        <p className="mt-2 max-w-3xl text-neutral-700">
          {t("codes_jeu_pc_desc", { nom: game.name })}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={locale === "fr" ? "/codes-bonus/pc" : `/${locale}/codes-bonus/pc`}
            className="relative rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-semibold text-emerald-900 shadow-sm shadow-emerald-500/10 transition-all duration-200 hover:bg-emerald-100 hover:shadow-md hover:shadow-emerald-500/20 hover:-translate-y-0.5 hover:ring-2 hover:ring-emerald-200/60 active:translate-y-px active:shadow-sm"
          >
            {t("retour_pc")}
          </Link>
        </div>
      </header>

      {items.length === 0 ? (
        <section className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">{t("aucun_code")}</h2>
          <p className="mt-2 text-neutral-700">
            {t("seo_ok")}
          </p>        </section>
      ) : (
        <section className="space-y-4">
          {items.map((it) => (
            <article key={it.id} id={it.id} className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{loc(it, "title") || titleCaseSlug(it.id)}</h2>
                  {loc(it, "description") ? <p className="mt-1 text-neutral-700">{loc(it, "description")}</p> : null}
                </div>
                <span className="inline-flex w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  {game.name} • PC
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
{it.method ? <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">Méthode: {it.method}</span> : null}
{it.sourceLabel ? <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">{t("source")}: {it.sourceLabel}</span> : null}
{it.expiresAtISO ? <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">{t("expire")}: {it.expiresAtISO}</span> : null}
</div>
{it.code ? <pre className="mt-4 overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm"><code>{it.code}</code></pre> : null}

              <div className="mt-5 flex flex-wrap gap-2">                <Link
                  href={locale === "fr" ? "/codes-bonus/pc" : `/${locale}/codes-bonus/pc`}
                  className="relative rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-semibold text-emerald-900 shadow-sm shadow-emerald-500/10 transition-all duration-200 hover:bg-emerald-100 hover:shadow-md hover:shadow-emerald-500/20 hover:-translate-y-0.5 hover:ring-2 hover:ring-emerald-200/60 active:translate-y-px active:shadow-sm"
                >
                  {t("voir_tous_pc")}
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}

      {Array.isArray(game.relatedSlugs) && game.relatedSlugs.length > 0 ? (
        <aside className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">{t("jeux_lies")}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {game.relatedSlugs.slice(0, 12).map((slug) => (
              <Link
                key={slug}
                href={locale === "fr" ? `/codes-bonus/pc/${slug}` : `/${locale}/codes-bonus/pc/${slug}`}
                className="relative rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-semibold text-emerald-900 shadow-sm shadow-emerald-500/10 transition-all duration-200 hover:bg-emerald-100 hover:shadow-md hover:shadow-emerald-500/20 hover:-translate-y-0.5 hover:ring-2 hover:ring-emerald-200/60 active:translate-y-px active:shadow-sm"
              >
                {titleCaseSlug(slug)}
              </Link>
            ))}
          </div>
        </aside>
      ) : null}
    </main>
  );
}
