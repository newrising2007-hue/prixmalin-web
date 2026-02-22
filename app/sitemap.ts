import { MetadataRoute } from "next"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://prixmalin.ca"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/gaming`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/codes-bonus`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/codes-bonus/pc`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
{
  url: `${SITE_URL}/codes-bonus/xbox`,
  lastModified: now,
  changeFrequency: "daily",
  priority: 0.8,
},
{
  url: `${SITE_URL}/codes-bonus/playstation`,
  lastModified: now,
  changeFrequency: "daily",
  priority: 0.8,
},
{
  url: `${SITE_URL}/codes-bonus/nintendo`,
  lastModified: now,
  changeFrequency: "daily",
  priority: 0.8,
},
  ]
}
