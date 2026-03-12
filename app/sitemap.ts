import { MetadataRoute } from "next";
import dealsData from "@/data/deals.json";
import productsData from "@/data/products.json";
import intentPages from "@/data/intent-pages.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://prixmalin.ca";

type DealsJson = { updatedAt?: string; items?: Array<{ slug: string }> };
type ProductItem = { slug: string };
type IntentPageItem = { slug: string };

function safeDateFromYYYYMMDD(input?: string): Date {
  if (!input) return new Date();
  const d = new Date(`${input}T00:00:00.000Z`);
  return Number.isFinite(d.getTime()) ? d : new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const locales = ["", "en", "es", "ar", "zh"];

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/gaming`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/codes-bonus`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/codes-bonus/pc`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/codes-bonus/xbox`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/codes-bonus/playstation`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/codes-bonus/playstation/genshin-impact`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/codes-bonus/playstation/call-of-duty`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/codes-bonus/playstation/warframe`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/codes-bonus/playstation/dead-by-daylight`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/codes-bonus/playstation/fortnite`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/codes-bonus/playstation/roblox`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/codes-bonus/nintendo`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/codes-bonus/pc/league-of-legends`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/codes-bonus/pc/fortnite`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/codes-bonus/pc/world-of-tanks`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/codes-bonus/pc/valorant`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/codes-bonus/pc/roblox`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/codes-bonus/pc/call-of-duty-warzone`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/applications`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/applications/prixmalin`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/deals`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/produits`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE_URL}/codes`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
  ];

  const dealsRoot = (dealsData as unknown) as DealsJson;
  const dealPages: MetadataRoute.Sitemap = (dealsRoot.items ?? []).map((d) => ({
    url: `${SITE_URL}/deals/${String(d?.slug ?? "").trim()}`,
    lastModified: safeDateFromYYYYMMDD(dealsRoot.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = (productsData as unknown as ProductItem[]).map((p) => ({
    url: `${SITE_URL}/produit/${String(p?.slug ?? "").trim()}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const intentPagesSitemap: MetadataRoute.Sitemap = (intentPages as unknown as IntentPageItem[]).map((p) => ({
    url: `${SITE_URL}/i/${String(p?.slug ?? "").trim()}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const allPages = [...staticPages, ...dealPages, ...productPages, ...intentPagesSitemap];

  return locales.flatMap((locale) => 
    allPages.map((page) => ({
      ...page,
      url: locale ? page.url.replace(SITE_URL, `${SITE_URL}/${locale}`) : page.url,
    }))
  );
}