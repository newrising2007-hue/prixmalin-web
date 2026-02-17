import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AffiliateButton from "@/components/AffiliateButton";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import { getSiteUrl } from "@/lib/site";

import rawData from "@/data/gaming-codes.json";

type Retailer = {
  name: string;
  stock?: boolean;
  affiliateLink?: string;
};

type SubscriptionDeal = {
  id: string;
  name: string;
  category?: string;
  platform?: string;
  duration?: string;
  regularPrice?: number;
  dealPrice?: number;
  discount?: number;
  description?: string;
  retailers?: Retailer[];
  expires?: string;
};

type GamingCodesData = {
  metadata?: {
    currency?: string;
  };
  subscriptions?: SubscriptionDeal[];
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatPrice(price?: number, currency = "CAD") {
  if (typeof price !== "number") return null;
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency,
  }).format(price);
}

function getData(): GamingCodesData {
  return rawData as unknown as GamingCodesData;
}

function findDeal(slug: string): SubscriptionDeal | null {
  const data = getData();
  const deals = data.subscriptions || [];
  return deals.find((d) => d.id === slug) || null;
}

function getAffiliateLink(deal: SubscriptionDeal): string | null {
  const retailers = deal.retailers || [];
  const r = retailers.find((x) => x.affiliateLink);
  return r?.affiliateLink || null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const deal = findDeal(slug);

  if (!deal) {
    return { title: "Deal introuvable | PrixMalin" };
  }

  const title = `${deal.name} | PrixMalin`;

  return {
    title,
    alternates: {
      canonical: `${getSiteUrl()}/deals/${slug}`,
    },
  };
}

export default async function DealPage({ params }: PageProps) {
  const { slug } = await params;

  const data = getData();
  const deal = findDeal(slug);

  if (!deal) notFound();

  const currency = data.metadata?.currency || "CAD";

  const promo = formatPrice(deal.dealPrice, currency);
  const regular = formatPrice(deal.regularPrice, currency);

  const affiliateLink = getAffiliateLink(deal);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: deal.name,
    category: deal.category || "Gaming",
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price: deal.dealPrice,
      url: `${getSiteUrl()}/deals/${deal.id}`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "PrixMalin est-il un comparateur de prix ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Non. PrixMalin est un site d’affiliation qui présente des offres gaming.",
        },
      },
      {
        "@type": "Question",
        name: "PrixMalin reçoit-il une commission ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, certains liens sont affiliés. PrixMalin peut recevoir une commission.",
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <h1 className="text-2xl font-semibold">
        {deal.name} {deal.duration ? `— ${deal.duration}` : ""}
      </h1>

      <div className="mt-6 rounded-xl border p-4">
        <div className="flex items-baseline gap-3">
          {promo && <p className="text-2xl font-bold">{promo}</p>}
          {regular && <p className="line-through text-neutral-500">{regular}</p>}
          {deal.discount && (
            <span className="rounded bg-neutral-100 px-2 py-1 text-xs">
              -{deal.discount}%
            </span>
          )}
        </div>

        {deal.description && (
          <p className="mt-2 text-sm text-neutral-700">{deal.description}</p>
        )}

        <div className="mt-4 space-y-2">
          {affiliateLink ? (
            <AffiliateButton href={affiliateLink} />
          ) : (
            <p className="text-sm text-neutral-600">
              Aucun lien disponible pour le moment.
            </p>
          )}

          <AffiliateDisclosure />
        </div>
      </div>
    </main>
  );
}
