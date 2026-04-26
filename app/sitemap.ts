import { MetadataRoute } from "next";
import dealsData from "@/data/deals.json";
import productsData from "@/data/products.json";
import intentPages from "@/data/intent-pages.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://prixmalin.ca";

type DealsJson = { updatedAt?: string; items?: Array<{ slug: string }> };
type ProductItem = { slug: string };
type IntentPageItem = { slug: string };

const LOCALES = ["", "en", "es", "ar", "zh"] as const;
const HREFLANG_MAP: Record<string, string> = {
  "":   "fr",
  "en": "en",
  "es": "es",
  "ar": "ar",
  "zh": "zh",
};

function safeDateFromYYYYMMDD(input?: string): Date {
  if (!input) return new Date();
  const d = new Date(`${input}T00:00:00.000Z`);
  return Number.isFinite(d.getTime()) ? d : new Date();
}

function urlForLocale(basePath: string, locale: string): string {
  return locale ? `${SITE_URL}/${locale}${basePath}` : `${SITE_URL}${basePath}`;
}

function buildEntry(
  basePath: string,
  lastModified: Date,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[HREFLANG_MAP[locale]] = urlForLocale(basePath, locale);
  }
  languages["x-default"] = `${SITE_URL}${basePath}`;

  return {
    url: `${SITE_URL}${basePath}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: Array<[string, MetadataRoute.Sitemap[number]["changeFrequency"], number]> = [
    ["/", "weekly", 1],
    ["/gaming", "daily", 0.9],
    ["/codes-bonus", "daily", 0.9],
    ["/codes-bonus/pc", "daily", 0.9],
    ["/codes-bonus/xbox", "daily", 0.8],
    ["/codes-bonus/playstation", "daily", 0.8],
    ["/codes-bonus/playstation/genshin-impact", "daily", 0.85],
    ["/codes-bonus/playstation/call-of-duty", "daily", 0.85],
    ["/codes-bonus/playstation/warframe", "daily", 0.85],
    ["/codes-bonus/playstation/dead-by-daylight", "daily", 0.85],
    ["/codes-bonus/playstation/fortnite", "daily", 0.85],
    ["/codes-bonus/playstation/roblox", "daily", 0.85],
    ["/codes-bonus/nintendo", "daily", 0.8],
    ["/codes-bonus/pc/league-of-legends", "daily", 0.85],
    ["/codes-bonus/pc/fortnite", "daily", 0.85],
    ["/codes-bonus/pc/world-of-tanks", "daily", 0.85],
    ["/codes-bonus/pc/valorant", "daily", 0.85],
    ["/codes-bonus/pc/roblox", "daily", 0.85],
    ["/codes-bonus/pc/call-of-duty-warzone", "daily", 0.85],
    ["/applications", "weekly", 0.6],
    ["/applications/prixmalin", "weekly", 0.8],
    ["/deals", "daily", 0.85],
    ["/produits", "weekly", 0.75],
    ["/codes", "daily", 0.85],
  ];

  const staticEntries = staticPaths.map(([path, freq, pri]) =>
    buildEntry(path, now, freq, pri)
  );

  const dealsRoot = (dealsData as unknown) as DealsJson;
  const dealEntries: MetadataRoute.Sitemap = (dealsRoot.items ?? []).map((d) =>
    buildEntry(
      `/deals/${String(d?.slug ?? "").trim()}`,
      safeDateFromYYYYMMDD(dealsRoot.updatedAt),
      "weekly",
      0.8
    )
  );

  const productEntries: MetadataRoute.Sitemap = (productsData as unknown as ProductItem[]).map((p) =>
    buildEntry(
      `/produit/${String(p?.slug ?? "").trim()}`,
      now,
      "monthly",
      0.7
    )
  );

  const intentEntries: MetadataRoute.Sitemap = (intentPages as unknown as IntentPageItem[]).map((p) =>
    buildEntry(
      `/i/${String(p?.slug ?? "").trim()}`,
      now,
      "monthly",
      0.75
    )
  );

  return [...staticEntries, ...dealEntries, ...productEntries, ...intentEntries];
}
