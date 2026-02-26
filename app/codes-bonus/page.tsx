// app/codes-bonus/page.tsx
import Link from "next/link";

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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Codes bonus gaming</h1>
      <p className="mb-4 text-gray-700">
        Choisissez votre console pour accéder aux codes bonus et offres gaming.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {consoles.map((console) => (
          <Link
            key={console.slug}
            href={`/codes-bonus/${console.slug}`}
            className="relative overflow-hidden block rounded-xl border bg-white/70 backdrop-blur-sm px-6 py-6 text-center font-semibold text-gray-800 shadow-sm shadow-blue-500/5 transition hover:shadow-md hover:bg-white/80"
          >
            <div className="relative z-10">{console.name}</div>

            {console.slug === "playstation" && (

              <img src="/images/deals/playstation.webp" alt="" className="pointer-events-none absolute right-4 bottom-2 w-20 opacity-25" />

            )}

            {console.slug === "xbox" && (

              <img src="/images/deals/xbox.webp" alt="" className="pointer-events-none absolute right-4 bottom-2 w-14 opacity-25" />

            )}

            {console.slug === "nintendo" && (

              <img src="/images/deals/nintendo.webp" alt="" className="pointer-events-none absolute right-4 bottom-2 w-20 opacity-25" />

            )}

            {console.slug === "pc" && (

              <div className="pointer-events-none absolute right-4 bottom-2 text-3xl opacity-20">🖥️</div>

            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
