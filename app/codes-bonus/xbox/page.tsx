import type { Metadata } from "next";
import Link from "next/link";
import { XBOX_GAMES as xboxGames } from "@/src/data/codes-bonus/xbox-games";

export const dynamic = "error";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://prixmalin.ca";

export const metadata: Metadata = {
  title: "Codes bonus Xbox (Xbox One/Xbox Series X|S) | PrixMalin",
  description:
    "Codes bonus Xbox : uniquement des codes réels (quand disponibles), avec source et expiration. Canada.",
  alternates: {
    canonical: `${SITE_URL}/codes-bonus/xbox`,
    languages: {
      "fr-CA": `${SITE_URL}/codes-bonus/xbox`,
      "x-default": `${SITE_URL}/codes-bonus/xbox`,
    },
  },
  openGraph: {
    title: "Codes bonus Xbox (Xbox One/Xbox Series X|S) | PrixMalin",
    description:
      "Codes bonus Xbox : uniquement des codes réels (quand disponibles), avec source et expiration. Canada.",
    url: `${SITE_URL}/codes-bonus/xbox`,
    type: "website",
  },
};

type GameCard = {
  title: string;
  href: string;
  description: string;
  bullets: string[];
};

const cards: GameCard[] = xboxGames.map((g) => ({
  title: g.name,
  href: `/codes-bonus/xbox/${g.slug}`,
  description: g.seoDescription ?? `Codes ${g.name} sur Xbox.`,
  bullets: ["Codes réels", "Expiration", "Source"],
}));

function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "PrixMalin affiche-t-il des codes Xbox “réels” ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. On affiche uniquement des codes à entrer (quand disponibles). Pas de méthodes vagues ni de promesses douteuses.",
        },
      },
      {
        "@type": "Question",
        name: "Où entrer un code Xbox ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Selon le jeu, l’activation peut se faire dans le jeu (menu Redeem), sur le site officiel de l’éditeur, ou via le Xbox Store pour les vouchers.",
        },
      },
    ],
  };
}

export default function Page() {
  const faqJsonLd = buildFaqJsonLd();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Codes bonus Xbox (Xbox One/Xbox Series X|S) 🇨🇦</h1>
        <p className="mt-2 max-w-2xl text-neutral-600">
          On liste uniquement des <span className="font-medium">codes réels</span> quand ils existent, avec une source et
          une date d’expiration si disponible.
        </p>

        

<div className="mt-4 flex flex-wrap gap-2 text-sm">
  <Link href="/codes-bonus" className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 font-semibold text-emerald-900 shadow-sm shadow-emerald-500/10 transition hover:bg-emerald-100 hover:shadow-md hover:ring-2 hover:ring-emerald-200/60 active:translate-y-px active:shadow-sm">Retour aux consoles</Link>
  <Link href="/codes-bonus/pc" className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-900 shadow-sm shadow-blue-500/10 transition hover:bg-blue-100 hover:shadow-md hover:ring-2 hover:ring-blue-200/60 active:translate-y-px active:shadow-sm">PC</Link>
  <Link href="/codes-bonus/playstation" className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-900 shadow-sm shadow-blue-500/10 transition hover:bg-blue-100 hover:shadow-md hover:ring-2 hover:ring-blue-200/60 active:translate-y-px active:shadow-sm">PlayStation</Link>
  <span className="rounded-full border border-blue-300 bg-blue-100 px-4 py-2 font-semibold text-blue-950 shadow-sm shadow-blue-500/10">Xbox</span>
  <Link href="/codes-bonus/nintendo" className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-900 shadow-sm shadow-blue-500/10 transition hover:bg-blue-100 hover:shadow-md hover:ring-2 hover:ring-blue-200/60 active:translate-y-px active:shadow-sm">Nintendo</Link>
</div>
      </header>

      <section aria-label="Jeux Xbox avec codes" className="grid gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold">{c.title}</h2>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">XB</span>
            </div>
            <p className="mt-2 text-sm text-neutral-700">{c.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-700">
              {c.bullets.map((b) => (
                <li key={b} className="rounded-full bg-neutral-100 px-3 py-1">
                  {b}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
