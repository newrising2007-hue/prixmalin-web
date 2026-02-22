import type { Metadata } from "next"
import DealCard from "@/components/DealCard"
import type { Deal } from "@/types/deal"
import dealsData from "@/data/gaming-codes.json"

export const metadata: Metadata = {
  title: "Codes bonus PC et cartes cadeaux gaming | PrixMalin Canada",
  description:
    "Codes bonus PC et cartes cadeaux gaming disponibles au Canada. Offres sélectionnées avec liens affiliés.",
  alternates: { canonical: "/codes-bonus/pc" },
  openGraph: {
    title: "Codes bonus PC | PrixMalin Canada",
    description:
      "Codes bonus PC et cartes cadeaux gaming disponibles au Canada. Offres sélectionnées avec liens affiliés.",
    url: "/codes-bonus/pc",
    type: "website",
  },
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

export default function CodesBonusPcPage() {
  const deals = dealsData as Deal[]
  const jsonLd = deals.map(buildProductJsonLd)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Codes bonus PC 🇨🇦</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Offres sélectionnées de cartes cadeaux et codes gaming au Canada. Liens
          affiliés traçables — aucun surcoût pour vous.
        </p>
      </header>

      <section
        aria-label="Liste des offres"
        className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
      >
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
