import { redirect } from "next/navigation";
if (process.env.NODE_ENV !== "development") redirect("/");

import AmazonAffiliateBlock from "@/components/AmazonAffiliateBlock";
import { getAffiliateDealsByPlatform } from "@/lib/affiliateDeals";

export const metadata = {
  title: "Test affiliation Amazon | PrixMalin",
  description: "Page interne de test pour valider le bloc de cartes Amazon (affiliation).",
  robots: { index: false, follow: false },
};

export default function TestAffiliatePage() {
  const xboxDeals = getAffiliateDealsByPlatform("xbox");
  const psDeals = getAffiliateDealsByPlatform("playstation");
  const nintendoDeals = getAffiliateDealsByPlatform("nintendo");

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">Test — Cartes affiliation Amazon</h1>
      <p className="mt-2 text-sm text-gray-600">
        Page de test (noindex). Objectif : vérifier rendu, liens et perf sans toucher aux pages guides.
      </p>

      <AmazonAffiliateBlock deals={xboxDeals} title="Offres Xbox sur Amazon.ca" max={3} />
      <AmazonAffiliateBlock deals={psDeals} title="Offres PlayStation sur Amazon.ca" max={3} />
      <AmazonAffiliateBlock deals={nintendoDeals} title="Offres Nintendo sur Amazon.ca" max={3} />
    </main>
  );
}
