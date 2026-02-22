import Script from "next/script";
import { absoluteUrl, SITE } from "@/lib/site";
import { getFAQ } from "./AppFAQ";
import { getAppRelease, PRIXMALIN } from "@/lib/appRelease";

export function AppSchema({ lang }: { lang: "fr" | "en" }) {
  const release = getAppRelease();

  const pagePath =
    lang === "fr" ? "/applications/prixmalin" : "/en/apps/prixmalin";

  const pageUrl = absoluteUrl(pagePath);

  const downloadUrl =
    release === "play" && PRIXMALIN.playUrl
      ? PRIXMALIN.playUrl
      : PRIXMALIN.apkUrl || undefined;

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "PrixMalin",
    description:
      lang === "fr"
        ? "Outil de recherche de produits local et web au Canada."
        : "A product search tool for local and online deals in Canada.",
    operatingSystem: "Android",
    applicationCategory: "ShoppingApplication",
    inLanguage: ["fr", "en", "es", "zh", "ar"],
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CAD",
      url: pageUrl,
      availability: "https://schema.org/InStock",
    },
    downloadUrl,
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.defaultUrl,
    },
  };

  const faqItems = getFAQ(lang).map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: it.a,
    },
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };

  return (
    <>
      <Script
        id={`jsonld-app-${lang}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(appJsonLd),
        }}
      />

      <Script
        id={`jsonld-faq-${lang}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
    </>
  );
}
