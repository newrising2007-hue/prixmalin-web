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

  // URL affiliée (utile aussi dans le schema)
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

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-3xl font-bold">{product.title}</h1>

      <p className="mt-4 text-black/70">{product.shortDescription}</p>

      <div className="mt-6">
        <AffiliateButton url={product.amazonUrl} label="Voir le prix sur Amazon" />
      </div>

      <p className="mt-6 text-sm text-black/60">
        Certains liens sont affiliés. En achetant via ces liens, tu soutiens PrixMalin
        sans coût supplémentaire.
      </p>
    </main>
  );
}
