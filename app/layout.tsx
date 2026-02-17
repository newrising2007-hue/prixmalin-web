import type { Metadata } from "next";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),

title: {
    default: "PrixMalin - Codes Gaming Pas Cher au Canada",
    template: "%s | PrixMalin",
  },
description:
"Trouvez les meilleurs codes gaming pas chers au Canada. Cartes PSN, Xbox, Nintendo eShop et plus. Liens affiliés fiables et vérifiés.",
  keywords: [
    "code gaming pas cher",
    "PSN Canada",
    "Xbox Live code",
    "Nintendo eShop code",
    "carte cadeau gaming",
    "prix gaming Canada",
  ],
    authors: [{ name: "PrixMalin" }],
      creator: "PrixMalin",
        publisher: "PrixMalin",
          robots: {
  index: true,
    follow: true,
  },
openGraph: {
  type: "website",
    url: getSiteUrl(),
      title: "PrixMalin - Codes Gaming Pas Cher au Canada",
        description:
  "Découvrez les meilleures offres sur les codes gaming au Canada.",
    siteName: "PrixMalin",
      locale: "fr_CA",
  },
twitter: {
  card: "summary_large_image",
    title: "PrixMalin - Codes Gaming Pas Cher",
      description:
  "Les meilleurs deals gaming affiliés au Canada.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
