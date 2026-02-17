import Link from "next/link"
import type { Metadata } from "next"
import { getAllBonusGameSlugs, getBonusGameBySlug } from "@/lib/bonusCodes"

export const metadata: Metadata = {
  title: "Codes bonus jeux | PrixMalin",
  description:
    "Liste de codes bonus par jeu : récompenses, expirations et instructions d’activation.",
}

export default function CodesBonusIndexPage() {
  const slugs = getAllBonusGameSlugs()

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header>
        <h1 className="text-2xl font-bold">Codes bonus jeux</h1>
        <p className="mt-2 text-sm text-neutral-700">
          Choisis un jeu pour voir les codes bonus, récompenses et comment les activer.
        </p>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slugs.map((slug) => {
          const g = getBonusGameBySlug(slug)
          if (!g) return null

          return (
            <Link
              key={g.slug}
              href={`/codes-bonus/${g.slug}`}
              className="rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow"
            >
              <h2 className="text-lg font-bold">{g.game}</h2>

              <div className="mt-2 text-xs text-neutral-600">
                <span className="font-semibold">{g.codes.length}</span> codes
              </div>

              <div className="mt-4 inline-flex items-center rounded-xl border px-3 py-2 text-sm font-semibold">
                Voir les codes →
              </div>
            </Link>
          )
        })}
      </section>
    </main>
  )
}
