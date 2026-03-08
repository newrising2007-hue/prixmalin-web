import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NINTENDO_GAMES as nintendoGames } from "@/src/data/codes-bonus/nintendo-games";

export const dynamic = "force-static";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://prixmalin.ca";

export const metadata: Metadata = {
  title: "Codes bonus Nintendo (Switch) | PrixMalin",
  description:
    "Codes bonus Nintendo : uniquement des codes réels (quand disponibles), avec source et expiration. Canada.",
  alternates: {
    canonical: `${SITE_URL}/codes-bonus/nintendo`,
    languages: {
      "fr-CA": `${SITE_URL}/codes-bonus/nintendo`,
      "x-default": `${SITE_URL}/codes-bonus/nintendo`,
    },
  },
  openGraph: {
    title: "Codes bonus Nintendo (Switch) | PrixMalin",
    description:
      "Codes bonus Nintendo : uniquement des codes réels (quand disponibles), avec source et expiration. Canada.",
    url: `${SITE_URL}/codes-bonus/nintendo`,
    type: "website",
  },
};

type GameCard = {
  title: string;
  href: string;
  description: string;
  bullets: string[];
};

const cards: GameCard[] = nintendoGames.map((g) => ({
  title: g.name,
  href: `/codes-bonus/nintendo/${g.slug}`,
  description: g.seoDescription ?? `Codes ${g.name} sur Nintendo.`,
  bullets: ["codes_reels_bullet", "expiration_bullet", "source_bullet"],
}));

function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "PrixMalin affiche-t-il des codes Nintendo “réels” ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. On affiche uniquement des codes à entrer (quand disponibles). Pas de méthodes vagues ni de promesses douteuses.",
        },
      },
      {
        "@type": "Question",
        name: "Où entrer un code Nintendo ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Selon le jeu, l’activation peut se faire dans le jeu (menu Redeem), sur le site officiel de l’éditeur, ou via le Nintendo Store pour les vouchers.",
        },
      },
    ],
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "codes_bonus" });
  const faqJsonLd = buildFaqJsonLd();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("titre_nintendo")} 🇨🇦
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-600">
          On liste uniquement des{" "}
          <span className="font-medium">codes réels</span> quand ils existent,
          avec une source et une date d’expiration si disponible.
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <Link
            href="/codes-bonus"
            className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 font-semibold text-emerald-900 shadow-sm shadow-emerald-500/10 transition hover:bg-emerald-100 hover:shadow-md hover:ring-2 hover:ring-emerald-200/60 active:translate-y-px active:shadow-sm"
          >
            {t("retour_consoles")}
          </Link>
          <Link
            href="/codes-bonus/pc"
            className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-900 shadow-sm shadow-blue-500/10 transition hover:bg-blue-100 hover:shadow-md hover:ring-2 hover:ring-blue-200/60 active:translate-y-px active:shadow-sm"
          >
            PC
          </Link>
          <Link
            href="/codes-bonus/playstation"
            className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-900 shadow-sm shadow-blue-500/10 transition hover:bg-blue-100 hover:shadow-md hover:ring-2 hover:ring-blue-200/60 active:translate-y-px active:shadow-sm"
          >
            PlayStation
          </Link>
          <Link
            href="/codes-bonus/xbox"
            className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-900 shadow-sm shadow-blue-500/10 transition hover:bg-blue-100 hover:shadow-md hover:ring-2 hover:ring-blue-200/60 active:translate-y-px active:shadow-sm"
          >
            Xbox
          </Link>
          <span className="rounded-full border border-blue-300 bg-blue-100 px-4 py-2 font-semibold text-blue-950 shadow-sm shadow-blue-500/10">
            Nintendo
          </span>
        </div>
      </header>

      <section
        aria-label="Jeux Nintendo avec codes"
        className="grid gap-4 md:grid-cols-2"
      >
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/70 p-5 shadow-sm shadow-blue-500/10 backdrop-blur-sm transition will-change-transform hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-500/15 hover:ring-2 hover:ring-blue-200/60 hover:bg-white/80 active:translate-y-px active:shadow-sm"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -left-12 -top-12 h-56 w-56 rounded-full blur-3xl opacity-25 transition group-hover:opacity-35"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(239,68,68,0.20), transparent 65%)",
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-16 -bottom-16 h-72 w-72 rounded-full blur-3xl opacity-15 transition group-hover:opacity-25"
              style={{
                background:
                  "radial-gradient(circle at 70% 70%, rgba(59,130,246,0.18), transparent 65%)",
              }}
            />
            <img
              src="/prixmalin-logo.webp"
              alt=""
              loading="lazy"
              className="pointer-events-none absolute -right-20 -bottom-20 w-72 opacity-20 transition duration-300 group-hover:opacity-30"
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold">{c.title}</h2>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  NS
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-700">{c.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-700">
                {c.bullets.map((b) => (
                  <li key={b} className="rounded-full bg-neutral-100 px-3 py-1">
                    {b === "codes_reels_bullet" ? t("codes_reels") : b === "expiration_bullet" ? t("expiration") : t("source")}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}
