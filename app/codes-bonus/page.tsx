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
            className="block rounded-lg border border-gray-300 px-6 py-4 text-center font-semibold text-gray-800 hover:bg-gray-100 transition"
          >
            {console.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
