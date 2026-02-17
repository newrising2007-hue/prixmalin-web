import Link from "next/link";
import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/site";
import rawData from "@/data/gaming-codes.json";

type SubscriptionDeal = {
  id: string;
  name: string;
  platform?: string;
  duration?: string;
  regularPrice?: number;
  dealPrice?: number;
  discount?: number;
  featured?: boolean;
};

type GamingCodesData = {
  metadata?: {
    currency?: string;
  };
  subscriptions?: SubscriptionDeal[];
};

export const metadata: Metadata = {
  title: "Deals Gaming | PrixMalin",
  description: "Liste des meilleurs deals gaming au Canada (liens affiliés).",
  alternates: {
    canonical: `${getSiteUrl()}/deals`,
  },
};

function formatPrice(price?: number, currency = "CAD") {
  if (typeof price !== "number" || !Number.isFinite(price)) return null;
  return new Intl.NumberFormat("fr-CA", { style: "currency", currency }).format(price);
}

function getData(): GamingCodesData {
  return rawData as unknown as GamingCodesData;
}

export default function DealsPage() {
  const data = getData();
  const currency = data?.metadata?.currency || "CAD";

  const deals = Array.isArray(data.subscriptions) ? data.subscriptions : [];

  const sorted = [...deals].sort((a, b) => {
    const af = a.featured ? 1 : 0;
    const bf = b.featured ? 1 : 0;
    if (af !== bf) return bf - af;

    const ad = typeof a.discount === "number" ? a.discount : 0;
    const bd = typeof b.discount === "number" ? b.discount : 0;
    if (ad !== bd) return bd - ad;

    return a.name.localeCompare(b.name, "fr");
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Deals Gaming</h1>
        <p className="text-sm text-neutral-600">
          Tous les deals disponibles (liens affiliés). Cliquez pour voir le détail.
        </p>
      </header>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {sorted.map((d) => {
          const promo = formatPrice(d.dealPrice, currency);
          const regular = formatPrice(d.regularPrice, currency);

          return (
            <li key={d.id} className="rounded-xl border p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    href={`/deals/${d.id}`}
                    className="font-semibold underline underline-offset-4"
                  >
                    {d.name}
                  </Link>

                  <p className="mt-1 text-xs text-neutral-600">
                    {d.platform ? <span>{d.platform}</span> : null}
                    {d.platform && d.duration ? <span> • </span> : null}
                    {d.duration ? <span>{d.duration}</span> : null}
                  </p>
                </div>

                {typeof d.discount === "number" ? (
                  <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
                    -{d.discount}%
                  </span>
                ) : null}
              </div>

              <div className="mt-3 flex items-baseline gap-3">
                {promo ? <p className="text-lg font-bold">{promo}</p> : <p className="text-sm text-neutral-600">Prix indisponible</p>}
                {regular ? <p className="text-sm text-neutral-500 line-through">{regular}</p> : null}
              </div>

              <div className="mt-4">
                <Link
                  href={`/deals/${d.id}`}
                  className="inline-flex w-full items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-neutral-50"
                >
                  Voir le deal
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
