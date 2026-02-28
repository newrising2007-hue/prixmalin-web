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

const CTA_GREEN =
  "relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-950 shadow-sm shadow-emerald-500/10 transition-all duration-200 will-change-transform hover:bg-emerald-100 hover:shadow-md hover:shadow-emerald-500/20 hover:-translate-y-0.5 hover:ring-2 hover:ring-emerald-200/60 active:translate-y-px active:shadow-sm";

const CTA_BLUE =
  "relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-950 shadow-sm shadow-blue-500/10 transition-all duration-200 will-change-transform hover:bg-blue-100 hover:shadow-md hover:shadow-blue-500/20 hover:-translate-y-0.5 hover:ring-2 hover:ring-blue-200/60 active:translate-y-px active:shadow-sm";

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
          Trouve les meilleurs deals gaming, cartes cadeaux et bonus pour jeux PC
          et consoles. PrixMalin sélectionne des offres fiables pour éviter les
          arnaques.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/deals" className={CTA_GREEN}>
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-2xl bg-[radial-gradient(closest-side,rgba(16,185,129,0.22),rgba(255,255,255,0)_65%)] opacity-90"
            />
            Voir les deals gaming
          </Link>

          <Link href="/codes-bonus" className={CTA_BLUE}>
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-2xl bg-[radial-gradient(closest-side,rgba(59,130,246,0.22),rgba(255,255,255,0)_65%)] opacity-90"
            />
            Voir les plateformes
          </Link>
        </div>

        {/* Trust mini (léger, mobile-first) */}
        <ul className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-700">
          <li className="rounded-full bg-neutral-100 px-3 py-1">Offres sélectionnées</li>
          <li className="rounded-full bg-neutral-100 px-3 py-1">Liens affiliés traçables</li>
          <li className="rounded-full bg-neutral-100 px-3 py-1">Prix affichés si certains</li>
        </ul>
      </section>

      {/* DERNIERS CODES */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">Derniers codes ajoutés</h2>

        {latestCodes.length === 0 ? (
          <p className="mt-4 text-gray-600">Aucun code disponible pour le moment.</p>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {latestCodes.map((c) => {
              const game = getPcGame(c.slug);

              return (
                <div key={c.id} className="rounded-xl border border-gray-200 p-4">
                  <h3 className="font-semibold">{c.title}</h3>

                  <p className="mt-2 text-sm text-gray-600">{c.description}</p>

                  {game && (
                    <Link
                      href={`/codes-bonus/pc/${game.slug}`}
                      className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline"
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
