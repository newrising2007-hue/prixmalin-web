import affiliateDealsData from "@/data/affiliate-deals.json";

export type AffiliateAvailability = "InStock" | "OutOfStock" | "Unknown";

export type AffiliateDeal = {
  id: string;
  title: string;
  price?: number;
  currency?: string;
  platform?: string;
  image?: string;
  affiliateUrl: string;
  availability?: AffiliateAvailability | string;
};

function normalizePlatform(p?: string): string {
  return (p || "").trim().toLowerCase();
}

export function getAffiliateDeals(): AffiliateDeal[] {
  const raw = affiliateDealsData as unknown;
  if (!Array.isArray(raw)) return [];
  return raw.filter(Boolean) as AffiliateDeal[];
}

export function getAffiliateDealsByPlatform(platform: string): AffiliateDeal[] {
  const target = normalizePlatform(platform);
  if (!target) return getAffiliateDeals();

  return getAffiliateDeals().filter((d) => {
    const p = normalizePlatform(d.platform);
    return p === target;
  });
}

export function getAffiliateDealById(id: string): AffiliateDeal | null {
  const target = (id || "").trim();
  if (!target) return null;
  return getAffiliateDeals().find((d) => d.id === target) ?? null;
}
