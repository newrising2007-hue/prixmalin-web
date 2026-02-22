import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

import { AppHero } from "@/components/apps/AppHero";
import { AppFeatures } from "@/components/apps/AppFeatures";
import { AppSteps } from "@/components/apps/AppSteps";
import { AppSafety } from "@/components/apps/AppSafety";
import { AppFAQ } from "@/components/apps/AppFAQ";
import { AppSchema } from "@/components/apps/AppSchema";

export const metadata: Metadata = {
  title: "PrixMalin — Android App",
  description:
    "PrixMalin is a product search tool for local and online deals in Canada. Google Play release coming soon.",
  alternates: {
    canonical: absoluteUrl("/en/apps/prixmalin"),
    languages: {
      fr: absoluteUrl("/applications/prixmalin"),
      en: absoluteUrl("/en/apps/prixmalin"),
    },
  },
  openGraph: {
    title: "PrixMalin — Android App",
    description:
      "A product search tool for local and online deals in Canada. Google Play coming soon.",
    url: absoluteUrl("/en/apps/prixmalin"),
    type: "website",
  },
};

export default function PrixMalinAppEn() {
  return (
    <main>
      <AppSchema lang="en" />
      <AppHero lang="en" />
      <AppFeatures lang="en" />
      <AppSteps lang="en" />
      <AppSafety lang="en" />
      <AppFAQ lang="en" />
    </main>
  );
}
