// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllDeals } from "@/lib/deals";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://prixmalin.ca";

  const staticPages = [
    "",
    "/deals",
    "/codes-bonus",

    // Guides principaux
    "/abonnements-gaming",
    "/playstation-plus-prix-canada",
    "/xbox-game-pass-prix-canada",
    "/nintendo-switch-online-prix-canada",
    "/carte-psn-canada",

    // Pages pas cher
    "/playstation-plus-pas-cher-canada",
    "/xbox-game-pass-pas-cher-canada",
    "/nintendo-switch-online-pas-cher-canada",
    "/abonnement-gaming-pas-cher",
  ];

  const deals = getAllDeals();

  const dealPages = deals.map((deal) => ({
    url: `${baseUrl}/deals/${deal.slug}`,
    lastModified: new Date(),
  }));

  const staticUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...dealPages];
}
