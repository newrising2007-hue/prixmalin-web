import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title:
    "Codes bonus PC (2026) : Fortnite, LoL, Valorant, World of Tanks | PrixMalin",
  description:
    "Codes bonus PC au Canada : Fortnite (V-Bucks), League of Legends (RP), Valorant (VP), World of Tanks (premium). Guides d’activation simples + offres recommandées.",
  alternates: { canonical: "/codes-bonus/pc" },
  openGraph: {
    title: "Codes bonus PC | PrixMalin Canada",
    description:
      "Fortnite, League of Legends, Valorant et World of Tanks : codes bonus PC, activation, packs recommandés.",
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
    description:
      "Bonus WOT : or, temps premium, crédits et parfois chars premium selon les offres.",
    bullets: ["Or / crédits", "Temps premium", "Guide d’activation rapide"],
  },
  {
    title: "League of Legends (LoL)",
    href: "/codes-bonus/pc/league-of-legends",
    description:
      "Bonus LoL : RP (Riot Points), packs, skins et promos selon les périodes.",
    bullets: ["Riot Points (RP)", "Skins / capsules (promos)", "Comment activer"],
  },
  {
    title: "Fortnite",
    href: "/codes-bonus/pc/fortnite",
    description:
      "Fortnite : V-Bucks, packs, objets cosmétiques. Activation via Epic Games.",
    bullets: ["V-Bucks", "Packs promotionnels", "Activation Epic"],
  },
  {
    title: "Valorant",
    href: "/codes-bonus/pc/valorant",
    description:
      "Valorant : points (VP), bundles/skins et offres. Activation via Riot Client/compte Riot.",
    bullets: ["Points (VP)", "Bundles / skins", "Activation Riot"],
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
          text: "L’activation dépend du jeu : Epic Games (Fortnite), Riot Client/compte Riot (LoL, Valorant), compte Wargaming (World of Tanks). Les étapes sont détaillées sur chaque page jeu.",
        },
      },
      {
        "@type": "Question",
        name: "Est-ce que les codes bonus PC fonctionnent au Canada ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui dans la majorité des cas, mais certains codes peuvent être limités à une région. Vérifie toujours la compatibilité (Canada/NA) sur la page de l’offre avant d’acheter.",
        },
      },
      {
        "@type": "Question",
        name: "PrixMalin vend-il directement les codes ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Non. PrixMalin sélectionne des offres et renvoie vers des marchands via des liens affiliés. Aucun scraping et pas de comparateur live.",
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
        <h1 className="text-3xl font-bold tracking-tight">
          Codes bonus PC 🇨🇦 (Fortnite, LoL, Valorant, World of Tanks)
        </h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          Tu cherches des <strong>codes bonus PC</strong> au Canada ? Ici tu
          trouveras des pages dédiées aux jeux les plus populaires avec :{" "}
          <strong>ce que ça donne</strong>, <strong>comment l’activer</strong>{" "}
          et des <strong>offres recommandées</strong> (liens affiliés).
        </p>
      </header>

      {/* QUICK NAV */}
      <section aria-label="Jeux PC populaires" className="mb-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                Voir codes & guide
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* UPCOMING GAMES */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Jeux PC à venir</h2>

        <p className="mb-6 max-w-2xl text-gray-600">
          D’autres guides de codes bonus arrivent bientôt pour les jeux populaires
          suivants.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {["Minecraft", "Roblox", "GTA Online", "Call of Duty Warzone"].map(
            (game) => (
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
            )
          )}
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="prose prose-gray max-w-none">
        <h2>Comment fonctionnent les codes bonus PC ?</h2>
        <p>
          Un code bonus PC peut donner accès à des{" "}
          <strong>monnaies premium</strong> (ex : V-Bucks, RP, VP, or), à du{" "}
          <strong>temps premium</strong>, à des <strong>boosts</strong> ou à des{" "}
          <strong>cosmétiques</strong> (skins, packs). L’activation se fait
          presque toujours via le <strong>compte officiel</strong> du jeu ou via
          le <strong>launcher</strong> (Epic, Riot, Wargaming).
        </p>

        <h2>Ce que tu obtiens le plus souvent</h2>
        <ul>
          <li>Monnaie premium (V-Bucks, RP, VP, or)</li>
          <li>Temps premium / abonnements</li>
          <li>Boost XP / bonus temporaires</li>
          <li>Cosmétiques : skins, packs, objets</li>
        </ul>

        <h2>Conseils avant d’acheter un code</h2>
        <p>
          Vérifie toujours : la <strong>région</strong> (Canada/NA), la{" "}
          <strong>plateforme</strong> (PC), et la <strong>source</strong>{" "}
          (marchand officiel ou marketplace fiable). Si une offre semble trop
          belle pour être vraie, évite.
        </p>
      </section>

      <p className="mt-10 text-xs text-gray-500">
        Certains liens sont affiliés. PrixMalin peut recevoir une commission sans
        coût supplémentaire pour vous.
      </p>

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  )
}
