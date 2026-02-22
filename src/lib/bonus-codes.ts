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
  code: string | null;
  sourceLabel: string;
  isActive: boolean;
  expiresAtISO: string | null;
};

function normalizeCode(input: unknown): BonusCode | null {
  if (!input || typeof input !== "object") return null;
  const c = input as Partial<BonusCode>;

  if (
    !c.id ||
    !c.gameSlug ||
    !c.platform ||
    !c.title ||
    !c.description ||
    !c.method ||
    !c.sourceLabel ||
    typeof c.isActive !== "boolean"
  ) {
    return null;
  }

  return {
    id: String(c.id),
    gameSlug: String(c.gameSlug),
    platform: c.platform,
    title: String(c.title),
    description: String(c.description),
    method: c.method,
    code: c.code ?? null,
    sourceLabel: String(c.sourceLabel),
    isActive: Boolean(c.isActive),
    expiresAtISO: c.expiresAtISO ?? null,
  };
}

function toDateValue(iso: string | null): number {
  if (!iso) return Number.POSITIVE_INFINITY;
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : Number.POSITIVE_INFINITY;
}

/**
 * Retourne les bonus pour un jeu + plateforme, filtrés isActive,
 * triés par expiration la plus proche (si existe), puis fallback stable.
 */
export function getActiveBonusCodesForGame(opts: {
  gameSlug: string;
  platform: BonusPlatform;
  nowISO?: string;
}): BonusCode[] {
  const now = opts.nowISO ? Date.parse(opts.nowISO) : Date.now();

  const codes: BonusCode[] = (Array.isArray(rawCodes) ? rawCodes : [])
    .map(normalizeCode)
    .filter((x): x is BonusCode => Boolean(x));

  const filtered = codes.filter((c) => {
    if (c.gameSlug !== opts.gameSlug) return false;
    if (c.platform !== opts.platform) return false;
    if (!c.isActive) return false;

    // si expiresAtISO est dans le passé, on le cache automatiquement
    if (c.expiresAtISO) {
      const exp = Date.parse(c.expiresAtISO);
      if (Number.isFinite(exp) && exp < now) return false;
    }

    return true;
  });

  // Tri : expiration proche d'abord (les nulls à la fin), puis id
  filtered.sort((a, b) => {
    const da = toDateValue(a.expiresAtISO);
    const db = toDateValue(b.expiresAtISO);
    if (da !== db) return da - db;
    return a.id.localeCompare(b.id);
  });

  return filtered;
}

/**
 * Fusionne les bonus auto (JSON) + bonus locaux éventuels (fallback),
 * déduplique par id.
 */
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
      expiresAtISO: a.expiresAtISO ?? undefined,
      sourceLabel: a.sourceLabel,
    });
  }

  for (const l of opts.local ?? []) {
    if (!map.has(l.id)) {
      map.set(l.id, { ...l });
    }
  }

  return Array.from(map.values());
}
