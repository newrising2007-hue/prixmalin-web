import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apps — PrixMalin",
  description: "Our free apps: Android now, Windows and Linux later.",
  alternates: {
    canonical: absoluteUrl("/en/apps"),
    languages: {
      fr: absoluteUrl("/applications"),
      en: absoluteUrl("/en/apps"),
    },
  },
};

export default function AppsHubEn() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Apps</h1>
      <p className="mt-3 text-black/70">
        Free software by the PrixMalin developer. Android today, Windows & Linux later.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/en/apps/prixmalin"
          className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm hover:bg-black/5"
        >
          <h2 className="text-lg font-bold">PrixMalin (Android)</h2>
          <p className="mt-2 text-sm text-black/70">
            A product search tool for local and online deals in Canada.
          </p>
          <p className="mt-4 text-sm font-semibold">Open →</p>
        </Link>
      </div>
    </main>
  );
}
