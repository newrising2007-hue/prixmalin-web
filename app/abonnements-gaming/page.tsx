import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Abonnements Gaming Canada : Xbox Game Pass, PlayStation Plus et Nintendo Online",
  description:
    "Comparez les abonnements gaming au Canada : Xbox Game Pass, PlayStation Plus et Nintendo Switch Online. Trouvez les meilleures offres et options disponibles.",
  keywords: [
    "abonnements gaming Canada",
    "Xbox Game Pass Canada",
    "PlayStation Plus Canada",
    "Nintendo Switch Online Canada",
    "abonnement jeux vidéo Canada",
  ],
  openGraph: {
    title: "Abonnements Gaming Canada",
    description:
      "Découvrez et comparez les abonnements gaming disponibles au Canada.",
    url: "https://prixmalin.ca/abonnements-gaming",
    siteName: "PrixMalin",
    locale: "fr_CA",
    type: "website",
  },
};

export default function AbonnementsGamingPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Abonnements Gaming au Canada
      </h1>

      <p className="mb-8 text-lg">
        Les abonnements gaming permettent d’accéder à des centaines de jeux pour
        un prix mensuel fixe. Voici les principales options disponibles au
        Canada pour Xbox, PlayStation et Nintendo.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Xbox */}
        <Link
          href="/xbox-game-pass"
          className="border rounded-xl p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Xbox Game Pass
          </h2>
          <p className="text-sm text-gray-600">
            Catalogue de jeux Xbox, PC et cloud gaming avec abonnement mensuel.
          </p>

          <div className="mt-4 text-blue-600 font-semibold">
            Voir les offres →
          </div>
        </Link>

        {/* PlayStation */}
        <Link
          href="/playstation-plus"
          className="border rounded-xl p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            PlayStation Plus
          </h2>
          <p className="text-sm text-gray-600">
            Jeux mensuels, multijoueur en ligne et catalogue PlayStation.
          </p>

          <div className="mt-4 text-blue-600 font-semibold">
            Voir les offres →
          </div>
        </Link>

        {/* Nintendo */}
        <Link
          href="/nintendo-switch-online"
          className="border rounded-xl p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Nintendo Switch Online
          </h2>
          <p className="text-sm text-gray-600">
            Multijoueur en ligne et jeux rétro Nintendo inclus.
          </p>

          <div className="mt-4 text-blue-600 font-semibold">
            Voir les offres →
          </div>
        </Link>
      </div>

      <div className="mt-12 pt-6 border-t text-sm text-gray-500">
        PrixMalin peut recevoir une commission si vous achetez via certains liens,
        sans coût supplémentaire pour vous.
      </div>
    </main>
  );
}
