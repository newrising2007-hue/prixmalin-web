"use client";

import { useState } from "react";
import Image from "next/image";
import { AppButton } from "./AppButton";
import { getAppRelease, getPrimaryDownloadUrl, PRIXMALIN } from "@/lib/appRelease";

type Copy = {
  title: string;
  subtitle: string;
  googlePlaySoon: string;
  apkTest: string;
  sizeLabel: string;
  languagesLabel: string;
  seeDeals: string;
};

const screenshots = [
  "/apps/prixmalin/screen-1.webp",
  "/apps/prixmalin/screen-2.webp",
  "/apps/prixmalin/screen-3.webp",
];

export function AppHero({ lang }: { lang: "fr" | "en" | "es" | "ar" | "zh" }) {
  const [active, setActive] = useState(0);

  const release = getAppRelease();
  const primary = getPrimaryDownloadUrl();

  const copy: Record<"fr" | "en" | "es" | "ar" | "zh", Copy> = {
    fr: {
      title: "PrixMalin — l’app pour repérer des bons plans local & web",
      subtitle: "Recherche de produits et offres au Canada. Simple, rapide, pensée mobile.",
      googlePlaySoon: "La version publique sera disponible sur Google Play très bientôt.",
      apkTest: "Télécharger l’APK (version test)",
      sizeLabel: "Taille",
      languagesLabel: "Langues",
      seeDeals: "Voir les bons plans",
    },
    en: {
      title: "PrixMalin — the app to find local & online deals",
      subtitle: "Product and deal discovery in Canada. Fast, simple, mobile-first.",
      googlePlaySoon: "The public release will be available on Google Play very soon.",
      apkTest: "Download APK (test build)",
      sizeLabel: "Size",
      languagesLabel: "Languages",
      seeDeals: "Browse deals",
    },
    es: {
      title: "PrixMalin — la app para encontrar ofertas locales y en linea",
      subtitle: "Descubre productos y ofertas en Canada. Rapido, simple, pensado para movil.",
      googlePlaySoon: "La version publica estara disponible en Google Play muy pronto.",
      apkTest: "Descargar APK (version de prueba)",
      sizeLabel: "Tamano",
      languagesLabel: "Idiomas",
      seeDeals: "Ver ofertas",
    },
    ar: {
      title: "PrixMalin — التطبيق للعثور على افضل العروض",
      subtitle: "اكتشف المنتجات والعروض في كندا. سريع وبسيط.",
      googlePlaySoon: "سيتوفر الاصدار العام على Google Play قريبا.",
      apkTest: "تنزيل APK (اصدار تجريبي)",
      sizeLabel: "الحجم",
      languagesLabel: "اللغات",
      seeDeals: "تصفح العروض",
    },
    zh: {
      title: "PrixMalin — 发现本地和网络优惠的应用",
      subtitle: "在加拿大发现产品和优惠。快速、简单、移动优先。",
      googlePlaySoon: "公开版本即将在 Google Play 上发布。",
      apkTest: "下载 APK（测试版）",
      sizeLabel: "大小",
      languagesLabel: "语言",
      seeDeals: "浏览优惠",
    },
  };

  const c = copy[lang] ?? copy.en;

  return (
    <section className="mx-auto max-w-5xl px-4 pt-10 pb-6">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        
        {/* LEFT SIDE */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/apps/prixmalin/logo-512.webp"
              alt="PrixMalin logo"
              width={56}
              height={56}
              className="rounded-xl"
              priority
            />
            <span className="text-sm font-semibold text-black/60">
              Android App
            </span>
          </div>

          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold">
            Android • {release === "play" ? "Google Play" : release === "apk" ? "APK" : "Soon"}
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            {c.title}
          </h1>

          <p className="mt-3 text-base text-black/70">{c.subtitle}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            {release === "play" && primary ? (
              <AppButton href={primary} external ariaLabel="Google Play">
                Google Play
              </AppButton>
            ) : (
              <AppButton href="#" ariaLabel="Coming soon" variant="primary">
                {lang === "fr" ? "Bientôt" : "Soon"}
              </AppButton>
            )}

            {PRIXMALIN.apkUrl ? (
              <AppButton
                href={PRIXMALIN.apkUrl}
                external
                variant="secondary"
                ariaLabel="Download APK"
              >
                {c.apkTest}
              </AppButton>
            ) : null}

            <AppButton href={PRIXMALIN.dealsUrl} variant="ghost">
              {c.seeDeals}
            </AppButton>
          </div>

          {release !== "play" && <p className="mt-3 text-sm text-black/60">{c.googlePlaySoon}</p>}

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-black/70">
            <span className="rounded-lg border border-black/10 bg-white px-3 py-2">
              {c.sizeLabel}: <strong>{PRIXMALIN.sizeMb} MB</strong>
            </span>
            <span className="rounded-lg border border-black/10 bg-white px-3 py-2">
              {c.languagesLabel}: <strong>FR, EN, ES, 中文, العربية</strong>
            </span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="rounded-3xl border border-black/10 bg-gradient-to-b from-black/5 to-black/0 p-4">
          <div className="aspect-[9/19] w-full overflow-hidden rounded-2xl border border-black/10 bg-white">
            <Image
              src={screenshots[active]}
              alt="PrixMalin App Screenshot"
              width={720}
              height={1520}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {screenshots.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                className={`h-2 w-2 rounded-full ${
                  active === i ? "bg-black" : "bg-black/20"
                }`}
                aria-label={`Screenshot ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
