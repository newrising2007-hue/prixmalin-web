import Link from "next/link";
import Image from "next/image";
import { getActiveBonusCodesForGame } from "@/src/lib/bonus-codes";

import { getPcGameSlugs, getPcGame } from "@/src/data/codes-bonus/pc-games";
import { getXboxGameSlugs, getXboxGame } from "@/src/data/codes-bonus/xbox-games";
import {
  getPlayStationGameSlugs,
  getPlayStationGame,
} from "@/src/data/codes-bonus/playstation-games";

type Platform = "pc" | "xbox" | "playstation";

type CodeItem = {
  id: string;
  gameSlug: string;
  platform?: Platform;
  isActive?: boolean;
  expiresAtISO?: string | null;
  updatedAtISO?: string | null;
  cycleStartISO?: string | null;
  addedAtISO?: string | null;
};

type CodeCard = {
  id: string;
  platform: Platform;
  gameSlug: string;
  gameName: string;
  href: string;
  sortKey: string;
};

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function safeStr(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function buildSortKey(c: CodeItem): string {
  // Recent: addedAtISO > updatedAtISO > cycleStartISO > expiresAtISO > id
  return (
    safeStr(c.addedAtISO) ||
    safeStr(c.updatedAtISO) ||
    safeStr(c.cycleStartISO) ||
    safeStr(c.expiresAtISO) ||
    safeStr(c.id)
  );
}

function platformLabel(p: Platform): "PC" | "Xbox" | "PS" {
  if (p === "pc") return "PC";
  if (p === "xbox") return "Xbox";
  return "PS";
}

function platformHref(p: Platform, slug: string): string {
  if (p === "pc") return `/codes-bonus/pc/${slug}`;
  if (p === "xbox") return `/codes-bonus/xbox/${slug}`;
  return `/codes-bonus/playstation/${slug}`;
}

function platformGameName(p: Platform, slug: string): string {
  if (p === "pc") return getPcGame(slug)?.name ?? slug;
  if (p === "xbox") return getXboxGame(slug)?.name ?? slug;
  return getPlayStationGame(slug)?.name ?? slug;
}

function getActiveCodesForPlatform(platform: Platform, slugs: string[]): CodeCard[] {
  const today = todayISO();
  const out: CodeCard[] = [];

  for (const slug of slugs) {
    const codes = getActiveBonusCodesForGame({ gameSlug: slug, platform }) as any[];
    for (const c of codes as any[]) {
      const item = c as CodeItem;

      // filtre sécurité (même si lib filtre déjà)
      if (item?.isActive === false) continue;
      if (item?.expiresAtISO && item.expiresAtISO < today) continue;

      out.push({
        id: safeStr(item.id) || `${platform}-${slug}`,
        platform,
        gameSlug: slug,
        gameName: platformGameName(platform, slug),
        href: platformHref(platform, slug),
        sortKey: buildSortKey(item),
      });
    }
  }

  out.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
  return out;
}

function pickLatestCards(): CodeCard[] {
  const pc = getActiveCodesForPlatform("pc", getPcGameSlugs())[0];
  const xbox = getActiveCodesForPlatform("xbox", getXboxGameSlugs())[0];
  const ps = getActiveCodesForPlatform("playstation", getPlayStationGameSlugs())[0];

  const cards: CodeCard[] = [];
  if (pc) cards.push(pc);
  if (xbox) cards.push(xbox);
  if (ps) cards.push(ps);

  return cards;
}

const CTA_GREEN =
  "relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-950 shadow-sm shadow-emerald-500/10 transition-all duration-200 will-change-transform hover:bg-emerald-100 hover:shadow-md hover:shadow-emerald-500/20 hover:-translate-y-0.5 hover:ring-2 hover:ring-emerald-200/60 active:translate-y-px active:shadow-sm";

const CTA_BLUE =
  "relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-950 shadow-sm shadow-blue-500/10 transition-all duration-200 will-change-transform hover:bg-blue-100 hover:shadow-md hover:shadow-blue-500/20 hover:-translate-y-0.5 hover:ring-2 hover:ring-blue-200/60 active:translate-y-px active:shadow-sm";

export default function HomePage() {
  const cards = pickLatestCards();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO */}
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          PrixMalin — Deals et codes gaming 🇨🇦
        </h1>

        <p className="mt-4 max-w-2xl text-gray-600">
          Trouve les meilleurs deals gaming, cartes cadeaux et bonus pour jeux PC et
          consoles. PrixMalin sélectionne des offres fiables pour éviter les arnaques.
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
      </section>

      {/* BANNIERE PROMO (cards flottantes par-dessus) */}
      <section className="relative mb-12 overflow-visible rounded-3xl border border-neutral-200 bg-[#111A2E]">
        {/* Fond / glows bleu-blanc-vert */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.22),rgba(255,255,255,0)_65%)] blur-2xl" />
          <div className="absolute -right-28 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.18),rgba(255,255,255,0)_65%)] blur-2xl" />
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),rgba(255,255,255,0)_60%)] blur-2xl" />

          {/* Triangles décoratifs */}
          <div className="absolute -left-10 bottom-10 h-40 w-40 rotate-12 bg-white/5 [clip-path:polygon(50%_0,0_100%,100%_100%)]" />
          <div className="absolute right-10 -top-8 h-44 w-44 -rotate-12 bg-white/5 [clip-path:polygon(50%_0,0_100%,100%_100%)]" />
          <div className="absolute right-24 bottom-8 h-28 w-28 rotate-6 bg-white/4 [clip-path:polygon(50%_0,0_100%,100%_100%)]" />

          {/* Logo PrixMalin en watermark */}
          <Image
            src="/prixmalin-logo.webp"
            alt=""
            width={700}
            height={700}
            className="absolute -right-24 -bottom-28 w-[520px] opacity-10 blur-[0.2px]"
            priority={false}
          />
        </div>

        <div className="relative px-6 pb-16 pt-6 sm:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-white/70">
              Derniers ajouts de codes gaming
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Une entrée simple pour tous les gamers 🎮
            </h2>

            <p className="mt-2 text-sm text-white/80">
              Deals, abonnements et cartes cadeaux — sélectionnés avec soin.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/deals"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0B1220] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-px"
              >
                Voir les deals maintenant
              </Link>

              <Link
                href="/abonnements-gaming"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Abonnements gaming
              </Link>
            </div>
          </div>
        </div>

        {/* Cartes qui passent par-dessus (overlap) */}
        {cards.length > 0 ? (
          <div className="relative -mt-16 px-4 pb-6 sm:px-10">
            <div className="grid gap-3 sm:grid-cols-3">
              {cards.map((c) => (
                <Link
                  key={`${c.platform}-${c.id}`}
                  href={c.href}
                  className="group relative rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-semibold text-neutral-900">
                      {c.gameName}
                    </div>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-700">
                      {platformLabel(c.platform)}
                    </span>
                  </div>

                  <div className="mt-2 text-xs font-semibold text-blue-700">
                    Voir les codes →
                  </div>

                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-blue-200/60"
                  />
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
