import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { getLocale } from "next-intl/server";

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

export default async function PrixMalinAppFr() {
  const locale = await getLocale();
  const lang = locale === "fr" ? "fr" : "en";
  return (
    <main>
      <AppSchema lang={lang} />
      <AppHero lang={lang} />
      <AppFeatures lang={lang} />
      <AppSteps lang={lang} />
      <AppSafety lang={lang} />
      <AppFAQ lang={lang} />
    </main>
  );
}
