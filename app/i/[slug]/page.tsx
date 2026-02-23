import { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getAllIntentPages,
  getIntentPageBySlug,
  getIntentDeals,
  type Deal,
} from "@/lib/intent";

import { getSiteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};


const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? getSiteUrl() ?? "https://prixmalin.ca";

function formatPrice(price?: number, currency = "CAD") {
  if (!price || !Number.isFinite(price)) return null;
  try {
    return new Intl.NumberFormat("fr-CA", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(price);
  } catch {
    return `${price} ${currency}`;
  }
}

function DealCard({ deal }: { deal: Deal }) {
  const price = formatPrice(deal.price, deal.currency);
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-black/60">{deal.vendor ?? "Vendeur"}</p>
          <h2 className="mt-1 text-base font-semibold leading-snug">
            {deal.title}
          </h2>
          {price ? (
            <p className="mt-2 text-lg font-bold">{price}</p>
          ) : (
            <p className="mt-2 text-sm text-black/60">
              Prix visible chez le vendeur
            </p>
          )}
          <ul className="mt-3 space-y-1 text-sm text-black/70">
            <li>✅ Lien affilié traçable</li>
            <li>✅ Code digital (selon offre)</li>
            <li>✅ Achat sécurisé chez le vendeur</li>
          </ul>
        </div>

        {deal.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={deal.image}
            alt={deal.title}
            className="h-20 w-20 rounded-xl object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="mt-4">
        <a
          href={deal.affiliateUrl}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-center font-semibold text-white hover:opacity-90"
        >
          Voir le prix maintenant →
        </a>
        <p className="mt-2 text-xs text-black/50">
          *Lien affilié : PrixMalin peut recevoir une commission, sans coût
          supplémentaire pour toi.
        </p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return getAllIntentPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getIntentPageBySlug(slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/i/${page.slug}`,
      languages: {
        fr: `${BASE_URL}/i/${page.slug}`,
        "x-default": `${BASE_URL}/i/${page.slug}`,
      },
    },
    openGraph: {
      type: "website",
      url: `${BASE_URL}/i/${page.slug}`,
      title: page.metaTitle,
      description: page.metaDescription,
    },
    twitter: {
      card: "summary",
      title: page.metaTitle,
      description: page.metaDescription,
    },
    keywords: page.keywords,
  };
}

export default async function IntentPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const page = getIntentPageBySlug(slug);
  if (!page) notFound();

  const { primary, secondary } = getIntentDeals(page);

  const productJsonLd =
    primary && primary.affiliateUrl
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: primary.title,
          brand: primary.vendor
            ? { "@type": "Brand", name: primary.vendor }
            : undefined,
          offers: {
            "@type": "Offer",
            url: primary.affiliateUrl,
            priceCurrency: primary.currency ?? "CAD",
            ...(primary.price ? { price: String(primary.price) } : {}),
            availability: "https://schema.org/InStock",
          },
        }
      : null;

  const faqJsonLd =
    page.faq && page.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }
      : null;

  return (
    <main className="mx-auto max-w-3xl px-4 pb-28 pt-6">
      {productJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      ) : null}
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      <header className="space-y-3">
        <p className="text-sm font-medium text-black/60">Guide prix • Canada</p>
        <h1 className="text-2xl font-bold leading-tight">{page.h1}</h1>
        <p className="text-base text-black/70">{page.intro}</p>
      </header>

      <section className="mt-6 space-y-4">
        <h2 className="text-lg font-semibold">Meilleure offre recommandée</h2>

        {primary ? (
          <DealCard deal={primary} />
        ) : (
          <div className="rounded-2xl border border-black/10 bg-white p-4 text-sm text-black/70">
            Offre principale introuvable (slug : <b>{page.primaryDealSlug}</b>).
            Vérifie que le slug existe dans <code>data/gaming-codes.json</code>.
          </div>
        )}
      </section>

      {secondary.length > 0 ? (
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold">Autres options</h2>
          <div className="grid gap-4">
            {secondary.map((d) => (
              <DealCard key={d.slug} deal={d} />
            ))}
          </div>
        </section>
      ) : null}

      {page.faq && page.faq.length > 0 ? (
        <section className="mt-10 space-y-3">
          <h2 className="text-lg font-semibold">FAQ</h2>
          <div className="space-y-3">
            {page.faq.map((item) => (
              <details
                key={item.q}
                className="rounded-2xl border border-black/10 bg-white p-4"
              >
                <summary className="cursor-pointer font-semibold">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm text-black/70">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {primary?.affiliateUrl ? (
        <div className="fixed bottom-0 left-0 right-0 border-t border-black/10 bg-white p-4 md:hidden">
          <a
            href={primary.affiliateUrl}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="block w-full rounded-2xl bg-black py-3 text-center font-semibold text-white"
          >
            Voir le prix maintenant →
          </a>
          <p className="mt-2 text-center text-xs text-black/50">
            Lien affilié (commission possible)
          </p>
        </div>
      ) : null}
    </main>
  );
}
