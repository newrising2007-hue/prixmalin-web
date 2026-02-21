import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Abonnement gaming pas cher Canada : comparatif",
  description:
    "Comparatif des abonnements gaming au Canada : PlayStation Plus, Xbox Game Pass et Nintendo Online pour payer moins cher.",
  alternates: {
    canonical: "/abonnement-gaming-pas-cher",
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">

      <h1 className="text-3xl font-bold">
        Abonnement gaming pas cher Canada
      </h1>

      {/* Intro */}
      <section className="rounded-2xl border p-6">
        <p className="text-sm">
          Les abonnements gaming permettent d’accéder à des jeux, au multijoueur
          en ligne et à des avantages exclusifs. Selon la plateforme, il existe
          plusieurs options pour payer moins cher.
        </p>
      </section>

      {/* Comparatif */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Comparatif des abonnements
        </h2>

        <table className="mt-4 w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Service</th>
              <th className="p-2 text-left">Prix indicatif</th>
              <th className="p-2 text-left">Plateforme</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-2">PlayStation Plus</td>
              <td className="p-2">≈ 95 CAD / an</td>
              <td className="p-2">PlayStation</td>
            </tr>

            <tr className="border-t">
              <td className="p-2">Xbox Game Pass</td>
              <td className="p-2">≈ 20 CAD / mois</td>
              <td className="p-2">Xbox / PC</td>
            </tr>

            <tr className="border-t">
              <td className="p-2">Nintendo Switch Online</td>
              <td className="p-2">≈ 25 CAD / an</td>
              <td className="p-2">Nintendo</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Guides */}
      <section className="rounded-2xl bg-gray-50 p-6 space-y-3">
        <h2 className="text-xl font-semibold">
          Guides pour payer moins cher
        </h2>

        <div className="flex flex-col gap-2">

          <Link
            href="/playstation-plus-pas-cher-canada"
            className="font-semibold underline"
          >
            PlayStation Plus pas cher →
          </Link>

          <Link
            href="/xbox-game-pass-pas-cher-canada"
            className="font-semibold underline"
          >
            Xbox Game Pass pas cher →
          </Link>

          <Link
            href="/nintendo-switch-online-pas-cher-canada"
            className="font-semibold underline"
          >
            Nintendo Online pas cher →
          </Link>

        </div>
      </section>

      {/* Conclusion */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Quel abonnement choisir ?
        </h2>

        <p className="mt-2 text-sm">
          Xbox Game Pass est souvent le plus complet avec un grand catalogue
          de jeux. PlayStation Plus offre un bon équilibre, tandis que
          Nintendo Online reste le moins cher pour jouer en ligne.
        </p>
      </section>

    </main>
  );
}
