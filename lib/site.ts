export const SITE = {
  name: "PrixMalin",
  defaultUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://prixmalin.ca",
  brandTaglineFr: "Outil de recherche de produits local et web au Canada.",
  brandTaglineEn: "A product search tool for local and online deals in Canada.",
} as const;

/**
 * Retourne l’URL du site (sans slash final)
 */
export function getSiteUrl(): string {
  return SITE.defaultUrl.replace(/\/+$/, "");
}

/**
 * Construit une URL absolue à partir d’un path
 */
export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
