import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PlayStation Plus Canada : Abonnements et Offres",
  description:
    "Hub PlayStation Plus au Canada : Essential, Extra et Premium. Pages détaillées à venir.",
  openGraph: {
    title: "PlayStation Plus Canada",
    description:
      "Hub PlayStation Plus au Canada : Essential, Extra et Premium.",
    url: "https://prixmalin.ca/playstation-plus",
    siteName: "PrixMalin",
    locale: "fr_CA",
    type: "website",
  },
};

export default function PlayStationPlusHubPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">PlayStation Plus Canada</h1>

      <p className="mb-8 text-lg">
        Cette page regroupe les options PlayStation Plus disponibles au Canada.
        Les pages détaillées seront ajoutées prochainement.
      </p>

      <div className="grid gap-4">
        <div className="border rounded-xl p-5">
          <h2 className="text-lg font-semibold">PlayStation Plus Essential</h2>
          <p className="text-sm text-gray-600">
            Placeholder — page détaillée à venir.
          </p>
        </div>

        <div className="border rounded-xl p-5">
          <h2 className="text-lg font-semibold">PlayStation Plus Extra</h2>
          <p className="text-sm text-gray-600">
            Placeholder — page détaillée à venir.
          </p>
        </div>

        <div className="border rounded-xl p-5">
          <h2 className="text-lg font-semibold">PlayStation Plus Premium</h2>
          <p className="text-sm text-gray-600">
            Placeholder — page détaillée à venir.
          </p>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t">
        <Link href="/abonnements-gaming" className="text-blue-600 hover:underline">
          ← Retour aux abonnements gaming
        </Link>
      </div>
    </main>
  );
}
