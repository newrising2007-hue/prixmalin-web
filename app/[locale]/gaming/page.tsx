import Link from "next/link";
import Image from "next/image";
import { getActiveBonusCodesForGame } from "@/src/lib/bonus-codes";
import { getPcGameSlugs, getPcGame } from "@/src/data/codes-bonus/pc-games";
import { getXboxGameSlugs, getXboxGame } from "@/src/data/codes-bonus/xbox-games";
import { getPlayStationGameSlugs, getPlayStationGame } from "@/src/data/codes-bonus/playstation-games";

type Platform = "pc" | "xbox" | "playstation";
type CodeItem = {
  id: string; gameSlug: string; platform?: Platform;
  isActive?: boolean; expiresAtISO?: string | null;
  updatedAtISO?: string | null; cycleStartISO?: string | null; addedAtISO?: string | null;
};
type CodeCard = { id: string; platform: Platform; gameSlug: string; gameName: string; href: string; sortKey: string; };

function todayISO(): string { return new Date().toISOString().slice(0, 10); }
function safeStr(v: unknown): string { return typeof v === "string" ? v : ""; }
function buildSortKey(c: CodeItem): string {
  return safeStr(c.addedAtISO) || safeStr(c.updatedAtISO) || safeStr(c.cycleStartISO) || safeStr(c.expiresAtISO) || safeStr(c.id);
}
function platformLabel(p: Platform): "PC" | "Xbox" | "PS" {
  if (p === "pc") return "PC"; if (p === "xbox") return "Xbox"; return "PS";
}
function platformHref(p: Platform, slug: string): string {
  if (p === "pc") return `/codes-bonus/pc/${slug}`; if (p === "xbox") return `/codes-bonus/xbox/${slug}`; return `/codes-bonus/playstation/${slug}`;
}
function platformGameName(p: Platform, slug: string): string {
  if (p === "pc") return getPcGame(slug)?.name ?? slug; if (p === "xbox") return getXboxGame(slug)?.name ?? slug; return getPlayStationGame(slug)?.name ?? slug;
}
function getActiveCodesForPlatform(platform: Platform, slugs: string[]): CodeCard[] {
  const today = todayISO(); const out: CodeCard[] = [];
  for (const slug of slugs) {
    const codes = getActiveBonusCodesForGame({ gameSlug: slug, platform }) as any[];
    for (const c of codes as any[]) {
      const item = c as CodeItem;
      if (item?.isActive === false) continue;
      if (item?.expiresAtISO && item.expiresAtISO < today) continue;
      out.push({ id: safeStr(item.id) || `${platform}-${slug}`, platform, gameSlug: slug, gameName: platformGameName(platform, slug), href: platformHref(platform, slug), sortKey: buildSortKey(item) });
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
  if (pc) cards.push(pc); if (xbox) cards.push(xbox); if (ps) cards.push(ps);
  return cards;
}

const CTA_GREEN = "relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-950 shadow-sm shadow-emerald-500/10 transition-all duration-200 will-change-transform hover:bg-emerald-100 hover:shadow-md hover:shadow-emerald-500/20 hover:-translate-y-0.5 hover:ring-2 hover:ring-emerald-200/60 active:translate-y-px active:shadow-sm";
const CTA_BLUE = "relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-950 shadow-sm shadow-blue-500/10 transition-all duration-200 will-change-transform hover:bg-blue-100 hover:shadow-md hover:shadow-blue-500/20 hover:-translate-y-0.5 hover:ring-2 hover:ring-blue-200/60 active:translate-y-px active:shadow-sm";

export default function HomePage() {
  const cards = pickLatestCards();

  return (
    <main className="mx-auto max-w-6xl px-4 pt-2 pb-4">

      {/* ── HERO ── */}
      <section className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight">
          PrixMalin — Deals et codes gaming 🇨🇦
        </h1>
        <p className="mt-4 mb-6 max-w-2xl text-gray-600">
          Trouve les meilleurs deals gaming, cartes cadeaux et bonus pour jeux PC et consoles.
          PrixMalin sélectionne des offres fiables pour éviter les arnaques.
        </p>
      </section>
      <section className="relative mb-8 overflow-visible rounded-3xl border border-white/60 bg-white/40 shadow-lg shadow-blue-100/40 backdrop-blur-md ring-1 ring-white/80">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_70%)] blur-2xl" />
          <div className="absolute -right-16 -bottom-8 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.15),transparent_70%)] blur-2xl" />
        </div>
        <div className="relative px-6 pb-2 pt-1 sm:px-10">
          <div className="max-w-2xl">
            <Link href="/codes-bonus" className="inline-block text-xs font-semibold tracking-widest text-blue-500/80 uppercase transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-600">
              Derniers ajouts de codes gaming
            </Link>
            <h2 className="mt-0 text-base font-bold tracking-tight text-gray-800 sm:text-lg">
              Une entrée simple pour tous les gamers 🎮
            </h2>
          </div>
        </div>
        {cards.length > 0 ? (
          <div className="relative mt-2 px-4 pb-2 sm:mt-2 sm:px-10">
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {cards.map((c) => (
                <Link
                  key={`${c.platform}-${c.id}`}
                  href={c.href}
                  className={`group relative flex h-[28px] items-center justify-between rounded-2xl border px-3 py-1.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 sm:h-[32px] sm:px-3.5 sm:py-1.5 ${
                    c.platform === "xbox"
                      ? "border-emerald-200 bg-emerald-50 hover:shadow-emerald-500/20 hover:ring-2 hover:ring-emerald-200/60"
                      : c.platform === "playstation"
                      ? "border-blue-200 bg-blue-50 hover:shadow-blue-500/20 hover:ring-2 hover:ring-blue-200/60"
                      : "border-neutral-200 bg-neutral-50 hover:shadow-neutral-400/20 hover:ring-2 hover:ring-neutral-200/60"
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="block max-w-full truncate text-[13px] font-semibold leading-snug text-neutral-900 sm:text-sm">
                      {c.gameName}
                    </span>
                    <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-700 sm:px-2.5 sm:py-1 sm:text-[11px]">
                      {platformLabel(c.platform)}
                    </span>
                  </div>
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-blue-200/60" />
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {/* ── HÉRO PERSONNAGES ── */}
      <section className="relative mb-10">
        <Link
          href="/deals"
          className="group relative block w-full cursor-pointer"
          aria-label="Voir tous les deals gaming"
        >
          {/* SLOGAN avec fils SVG */}
          <div className="relative flex flex-col items-center">

            {/* Texte slogan */}
            <div className="relative z-10 mb-0 transition-transform duration-300 group-hover:-translate-y-2">
              <p className="text-[11px] font-bold tracking-[6px] text-blue-400/70 uppercase text-center mb-1">
                PrixMalin · Deals Gaming
              </p>
              <h2
                className="text-center font-black uppercase tracking-widest leading-none select-none"
                style={{
                  fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                  fontSize: "clamp(32px, 7vw, 80px)",
                  letterSpacing: "0.08em",
                  background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 25%, #ec4899 50%, #f59e0b 75%, #10b981 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "none",
                  filter: "drop-shadow(0 2px 8px rgba(59,130,246,0.25))",
                }}
              >
                CHOISISSEZ VOTRE CONSOLE
              </h2>
              {/* Sous-titre */}
              <p className="text-center text-sm font-semibold text-gray-500 mt-1 tracking-wide">
                Cliquez pour voir tous les deals 👾
              </p>
            </div>

            {/* Fils SVG qui descendent vers les personnages */}
            <div className="relative w-full -mb-2" style={{ height: "80px" }}>
              <svg
                viewBox="0 0 1200 80"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Fil gauche → Nintendo (gauche) */}
                <path
                  d="M 480 0 C 480 40, 280 40, 240 80"
                  stroke="url(#filGauche)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  className="transition-all duration-300 group-hover:opacity-80"
                />
                {/* Fil centre → PS5 (centre) */}
                <path
                  d="M 600 0 C 600 30, 600 50, 600 80"
                  stroke="url(#filCentre)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className="transition-all duration-300 group-hover:opacity-80"
                />
                {/* Fil droit → Xbox (droite) */}
                <path
                  d="M 720 0 C 720 40, 920 40, 960 80"
                  stroke="url(#filDroit)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  className="transition-all duration-300 group-hover:opacity-80"
                />
                {/* Nœud central entremêlé */}
                <path
                  d="M 560 20 C 580 35, 620 10, 640 30 C 620 45, 580 20, 600 40"
                  stroke="rgba(99,102,241,0.5)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="filGauche" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3"/>
                  </linearGradient>
                  <linearGradient id="filCentre" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4"/>
                  </linearGradient>
                  <linearGradient id="filDroit" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* PERSONNAGES — image principale */}
            <div className="relative w-full transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
              {/* Glow derrière les personnages */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(99,102,241,0.15) 0%, transparent 70%)",
                }}
              />
              <picture>
                <source srcSet="/images/personnages.webp" type="image/webp" />
                <Image
                  src="/images/personnages.png"
                  alt="Nintendo Switch, PlayStation 5 et Xbox Series X — Choisissez votre console"
                  width={1200}
                  height={400}
                  className="w-full h-auto object-contain"
                  priority
                />
              </picture>
              {/* Ombre au sol */}
              <div
                aria-hidden
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-6 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, rgba(0,0,0,0.12) 0%, transparent 70%)",
                  filter: "blur(8px)",
                }}
              />
            </div>

          </div>

          {/* Overlay hover subtil */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-2 ring-blue-300/40" />
        </Link>
      </section>

    </main>
  );
}
