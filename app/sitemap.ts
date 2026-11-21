import { MetadataRoute } from "next";
import productsData from "@/data/products.json";
import intentPages from "@/data/intent-pages.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://prixmalin.ca";

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
    ["/applications", "weekly", 0.6],
    ["/applications/prixmalin", "weekly", 0.8],
    ["/applications/machshop", "weekly", 0.8],
    ["/deals", "daily", 0.85],
    ["/produits", "weekly", 0.75],
  ];

  const staticEntries = staticPaths.map(([path, freq, pri]) =>
    buildEntry(path, now, freq, pri)
  );

  // 20 nov. 2026 — plus d'entrées /deals/<slug> : la route était morte (gaming-codes.json vide).
  // Les vraies pages sont /i/<slug> (intentEntries) ; les vieilles adresses redirigent (next.config.ts).

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

  return [...staticEntries, ...productEntries, ...intentEntries];
}
