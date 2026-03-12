// app/metadata.ts
import type { Metadata } from "next";

export const siteUrl = "https://prixmalin.ca";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),

alternates: {
    canonical: siteUrl,
    languages: {
      "fr-CA": `${siteUrl}/fr`,
      "en-CA": `${siteUrl}/en`,
      "es-ES": `${siteUrl}/es`,
      "ar-SA": `${siteUrl}/ar`,
      "zh-CN": `${siteUrl}/zh`,
      "x-default": `${siteUrl}/fr`, // Ta langue principale par défaut
    },
  },

  title: {
    default: "PrixMalin | Ta sélection de deals Gaming & Tech au Canada",
    template: "%s | PrixMalin",
  },

  description:
    "Plateforme canadienne d’affiliation gaming : deals et codes. Prix affichés seulement si certains.",

  openGraph: {
    type: "website",
    siteName: "PrixMalin",
    url: siteUrl,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PrixMalin — Ta sélection de deals au Canada",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PrixMalin | Ta sélection de deals au Canada",
    description: "Les meilleures aubaines gaming et tech dénichées pour toi.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
