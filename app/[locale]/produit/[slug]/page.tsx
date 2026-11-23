import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AffiliateButton from "@/components/AffiliateButton";
import { getProductBySlug, getAllProductSlugs, type Product } from "@/lib/products";
import { buildAmazonLink } from "@/lib/affiliate";
import { fmtPrix, fmtCoupon } from "@/lib/prix";
import { absoluteUrl } from "@/lib/site";
import { routing } from "@/i18n/routing";

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

// 22 nov. 2026 — SEO multilingue : titre / description dans la langue de la page
// (repli sur le français), canonical de la page elle-même, hreflang des 5 langues
// (mêmes URL que app/sitemap.ts : français sans préfixe, localePrefix "as-needed").
function texteLocalise(product: Product, champ: "title" | "shortDescription", locale: string): string {
  if (locale === routing.defaultLocale) return product[champ];
  const valeur = (product as Record<string, unknown>)[`${champ}_${locale}`];
  return typeof valeur === "string" && valeur.trim() ? valeur : product[champ];
}

function urlProduit(slug: string, locale: string): string {
  return locale === routing.defaultLocale
    ? absoluteUrl(`/produit/${slug}`)
    : absoluteUrl(`/${locale}/produit/${slug}`);
}

// Génération des métadonnées de la page de produit en fonction du slug et de la locale
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit introuvable",
      robots: { index: false, follow: false },
    };
  }

  const titre = texteLocalise(product, "title", locale);
  const description = texteLocalise(product, "shortDescription", locale);
  const url = urlProduit(product.slug, locale);

  return {
    title: titre,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, urlProduit(product.slug, l)])),
        "x-default": urlProduit(product.slug, routing.defaultLocale),
      },
    },
    openGraph: {
      title: titre,
      description,
      url,
      type: "website",
      ...(product.image?.trim() ? { images: [absoluteUrl(product.image)] } : {}),
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

  const imageSrc = product.image?.trim() ? product.image.trim() : null;

  // 22 nov. 2026 — prix affiché sur la fiche (même rendu que les cartes de /produits)
  // et repris tel quel dans le JSON-LD : Google exige que le prix des données
  // structurées soit celui affiché sur la page.
  const prix = fmtPrix(product.prix);
  const prixBarre = fmtPrix(product.prixBarre);
  const coupon = fmtCoupon(product.coupon, product.couponType);
  const dateVerif = product.prixVerifieLe
    ? new Date(product.prixVerifieLe + "T12:00:00").toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: localizedTitle,
    description: localizedDescription,
    url: urlProduit(product.slug, locale),
    category: product.category ?? "gaming",
    ...(imageSrc ? { image: absoluteUrl(imageSrc) } : {}),
    ...(product.asin ? { sku: product.asin } : {}),
    // Sans prix, pas d'offre : une offre sans prix est une erreur critique pour Google.
    ...(prix
      ? {
          offers: {
            "@type": "Offer",
            url: affiliateUrl,
            price: prix,
            priceCurrency: "CAD",
            availability: "https://schema.org/InStock",
            itemCondition: product.reconditionne
              ? "https://schema.org/RefurbishedCondition"
              : "https://schema.org/NewCondition",
          },
        }
      : {}),
  };

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
                {t("produits.image_bientot")}
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold">{localizedTitle}</h1>

          <p className="mt-4 text-black/70">{localizedDescription}</p>

          {prix && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-2xl font-bold text-orange-600">{prix}$</span>
              {prixBarre && <span className="text-base line-through text-black/40">{prixBarre}$</span>}
              {/* Étiquettes lues par NeoAgent — le coupon n'est jamais soustrait du prix affiché. */}
              {product.prime && (
                <span title={t("produits.badge_prime_info")} className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-800">
                  {t("produits.badge_prime")}
                </span>
              )}
              {coupon && (
                <span title={t("produits.badge_coupon_info")} className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                  {t("produits.badge_coupon")} {coupon}
                </span>
              )}
              {product.reconditionne && (
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-700">
                  {t("produits.badge_reconditionne")}
                </span>
              )}
            </div>
          )}

          {dateVerif && (
            <p className="mt-2 text-xs text-black/40">
              {t("produits.verifie_le")} {dateVerif}
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
