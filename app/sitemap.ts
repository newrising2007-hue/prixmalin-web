import { MetadataRoute } from "next";

import dealsData from "@/data/deals.json";
import productsData from "@/data/products.json";
import intentPages from "@/data/intent-pages.json";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://prixmalin.ca";

type DealsJson = {
  updatedAt?: string;
  items?: Array<{
    slug: string;
  }>;
};

type ProductItem = {
  slug: string;
};

type IntentPageItem = {
  slug: string;
};

function safeDateFromYYYYMMDD(input?: string): Date {
  if (!input) return new Date();
  const d = new Date(`${input}T00:00:00.000Z`);
  return Number.isFinite(d.getTime()) ? d : new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1) Pages Statiques
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

  // 2) Deals Dynamiques
  const dealsRoot = (dealsData as unknown) as DealsJson;
  const dealsLastMod = safeDateFromYYYYMMDD(dealsRoot.updatedAt);
  const dealPages: MetadataRoute.Sitemap = (dealsRoot.items ?? [])
    .map((d) => String(d?.slug ?? "").trim())
    .filter(Boolean)
    .map((slug) => ({
      url: `${SITE_URL}/deals/${slug}`,
      lastModified: dealsLastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // 3) Produits Dynamiques
  const products = (productsData as unknown) as ProductItem[];
  const productPages: MetadataRoute.Sitemap = Array.isArray(products)
    ? products
        .map((p) => String(p?.slug ?? "").trim())
        .filter(Boolean)
        .map((slug) => ({
          url: `${SITE_URL}/produit/${slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
        }))
    : [];

  // 4) Intent Pages Dynamiques
  const intents = (intentPages as unknown) as IntentPageItem[];
  const intentPagesSitemap: MetadataRoute.Sitemap = Array.isArray(intents)
    ? intents
        .map((p) => String(p?.slug ?? "").trim())
        .filter(Boolean)
        .map((slug) => ({
          url: `${SITE_URL}/i/${slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.75,
        }))
    : [];

  // Rassemblement de toutes les pages
  const allPages = [...staticPages, ...dealPages, ...productPages, ...intentPagesSitemap];

  // Génération des URLs pour les 5 langues (fr, en, es, ar, zh)
  const locales = ["", "en", "es", "ar", "zh"];

  const localizedSitemap = locales.flatMap((locale) => {
    return allPages.map((page) => ({
      ...page,
      url: locale 
        ? page.url.replace(SITE_URL, `${SITE_URL}/${locale}`) 
        : page.url,
    }));
  });

  return localizedSitemap;
}