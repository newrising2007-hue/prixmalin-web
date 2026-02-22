import type { Metadata } from "next";
import Link from "next/link";
import { getActiveBonusCodesForGame } from "@/src/lib/bonus-codes";
import { getPcGameSlugs, getPcGame } from "@/src/data/codes-bonus/pc-games";

export const metadata: Metadata = {
  title: "Tous les codes bonus PC (2026) — PrixMalin",
  description:
    "Liste des bonus et codes PC disponibles : Valorant, Fortnite, League of Legends, Roblox, Warzone, CS2 et plus.",
};

function getAllPcCodes() {
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

  return all;
}

export default function AllPcCodesPage() {
  const codes = getAllPcCodes();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
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
      </nav>

      <h1 className="mt-6 text-3xl font-bold">
        Tous les codes bonus PC disponibles
      </h1>

      <p className="mt-3 text-gray-700">
        Liste des bonus et méthodes fiables pour jeux PC. Les informations sont
        mises à jour automatiquement.
      </p>

      {codes.length === 0 ? (
        <div className="mt-8 rounded-xl border p-5">
          Aucun bonus disponible pour le moment.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {codes.map((c) => {
            const game = getPcGame(c.slug);

            return (
              <div
                key={c.id}
                className="rounded-xl border border-gray-200 p-5"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg">{c.title}</h2>

                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {c.sourceLabel}
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-700">{c.description}</p>

                {c.code && (
                  <div className="mt-3 bg-gray-100 p-2 rounded font-mono text-sm">
                    {c.code}
                  </div>
                )}

                {game && (
                  <Link
                    href={`/codes-bonus/pc/${game.slug}`}
                    className="inline-block mt-4 text-sm font-semibold text-blue-600 hover:underline"
                  >
                    Voir la page {game.name}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
