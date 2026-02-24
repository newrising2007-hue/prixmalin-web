import Link from "next/link";
import { getActiveBonusCodesForGame } from "@/src/lib/bonus-codes";
import { getPcGameSlugs, getPcGame } from "@/src/data/codes-bonus/pc-games";

function getLatestPcCodes() {
  const slugs = getPcGameSlugs();

  let all: any[] = [];

  for (const slug of slugs) {
    const codes = getActiveBonusCodesForGame({
      gameSlug: slug,
      platform: "pc",
    });

    all = all.concat(
      codes.map((c) => ({
        ...c,
        slug,
      }))
    );
  }

  return all.slice(0, 6);
}

export default function HomePage() {
  const latestCodes = getLatestPcCodes();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">
          PrixMalin — Deals et codes gaming 🇨🇦
        </h1>

        <p className="mt-4 max-w-2xl text-gray-600">
          Trouve les meilleurs deals gaming, cartes cadeaux et bonus pour jeux
          PC et consoles. PrixMalin sélectionne des offres fiables pour éviter
          les arnaques.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/codes-bonus"
            className="inline-flex rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Voir les plateformes
          </Link>

          <Link
            href="/deals"
            className="inline-flex rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
          >
            Voir les deals gaming
          </Link>
        </div>
      </section>

      {/* DERNIERS CODES */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">Derniers codes ajoutés</h2>

        {latestCodes.length === 0 ? (
          <p className="mt-4 text-gray-600">
            Aucun code disponible pour le moment.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {latestCodes.map((c) => {
              const game = getPcGame(c.slug);

              return (
                <div
                  key={c.id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <h3 className="font-semibold">{c.title}</h3>

                  <p className="mt-2 text-sm text-gray-600">
                    {c.description}
                  </p>

                  {game && (
                    <Link
                      href={`/codes-bonus/pc/${game.slug}`}
                      className="inline-block mt-3 text-sm font-semibold text-blue-600 hover:underline"
                    >
                      Voir {game.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
