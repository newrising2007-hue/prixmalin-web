import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

type GamingCodesData = {
  metadata?: {
    lastUpdate?: string;
  };
  subscriptions?: Array<{
    id: string;
    expires?: string;
    featured?: boolean;
  }>;
};

function safeDate(input?: string): Date | undefined {
  if (!input) return undefined;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return undefined;
  return d;
}

async function loadGamingCodes(): Promise<GamingCodesData | null> {
  try {
    const mod = await import("@/data/gaming-codes.json");
    const data = (mod.default ?? mod) as unknown;

    if (data && typeof data === "object") return data as GamingCodesData;
    return null;
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const buildDate = new Date();

  const data = await loadGamingCodes();
  const globalLastMod =
    safeDate(data?.metadata?.lastUpdate) ?? buildDate;

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: globalLastMod,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/deals`,
      lastModified: globalLastMod,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/codes-bonus`,
      lastModified: globalLastMod,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const subscriptions = Array.isArray(data?.subscriptions)
    ? data!.subscriptions!
    : [];

  const dealEntries: MetadataRoute.Sitemap = subscriptions
    .filter((s) => typeof s?.id === "string" && s.id.trim().length > 0)
    .map((s) => {
      // lastmod: on prend expires si valide (optionnel), sinon metadata.lastUpdate
      const lm = safeDate(s.expires) ?? globalLastMod;

      return {
        url: `${baseUrl}/deals/${s.id}`,
        lastModified: lm,
        changeFrequency: "weekly",
        priority: s.featured ? 0.85 : 0.8,
      };
    });

  return [...staticEntries, ...dealEntries];
}
