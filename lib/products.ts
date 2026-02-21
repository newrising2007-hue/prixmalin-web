import productsData from "@/data/products.json";

export type Product = {
  slug: string;
  title: string;
  shortDescription: string;
  amazonUrl: string;
  category?: string;
};

function isProduct(value: any): value is Product {
  return (
    value &&
    typeof value === "object" &&
    typeof value.slug === "string" &&
    typeof value.title === "string" &&
    typeof value.shortDescription === "string" &&
    typeof value.amazonUrl === "string"
  );
}

export function getAllProducts(): Product[] {
  const raw = productsData as unknown;

  if (!Array.isArray(raw)) return [];

  const safe = raw.filter(isProduct);

  // Optionnel: tri stable par titre
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
