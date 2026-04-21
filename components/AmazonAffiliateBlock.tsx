import React from "react";
import type { AffiliateDeal } from "@/lib/affiliateDeals";

type Props = {
  deals: AffiliateDeal[];
  max?: number;
  title?: string;
  subtitle?: string;
  tagLabel?: string;
  className?: string;
};

export default function AmazonAffiliateBlock({
  deals,
  max = 3,
  title = "🛒 Offres Amazon (liens affiliés)",
  subtitle = "Liens traçables Amazon. Aucun coût supplémentaire pour toi.",
  tagLabel = "Tag : prixmalin20-20",
  className = "",
}: Props) {
  const items = Array.isArray(deals) ? deals.filter(Boolean).slice(0, Math.max(0, max)) : [];
  if (items.length === 0) return null;

  return (
    <div className={`mt-8 rounded-2xl border border-emerald-100 bg-white/70 p-5 shadow-sm ${className}`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <p className="mt-1 text-xs text-gray-600">{subtitle}</p>
        </div>
        <div className="text-xs font-semibold text-emerald-900">{tagLabel}</div>
      </div>

      <div className={`mt-4 grid gap-3 ${items.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {items.map((d) => (
          <a
            key={d.id}
            href={d.affiliateUrl}
            target="_blank"
            rel="nofollow noopener"
            className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
          >
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">{d.title}</div>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                <span className="rounded-full bg-gray-900/5 px-2 py-1">Amazon.ca</span>

                {typeof d.price === "number" ? (
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-900">
                    {d.price.toFixed(2)} {d.currency || "CAD"}
                  </span>
                ) : null}

                {d.availability ? (
                  <span className="rounded-full bg-gray-900/5 px-2 py-1">{String(d.availability)}</span>
                ) : null}
              </div>

              <div className="mt-3 inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition group-hover:bg-emerald-700">
                Acheter sur Amazon →
              </div>
            </div>
          </a>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-gray-500">
        PrixMalin peut recevoir une commission si vous achetez via ces liens.
      </p>
    </div>
  );
}
