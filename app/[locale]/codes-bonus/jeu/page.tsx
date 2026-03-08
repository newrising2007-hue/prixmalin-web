import Link from "next/link"
import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import { getSiteUrl } from "@/lib/site"
import { getAllBonusGameSlugs, getBonusGameBySlug } from "@/lib/bonusCodes"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Codes bonus par jeu | PrixMalin",
  description:
    "Codes bonus par jeu : liste de jeux avec codes gratuits, récompenses et instructions d’activation.",
  alternates: {
    canonical: `${getSiteUrl()}/codes-bonus/jeu`,
    languages: {
      fr: `${getSiteUrl()}/codes-bonus/jeu`,
      "x-default": `${getSiteUrl()}/codes-bonus/jeu`,
    },
  },
  openGraph: {
    title: "Codes bonus par jeu | PrixMalin",
    description:
      "Codes bonus par jeu : liste de jeux avec codes gratuits, récompenses et instructions d’activation.",
    url: `${getSiteUrl()}/codes-bonus/jeu`,
    siteName: "PrixMalin",
    locale: "fr_CA",
    type: "website",
  },
}

export default async function BonusGamesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "codes_bonus" });
  const slugs = getAllBonusGameSlugs()

  const games = slugs
    .map((slug) => getBonusGameBySlug(slug))
    .filter(Boolean)
    .map((g) => ({
      slug: g!.slug,
      game: g!.game,
      count: Array.isArray(g!.codes) ? g!.codes.length : 0,
    }))
    .sort((a, b) => a.game.localeCompare(b.game, "fr"))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Codes bonus par jeu",
    itemListElement: games.map((g, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: g.game,
      url: `${getSiteUrl()}/codes-bonus/jeu/${g.slug}`,
    })),
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-neutral-600">
        <Link href="/" className="hover:text-green-700">
          {t("accueil")}
        </Link>
        <span> {" > "} </span>
        <Link href="/codes-bonus" className="hover:text-green-700">
          Codes Bonus
        </Link>
        <span> {" > "} </span>
        <span className="font-semibold text-neutral-900">{t("jeux")}</span>
      </nav>

      <header className="mt-4">
        <h1 className="text-2xl font-semibold">{t("codes_par_jeu_titre")}</h1>
        <p className="mt-2 text-sm text-gray-600">
          Choisis un jeu pour voir les codes bonus disponibles, les récompenses
          et les instructions d’activation.
        </p>
      </header>

      {games.length === 0 ? (
        <div className="mt-6 rounded-2xl border bg-white p-6 text-gray-700">
          {t("aucun_jeu")}
        </div>
      ) : (
        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          {games.map((g) => (
            <Link
              key={g.slug}
              href={`/codes-bonus/jeu/${g.slug}`}
              className="rounded-2xl border bg-white p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-bold text-neutral-900">{g.game}</h2>
                <span className="text-xs text-neutral-600">
                  {g.count} code{g.count > 1 ? "s" : ""}
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-700">
                Voir les codes + récompenses
              </p>
            </Link>
          ))}
        </section>
      )}
    </main>
  )
}
