export type AppRelease = "soon" | "apk" | "play";
export type Lang = "fr" | "en" | "es" | "ar" | "zh";
export type AppId = "prixmalin" | "machshop";

export const LOCALES: readonly Lang[] = ["fr", "en", "es", "ar", "zh"] as const;

export type AppDef = {
  id: AppId;
  name: string;
  slug: string;
  release: AppRelease;
  playUrl: string;
  apkUrl: string;
  ctaUrl: string;
  sizeMb: number | null;
  languages: readonly Lang[];
  price: number;
  currency: "CAD";
  trialDays: number | null;
  schemaCategory: string;
  hasFaq: boolean;
  logo: string;
  screenshots: readonly string[];
};

function parseRelease(v: string | undefined, fallback: AppRelease): AppRelease {
  const s = (v || "").toLowerCase();
  return s === "apk" || s === "play" || s === "soon" ? s : fallback;
}

/**
 * ⚠️ NEXT_PUBLIC_* est inliné au build par Next.js.
 * Chaque variable DOIT être écrite littéralement — jamais d'accès dynamique.
 */
const GLOBAL_RELEASE = parseRelease(process.env.NEXT_PUBLIC_APP_RELEASE, "soon");

export const APPS: Record<AppId, AppDef> = {
  prixmalin: {
    id: "prixmalin",
    name: "PrixMalin",
    slug: "prixmalin",
    release: parseRelease(process.env.NEXT_PUBLIC_PRIXMALIN_RELEASE, GLOBAL_RELEASE),
    playUrl:
      process.env.NEXT_PUBLIC_PRIXMALIN_PLAY_URL ||
      "https://play.google.com/store/apps/details?id=com.neosmarthing.prixmalin",
    apkUrl: process.env.NEXT_PUBLIC_PRIXMALIN_APK_URL || "",
    ctaUrl: "/applications",
    sizeMb: 25,
    languages: ["fr", "en", "es", "zh", "ar"],
    price: 0,
    currency: "CAD",
    trialDays: null,
    schemaCategory: "ShoppingApplication",
    hasFaq: true,
    logo: "/apps/prixmalin/logo-512.webp",
    screenshots: [
      "/apps/prixmalin/screen-1.webp",
      "/apps/prixmalin/screen-2.webp",
      "/apps/prixmalin/screen-3.webp",
    ],
  },
  machshop: {
    id: "machshop",
    name: "MachShop",
    slug: "machshop",
    release: parseRelease(process.env.NEXT_PUBLIC_MACHSHOP_RELEASE, GLOBAL_RELEASE),
    playUrl:
      process.env.NEXT_PUBLIC_MACHSHOP_PLAY_URL ||
      "https://play.google.com/store/apps/details?id=com.neosmarthing.machshop",
    apkUrl: "",
    ctaUrl: "/applications",
    sizeMb: null,
    languages: ["fr", "en", "es"],
    price: 4.99,
    currency: "CAD",
    trialDays: 10,
    schemaCategory: "UtilitiesApplication",
    hasFaq: false,
    logo: "/apps/machshop/logo-512.webp",
    screenshots: [
      "/apps/machshop/screen-1.webp",
      "/apps/machshop/screen-2.webp",
      "/apps/machshop/screen-3.webp",
    ],
  },
};

export function getApp(id: AppId): AppDef {
  return APPS[id];
}

export function getPrimaryDownloadUrl(app: AppDef): string | null {
  if (app.release === "play" && app.playUrl) return app.playUrl;
  if (app.release === "apk" && app.apkUrl) return app.apkUrl;
  return null;
}

/** Chemin localisé — fr = racine sans préfixe (localeDetection: false) */
export function appPath(app: AppDef, lang: Lang): string {
  return lang === "fr"
    ? `/applications/${app.slug}`
    : `/${lang}/applications/${app.slug}`;
}

const LANG_LABEL: Record<Lang, string> = {
  fr: "FR", en: "EN", es: "ES", zh: "中文", ar: "العربية",
};

export function languagesLabel(app: AppDef): string {
  return app.languages.map((l) => LANG_LABEL[l]).join(", ");
}
