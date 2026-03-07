// app/deals/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://prixmalin.ca"),
  title: {
    default: "Deals | PrixMalin",
    template: "%s | PrixMalin",
  },
  description:
    "Deals gaming et codes au Canada. Liens affiliés traçables. Prix affichés seulement si certains.",
  alternates: {
    canonical: "/deals",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
