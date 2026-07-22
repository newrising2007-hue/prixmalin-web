import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { getLocale } from "next-intl/server";
import { getApp, appPath, LOCALES, type Lang } from "@/lib/appRelease";

import { AppHero } from "@/components/apps/AppHero";
import { AppSafety } from "@/components/apps/AppSafety";
import { AppSchema } from "@/components/apps/AppSchema";

const app = getApp("machshop");

const ogTitle = "MachShop — L’outil de référence du machiniste";
const ogDesc =
  "Six modules de référence pour l’atelier, entièrement hors-ligne. Disponible sur Google Play.";

export const metadata: Metadata = {
  title: "MachShop — Application Android pour machinistes",
  description:
    "MachShop : mèches et tarauds, filetage, trigonométrie, bolt pattern, vitesses et avances, métallurgie. Outil de référence hors-ligne pour machinistes. Essai 10 jours.",
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

export default async function MachShopAppPage() {
  const locale = await getLocale();
  const lang = (LOCALES as readonly string[]).includes(locale)
    ? (locale as Lang)
    : "en";
  return (
    <main>
      <AppSchema app={app} lang={lang} />
      <AppHero app={app} lang={lang} />
      <AppSafety app={app} lang={lang} />
    </main>
  );
}
