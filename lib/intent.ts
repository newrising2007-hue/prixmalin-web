import intentPages from "@/data/intent-pages.json";
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
  category?: string;
};

function asNumber(v: unknown): number | undefined {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v.replace(",", "."));
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

const allDeals = Array.isArray((dealsData as any).items)
  ? (dealsData as any).items
  : [];

export function getAllIntentPages(): IntentPage[] {
  return intentPages as IntentPage[];
}

export function getIntentPageBySlug(slug: string): IntentPage | undefined {
  return getAllIntentPages().find((p) => p.slug === slug);
}

export function getDealBySlug(slug: string): Deal | undefined {
  const raw = allDeals.find((d: any) => String(d?.slug ?? "") === slug);
  if (!raw) return undefined;

  return {
    slug: String(raw.slug),
    title: String(raw.title ?? slug),
    affiliateUrl: String(raw.affiliateUrl ?? ""),
    price: asNumber(raw.price),
    currency: raw.currency ?? "CAD",
    vendor: raw.platform ?? undefined,
    image: raw.image ?? undefined,
    category: raw.type ?? raw.platform,
  };
}

export function getIntentDeals(page: IntentPage): { primary?: Deal; secondary: Deal[] } {
  const primary = getDealBySlug(page.primaryDealSlug);
  const secondary = (page.secondaryDealSlugs ?? [])
    .map((s) => getDealBySlug(s))
    .filter(Boolean) as Deal[];
  return { primary, secondary };
}
