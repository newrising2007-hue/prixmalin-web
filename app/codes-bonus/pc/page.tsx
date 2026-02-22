import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title:
    "Codes bonus PC (2026) : Fortnite, LoL, Valorant, Minecraft, Roblox, World of Tanks | PrixMalin",
  description:
    "Codes bonus PC au Canada : Fortnite (V-Bucks), League of Legends (RP), Valorant (VP), Minecraft (Minecoins), Roblox (Robux), World of Tanks. Guides d’activation + offres.",
  alternates: { canonical: "/codes-bonus/pc" },
  openGraph: {
    title: "Codes bonus PC | PrixMalin Canada",
    description:
      "Fortnite, LoL, Valorant, Minecraft, Roblox et World of Tanks : bonus PC, activation et offres recommandées.",
    url: "/codes-bonus/pc",
    type: "website",
  },
}

type GameCard = {
  title: string
  href: string
  description: string
  bullets: string[]
}

const games: GameCard[] = [
  {
    title: "World of Tanks",
    href: "/codes-bonus/pc/world-of-tanks",
    description: "Bonus WOT : or, temps premium, crédits et parfois chars premium.",
    bullets: ["Or / crédits", "Temps premium", "Guide rapide"],
  },
  {
    title: "League of Legends (LoL)",
    href: "/codes-bonus/pc/league-of-legends",
    description: "Bonus LoL : RP (Riot Points), packs, skins et promos.",
    bullets: ["Riot Points (RP)", "Skins", "Activation Riot"],
  },
  {
    title: "Fortnite",
    href: "/codes-bonus/pc/fortnite",
    description: "Fortnite : V-Bucks, packs, objets cosmétiques.",
    bullets: ["V-Bucks", "Packs", "Activation Epic"],
  },
  {
    title: "Valorant",
    href: "/codes-bonus/pc/valorant",
    description: "Valorant : points VP, bundles et skins.",
    bullets: ["Points (VP)", "Bundles", "Activation Riot"],
  },
  {
    title: "Minecraft",
    href: "/codes-bonus/pc/minecraft",
    description: "Minecraft : Minecoins, Realms et contenus Marketplace.",
    bullets: ["Minecoins", "Realms", "Activation Microsoft"],
  },
  {
    title: "Roblox",
    href: "/codes-bonus/pc/roblox",
    description: "Roblox : Robux, Premium et codes promo d’accessoires.",
    bullets: ["Robux", "Premium", "Activation web"],
  },
]

function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Où activer un code bonus sur PC ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L’activation dépend du jeu : Epic Games (Fortnite), Riot (LoL, Valorant), Microsoft/Minecraft, Roblox (Redeem), Wargaming (World of Tanks). Les étapes sont détaillées sur chaque page.",
        },
      },
      {
        "@type": "Question",
        name: "Les codes PC fonctionnent-ils au Canada ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui dans la plupart des cas, mais vérifie toujours la compatibilité région (Canada/NA) avant achat.",
        },
      },
      {
        "@type": "Question",
        name: "PrixMalin vend-il directement les codes ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Non. PrixMalin sélectionne des offres et redirige vers des marchands via des liens affiliés.",
        },
      },
    ],
  }
}

export default function CodesBonusPcHubPage() {
  const faqJsonLd = buildFaqJsonLd()

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Codes bonus PC 🇨🇦</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          Guides de codes bonus pour les jeux PC populaires : Fortnite, League of
          Legends, Valorant, Minecraft, Roblox et World of Tanks. Découvrez ce
          que vous obtenez, comment activer et les offres recommandées.
        </p>
      </header>

      {/* JEUX PRINCIPAUX */}
      <section aria-label="Jeux PC populaires" className="mb-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-lg font-semibold">{g.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{g.description}</p>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
                {g.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <div className="mt-5 inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                Voir guide
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* JEUX À VENIR */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Jeux PC à venir</h2>

        <p className="mb-6 max-w-2xl text-gray-600">
          D’autres guides arrivent bientôt pour les jeux suivants.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {["GTA Online", "Call of Duty Warzone"].map((game) => (
            <div
              key={game}
              className="rounded-2xl border bg-gray-50 p-5 opacity-80"
            >
              <h3 className="font-semibold">{game}</h3>
              <p className="mt-2 text-sm text-gray-600">Guide en préparation.</p>

              <span className="mt-4 inline-block rounded-full bg-gray-300 px-3 py-1 text-xs">
                Bientôt disponible
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="prose prose-gray max-w-none">
        <h2>Comment fonctionnent les codes bonus PC ?</h2>
        <p>
          Les codes bonus PC permettent d’obtenir des monnaies premium (V-Bucks,
          RP, VP, Minecoins, Robux, or), du temps premium ou des contenus
          cosmétiques. L’activation se fait généralement via le compte officiel
          du jeu ou le launcher correspondant.
        </p>

        <h2>Conseils avant d’acheter</h2>
        <ul>
          <li>Vérifier la région (Canada / NA)</li>
          <li>Confirmer la plateforme PC</li>
          <li>Utiliser des marchands fiables</li>
        </ul>
      </section>

      <p className="mt-10 text-xs text-gray-500">
        Certains liens sont affiliés. PrixMalin peut recevoir une commission
        sans coût supplémentaire pour vous.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  )
}
