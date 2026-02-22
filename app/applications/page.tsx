import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Applications — PrixMalin",
  description: "Nos applications gratuites : Android maintenant, Windows et Linux bientôt.",
  alternates: {
    canonical: absoluteUrl("/applications"),
    languages: {
      fr: absoluteUrl("/applications"),
      en: absoluteUrl("/en/apps"),
    },
  },
};

export default function ApplicationsHubFr() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Applications</h1>
      <p className="mt-3 text-black/70">
        Nos logiciels gratuits. Android maintenant, Windows & Linux plus tard.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/applications/prixmalin"
          className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm hover:bg-black/5"
        >
          <h2 className="text-lg font-bold">PrixMalin (Android)</h2>
          <p className="mt-2 text-sm text-black/70">
            Outil de recherche de produits local et web au Canada.
          </p>
          <p className="mt-4 text-sm font-semibold">Voir la page →</p>
        </Link>
      </div>
    </main>
  );
}
