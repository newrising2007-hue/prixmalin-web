// src/lib/bonus-codes.ts
import rawCodes from "@/src/data/bonus-codes/codes.json";

export type BonusPlatform = "pc" | "playstation" | "xbox" | "nintendo" | "mobile";

export type BonusCode = {
  id: string;
  gameSlug: string;
  platform: BonusPlatform;

  title: string;
  description: string;
  method: "code" | "event" | "bundle" | "gift-card";

  // Si method="code", code peut être une string
  code: string | null;

  sourceLabel: string; // "Officiel" | "Promo" | etc.
  isActive: boolean;

  // compat ancienne structure
  expiresAtISO: string | null;

  // ✅ nouveau : cycle mensuel (15 -> 15)
  cycleStartISO: string | null;
  cycleEndISO: string | null;
};

function normalizePlatform(p: unknown): BonusPlatform | null {
  if (p === "pc" || p === "playstation" || p === "xbox" || p === "nintendo" || p === "mobile") return p;
  return null;
}

function normalizeMethod(m: unknown): BonusCode["method"] | null {
  if (m === "redeem") return "code";
  if (m === "code" || m === "event" || m === "bundle" || m === "gift-card") return m;
  return null;
}

function normalizeCode(input: unknown): BonusCode | null {
  if (!input || typeof input !== "object") return null;
  const c = input as Partial<BonusCode>;

  const platform = normalizePlatform(c.platform);
  const method = normalizeMethod(c.method);

  if (
    !c.id ||
    !c.gameSlug ||
    !platform ||
    !c.title ||
    !c.description ||
    !method ||
    !c.sourceLabel ||
    typeof c.isActive !== "boolean"
  ) {
    return null;
  }

  return {
    id: String(c.id),
    gameSlug: String(c.gameSlug),
    platform,
    title: String(c.title),
    description: String(c.description),
    method,
    code: c.code ?? null,
    sourceLabel: String(c.sourceLabel),
    isActive: Boolean(c.isActive),
    expiresAtISO: c.expiresAtISO ?? null,
    cycleStartISO: (c as any).cycleStartISO ?? null,
    cycleEndISO: (c as any).cycleEndISO ?? null,
  };
}

function toDateValue(iso: string | null): number {
  if (!iso) return Number.POSITIVE_INFINITY;
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : Number.POSITIVE_INFINITY;
}

function isExpiredByDates(c: BonusCode, nowMs: number): boolean {
  // ✅ priorité au cycle (si présent)
  if (c.cycleEndISO) {
    const end = Date.parse(c.cycleEndISO);
    if (Number.isFinite(end) && nowMs >= end) return true;
  }
  // fallback legacy
  if (c.expiresAtISO) {
    const exp = Date.parse(c.expiresAtISO);
    if (Number.isFinite(exp) && nowMs >= exp) return true;
  }
  return false;
}

export function getAllBonusCodes(): BonusCode[] {
  const codes: BonusCode[] = (Array.isArray(rawCodes) ? rawCodes : [])
    .map(normalizeCode)
    .filter((x): x is BonusCode => Boolean(x));

  return codes;
}

export function getActiveBonusCodes(opts: {
  platform: BonusPlatform;
  gameSlug?: string;
  nowISO?: string;
}): BonusCode[] {
  const now = opts.nowISO ? Date.parse(opts.nowISO) : Date.now();

  const codes = getAllBonusCodes();

  const filtered = codes.filter((c) => {
    if (c.platform !== opts.platform) return false;
    if (opts.gameSlug && c.gameSlug !== opts.gameSlug) return false;
    if (!c.isActive) return false;
    if (isExpiredByDates(c, now)) return false;
    return true;
  });

  // Tri : expiration/cycleEnd la plus proche d’abord
  filtered.sort((a, b) => {
    const aEnd = a.cycleEndISO ?? a.expiresAtISO ?? null;
    const bEnd = b.cycleEndISO ?? b.expiresAtISO ?? null;
    const da = toDateValue(aEnd);
    const db = toDateValue(bEnd);
    if (da !== db) return da - db;
    return a.id.localeCompare(b.id);
  });

  return filtered;
}

// Compat: utilisé par tes pages jeux PC
export function getActiveBonusCodesForGame(opts: {
  gameSlug: string;
  platform: BonusPlatform;
  nowISO?: string;
}): BonusCode[] {
  return getActiveBonusCodes({
    platform: opts.platform,
    gameSlug: opts.gameSlug,
    nowISO: opts.nowISO,
  });
}

export function mergeBonusCodes(opts: {
  auto: BonusCode[];
  local?: Array<{
    id: string;
    title: string;
    description: string;
    method: "code" | "event" | "bundle" | "gift-card";
    code?: string;
    expiresAtISO?: string;
    sourceLabel: string;
  }>;
}): Array<{
  id: string;
  title: string;
  description: string;
  method: "code" | "event" | "bundle" | "gift-card";
  code?: string;
  expiresAtISO?: string;
  sourceLabel: string;
}> {
  const map = new Map<
    string,
    {
      id: string;
      title: string;
      description: string;
      method: "code" | "event" | "bundle" | "gift-card";
      code?: string;
      expiresAtISO?: string;
      sourceLabel: string;
    }
  >();

  for (const a of opts.auto) {
    map.set(a.id, {
      id: a.id,
      title: a.title,
      description: a.description,
      method: a.method,
      code: a.code ?? undefined,
      expiresAtISO: (a.cycleEndISO ?? a.expiresAtISO ?? undefined) || undefined,
      sourceLabel: a.sourceLabel,
    });
  }

  for (const l of opts.local ?? []) {
    if (!map.has(l.id)) map.set(l.id, { ...l });
  }

  return Array.from(map.values());
}
