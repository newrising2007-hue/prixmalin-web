import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title:
    "Codes bonus PC (2026) : Fortnite, LoL, Valorant, Minecraft, Roblox, GTA Online, Warzone, CS2, World of Tanks, Warframe",
  description:
    "Codes bonus PC au Canada : Fortnite, League of Legends, Valorant, Minecraft, Roblox, GTA Online, Call of Duty Warzone, Counter-Strike 2 (CS2) et World of Tanks et Warframe. Guides d’activation + offres.",
  alternates: {
  canonical: "https://prixmalin.ca/codes-bonus/pc",
  languages: {
    "fr-CA": "https://prixmalin.ca/codes-bonus/pc",
    "x-default": "https://prixmalin.ca/codes-bonus/pc",
  },
},
  openGraph: {
    title: "Codes bonus PC | PrixMalin Canada",
    description:
      "Fortnite, LoL, Valorant, Minecraft, Roblox, GTA Online, Warzone, CS2 et World of Tanks et Warframe : bonus PC, activation et offres recommandées.",
    url: "https://prixmalin.ca/codes-bonus/pc",
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
    description: "Bonus WOT : or, temps premium et crédits.",
    bullets: ["Or", "Temps premium", "Activation Wargaming"],
  },
  {
    title: "League of Legends (LoL)",
    href: "/codes-bonus/pc/league-of-legends",
    description: "Bonus LoL : Riot Points, skins et promos.",
    bullets: ["RP", "Skins", "Activation Riot"],
  },
  {
    title: "Fortnite",
    href: "/codes-bonus/pc/fortnite",
    description: "Fortnite : V-Bucks et packs cosmétiques.",
    bullets: ["V-Bucks", "Packs", "Activation Epic"],
  },
  {
    title: "Valorant",
    href: "/codes-bonus/pc/valorant",
    description: "Valorant : points VP et bundles.",
    bullets: ["VP", "Bundles", "Activation Riot"],
  },
  {
    title: "Warframe",
    href: "/codes-bonus/pc/warframe",
    description: "Warframe : codes promo gratuits (glyphes) et activation officielle.",
    bullets: ["Codes officiels", "Glyphes", "Activation"],
  },
  {
    title: "Roblox",
    href: "/codes-bonus/pc/roblox",
    description: "Roblox : Robux et Premium.",
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
          text: "L’activation dépend du jeu : Epic, Riot, Microsoft, Roblox, Rockstar, Battle.net/Steam, Steam Wallet ou Wargaming. Les étapes sont détaillées sur chaque page jeu.",
        },
      },
      {
        "@type": "Question",
        name: "Les codes PC fonctionnent-ils au Canada ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui dans la majorité des cas, mais vérifie toujours la compatibilité région (Canada/NA) sur la page de l’offre.",
        },
      },
      {
        "@type": "Question",
        name: "PrixMalin vend-il directement les codes ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Non. PrixMalin sélectionne des offres et renvoie vers des marchands via des liens affiliés.",
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




<div className="mt-4 flex flex-wrap gap-2 text-sm">
  <Link href="/codes-bonus" className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 font-semibold text-emerald-900 shadow-sm shadow-emerald-500/10 transition hover:bg-emerald-100 hover:shadow-md hover:ring-2 hover:ring-emerald-200/60 active:translate-y-px active:shadow-sm">Retour aux consoles</Link>
  <Link href="/codes-bonus/pc" className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-900 shadow-sm shadow-blue-500/10 transition hover:bg-blue-100 hover:shadow-md hover:ring-2 hover:ring-blue-200/60 active:translate-y-px active:shadow-sm">PC</Link>
  <Link href="/codes-bonus/playstation" className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-900 shadow-sm shadow-blue-500/10 transition hover:bg-blue-100 hover:shadow-md hover:ring-2 hover:ring-blue-200/60 active:translate-y-px active:shadow-sm">PlayStation</Link>
  <Link href="/codes-bonus/xbox" className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-900 shadow-sm shadow-blue-500/10 transition hover:bg-blue-100 hover:shadow-md hover:ring-2 hover:ring-blue-200/60 active:translate-y-px active:shadow-sm">Xbox</Link>
  <Link href="/codes-bonus/nintendo" className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-900 shadow-sm shadow-blue-500/10 transition hover:bg-blue-100 hover:shadow-md hover:ring-2 hover:ring-blue-200/60 active:translate-y-px active:shadow-sm">Nintendo</Link>
</div>

        <p className="mt-3 max-w-3xl text-gray-600">
          Guides de codes bonus pour les jeux PC populaires : Fortnite, League of
          Legends, Valorant, Minecraft, Roblox, GTA Online, Call of Duty: Warzone,
          Counter-Strike 2 (CS2), World of Tanks et Warframe.
        </p>
      </header>

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

      <section className="prose prose-gray max-w-none">
        <h2>Comment fonctionnent les codes bonus PC ?</h2>
        <p>
          Les codes bonus PC donnent accès à des monnaies premium (V-Bucks, RP,
          VP, Minecoins, Robux, GTA$, CP) ou à des bonus liés à des événements.
          L’activation se fait via le compte officiel du jeu ou la plateforme.
        </p>

        <h2>Conseils avant d’acheter</h2>
        <ul>
          <li>Vérifier la région (Canada / NA)</li>
          <li>Confirmer la plateforme PC</li>
          <li>Utiliser des marchands fiables</li>
        </ul>
      </section>

      <p className="mt-10 text-xs text-gray-500">
        Certains liens sont affiliés. PrixMalin peut recevoir une commission sans
        coût supplémentaire pour vous.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  )
}
