// lib/amazon.ts
import { SITE } from "@/lib/site";

const AMAZON_CA_HOST = "www.amazon.ca";
const AMAZON_TAG = "prixmalin20-20";

function safeEncode(v: string): string {
  return encodeURIComponent(v).replace(/%20/g, "+");
}

export function isAmazonUrl(url: string): boolean {
  return /amazon\./i.test(url);
}

export function normalizeAmazonCaUrl(url: string): string {
  try {
    const u = new URL(url);
    // force amazon.ca host (sans changer le path)
    u.hostname = AMAZON_CA_HOST;

    // assure https
    u.protocol = "https:";

    // enlève espaces invisibles
    u.pathname = u.pathname.replace(/\s+/g, "");
    u.search = u.search.replace(/\s+/g, "");

    // assure tag
    if (!u.searchParams.get("tag")) u.searchParams.set("tag", AMAZON_TAG);

    return u.toString();
  } catch {
    // Si URL invalide, retourne tel quel
    return url;
  }
}

/**
 * Fallback robuste: recherche Amazon.ca avec tag affilié.
 * Ça fonctionne même si la page produit (dp/ASIN) n’existe plus.
 */
export function buildAmazonSearchUrl(query: string): string {
  const q = query.trim() || SITE.name;
  return `https://${AMAZON_CA_HOST}/s?k=${safeEncode(q)}&tag=${AMAZON_TAG}`;
}
