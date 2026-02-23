export const LANGUAGES = ["fr", "en", "es", "ar", "zh"] as const;

export type Lang = (typeof LANGUAGES)[number];

export const DEFAULT_LANG: Lang = "fr";

export function getLangPrefix(lang: Lang) {
  if (lang === "fr") return "";
  return `/${lang}`;
}
