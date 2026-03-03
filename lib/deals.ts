// lib/deals.ts
import raw from "@/data/deals.json";

export type Deal = {
  slug: string;
  title: string;
  description: string;
  price?: number;
  prixBarre?: number;
  currency?: string;
  image: string;
  affiliateUrl: string;
  platform: string;
  badge?: string;
  type?: string;
  actif: boolean;
};

type AnyRecord = Record<string, unknown>;

function isRecord(v: unknown): v is AnyRecord {
  return typeof v === "object" && v !== null;
}
function toStringSafe(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}
function toNumberSafe(v: unknown): number | undefined {
  return typeof v === "number" && Number.isFinite(v) ? v : undefined;
}
function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function normalizeItem(item: unknown, fallbackIndex: number, defaultCurrency: string): Deal | null {
  if (!isRecord(item)) return null;
  if (item.actif === false) return null;

  const title = toStringSafe(item.title) || toStringSafe(item.name) || `Deal ${fallbackIndex + 1}`;
  const platform = toStringSafe(item.platform) || "Gaming";
  const description = toStringSafe(item.description) || `${title} (${platform})`;
  const affiliateUrl = toStringSafe(item.affiliateUrl) || toStringSafe(item.affiliateLink);
  if (!affiliateUrl) return null;

  const price = toNumberSafe(item.price);
  const prixBarre = toNumberSafe(item.prixBarre);
  const currency = toStringSafe(item.currency) || defaultCurrency || "CAD";
  const slug = toStringSafe(item.slug) || slugify(title);
  const image = toStringSafe(item.image) || "/images/placeholder-deal.jpg";
  const badge = toStringSafe(item.badge) || undefined;
  const type = toStringSafe(item.type) || undefined;

  return { slug, title, description, price, prixBarre, currency, image, affiliateUrl, platform, badge, type, actif: true };
}

export function getAllDeals(): Deal[] {
  if (Array.isArray(raw)) {
    return raw.map((it, idx) => normalizeItem(it, idx, "CAD")).filter((x): x is Deal => Boolean(x));
  }
  if (isRecord(raw) && Array.isArray((raw as AnyRecord).items)) {
    const defaultCurrency = toStringSafe((raw as AnyRecord).currency, "CAD");
    const items = (raw as AnyRecord).items as unknown[];
    return items.map((it, idx) => normalizeItem(it, idx, defaultCurrency)).filter((x): x is Deal => Boolean(x));
  }
  return [];
}

export function getDealBySlug(slug: string): Deal | undefined {
  return getAllDeals().find((deal) => deal.slug === slug);
}
