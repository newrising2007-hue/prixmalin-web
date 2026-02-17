import Link from "next/link";
import data from "@/data/gaming-codes.json";

type DealItem = {
  slug: string;
  name: string;
  platform?: string;
  dealPrice?: number;
};

type DataShape = {
  subscriptions: DealItem[];
};

export default function HomePage() {
  const typed = data as unknown as DataShape;
  const deals = typed.subscriptions;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Deals Gaming</h1>

      <p className="mt-2 text-sm text-gray-600">
        Tous les deals disponibles (liens affiliés).
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {deals.map((d, idx) => (
          <li key={`${d.slug ?? "no-slug"}-${idx}`} className="rounded-xl border p-4">
            <Link
              href={`/deals/${d.slug}`}
              className="font-medium underline underline-offset-4"
            >
              {d.name}
            </Link>

            {d.platform ? (
              <p className="mt-1 text-sm text-gray-600">{d.platform}</p>
            ) : null}

            {typeof d.dealPrice === "number" ? (
              <p className="mt-2 text-sm font-semibold">
                {new Intl.NumberFormat("fr-CA", {
                  style: "currency",
                  currency: "CAD",
                }).format(d.dealPrice)}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
