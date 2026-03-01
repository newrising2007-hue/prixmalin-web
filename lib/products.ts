import productsData from "@/data/products.json";
export type Product = {
  slug: string;
  title: string;
  shortDescription: string;
  amazonUrl: string;
  category?: string;
  image?: string;
  badge?: string;
  prix?: string;
  prixBarre?: string;
  prixVerifieLe?: string;
  actif?: boolean;
};
function isProduct(value: any): value is Product {
  const baseOk =
    value &&
    typeof value === "object" &&
    typeof value.slug === "string" &&
    typeof value.title === "string" &&
    typeof value.shortDescription === "string" &&
    typeof value.amazonUrl === "string";
  if (!baseOk) return false;
  const categoryOk = value.category === undefined || typeof value.category === "string";
  const imageOk = value.image === undefined || typeof value.image === "string";
  return categoryOk && imageOk;
}
export function getAllProducts(): Product[] {
  const raw = productsData as unknown;
  if (!Array.isArray(raw)) return [];
  const safe = raw.filter(isProduct).filter(p => p.actif !== false);
  safe.sort((a, b) => a.title.localeCompare(b.title, "fr"));
  return safe;
}
export function getProductBySlug(slug: string): Product | null {
  const all = getAllProducts();
  return all.find((p) => p.slug === slug) ?? null;
}
export function getAllProductSlugs(): string[] {
  return getAllProducts().map((p) => p.slug);
}
