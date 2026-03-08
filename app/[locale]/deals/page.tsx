"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import dealsData from "@/data/deals.json";

type Deal = {
  slug: string;
  intentSlug?: string;
  title: string;
  description: string;
  platform: string;
  type: "abonnement" | "carte-cadeau";
  affiliateUrl: string;
  image: string;
  price: number;
  prixBarre?: number;
  badge?: string;
  actif?: boolean;
};

const PLATFORMS = ["Tous", "Xbox", "PlayStation", "Nintendo"];

const PLATFORM_COLORS: Record<string, string> = {
  Xbox: "bg-green-600 text-white",
  PlayStation: "bg-blue-600 text-white",
  Nintendo: "bg-red-600 text-white",
};

const PLATFORM_FILTERS: Record<string, string> = {
  Tous: "bg-gray-900 text-white",
  Xbox: "bg-green-600 text-white",
  PlayStation: "bg-blue-600 text-white",
  Nintendo: "bg-red-600 text-white",
};

const BADGE_COLORS: Record<string, string> = {
  Populaire: "bg-orange-500 text-white",
  "Meilleur choix": "bg-emerald-600 text-white",
  Nouveau: "bg-green-500 text-white",
  "Deal chaud": "bg-red-500 text-white",
  Exclusif: "bg-purple-600 text-white",
  Complet: "bg-indigo-600 text-white",
};

function DealCard({ deal, tVoirOffre, tAbonnement, tCarteCadeau, tBadges, locale }: { deal: Deal; tVoirOffre: string; tAbonnement: string; tCarteCadeau: string; tBadges: Record<string,string>; locale: string }) {
  const pct =
    deal.prixBarre && deal.prixBarre > deal.price
      ? Math.round(((deal.prixBarre - deal.price) / deal.prixBarre) * 100)
      : null;

  const href = deal.intentSlug ? `/i/${deal.intentSlug}` : deal.affiliateUrl;
  const isExternal = !deal.intentSlug;

  const inner = (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer">
      {deal.badge && (
        <span className={`absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-xs font-bold shadow-sm ${BADGE_COLORS[deal.badge] ?? "bg-gray-700 text-white"}`}>
          {tBadges[deal.badge ?? ""] ?? deal.badge}
        </span>
      )}
      <div className="flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-6 pt-6 pb-3 min-h-[140px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={deal.image}
          alt={deal.title}
          className="h-28 w-full object-contain drop-shadow-sm transition group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${PLATFORM_COLORS[deal.platform] ?? "bg-gray-700 text-white"}`}>
            {deal.platform}
          </span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {deal.type === "abonnement" ? tAbonnement : tCarteCadeau}
          </span>
        </div>
        <h3 className="text-sm font-semibold leading-snug text-gray-900 line-clamp-2">{(deal as any)[`title_${locale}`] || deal.title}</h3>
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{(deal as any)[`description_${locale}`] || deal.description}</p>
        <div className="mt-3 flex items-end gap-1.5">
          <span className="text-xl font-bold text-gray-900">{deal.price.toFixed(2)} $</span>
          {deal.prixBarre && (
            <span className="text-sm text-gray-400 line-through">{deal.prixBarre.toFixed(2)} $</span>
          )}
          {pct && (
            <span className="ml-auto rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">−{pct}%</span>
          )}
        </div>
        <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 py-2 text-center text-sm font-semibold text-blue-900 transition group-hover:bg-blue-100">
          {tVoirOffre}
        </div>
      </div>
    </div>
  );

  if (isExternal) {
    return <a href={href} target="_blank" rel="nofollow sponsored noopener">{inner}</a>;
  }
  return <Link href={href}>{inner}</Link>;
}

function Section({ id, title, deals, tVoirOffre, tAbonnement, tCarteCadeau, tBadges, locale }: { id: string; title: string; deals: Deal[]; tVoirOffre: string; tAbonnement: string; tCarteCadeau: string; tBadges: Record<string,string>; locale: string }) {
  if (deals.length === 0) return null;
  return (
    <div id={id} className="mt-10 scroll-mt-6">
      <h2 className="mb-4 text-base font-bold uppercase tracking-widest text-gray-500">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {deals.map((d) => <DealCard key={d.slug} deal={d} tVoirOffre={tVoirOffre} tAbonnement={tAbonnement} tCarteCadeau={tCarteCadeau} tBadges={tBadges} locale={locale} />)}
      </div>
    </div>
  );
}

export default function DealsPage() {
  const t = useTranslations("deals");
  const locale = useLocale();
  const [filter, setFilter] = useState("Tous");

  const PLATFORM_LABELS: Record<string, string> = {
    Tous: t("tous"),
    Xbox: "Xbox",
    PlayStation: "PlayStation",
    Nintendo: "Nintendo",
  };

  const tBadges: Record<string,string> = {
    "Populaire": t("badge_populaire"),
    "Complet": t("badge_complet"),
    "Meilleur choix": t("badge_meilleur_choix"),
  };

  const allItems = (dealsData.items as Deal[]).filter((d) => d.actif !== false);
  const filtered = filter === "Tous" ? allItems : allItems.filter((d) => d.platform === filter);

  const abonnements = filtered.filter((d) => d.type === "abonnement");
  const cartes = filtered.filter((d) => d.type === "carte-cadeau");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">{t("titre")}</h1>
        <p className="mt-2 text-gray-600">{t("description")}</p>
      </header>

      <div className="flex flex-wrap gap-1.5">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === p
                ? PLATFORM_FILTERS[p]
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {PLATFORM_LABELS[p] ?? p}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 border-b border-gray-100 pb-3">
        {abonnements.length > 0 && (
          <a href="#abonnements" className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 shadow-sm shadow-blue-100 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-200">
            ↓ {t("abonnements")} ({abonnements.length})
          </a>
        )}
        {cartes.length > 0 && (
          <a href="#cartes" className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 shadow-sm shadow-green-100 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-green-200">
            ↓ {t("cartes_cadeaux")} ({cartes.length})
          </a>
        )}
      </div>

      <Section id="abonnements" title={t("section_abonnements")} deals={abonnements} tVoirOffre={t("voir_offre")} tAbonnement={t("abonnement")} tCarteCadeau={t("carte_cadeau")} tBadges={tBadges} locale={locale} />
      <Section id="cartes" title={t("section_cartes")} deals={cartes} tVoirOffre={t("voir_offre")} tAbonnement={t("abonnement")} tCarteCadeau={t("carte_cadeau")} tBadges={tBadges} locale={locale} />

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-gray-500">{t("aucune_offre")}</p>
      )}

      <p className="mt-10 text-center text-xs text-gray-400">{t("affiliation")}</p>
    </main>
  );
}
