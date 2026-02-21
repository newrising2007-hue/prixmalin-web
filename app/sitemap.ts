import { MetadataRoute } from "next";
import data from "@/data/gaming-codes.v2.json";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://prixmalin.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${SITE_URL}/codes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${SITE_URL}/cartes-cadeaux`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${SITE_URL}/abonnements`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    }
  ];

  const platformRoutes: MetadataRoute.Sitemap = (data.platforms as any[]).map(
    (platform) => ({
      url: `${SITE_URL}/codes/${platform.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    })
  );

  return [...staticRoutes, ...platformRoutes];
}
