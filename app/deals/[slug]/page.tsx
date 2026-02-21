// app/deals/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllDeals, getDealBySlug } from "@/lib/deals";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const deals = getAllDeals();
  return deals.map((deal) => ({ slug: deal.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const deal = getDealBySlug(params.slug);
  if (!deal) return {};

  const title = `${deal.title} | Deal gaming | PrixMalin`;
  const description = deal.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/deals/${deal.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: deal.image,
          width: 1200,
          height: 630,
          alt: deal.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [deal.image],
    },
  };
}

export default function DealPage({ params }: Props) {
  const deal = getDealBySlug(params.slug);
  if (!deal) return notFound();

  const all = getAllDeals();
  const related = all.filter((d) => d.slug !== deal.slug).slice(0, 6);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: deal.title,
    image: [deal.image],
    description: deal.description,
    brand: {
      "@type": "Brand",
      name: deal.platform,
    },
    offers: typeof deal.price === "number"
      ? {
          "@type": "Offer",
          price: deal.price,
          priceCurrency: deal.currency || "CAD",
          availability: "https://schema.org/InStock",
          url: deal.affiliateUrl,
        }
      : undefined,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Deals",
        item: "https://prixmalin.ca/deals",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: deal.title,
        item: `https://prixmalin.ca/deals/${deal.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="mb-5 text-sm text-gray-600">
        <Link href="/deals" className="hover:underline">
          Deals
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{deal.title}</span>
      </nav>

      <div className="space-y-6">
        <img
          src={deal.image}
          alt={deal.title}
          className="w-full rounded-2xl shadow-sm"
          loading="eager"
        />

        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{deal.title}</h1>
          <p className="text-base text-gray-600">{deal.description}</p>
        </header>

        {typeof deal.price === "number" ? (
          <div className="rounded-2xl border p-4">
            <p className="text-sm text-gray-600">Prix</p>
            <p className="text-2xl font-semibold">
              {deal.price} {deal.currency || "CAD"}
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border p-4">
            <p className="text-sm text-gray-600">
              Prix affiché uniquement quand il est certain.
            </p>
          </div>
        )}

        <a
          href={deal.affiliateUrl}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="block w-full rounded-2xl bg-green-600 px-6 py-4 text-center text-base font-semibold text-white shadow-sm transition hover:bg-green-700"
        >
          Voir l’offre
        </a>

        <section className="rounded-2xl bg-gray-50 p-4">
          <h2 className="mb-2 text-lg font-semibold">Détails</h2>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>
              <span className="font-medium">Plateforme :</span> {deal.platform}
            </li>
          </ul>
        </section>

        {related.length > 0 && (
          <section className="pt-2">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-lg font-semibold">Autres deals</h2>
              <Link href="/deals" className="text-sm text-gray-600 hover:underline">
                Voir tout
              </Link>
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {related.map((d) => (
                <li key={d.slug} className="rounded-2xl border p-3">
                  <Link href={`/deals/${d.slug}`} className="block">
                    <p className="font-semibold">{d.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                      {d.description}
                    </p>
                    {typeof d.price === "number" && (
                      <p className="mt-2 text-sm font-semibold">
                        {d.price} {d.currency || "CAD"}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
