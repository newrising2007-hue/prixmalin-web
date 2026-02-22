import type { Metadata } from "next";
import Link from "next/link";
import { getPcGame, getPcGameSlugs } from "@/src/data/codes-bonus/pc-games";

type PageProps = {
  params: Promise<{ game: string }>;
};

export function generateStaticParams() {
  return getPcGameSlugs().map((slug) => ({ game: slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { game } = await params;
  const data = getPcGame(game);

  if (!data) return {};

  return {
    title: data.title,
    description: data.seoDescription,
  };
}

export default async function PcGamePage({ params }: PageProps) {
  const { game } = await params;
  const data = getPcGame(game);

  if (!data) return <div>Not found</div>;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">{data.title}</h1>

      <p className="mt-4">{data.hero.subtitle}</p>

      {/* Offres */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Offres recommandées</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {data.offers.map((o) => (
            <a
              key={o.id}
              href={o.href}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="border p-4 rounded-xl"
            >
              <h3 className="font-semibold">{o.title}</h3>
              <p className="text-sm mt-2">{o.description}</p>
              <span className="inline-block mt-3 bg-black text-white px-3 py-1 rounded">
                {o.ctaLabel}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Codes actifs */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Codes bonus actifs</h2>

        <div className="mt-4 space-y-4">
          {data.activeCodes.map((c) => (
            <div key={c.id} className="border p-4 rounded-xl">
              <h3 className="font-semibold">{c.title}</h3>
              <p className="text-sm mt-2">{c.description}</p>

              {c.code && (
                <div className="mt-3 bg-gray-100 p-2 rounded font-mono">
                  {c.code}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="mt-10 space-y-4">
        {data.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <div className="mt-10 space-y-10">
        {data.sections.map((s) => (
          <section key={s.id}>
            <h2 className="text-xl font-bold">{s.h2}</h2>
            {s.body.map((b) => (
              <p key={b} className="mt-2">
                {b}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
