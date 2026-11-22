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
  actif?: boolean;
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
    actif: raw.actif !== false,
  };
}

const MAX_REPLI = 4;

/**
 * Offres d'une fiche /i/.
 * - `secondary` : seulement les deals actifs (un deal inactif n'est jamais affiché en « Autres options »).
 * - `repli` : si l'offre principale est inactive ET qu'aucune autre option n'est active, jusqu'à 4 deals
 *   actifs de la même plateforme (même type d'abord : abonnement → abonnement, carte → carte).
 *   Tout suit deals.json : un deal remis actif par NeoAgent revient au prochain déploiement.
 */
export function getIntentDeals(page: IntentPage): { primary?: Deal; secondary: Deal[]; repli: Deal[] } {
  const primary = getDealBySlug(page.primaryDealSlug);
  const secondary = (page.secondaryDealSlugs ?? [])
    .map((s) => getDealBySlug(s))
    .filter((d): d is Deal => Boolean(d) && d!.actif !== false);

  let repli: Deal[] = [];
  if (primary && primary.actif === false && secondary.length === 0 && primary.vendor) {
    const plateforme = primary.vendor.trim().toLowerCase();
    const exclus = new Set([primary.slug, ...(page.secondaryDealSlugs ?? [])]);
    const candidats = allDeals
      .map((raw: { slug?: unknown }) => getDealBySlug(String(raw?.slug ?? "")))
      .filter(
        (d: Deal | undefined): d is Deal =>
          Boolean(d) &&
          d!.actif !== false &&
          Boolean(d!.affiliateUrl) &&
          !exclus.has(d!.slug) &&
          (d!.vendor ?? "").trim().toLowerCase() === plateforme
      );
    const memeType = candidats.filter((d: Deal) => d.category === primary.category);
    const autres = candidats.filter((d: Deal) => d.category !== primary.category);
    repli = [...memeType, ...autres].slice(0, MAX_REPLI);
  }

  return { primary, secondary, repli };
}
