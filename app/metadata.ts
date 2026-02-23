// app/metadata.ts
import type { Metadata } from "next";

export const siteUrl = "https://prixmalin.ca";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),

  alternates: {
    canonical: siteUrl,
    languages: {
      "fr-CA": siteUrl,
      "x-default": siteUrl,
    },
  },

  title: {
    default: "PrixMalin | Deals gaming au Canada",
    template: "%s | PrixMalin",
  },

  description:
    "Plateforme canadienne d’affiliation gaming : deals et codes. Prix affichés seulement si certains.",

  openGraph: {
    type: "website",
    siteName: "PrixMalin",
    url: siteUrl,
  },

  twitter: {
    card: "summary_large_image",
  },

  robots: {
    index: true,
    follow: true,
  },
};
