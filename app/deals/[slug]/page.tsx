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
  type?: string;
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
  savings?: number;
  description?: string;
  retailers?: Retailer[];
  expires?: string;
  featured?: boolean;
  tags?: string[];
};

type GamingCodesData = {
  metadata?: {
    version?: string;
    lastUpdate?: string;
    country?: string;
    currency?: string;
  };
  subscriptions?: SubscriptionDeal[];
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatPrice(price?: number, currency = "CAD") {
  if (typeof price !== "number" || !Number.isFinite(price)) return null;
  return new Intl.NumberFormat("fr-CA", { style: "currency", currency }).format(price);
}

function safeDate(input?: string): Date | null {
  if (!input) return null;
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? null : d;
}

function getData(): GamingCodesData {
  return rawData as unknown as GamingCodesData;
}

function findDealBySlug(slug: string): SubscriptionDeal | null {
  const data = getData();
  const subs = Array.isArray(data.subscriptions) ? data.subscriptions : [];
  const deal = subs.find((d) => d?.id === slug);
  return deal ?? null;
}

function pickPrimaryAffiliateLink(deal: SubscriptionDeal): string | null {
  const retailers = Array.isArray(deal.retailers) ? deal.retailers : [];
  const best = retailers.find(
    (r) => r?.stock && typeof r.affiliateLink === "string" && r.affiliateLink.length > 0
  );
  if (best?.affiliateLink) return best.affiliateLink;

  const any = retailers.find((r) => typeof r.affiliateLink === "string" && r.affiliateLink.length > 0);
  return any?.affiliateLink ?? null;
}

export async function generateStaticParams() {
  const data = getData();
  const subs = Array.isArray(data.subscriptions) ? data.subscriptions : [];
  return subs
    .filter((d) => typeof d?.id === "string" && d.id.trim().length > 0)
    .map((d) => ({ slug: d.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const deal = findDealBySlug(slug);

  const baseUrl = getSiteUrl();
  const canonical = `${baseUrl}/deals/${slug}`;

  if (!deal) {
    return {
      title: "Deal introuvable | PrixMalin",
      description: "Cette page de deal n’existe pas ou a été retirée.",
      robots: { index: false, follow: false },
      alternates: { canonical },
    };
  }

  const title = `${deal.name}${deal.duration ? ` (${deal.duration})` : ""} | PrixMalin`;
  const description =
    deal.description?.trim() ||
    `Offre sur ${deal.name}${deal.duration ? ` (${deal.duration})` : ""}. Lien affilié possible.`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "PrixMalin",
      locale: "fr_CA",
    },
  };
}

export default async function DealPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getData();
  const deal = findDealBySlug(slug);

  if (!deal) notFound();

  const currency = data?.metadata?.currency || "CAD";
  const regular = formatPrice(deal.regularPrice, currency);
  const promo = formatPrice(deal.dealPrice, currency);

  const affiliateLink = pickPrimaryAffiliateLink(deal);

  const expiresDate = safeDate(deal.expires);
  const expiresText = expiresDate
    ? new Intl.DateTimeFormat("fr-CA", { dateStyle: "medium" }).format(expiresDate)
    : null;

  // Correction ici : Séparation propre des objets JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: deal.name,
    description: deal.description,
    offers: {
      "@type": "Offer",
      price: deal.dealPrice,
      priceCurrency: currency,
    }
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
          text: "Non. PrixMalin est un site d’affiliation qui présente des offres et des codes gaming. Les prix peuvent varier selon le marchand.",
        },
      },
      {
        "@type": "Question",
        name: "PrixMalin reçoit-il une commission ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, certains liens sont affiliés. PrixMalin peut recevoir une commission si vous achetez via ces liens, sans frais supplémentaires pour vous.",
        },
      },
      {
        "@type": "Question",
        name: "Que faire si le prix ou le stock a changé ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le prix et le stock peuvent changer à tout moment. Référez-vous toujours au prix final affiché sur le site du marchand avant d’acheter.",
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold">{deal.name}</h1>
        {deal.duration && <p className="text-lg text-neutral-600">{deal.duration}</p>}
      </header>

      <section className="mt-6 rounded-xl border p-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {promo ? <p className="text-2xl font-bold">{promo}</p> : <p className="text-xl font-semibold">Prix non disponible</p>}
            {regular ? <p className="text-sm text-neutral-500 line-through">{regular}</p> : null}
            {typeof deal.discount === "number" ? (
              <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
                -{deal.discount}%
              </span>
            ) : null}
          </div>

          {deal.description ? <p className="text-sm text-neutral-700 mt-2">{deal.description}</p> : null}
          {expiresText ? <p className="text-xs text-neutral-500">Expire le {expiresText}</p> : null}

          <div className="mt-4 space-y-2">
            {affiliateLink ? (
              <AffiliateButton url={affiliateLink} label="Voir l’offre" />
            ) : (
              <p className="text-sm text-neutral-600">Aucun lien disponible pour le moment.</p>
            )}
            <AffiliateDisclosure />
          </div>
        </div>
      </section>
    </main>
  );
}