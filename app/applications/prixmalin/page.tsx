import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

import { AppHero } from "@/components/apps/AppHero";
import { AppFeatures } from "@/components/apps/AppFeatures";
import { AppSteps } from "@/components/apps/AppSteps";
import { AppSafety } from "@/components/apps/AppSafety";
import { AppFAQ } from "@/components/apps/AppFAQ";
import { AppSchema } from "@/components/apps/AppSchema";

export const metadata: Metadata = {
  title: "PrixMalin — Application Android",
  description:
    "PrixMalin est un outil de recherche de produits local et web au Canada. Version Google Play bientôt disponible.",
  alternates: {
    canonical: absoluteUrl("/applications/prixmalin"),
    languages: {
      fr: absoluteUrl("/applications/prixmalin"),
      en: absoluteUrl("/en/apps/prixmalin"),
    },
  },
  openGraph: {
    title: "PrixMalin — Application Android",
    description:
      "Outil de recherche de produits local et web au Canada. Google Play bientôt.",
    url: absoluteUrl("/applications/prixmalin"),
    type: "website",
  },
};

export default function PrixMalinAppFr() {
  return (
    <main>
      <AppSchema lang="fr" />
      <AppHero lang="fr" />
      <AppFeatures lang="fr" />
      <AppSteps lang="fr" />
      <AppSafety lang="fr" />
      <AppFAQ lang="fr" />
    </main>
  );
}
