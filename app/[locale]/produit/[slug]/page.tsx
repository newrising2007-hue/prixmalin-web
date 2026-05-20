import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AffiliateButton from "@/components/AffiliateButton";
import { getProductBySlug, getAllProductSlugs } from "@/lib/products";
import { buildAmazonLink } from "@/lib/affiliate";

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export async function generateStaticParams() {
// Génération des paramètres statiques pour les pages de produits en fonction des slugs et des locales
  const slugs = getAllProductSlugs();
  const locales = ["fr", "en", "es", "ar", "zh"];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

// Génération des métadonnées de la page de produit en fonction du slug et de la locale
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit introuvable | PrixMalin",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${product.title} | PrixMalin`,
    description: product.shortDescription,
    alternates: {
      canonical: `https://prixmalin.ca/produit/${product.slug}`,
      languages: {
        fr: `https://prixmalin.ca/produit/${product.slug}`,
        "x-default": `https://prixmalin.ca/produit/${product.slug}`,
      },
    },
  };
}
// Fonction principale qui affiche la page d'un produit spécifique en récupérant les détails du produit et les traductions

export default async function ProductPage({ params, searchParams }: Props & { searchParams: Promise<{ cat?: string }> }) {
  const { slug, locale } = await params;
  const { cat } = await searchParams ?? {};
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const localizedDescription = (locale !== 'fr' && product[`shortDescription_${locale}` as keyof typeof product])
    ? product[`shortDescription_${locale}` as keyof typeof product] as string
    : product.shortDescription;
  const localizedTitle = (locale !== 'fr' && product[`title_${locale}` as keyof typeof product])
    ? product[`title_${locale}` as keyof typeof product] as string
// Construction de l'URL d'affiliation Amazon pour le produit
    : product.title;
// Création de l'objet JSON-LD pour les données structurées du produit
  const t = await getTranslations();
  const affiliateUrl = buildAmazonLink(product.amazonUrl);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: localizedTitle,
    description: product.shortDescription,
    url: `/produit/${product.slug}`,
    category: product.category ?? "gaming",
    offers: {
      "@type": "Offer",
      url: affiliateUrl,
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
    },
  };

  const imageSrc =
    (product as { image?: string }).image && (product as { image?: string }).image?.trim()
// Rendu JSX principal de la page de produit, incluant les détails du produit et le bouton d'affiliation
      ? (product as { image?: string }).image
      : null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-6">
        <a href={`/${locale}/produits${cat ? `?cat=${cat}` : ""}`} className="text-sm text-blue-700 hover:underline">{t("produits.retour")}</a>
      </div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Image (auto-cadrée) */}
        <div className="w-full sm:w-64">
          <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-white">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={localizedTitle}
                className="h-full w-full object-contain p-4"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-sm text-black/50">
                Image bientôt disponible
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold">{localizedTitle}</h1>

          <p className="mt-4 text-black/70">{localizedDescription}</p>

          {(product as { prixVerifieLe?: string }).prixVerifieLe && (
            <p className="mt-3 text-xs text-black/40">
              ✓ {new Date((product as { prixVerifieLe?: string }).prixVerifieLe! + "T12:00:00").toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}
          <div className="mt-6">
            <AffiliateButton url={product.amazonUrl} label={t("intent.voir_prix")} />
          </div>

          <p className="mt-6 text-sm text-black/60">
            {t("deals.affiliation")}
          </p>
        </div>
      </div>
    </main>
  );
}
