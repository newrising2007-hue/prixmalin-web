export const dynamic = "force-static";
import Image from "next/image";
// app/codes-bonus/page.tsx
import Link from "next/link";
import codesData from "@/src/data/bonus-codes/codes.json";

function countActiveCodes(platform: string): number {
  const today = new Date().toISOString().slice(0, 10);
  return (codesData as any[]).filter((c) => {
    if (c.isActive === false) return false;
    if (c.expiresAtISO && c.expiresAtISO < today) return false;
    return c.platform === platform;
  }).length;
}

export const metadata = {
  title: "Codes bonus gaming | PrixMalin",
  description: "Retrouvez tous les codes bonus pour PC, PlayStation, Xbox et Nintendo.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/codes-bonus",
    languages: {
      "fr-CA": "/codes-bonus",
      "x-default": "/codes-bonus",
    },
  },
};

export default function CodesBonusHub() {
  const consoles = [
    { name: "PC", slug: "pc" },
    { name: "PlayStation", slug: "playstation" },
    { name: "Xbox", slug: "xbox" },
    { name: "Nintendo", slug: "nintendo" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 pt-10">
      <div className="mb-6 flex items-start justify-between gap-4">
  <h1 className="text-3xl font-bold">Codes bonus gaming</h1>
  <a href="mailto:contact@prixmalin.ca?subject=Soumission%20code%20gaming&body=Plateforme:%0AJeu:%0ACode:%0AR%C3%A9gion:%0AExpiration:" className="shrink-0 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-green-200">📩 Soumettre un code</a>
</div>
      <p className="mb-4 text-gray-700">
        Choisissez votre console pour accéder aux codes bonus et offres gaming.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {consoles.map((console) => (
          <Link
            key={console.slug}
            href={`/codes-bonus/${console.slug}`}
            className="group relative overflow-hidden block rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur-sm px-6 py-6 text-center font-semibold text-neutral-900 shadow-md shadow-blue-500/10 transition will-change-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/15 hover:ring-2 hover:ring-blue-200/60 hover:bg-white/80 active:translate-y-px active:shadow-sm"
          >
            <div className="relative z-10 flex flex-col items-start gap-1">
              <span>{console.name}</span>
              <span className="text-xs font-semibold text-blue-500/80">
                {countActiveCodes(console.slug)} codes actifs
              </span>
            </div>

{console.slug === "playstation" && (
  <span
    aria-hidden
    className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full blur-2xl opacity-30 transition group-hover:opacity-45"
    style={{
      background:
        "radial-gradient(circle at 30% 30%, rgba(236,72,153,0.32), transparent 65%)",
    }}
  />
)}
{console.slug === "xbox" && (
  <span
    aria-hidden
    className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full blur-2xl opacity-30 transition group-hover:opacity-45"
    style={{
      background:
        "radial-gradient(circle at 30% 30%, rgba(34,197,94,0.32), transparent 65%)",
    }}
  />
)}
{console.slug === "nintendo" && (
  <span
    aria-hidden
    className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full blur-2xl opacity-30 transition group-hover:opacity-45"
    style={{
      background:
        "radial-gradient(circle at 30% 30%, rgba(239,68,68,0.32), transparent 65%)",
    }}
  />
)}
{console.slug === "pc" && (
  <span
    aria-hidden
    className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full blur-2xl opacity-25 transition group-hover:opacity-40"
    style={{
      background:
        "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.35), transparent 65%)",
    }}
  />
)}


            {console.slug === "playstation" && (

              <Image src="/images/deals/playstation.webp" alt="" width={80} height={80} className="pointer-events-none absolute right-4 bottom-2 w-20 opacity-40 brightness-95 saturate-110 drop-shadow-sm group-hover:opacity-80 group-hover:brightness-95 transition" />

            )}

            {console.slug === "xbox" && (

              <Image src="/images/deals/xbox.webp" alt="" width={56} height={56} className="pointer-events-none absolute right-4 bottom-4 w-14 opacity-40 brightness-95 saturate-110 drop-shadow-sm group-hover:opacity-80 group-hover:brightness-95 transition" />

            )}

            {console.slug === "nintendo" && (

              <Image src="/images/deals/nintendo.webp" alt="" width={80} height={80} className="pointer-events-none absolute right-4 bottom-4 w-20 opacity-40 brightness-95 saturate-110 drop-shadow-sm group-hover:opacity-80 group-hover:brightness-95 transition" />

            )}

            {console.slug === "pc" && (

              <div className="pointer-events-none absolute right-4 bottom-3 text-5xl opacity-50 drop-shadow-sm group-hover:opacity-70 transition">🖥️</div>

            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
