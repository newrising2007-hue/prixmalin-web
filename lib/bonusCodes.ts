import raw from "@/data/bonus-codes.json";

export type BonusCode = {
  code: string;
  rewards: string;
  expires: string | null;
};

export type BonusGame = {
  game: string;
  slug: string;
  howTo: string[];
  codes: BonusCode[];
};

type RawShape = {
  updatedAt?: string;
  items?: BonusGame[];
};

const DATA = raw as unknown as RawShape;

export function getBonusUpdatedAt(): string | null {
  return typeof DATA.updatedAt === "string" ? DATA.updatedAt : null;
}

export function getAllBonusGames(): BonusGame[] {
  const items = Array.isArray(DATA.items) ? DATA.items : [];
  return items;
}

export function getBonusGameBySlug(slug: string): BonusGame | null {
  return getAllBonusGames().find((g) => g.slug === slug) ?? null;
}

export function getAllBonusGameSlugs(): string[] {
  return getAllBonusGames().map((g) => g.slug);
}
