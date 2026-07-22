import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { getLocale } from "next-intl/server";
import { getApp, appPath, LOCALES, type Lang } from "@/lib/appRelease";

import { AppHero } from "@/components/apps/AppHero";
import { AppFeatures } from "@/components/apps/AppFeatures";
import { AppSteps } from "@/components/apps/AppSteps";
import { AppSafety } from "@/components/apps/AppSafety";
import { AppFAQ } from "@/components/apps/AppFAQ";
import { AppSchema } from "@/components/apps/AppSchema";

const app = getApp("prixmalin");

const ogTitle = "PrixMalin — Application Android";
const ogDesc =
  "Outil de recherche de produits local et web au Canada. Gratuit sur Google Play.";

export const metadata: Metadata = {
  title: "PrixMalin — Application Android",
  description:
    "PrixMalin est un outil de recherche de produits local et web au Canada. Gratuit, disponible sur Google Play.",
  alternates: {
    canonical: absoluteUrl(appPath(app, "fr")),
    languages: Object.fromEntries(
      LOCALES.map((l) => [l, absoluteUrl(appPath(app, l))])
    ),
  },
  openGraph: {
    title: ogTitle,
    description: ogDesc,
    url: absoluteUrl(appPath(app, "fr")),
    type: "website",
    images: [absoluteUrl(app.logo)],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDesc,
    images: [absoluteUrl(app.logo)],
  },
};

export default async function PrixMalinAppPage() {
  const locale = await getLocale();
  const lang = (LOCALES as readonly string[]).includes(locale)
    ? (locale as Lang)
    : "en";
  return (
    <main>
      <AppSchema app={app} lang={lang} />
      <AppHero app={app} lang={lang} />
      <AppFeatures lang={lang} />
      <AppSteps lang={lang} />
      <AppSafety app={app} lang={lang} />
      <AppFAQ lang={lang} />
    </main>
  );
}
