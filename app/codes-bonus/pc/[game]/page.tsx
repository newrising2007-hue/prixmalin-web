// app/codes-bonus/pc/[game]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import CopyCodeButton from "@/components/CopyCodeButton";
import { getPcGame, getPcGameSlugs } from "@/src/data/codes-bonus/pc-games";
import {
  getActiveBonusCodesForGame,
  mergeBonusCodes,
} from "@/src/lib/bonus-codes";

type PageProps = {
  params: Promise<{ game: string }>;
};

export function generateStaticParams() {
  return getPcGameSlugs().map((slug) => ({ game: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { game: gameSlug } = await params;
  const game = getPcGame(gameSlug);

  if (!game) {
    return {
      title: "Jeu introuvable — Codes bonus PC | PrixMalin",
      robots: { index: false, follow: false },
    };
  }

  const title = game.title;

  return {
    title,
    description: game.seoDescription,
    alternates: { canonical: `/codes-bonus/pc/${game.slug}`, languages: { "fr-CA": "https://prixmalin.ca", "x-default": "https://prixmalin.ca" } },
    openGraph: {
      title,
      description: game.seoDescription,
      url: `/codes-bonus/pc/${game.slug}`,
      type: "article",
    },
  };
}

function buildFaqJsonLd(gameName: string, faq: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
    about: { "@type": "Thing", name: `${gameName} (PC)` },
  };
}

function buildArticleJsonLd(opts: {
  title: string;
  description: string;
  urlPath: string;
  dateModifiedISO: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    dateModified: opts.dateModifiedISO,
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.urlPath },
  };
}

function activationStepsBySlug(slug: string) {
  // MVP : on met WOT hyper clair + fallback générique
  if (slug === "world-of-tanks") {
    return [
      "1) Connecte-toi à ton compte Wargaming (PC).",
      "2) Ouvre la page officielle « Activer un code » / « Redeem code ».",
      "3) Colle le code, puis valide.",
      "4) Relance World of Tanks et vérifie la section dépôts/cadeaux.",
    ];
  }

  return [
    "1) Connecte-toi à ton compte du jeu (site officiel / launcher).",
    "2) Trouve la page « Redeem/Activer un code ».",
    "3) Colle le code et valide.",
    "4) Relance le jeu si nécessaire.",
  ];
}

function expectedRewardsBySlug(slug: string) {
  if (slug === "world-of-tanks") {
    return [
      "Crédits, boosters (XP/Crédits), consommables",
      "Jours premium (parfois)",
      "Missions temporaires ou objets (selon promo)",
      "Les récompenses dépendent de la promotion et peuvent varier",
    ];
  }

  return [
    "Récompenses variables selon la promo (bonus temporaires, items, etc.)",
    "Toujours vérifier la source et les conditions",
  ];
}

export default async function PcGamePage({ params }: PageProps) {
  const { game: gameSlug } = await params;
  const game = getPcGame(gameSlug);

  if (!game) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">Page introuvable</h1>
        <p className="mt-3 text-sm text-gray-600">
          Ce jeu n’existe pas (ou l’URL est incorrecte).
        </p>
        <Link
          href="/codes-bonus/pc"
          className="mt-6 inline-flex rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
        >
          Retour au hub PC
        </Link>
      </main>
    );
  }

  const autoCodes = getActiveBonusCodesForGame({
    gameSlug: game.slug,
    platform: "pc",
  });

  const localCodes =
    "activeCodes" in (game as any) && Array.isArray((game as any).activeCodes)
      ? ((game as any).activeCodes as Array<{
          id: string;
          title: string;
          description: string;
          method: "code" | "event" | "bundle" | "gift-card";
          code?: string;
          expiresAtISO?: string;
          sourceLabel: string;
        }>)
      : [];

  const mergedCodes = mergeBonusCodes({ auto: autoCodes, local: localCodes });

  const urlPath = `/codes-bonus/pc/${game.slug}`;
  const faqJsonLd = buildFaqJsonLd(game.name, game.faq);
  const articleJsonLd = buildArticleJsonLd({
    title: game.title,
    description: game.seoDescription,
    urlPath,
    dateModifiedISO: game.updatedAtISO,
  });

  const hasCopyCodes = mergedCodes.some((c) => c.method === "code" && !!c.code);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <nav className="text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <Link href="/codes-bonus" className="hover:underline">
          Codes bonus
        </Link>
        <span className="mx-2">/</span>
        <Link href="/codes-bonus/pc" className="hover:underline">
          PC
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{game.name}</span>
      </nav>

      <header className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight">{game.title}</h1>
        <p className="mt-3 text-base text-gray-700">{game.hero.subtitle}</p>

        <ul className="mt-5 space-y-2">
          {game.hero.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gray-900" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/codes-bonus/pc"
            className="inline-flex justify-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
          >
            Voir tous les jeux PC
          </Link>

          <Link
            href="/deals"
            className="inline-flex justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900"
          >
            Voir les deals gaming
          </Link>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Mise à jour :{" "}
          <time dateTime={game.updatedAtISO}>{game.updatedAtISO}</time>
        </p>
      </header>

      {/* Offres recommandées */}
      <section className="mt-12">
        <h2 className="text-xl font-bold tracking-tight">Offres recommandées</h2>
        <p className="mt-2 text-sm text-gray-700">
          Offres variables. PrixMalin peut recevoir une commission via liens
          affiliés, sans surcoût pour toi.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {game.offers.map((offer) => (
            <a
              key={offer.id}
              href={offer.href}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="rounded-2xl border border-gray-200 p-5 hover:bg-gray-50"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-gray-900">
                  {offer.title}
                </h3>
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                  {offer.priceLabel}
                </span>
              </div>

{typeof (offer as any).badge === "string" && (offer as any).badge.trim().length > 0 ? (
  <p className="mt-2 inline-flex rounded-full border border-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">
    {(offer as any).badge}
  </p>
) : null}
              <p className="mt-3 text-sm leading-6 text-gray-800">
                {offer.description}
              </p>

              <span className="mt-4 inline-flex rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white">
                {offer.ctaLabel}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Codes bonus actifs */}
      <section className="mt-12">
        <h2 className="text-xl font-bold tracking-tight">Codes bonus actifs</h2>
        <p className="mt-2 text-sm text-gray-700">
          Codes et bonus listés. Certains codes sont limités (date/quantité/région).
        </p>

        {mergedCodes.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-gray-700">
              Aucun bonus actif listé pour le moment.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {mergedCodes.map((c) => (
              <div key={c.id} className="rounded-2xl border border-gray-200 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    {c.title}
                  </h3>
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                    {c.sourceLabel}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-gray-800">
                  {c.description}
                </p>

                {c.method === "code" && c.code ? (
                  <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold text-gray-700">
                          Code à copier :
                        </p>
                        <p className="mt-1 font-mono text-sm text-gray-900">
                          {c.code}
                        </p>
                      </div>
                      <CopyCodeButton code={c.code} />
                    </div>
                  </div>
                ) : null}

                <p className="mt-4 text-xs text-gray-500">
                  Type : {c.method}
                  {c.expiresAtISO ? (
                    <>
                      {" "}
                      • Expire le{" "}
                      <time dateTime={c.expiresAtISO}>{c.expiresAtISO}</time>
                    </>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Comment activer (seulement si on a des codes à copier) */}
      {hasCopyCodes ? (
        <section className="mt-12 rounded-2xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold">Comment activer un code</h2>
          <p className="mt-2 text-sm text-gray-700">
            Étapes rapides (PC). Si le code est expiré ou limité, l’activation
            peut échouer.
          </p>

          <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm text-gray-800">
            {activationStepsBySlug(game.slug).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </section>
      ) : null}

      {/* Ce que le code peut donner */}
      {hasCopyCodes ? (
        <section className="mt-8 rounded-2xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold">Ce que le code bonus peut donner</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-gray-800">
            {expectedRewardsBySlug(game.slug).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-gray-500">
            Note : les récompenses exactes dépendent de la promotion, de la région
            et des conditions du compte.
          </p>
        </section>
      ) : null}

      {/* Intro SEO */}
      <section className="mt-10 space-y-4">
        {game.intro.map((p) => (
          <p key={p} className="text-base leading-7 text-gray-800">
            {p}
          </p>
        ))}
      </section>

      {/* Sections SEO */}
      <div className="mt-12 space-y-10">
        {game.sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="text-xl font-bold tracking-tight">{s.h2}</h2>

            <div className="mt-3 space-y-3">
              {s.body.map((p) => (
                <p key={p} className="text-base leading-7 text-gray-800">
                  {p}
                </p>
              ))}
            </div>
         {Array.isArray((s as any).bullets) && (s as any).bullets.length > 0 ? (
  <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-gray-800">
    {(s as any).bullets.map((b: string) => (
      <li key={b}>{b}</li>
    ))}
  </ul>
) : null}   

          </section>
        ))}
      </div>

      {/* FAQ */}
      <section className="mt-14 rounded-2xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold">FAQ</h2>
        <div className="mt-4 space-y-4">
          {game.faq.map((item) => (
            <details
              key={item.q}
              className="rounded-xl border border-gray-200 p-4"
            >
              <summary className="cursor-pointer text-sm font-semibold text-gray-900">
                {item.q}
              </summary>
              <p className="mt-3 text-sm leading-6 text-gray-800">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Jeux similaires */}
      <section className="mt-12">
        <h2 className="text-lg font-bold">Jeux PC similaires</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {game.relatedSlugs.map((slug) => {
            const related = getPcGame(slug);
            if (!related) return null;
            return (
              <Link
                key={slug}
                href={`/codes-bonus/pc/${slug}`}
                className="rounded-full border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
              >
                {related.name}
              </Link>
            );
          })}
        </div>
      </section>

      {/* JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}
