import type { Metadata } from "next"
import { notFound } from "next/navigation"
import DealCard from "@/components/DealCard"
import type { Deal } from "@/types/deal"
import dealsData from "@/data/gaming-codes.json"

export const dynamic = "error"

type PageProps = {
  params: Promise<{
    platform: string
  }>
}

function normalizePlatform(input?: string) {
  if (typeof input !== "string") return null

  const p = input.trim().toLowerCase()
  if (!p) return null

  if (p === "pc") return "PC"
  if (p === "xbox") return "Xbox"
  if (p === "playstation" || p === "ps" || p === "psn") return "PlayStation"
  if (p === "nintendo" || p === "switch") return "Nintendo"

  return null
}

export function generateStaticParams() {
  return [
    { platform: "pc" },
    { platform: "xbox" },
    { platform: "playstation" },
    { platform: "nintendo" },
  ]
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { platform: rawPlatform } = await params
  const platform = normalizePlatform(rawPlatform)

  if (!platform) {
    return {
      title: "Codes bonus introuvables | PrixMalin",
      robots: { index: false, follow: false },
    }
  }

  const title =
    platform === "PC"
      ? "Codes bonus PC et cartes cadeaux gaming"
      : `Codes bonus ${platform} et cartes cadeaux gaming`

  const description =
    platform === "PC"
      ? "Codes bonus PC et cartes cadeaux gaming disponibles au Canada. Offres sélectionnées avec liens affiliés."
      : `Codes bonus ${platform} et cartes cadeaux gaming disponibles au Canada. Offres sélectionnées avec liens affiliés.`

  const absoluteUrl = `https://prixmalin.ca/codes-bonus/${rawPlatform}`

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl,
      languages: {
        "fr-CA": absoluteUrl,
        "x-default": absoluteUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      type: "website",
    },
  }
}

function buildProductJsonLd(deal: Deal) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: deal.title,
    image: [deal.image],
    brand: { "@type": "Brand", name: deal.platform },
    offers: {
      "@type": "Offer",
      priceCurrency: deal.currency,
      price: deal.price,
      availability: `https://schema.org/${deal.availability}`,
      url: deal.affiliateUrl,
      itemCondition: "https://schema.org/NewCondition",
    },
  }
}

export default async function CodesBonusPlatformPage({ params }: PageProps) {
  const { platform: rawPlatform } = await params
  const platform = normalizePlatform(rawPlatform)
  if (!platform) return notFound()

  const deals = dealsData as Deal[]

  const filteredDeals =
    platform === "PC"
      ? deals
      : deals.filter((d) => d.platform.toLowerCase() === platform.toLowerCase())

  const jsonLd = filteredDeals.map(buildProductJsonLd)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {platform === "PC" ? "Codes bonus PC" : `Codes bonus ${platform}`} 🇨🇦
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Offres sélectionnées de cartes cadeaux et codes gaming au Canada. Liens
          affiliés traçables — aucun surcoût pour vous.
        </p>
      </header>

      {filteredDeals.length === 0 ? (
        <div className="rounded-2xl border bg-white p-6 text-gray-700">
          Aucune offre disponible pour {platform} pour le moment.
        </div>
      ) : (
        <section
          aria-label="Liste des offres"
          className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
        >
          {filteredDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
