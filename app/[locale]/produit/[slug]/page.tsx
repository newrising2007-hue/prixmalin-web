import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AffiliateButton from "@/components/AffiliateButton";
import { getProductBySlug, getAllProductSlugs } from "@/lib/products";
import { buildAmazonLink } from "@/lib/affiliate";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

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

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const affiliateUrl = buildAmazonLink(product.amazonUrl);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
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
      ? (product as { image?: string }).image
      : null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Image (auto-cadrée) */}
        <div className="w-full sm:w-64">
          <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-white">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={product.title}
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
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="mt-4 text-black/70">{product.shortDescription}</p>

          {(product as { prixVerifieLe?: string }).prixVerifieLe && (
            <p className="mt-3 text-xs text-black/40">
              ✓ Prix vérifié le {new Date((product as { prixVerifieLe?: string }).prixVerifieLe!).toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}
          <div className="mt-6">
            <AffiliateButton url={product.amazonUrl} label="Voir le prix sur Amazon" />
          </div>

          <p className="mt-6 text-sm text-black/60">
            Certains liens sont affiliés. En achetant via ces liens, tu soutiens PrixMalin
            sans coût supplémentaire.
          </p>
        </div>
      </div>
    </main>
  );
}
