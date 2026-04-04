import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PLAYSTATION_GAMES as psGames } from "@/src/data/codes-bonus/playstation-games";
import codesData from "@/src/data/bonus-codes/codes.json";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://prixmalin.ca";

type PageProps = {
  params: Promise<{ game: string }>;
};

type BonusCodeItem = {
  id: string;
  gameSlug: string;
  platform?: string;
  code?: string | null;
  sourceLabel?: string;
  expiresAtISO?: string | null;
  isActive?: boolean;
  title?: string;
  description?: string;
};

type PsGame = {
  slug: string;
  name: string;
  seoDescription?: string;
  hero?: {
    subtitle?: string;
    highlights?: string[];
  };
  relatedSlugs?: string[];
};

function normalizeGames(input: unknown): PsGame[] {
  if (Array.isArray(input)) return input as PsGame[];
  if (input && typeof input === "object" && "games" in (input as any) && Array.isArray((input as any).games)) {
    return (input as any).games as PsGame[];
  }
  return [];
}

function normalizeCodes(input: unknown): BonusCodeItem[] {
  if (Array.isArray(input)) return input as BonusCodeItem[];
  if (input && typeof input === "object" && "codes" in (input as any) && Array.isArray((input as any).codes)) {
    return (input as any).codes as BonusCodeItem[];
  }
  return [];
}

function titleCaseSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function generateStaticParams() {
  const games = normalizeGames(psGames);
  return games.map((g) => ({ game: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { game: gameSlug } = await params;

  const games = normalizeGames(psGames);
  const game = games.find((g) => g.slug === gameSlug);

  const name = game?.name ?? titleCaseSlug(gameSlug);
  const title = `Codes ${name} (PlayStation) | PrixMalin`;
  const description =
    game?.seoDescription ??
    `Codes ${name} sur PlayStation : uniquement des codes réels (quand disponibles), avec source et expiration.`;

  const url = `${SITE_URL}/codes-bonus/playstation/${gameSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "fr-CA": url,
        "x-default": url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { game: gameSlug, locale } = await params as any;
  function loc(it: any, field: string): string {
    if (locale !== "fr") {
      const k = `${field}_${locale}`;
      if (it[k]) return it[k];
    }
    return it[field] ?? "";
  }
  const t = await getTranslations({ locale, namespace: "codes_bonus" });

  const games = normalizeGames(psGames);
  const codes = normalizeCodes(codesData);

  const game = games.find((g) => g.slug === gameSlug);
  if (!game) notFound();

  const todayISO = new Date().toISOString().slice(0, 10);

  const items = codes
    .filter((c: any) => c?.gameSlug === gameSlug && c?.platform === "playstation" && c?.isActive !== false)
    .filter((c: any) => !c?.expiresAtISO || c.expiresAtISO >= todayISO)
    .filter((c: any) => typeof c?.code === "string" && c.code.trim().length > 0)
    .sort((a: any, b: any) => {
      const ae = a?.expiresAtISO || "9999-12-31";
      const be = b?.expiresAtISO || "9999-12-31";
      return String(ae).localeCompare(String(be));
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Codes ${game.name} (PlayStation)`,
    itemListElement: items.slice(0, 30).map((it: any, idx: number) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.title ?? it.id,
      url: `/codes-bonus/playstation/${gameSlug}#${it.id}`,
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
        <Link className="hover:underline" href={locale === "fr" ? "/codes-bonus/playstation" : `/${locale}/codes-bonus/playstation`}>
          PlayStation
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">{game.name}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t("codes_jeu_playstation", { nom: game.name })} 🇨🇦</h1>
        <p className="mt-2 max-w-2xl text-neutral-600">{t("codes_reels_uniquement")}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={locale === "fr" ? "/codes-bonus/playstation" : `/${locale}/codes-bonus/playstation`}
            className="relative rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-semibold text-emerald-900 shadow-sm shadow-emerald-500/10 transition-all duration-200 hover:bg-emerald-100 hover:shadow-md hover:shadow-emerald-500/20 hover:-translate-y-0.5 hover:ring-2 hover:ring-emerald-200/60 active:translate-y-px active:shadow-sm"
          >
            {t("retour_playstation")}
          </Link>
        </div>
      </header>

      {items.length === 0 ? (
        <section className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">{t("aucun_code")}</h2>
          <p className="mt-2 text-sm text-neutral-700">
            {t("on_ajoute")}
          </p>        </section>
      ) : (
        <section aria-label="Liste des codes" className="space-y-4">
          {items.map((it: any) => (
            <article key={it.id} id={it.id} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold">{loc(it, "title") || t("code_bonus")}</h2>
                {loc(it, "description") ? <p className="mt-1 text-neutral-700">{loc(it, "description")}</p> : null}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {it.sourceLabel ? (
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                    {t("source")}: {it.sourceLabel}
                  </span>
                ) : null}
                {it.expiresAtISO ? (
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                    {t("expire")}: {it.expiresAtISO}
                  </span>
                ) : null}
              </div>

              {it.code ? (
                <pre className="mt-4 overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm">
                  <code>{it.code}</code>
                </pre>
              ) : null}
            </article>
          ))}
        </section>
      )}

      {Array.isArray(game.relatedSlugs) && game.relatedSlugs.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">{t("autres_jeux_playstation")}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {game.relatedSlugs.map((s) => (
              <Link
                key={s}
                href={locale === "fr" ? `/codes-bonus/playstation/${s}` : `/${locale}/codes-bonus/playstation/${s}`}
                className="relative rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-semibold text-emerald-900 shadow-sm shadow-emerald-500/10 transition-all duration-200 hover:bg-emerald-100 hover:shadow-md hover:shadow-emerald-500/20 hover:-translate-y-0.5 hover:ring-2 hover:ring-emerald-200/60 active:translate-y-px active:shadow-sm"
              >
                {titleCaseSlug(s)}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
