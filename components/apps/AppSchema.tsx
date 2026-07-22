import Script from "next/script";
import { absoluteUrl, SITE } from "@/lib/site";
import { getFAQ } from "./AppFAQ";
import { appPath, type AppDef, type AppId, type Lang } from "@/lib/appRelease";

const DESC: Record<AppId, Record<Lang, string>> = {
  prixmalin: {
    fr: "Outil de recherche de produits local et web au Canada.",
    en: "A product search tool for local and online deals in Canada.",
    es: "Herramienta de búsqueda de productos locales y en línea en Canadá.",
    ar: "أداة للبحث عن المنتجات والعروض المحلية وعبر الإنترنت في كندا.",
    zh: "在加拿大搜索本地和网络产品优惠的工具。",
  },
  machshop: {
    fr: "Outil de référence du machiniste : mèches et tarauds, filetage, trigonométrie, bolt pattern, vitesses et avances, métallurgie. Fonctionne hors-ligne.",
    en: "The machinist's reference tool: tap and drill charts, threading, trigonometry, bolt patterns, feed and speed, metallurgy. Works offline.",
    es: "Herramienta de referencia del maquinista: machuelos y brocas, roscado, trigonometría, patrón de pernos, avance y velocidad, metalurgia. Funciona sin conexión.",
    ar: "الأداة المرجعية للمشغّل الآلي: الحنفيات والمثاقب، القلاووظ، حساب المثلثات، أنماط البراغي، السرعة والتغذية، علم المعادن. تعمل دون اتصال.",
    zh: "机械师的参考工具：丝锥与钻头、螺纹、三角函数、螺栓分度、进给与转速、金属学。可离线使用。",
  },
};

export function AppSchema({ app, lang }: { app: AppDef; lang: Lang }) {
  const pageUrl = absoluteUrl(appPath(app, lang));

  const downloadUrl =
    app.release === "play" && app.playUrl
      ? app.playUrl
      : app.apkUrl || undefined;

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: app.name,
    description: DESC[app.id][lang] ?? DESC[app.id].en,
    operatingSystem: "Android",
    applicationCategory: app.schemaCategory,
    inLanguage: [...app.languages],
    isAccessibleForFree: app.price === 0,
    offers: {
      "@type": "Offer",
      price: app.price.toFixed(2),
      priceCurrency: app.currency,
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

  const faqJsonLd = app.hasFaq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: getFAQ(lang).map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
      }
    : null;

  return (
    <>
      <Script
        id={`jsonld-app-${app.id}-${lang}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      {faqJsonLd ? (
        <Script
          id={`jsonld-faq-${app.id}-${lang}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
    </>
  );
}
