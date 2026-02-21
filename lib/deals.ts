// lib/deals.ts
import raw from "@/data/gaming-codes.json";

export type Deal = {
  slug: string;
  title: string;
  description: string;
  price?: number;
  currency?: string;
  image: string;
  affiliateUrl: string;
  platform: string;
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

type Retailer = {
  name?: string;
  stock?: boolean;
  affiliateLink?: string;
  type?: string;
};

function pickAffiliateUrl(item: AnyRecord): string {
  // 1) champs directs éventuels
  const direct =
    toStringSafe(item.affiliateUrl) ||
    toStringSafe(item.affiliateLink) ||
    toStringSafe(item.url) ||
    toStringSafe(item.link);

  if (direct) return direct;

  // 2) retailers[].affiliateLink (ton format actuel)
  const retailersRaw = item.retailers;
  if (Array.isArray(retailersRaw)) {
    const retailers: Retailer[] = retailersRaw.filter(isRecord) as Retailer[];

    // priorité: en stock + lien
    const inStock = retailers.find(
      (r) => r?.stock === true && typeof r?.affiliateLink === "string" && r.affiliateLink.length > 0
    );
    if (inStock?.affiliateLink) return inStock.affiliateLink;

    // sinon: premier lien dispo
    const first = retailers.find(
      (r) => typeof r?.affiliateLink === "string" && r.affiliateLink.length > 0
    );
    if (first?.affiliateLink) return first.affiliateLink;
  }

  return "";
}

function pickPrice(item: AnyRecord): number | undefined {
  // ton JSON: dealPrice / regularPrice
  const dealPrice = toNumberSafe(item.dealPrice);
  if (typeof dealPrice === "number") return dealPrice;

  const price =
    toNumberSafe(item.price) ??
    toNumberSafe(item.salePrice) ??
    toNumberSafe(item.currentPrice) ??
    toNumberSafe(item.regularPrice);

  return price;
}

function pickImage(item: AnyRecord): string {
  const img =
    toStringSafe(item.image) ||
    toStringSafe(item.imageUrl) ||
    toStringSafe(item.thumbnail);

  if (img) return img;

  // Placeholder unique pour MVP
  return "/images/placeholder-deal.jpg";
}

function normalizeItem(item: unknown, fallbackIndex: number, defaultCurrency: string): Deal | null {
  if (!isRecord(item)) return null;

  const title =
    toStringSafe(item.name) ||
    toStringSafe(item.title) ||
    toStringSafe(item.productName) ||
    `Deal ${fallbackIndex + 1}`;

  const platform =
    toStringSafe(item.platform) ||
    toStringSafe(item.brand) ||
    toStringSafe(item.store) ||
    "Gaming";

  const description =
    toStringSafe(item.description) ||
    toStringSafe(item.shortDescription) ||
    toStringSafe(item.summary) ||
    `${title} (${platform})`;

  const affiliateUrl = pickAffiliateUrl(item);
  if (!affiliateUrl) return null; // MVP: pas de lien => pas de deal

  const price = pickPrice(item);

  const currency = toStringSafe(item.currency) || defaultCurrency || "CAD";

  // slug: priorité au champ id (plus stable), sinon slug/title
  const slug =
    toStringSafe(item.id) ||
    toStringSafe(item.slug) ||
    slugify(title);

  const image = pickImage(item);

  return {
    slug,
    title,
    description,
    price,
    currency,
    image,
    affiliateUrl,
    platform,
  };
}

export function getAllDeals(): Deal[] {
  if (!isRecord(raw)) return [];

  const metadata: Record<string, unknown> = isRecord(raw["metadata"])
    ? (raw["metadata"] as Record<string, unknown>)
    : {};

  const defaultCurrency = toStringSafe(metadata["currency"], "CAD");

  const sections = [
    "subscriptions",
    "giftCards",
    "virtualCurrency",
    "games",
    "hardware",
  ] as const;

  const flat: unknown[] = [];

  type RawAny = Record<string, unknown>;

  for (const key of sections) {
    const v = (raw as RawAny)[key];
    if (Array.isArray(v)) flat.push(...v);
  }

  return flat
    .map((it, idx) => normalizeItem(it, idx, defaultCurrency))
    .filter((x): x is Deal => Boolean(x));
}

export function getDealBySlug(slug: string): Deal | undefined {
  return getAllDeals().find((deal) => deal.slug === slug);
}
