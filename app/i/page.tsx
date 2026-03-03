import { Metadata } from "next";
import Link from "next/link";
import { getAllIntentPages } from "@/lib/intent";

export const metadata: Metadata = {
  title: "Guides Gaming Canada — Meilleurs prix abonnements et cartes cadeaux | PrixMalin",
  description: "Tous nos guides prix pour Xbox, PlayStation et Nintendo au Canada. Abonnements Game Pass, PS Plus, Switch Online et cartes cadeaux en CAD.",
  alternates: {
    canonical: "https://prixmalin.ca/i",
  },
};

const PLATFORM_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  xbox: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  playstation: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  nintendo: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};

function getPlatform(slug: string): string {
  if (slug.includes("xbox") || slug.includes("game-pass")) return "xbox";
  if (slug.includes("playstation") || slug.includes("psn") || slug.includes("ps-plus")) return "playstation";
  if (slug.includes("nintendo") || slug.includes("eshop") || slug.includes("switch")) return "nintendo";
  return "autre";
}

function getPlatformLabel(platform: string): string {
  if (platform === "xbox") return "Xbox";
  if (platform === "playstation") return "PlayStation";
  if (platform === "nintendo") return "Nintendo";
  return "Gaming";
}

export default function IntentIndexPage() {
  const pages = getAllIntentPages();

  const grouped: Record<string, typeof pages> = { xbox: [], playstation: [], nintendo: [] };
  for (const page of pages) {
    const platform = getPlatform(page.slug);
    if (grouped[platform]) grouped[platform].push(page);
    else grouped["nintendo"].push(page);
  }

  const sections = [
    { key: "xbox", label: "🎮 Xbox", emoji: "🟢" },
    { key: "playstation", label: "🎮 PlayStation", emoji: "🔵" },
    { key: "nintendo", label: "🎮 Nintendo", emoji: "🔴" },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
          Guides prix • Canada
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Meilleurs prix gaming au Canada 🎮
        </h1>
        <p className="mt-3 text-base text-gray-600">
          Nos guides complets pour acheter abonnements et cartes cadeaux Xbox, PlayStation et Nintendo au meilleur prix en dollars canadiens.
        </p>
      </header>

      <div className="space-y-12">
        {sections.map(({ key, label }) => {
          const items = grouped[key] ?? [];
          if (items.length === 0) return null;
          const style = PLATFORM_STYLES[key] ?? { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" };

          return (
            <section key={key}>
              <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-gray-900">
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${style.bg} ${style.text} border ${style.border}`}>
                  {getPlatformLabel(key)}
                </span>
                {label.replace("🎮 ", "")}
              </h2>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/i/${page.slug}`}
                    className={`group flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${style.border}`}
                  >
                    <h3 className="font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition">
                      {page.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-500 line-clamp-2 flex-1">
                      {page.metaDescription}
                    </p>
                    <div className={`mt-4 text-xs font-semibold ${style.text}`}>
                      Voir le guide →
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/deals"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          ← Voir toutes les offres gaming
        </Link>
      </div>
    </main>
  );
}
