"use client";

import { useState } from "react";
import Image from "next/image";
import { AppButton } from "./AppButton";
import {
  getPrimaryDownloadUrl,
  languagesLabel,
  type AppDef,
  type AppId,
  type Lang,
} from "@/lib/appRelease";

type Copy = {
  title: string;
  subtitle: string;
  comingSoon: string;
  apkTest: string;
  sizeLabel: string;
  languagesLabel: string;
  cta: string;
  free: string;
  trial: string;
};

const COPY: Record<AppId, Record<Lang, Copy>> = {
  prixmalin: {
    fr: {
      title: "PrixMalin — l’app pour repérer des bons plans local & web",
      subtitle: "Recherche de produits et offres au Canada. Simple, rapide, pensée mobile.",
      comingSoon: "La version publique sera disponible sur Google Play très bientôt.",
      apkTest: "Télécharger l’APK (version test)",
      sizeLabel: "Taille", languagesLabel: "Langues", cta: "Voir les bons plans",
      free: "Gratuit", trial: "",
    },
    en: {
      title: "PrixMalin — the app to find local & online deals",
      subtitle: "Product and deal discovery in Canada. Fast, simple, mobile-first.",
      comingSoon: "The public release will be available on Google Play very soon.",
      apkTest: "Download APK (test build)",
      sizeLabel: "Size", languagesLabel: "Languages", cta: "Browse deals",
      free: "Free", trial: "",
    },
    es: {
      title: "PrixMalin — la app para encontrar ofertas locales y en línea",
      subtitle: "Descubre productos y ofertas en Canadá. Rápido, simple, pensado para móvil.",
      comingSoon: "La versión pública estará disponible en Google Play muy pronto.",
      apkTest: "Descargar APK (versión de prueba)",
      sizeLabel: "Tamaño", languagesLabel: "Idiomas", cta: "Ver ofertas",
      free: "Gratis", trial: "",
    },
    ar: {
      title: "PrixMalin — التطبيق للعثور على أفضل العروض",
      subtitle: "اكتشف المنتجات والعروض في كندا. سريع وبسيط.",
      comingSoon: "سيتوفر الإصدار العام على Google Play قريباً.",
      apkTest: "تنزيل APK (إصدار تجريبي)",
      sizeLabel: "الحجم", languagesLabel: "اللغات", cta: "تصفح العروض",
      free: "مجاني", trial: "",
    },
    zh: {
      title: "PrixMalin — 发现本地和网络优惠的应用",
      subtitle: "在加拿大发现产品和优惠。快速、简单、移动优先。",
      comingSoon: "公开版本即将在 Google Play 上发布。",
      apkTest: "下载 APK（测试版）",
      sizeLabel: "大小", languagesLabel: "语言", cta: "浏览优惠",
      free: "免费", trial: "",
    },
  },
  machshop: {
    fr: {
      title: "MachShop — l’outil de référence du machiniste",
      subtitle:
        "Mèches & tarauds, filetage, trigonométrie, bolt pattern, vitesses & avances, métallurgie. Tout hors-ligne, dans ta poche.",
      comingSoon: "La version publique arrive sur Google Play très bientôt.",
      apkTest: "", sizeLabel: "Taille", languagesLabel: "Langues de l’app",
      cta: "Toutes nos applications", free: "",
      trial: "Essai {days} jours · {price} $ CAD ensuite (achat unique)",
    },
    en: {
      title: "MachShop — the machinist’s reference tool",
      subtitle:
        "Tap & drill, threading, trigonometry, bolt patterns, feed & speed, metallurgy. Fully offline, in your pocket.",
      comingSoon: "The public release is coming to Google Play very soon.",
      apkTest: "", sizeLabel: "Size", languagesLabel: "App languages",
      cta: "All our apps", free: "",
      trial: "{days}-day trial · CAD {price} after (one-time purchase)",
    },
    es: {
      title: "MachShop — la herramienta de referencia del maquinista",
      subtitle:
        "Machuelos y brocas, roscado, trigonometría, patrón de pernos, avance y velocidad, metalurgia. Todo sin conexión.",
      comingSoon: "La versión pública llegará a Google Play muy pronto.",
      apkTest: "", sizeLabel: "Tamaño", languagesLabel: "Idiomas de la app",
      cta: "Todas nuestras apps", free: "",
      trial: "Prueba de {days} días · {price} CAD después (pago único)",
    },
    ar: {
      title: "MachShop — الأداة المرجعية للمشغّل الآلي",
      subtitle:
        "الحنفيات والمثاقب، القلاووظ، حساب المثلثات، أنماط البراغي، السرعة والتغذية، علم المعادن. بدون إنترنت.",
      comingSoon: "سيصل الإصدار العام إلى Google Play قريباً.",
      apkTest: "", sizeLabel: "الحجم", languagesLabel: "لغات التطبيق",
      cta: "جميع تطبيقاتنا", free: "",
      trial: "تجربة {days} أيام · {price} دولار كندي بعدها (شراء لمرة واحدة)",
    },
    zh: {
      title: "MachShop — 机械师的参考工具",
      subtitle:
        "丝锥与钻头、螺纹、三角函数、螺栓分度、进给与转速、金属学。完全离线，随身携带。",
      comingSoon: "公开版本即将在 Google Play 上发布。",
      apkTest: "", sizeLabel: "大小", languagesLabel: "应用语言",
      cta: "查看全部应用", free: "",
      trial: "{days} 天试用 · 之后 {price} 加元（一次性购买）",
    },
  },
};

export function AppHero({ app, lang }: { app: AppDef; lang: Lang }) {
  const [active, setActive] = useState(0);

  const c = COPY[app.id][lang] ?? COPY[app.id].en;
  const primary = getPrimaryDownloadUrl(app);
  const shots = app.screenshots;
  const idx = Math.min(active, shots.length - 1);

  const priceLine =
    app.price === 0
      ? c.free
      : c.trial
          .replace("{days}", String(app.trialDays ?? 0))
          .replace("{price}", app.price.toFixed(2));

  return (
    <section className="mx-auto max-w-5xl px-4 pt-10 pb-6">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image src={app.logo} alt={`${app.name} logo`} width={56} height={56}
                   className="rounded-xl" priority />
            <span className="text-sm font-semibold text-black/60">Android App</span>
          </div>

          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold">
            Android • {app.release === "play" ? "Google Play" : app.release === "apk" ? "APK" : "Soon"}
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{c.title}</h1>
          <p className="mt-3 text-base text-black/70">{c.subtitle}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            {app.release === "play" && primary ? (
              <AppButton href={primary} external ariaLabel="Google Play">Google Play</AppButton>
            ) : (
              <AppButton href="#" ariaLabel="Coming soon" variant="primary">
                {lang === "fr" ? "Bientôt" : "Soon"}
              </AppButton>
            )}

            {app.apkUrl && c.apkTest ? (
              <AppButton href={app.apkUrl} external variant="secondary" ariaLabel="Download APK">
                {c.apkTest}
              </AppButton>
            ) : null}

            <AppButton href={app.ctaUrl} variant="ghost">{c.cta}</AppButton>
          </div>

          {app.release !== "play" && (
            <p className="mt-3 text-sm text-black/60">{c.comingSoon}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-black/70">
            {priceLine ? (
              <span className="rounded-lg border border-black/10 bg-white px-3 py-2 font-semibold">
                {priceLine}
              </span>
            ) : null}
            {app.sizeMb !== null ? (
              <span className="rounded-lg border border-black/10 bg-white px-3 py-2">
                {c.sizeLabel}: <strong>{app.sizeMb} MB</strong>
              </span>
            ) : null}
            <span className="rounded-lg border border-black/10 bg-white px-3 py-2">
              {c.languagesLabel}: <strong>{languagesLabel(app)}</strong>
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-gradient-to-b from-black/5 to-black/0 p-4">
          <div className="aspect-[9/19] w-full overflow-hidden rounded-2xl border border-black/10 bg-white">
            <Image src={shots[idx]} alt={`${app.name} screenshot`} width={720} height={1520}
                   priority className="h-full w-full object-cover" />
          </div>
          {shots.length > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {shots.map((src, i) => (
                <button key={src} onClick={() => setActive(i)}
                  className={`h-2 w-2 rounded-full ${idx === i ? "bg-black" : "bg-black/20"}`}
                  aria-label={`Screenshot ${i + 1}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
