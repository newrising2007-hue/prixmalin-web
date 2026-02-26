import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Xbox Game Pass Canada : Abonnements et Offres",
  description:
    "Hub Xbox Game Pass au Canada : options Ultimate, Core et PC Game Pass. Pages détaillées à venir.",
  openGraph: {
    title: "Xbox Game Pass Canada",
    description:
      "Hub Xbox Game Pass au Canada : options Ultimate, Core et PC Game Pass.",
    url: "https://prixmalin.ca/xbox-game-pass",
    siteName: "PrixMalin",
    locale: "fr_CA",
    type: "website",
  },
};

export default function XboxGamePassHubPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Xbox Game Pass Canada</h1>

      <p className="mb-8 text-lg">
        Cette page regroupe les options Xbox Game Pass disponibles au Canada.
        Les pages détaillées (prix, différences, offres) seront ajoutées bientôt.
      </p>

      <div className="grid gap-4">
        <Link
          href="/xbox-game-pass-ultimate-canada"
          className="border rounded-xl p-5 hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold">Game Pass Ultimate</h2>
          <p className="text-sm text-gray-600">
            Console + PC + cloud + avantages inclus.
          </p>
          <div className="mt-3 text-blue-600 font-semibold">Voir →</div>
        </Link>

        <div className="border rounded-xl p-5 opacity-90">
          <h2 className="text-lg font-semibold">Game Pass Core</h2>
          <p className="text-sm text-gray-600">
            Placeholder — page détaillée à venir.
          </p>
        </div>

        <div className="border rounded-xl p-5 opacity-90">
          <h2 className="text-lg font-semibold">PC Game Pass</h2>
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
