import intentPages from "@/data/intent-pages.json";
import gamingCodesData from "@/data/affiliate-deals.json";
import dealsData from "@/data/deals.json";

export type IntentFaqItem = { q: string; a: string };

export type IntentPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  primaryDealSlug: string;
  secondaryDealSlugs?: string[];
  faq?: IntentFaqItem[];
  keywords?: string[];
};

export type Deal = {
  slug: string;
  title: string;
  affiliateUrl: string;
  price?: number;
  currency?: string;
  vendor?: string;
  image?: string;
  updatedAt?: string;
  category?: string;
};

type AnyRecord = Record<string, any>;

function asNumber(v: unknown): number | undefined {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v.replace(",", "."));
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

function pickRetailerAffiliate(raw: AnyRecord): { url: string; vendor?: string } {
  const direct = String(raw?.affiliateUrl ?? raw?.affiliate_url ?? "").trim();
  if (direct) return { url: direct, vendor: String(raw?.vendor ?? raw?.merchant ?? raw?.store ?? "").trim() || undefined };

  const retailers = raw.retailers;
  if (!Array.isArray(retailers) || retailers.length === 0) {
    return { url: "", vendor: undefined };
  }

  const normalized = retailers
    .filter((r: AnyRecord) => r && typeof r === "object")
    .map((r: AnyRecord) => ({
      ...r,
      _name: String(r.name ?? "").toLowerCase(),
      _url: String(r.affiliateLink ?? ""),
      _stock: Boolean(r.stock),
      _type: String(r.type ?? "").toLowerCase(),
    }))
    .filter((r: AnyRecord) => r._url);

  if (normalized.length === 0) return { url: "", vendor: undefined };

  const amazon = normalized.find((r: AnyRecord) => r._stock && r._name.includes("amazon"));
  if (amazon) return { url: amazon._url, vendor: amazon._name ?? undefined };

  const onlineInStock = normalized.find(
    (r: AnyRecord) => r._stock && (r._type === "online" || r._name.includes("store"))
  );
  if (onlineInStock) return { url: onlineInStock._url, vendor: onlineInStock._name ?? undefined };

  const anyInStock = normalized.find((r: AnyRecord) => r._stock);
  if (anyInStock) return { url: anyInStock._url, vendor: anyInStock._name ?? undefined };

  return { url: normalized[0]._url, vendor: normalized[0]._name ?? undefined };
}

function flattenAllDeals(root: unknown): AnyRecord[] {
  const v = (root as any)?.default ?? root;
  if (Array.isArray(v)) return v;
  if (!v || typeof v !== "object") return [];

  const obj = v as AnyRecord;
  const buckets = ["subscriptions", "giftCards", "virtualCurrency", "games", "hardware", "featured_deals"];
  const out: AnyRecord[] = [];

  for (const b of buckets) {
    const bucketVal = obj[b];
    if (Array.isArray(bucketVal)) {
      for (const item of bucketVal) {
        if (item && typeof item === "object") out.push({ ...item, __bucket: b });
      }
      continue;
    }
    if (bucketVal && typeof bucketVal === "object") {
      for (const k of Object.keys(bucketVal)) {
        const maybeArr = bucketVal[k];
        if (Array.isArray(maybeArr)) {
          for (const item of maybeArr) {
            if (item && typeof item === "object") out.push({ ...item, __bucket: b });
          }
        }
      }
    }
  }

  if (out.length === 0) {
    for (const [k, val] of Object.entries(obj)) {
      if (Array.isArray(val)) {
        for (const item of val) {
          if (item && typeof item === "object") out.push({ ...item, __bucket: k });
        }
      }
    }
  }

  return out;
}

// Deals depuis affiliate-deals.json (ancien système)
const allAffiliatDeals = flattenAllDeals(gamingCodesData);

// Deals depuis deals.json (nouveau système)
const allMainDeals: AnyRecord[] = Array.isArray((dealsData as any).items)
  ? (dealsData as any).items
  : [];

export function getAllIntentPages(): IntentPage[] {
  return intentPages as IntentPage[];
}

export function getIntentPageBySlug(slug: string): IntentPage | undefined {
  return getAllIntentPages().find((p) => p.slug === slug);
}

export function getDealBySlug(slug: string): Deal | undefined {
  // 1) Chercher dans deals.json en priorité
  const mainDeal = allMainDeals.find((d) => String(d?.slug ?? "") === slug) as AnyRecord | undefined;
  if (mainDeal) {
    return {
      slug: String(mainDeal.slug),
      title: String(mainDeal.title ?? slug),
      affiliateUrl: String(mainDeal.affiliateUrl ?? ""),
      price: asNumber(mainDeal.price),
      currency: mainDeal.currency ?? "CAD",
      vendor: mainDeal.platform ?? undefined,
      image: mainDeal.image ?? undefined,
      category: mainDeal.type ?? mainDeal.platform,
    };
  }

  // 2) Fallback sur affiliate-deals.json
  const raw = allAffiliatDeals.find((d) => String(d?.id ?? d?.slug ?? "") === slug) as AnyRecord | undefined;
  if (!raw) return undefined;

  const { url, vendor } = pickRetailerAffiliate(raw);

  return {
    slug: String(raw.id ?? raw.slug ?? slug),
    title: String(raw.name ?? raw.title ?? raw.slug ?? slug),
    affiliateUrl: url,
    price: asNumber(raw.dealPrice ?? raw.price ?? raw.currentPrice ?? raw.amount),
    currency: raw.currency ?? "CAD",
    vendor: vendor ?? raw.vendor ?? raw.merchant ?? raw.store,
    image: raw.image ?? raw.imageUrl ?? raw.image_url,
    updatedAt: raw.updatedAt ?? raw.updated_at ?? raw.lastUpdated,
    category: raw.category ?? raw.__bucket,
  };
}

export function getIntentDeals(page: IntentPage): { primary?: Deal; secondary: Deal[] } {
  const primary = getDealBySlug(page.primaryDealSlug);
  const secondary = (page.secondaryDealSlugs ?? [])
    .map((s) => getDealBySlug(s))
    .filter(Boolean) as Deal[];
  return { primary, secondary };
}
