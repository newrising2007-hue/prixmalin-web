import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

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

function DealCard({ deal, featured = false }: { deal: Deal; featured?: boolean }) {
  const price = formatPrice(deal.price, deal.currency);

  return (
    <div className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md ${featured ? "border-blue-200 ring-1 ring-blue-100" : "border-black/10"}`}>
      {/* Image grande */}
      {deal.image ? (
        <div className="flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-8 pt-8 pb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={deal.image}
            alt={deal.title}
            className="h-44 w-full object-contain drop-shadow-md"
            loading={featured ? "eager" : "lazy"}
          />
        </div>
      ) : null}

      <div className="p-5">
        {/* Vendeur */}
        <p className="text-xs font-medium uppercase tracking-wider text-black/40">
          {deal.vendor ?? "Vendeur"}
        </p>

        {/* Titre */}
        <h2 className="mt-1 text-lg font-bold leading-snug text-gray-900">
          {deal.title}
        </h2>

        {/* Prix */}
        {price ? (
          <p className="mt-3 text-3xl font-extrabold text-gray-900">{price}</p>
        ) : (
          <p className="mt-3 text-sm text-black/50">Prix visible chez le vendeur</p>
        )}

        {/* Checkmarks */}
        <ul className="mt-4 space-y-2">
          {[
            "Lien affilié traçable",
            "Code digital (selon offre)",
            "Achat sécurisé chez le vendeur",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-black/70">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs font-bold">✓</span>
              {item}
            </li>
          ))}
        </ul>

        {/* Bouton */}
        <a
          href={deal.affiliateUrl}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-center text-sm font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-px"
        >
          Voir le prix maintenant →
        </a>

        <p className="mt-2.5 text-center text-xs text-black/40">
          *Lien affilié — aucun frais supplémentaire pour toi
        </p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return getAllIntentPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
          brand: primary.vendor ? { "@type": "Brand", name: primary.vendor } : undefined,
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
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  return (
    <main className="min-h-screen bg-gray-50/50">
      {productJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      ) : null}
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}

      <div className="mx-auto max-w-3xl px-4 pb-32 pt-6">

        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-black/50">
          <Link href="/deals" className="hover:text-black transition">Offres Gaming</Link>
          <span>/</span>
          <span className="text-black/80">{page.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
            Guide prix • Canada
          </p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900">
            {page.h1}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-black/60">{page.intro}</p>
        </header>

        {/* Offre principale */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500">
            <span className="h-px flex-1 bg-gray-200" />
            Meilleure offre recommandée
            <span className="h-px flex-1 bg-gray-200" />
          </h2>

          {primary ? (
            <DealCard deal={primary} featured />
          ) : (
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-800">
              Offre principale introuvable — slug : <b>{page.primaryDealSlug}</b>
            </div>
          )}
        </section>

        {/* Autres options */}
        {secondary.length > 0 ? (
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500">
              <span className="h-px flex-1 bg-gray-200" />
              Autres options
              <span className="h-px flex-1 bg-gray-200" />
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {secondary.map((d) => (
                <DealCard key={d.slug} deal={d} />
              ))}
            </div>
          </section>
        ) : null}

        {/* FAQ */}
        {page.faq && page.faq.length > 0 ? (
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500">
              <span className="h-px flex-1 bg-gray-200" />
              Questions fréquentes
              <span className="h-px flex-1 bg-gray-200" />
            </h2>
            <div className="space-y-3">
              {page.faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm"
                >
                  <summary className="cursor-pointer list-none font-semibold text-gray-900 marker:hidden group-open:text-blue-600">
                    <span className="mr-2 text-blue-400 group-open:rotate-90 inline-block transition-transform">▶</span>
                    {item.q}
                  </summary>
                  <p className="mt-3 border-t border-black/5 pt-3 text-sm leading-relaxed text-black/60">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {/* Lien retour */}
        <div className="text-center">
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            ← Voir toutes les offres gaming
          </Link>
        </div>
      </div>

      {/* Bouton fixe mobile */}
      {primary?.affiliateUrl ? (
        <div className="fixed bottom-0 left-0 right-0 border-t border-black/10 bg-white/95 backdrop-blur-sm p-4 md:hidden">
          <a
            href={primary.affiliateUrl}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="block w-full rounded-xl bg-blue-600 py-3.5 text-center text-sm font-bold text-white shadow-md transition hover:bg-blue-700"
          >
            Voir le prix maintenant →
          </a>
          <p className="mt-1.5 text-center text-xs text-black/40">Lien affilié — aucun frais supplémentaire</p>
        </div>
      ) : null}
    </main>
  );
}
