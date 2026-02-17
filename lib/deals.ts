import raw from "@/data/gaming-codes.json";

/**
 * PrixMalin Web - Data layer
 * - Le JSON est un objet (pas un tableau)
 * - La liste principale actuelle est `subscriptions`
 * - On normalise les deals pour que le reste du code soit clean
 */

export type Retailer = {
  name: string;
  affiliateLink: string;
  stock?: boolean;
};

export type Deal = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  platform?: string;

  // prix
  regularPrice: number;
  dealPrice: number;
  discount: number; // %
  savings: number;

  // optionnels
  duration?: string;
  expires?: string | null;

  retailers: Retailer[];

  // tags éventuels
  tags?: string[];
};

type RawSubscription = {
  id: string;
  slug?: string;
  name: string;
  description?: string;
  category: string;
  platform?: string;
  duration?: string;

  regularPrice: number;
  dealPrice: number;
  discount: number;
  savings: number;

  expires?: string | null;

  // selon tes données, ça peut s'appeler retailers / merchant / etc.
  retailers?: Array<{
    name?: string;
    affiliateLink?: string;
    stock?: boolean;
  }>;

  // fallback possible si un seul retailer (au cas où)
  retailerName?: string;
  affiliateLink?: string;
  stock?: boolean;

  tags?: string[];
};

type RawData = {
  subscriptions?: RawSubscription[];
  // autres clés possibles : featured_deals, metadata, etc.
  [k: string]: unknown;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toRetailers(s: RawSubscription): Retailer[] {
  if (Array.isArray(s.retailers) && s.retailers.length > 0) {
    const list = s.retailers
      .map((r) => ({
        name: (r.name ?? "").trim(),
        affiliateLink: (r.affiliateLink ?? "").trim(),
        stock: r.stock,
      }))
      .filter((r) => r.name.length > 0 && r.affiliateLink.length > 0);

    if (list.length > 0) return list;
  }

  // fallback single retailer fields
  const name = (s.retailerName ?? "").trim();
  const affiliateLink = (s.affiliateLink ?? "").trim();
  if (name && affiliateLink) {
    return [{ name, affiliateLink, stock: s.stock }];
  }

  // dernier fallback pour éviter crash UI : retailer générique (pas idéal, mais safe)
  return [{ name: "Vendeur", affiliateLink: "#", stock: undefined }];
}

function normalizeSubscription(s: RawSubscription): Deal | null {
  // champs requis
  if (!s?.id || !s?.name || !s?.category) return null;
  if (typeof s.regularPrice !== "number") return null;
  if (typeof s.dealPrice !== "number") return null;
  if (typeof s.discount !== "number") return null;
  if (typeof s.savings !== "number") return null;

  const slug = (s.slug && s.slug.trim().length > 0) ? s.slug.trim() : slugify(s.name);

  return {
    id: String(s.id),
    slug,
    name: String(s.name),
    description: String(s.description ?? ""),
    category: String(s.category),
    platform: s.platform,
    duration: s.duration,

    regularPrice: s.regularPrice,
    dealPrice: s.dealPrice,
    discount: s.discount,
    savings: s.savings,

    expires: s.expires ?? null,

    retailers: toRetailers(s),
    tags: s.tags,
  };
}

// --- cache en mémoire (server-side) ---
const DATA = raw as unknown as RawData;

const ALL_DEALS: Deal[] = Array.isArray(DATA.subscriptions)
  ? DATA.subscriptions
      .map((s) => normalizeSubscription(s))
      .filter((d): d is Deal => Boolean(d))
  : [];

// --- API utilisée par tes pages ---
export function getAllDeals(): Deal[] {
  return ALL_DEALS;
}

export function getAllDealSlugs(): string[] {
  return ALL_DEALS.map((d) => d.slug);
}

export function getDealBySlug(slug: string): Deal | null {
  const s = (slug ?? "").trim();
  if (!s) return null;
  return ALL_DEALS.find((d) => d.slug === s) ?? null;
}

export function formatPriceCad(value: number): string {
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
  }).format(value);
}

/**
 * expires: string (format libre)
 * MVP: on considère "bientôt" si c'est une date ISO/parseable dans <= 48h.
 * Si le parse échoue, on retourne false (ne pas bloquer l’affichage).
 */
export function isExpiringSoon(expires?: string | null): boolean {
  if (!expires) return false;
  const t = Date.parse(expires);
  if (Number.isNaN(t)) return false;
  const diff = t - Date.now();
  return diff > 0 && diff <= 48 * 60 * 60 * 1000;
}
