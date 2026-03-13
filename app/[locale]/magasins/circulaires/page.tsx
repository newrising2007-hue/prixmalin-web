"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import circulairesData from "@/data/circulaires.json";

const CATEGORIE_COLORS: Record<string, { bg: string; border: string; text: string; pill: string }> = {
  alimentation:  { bg: "hover:bg-green-50",   border: "hover:border-green-400",  text: "text-green-700",  pill: "bg-green-100 text-green-700" },
  pharmacie:     { bg: "hover:bg-blue-50",    border: "hover:border-blue-400",   text: "text-blue-700",   pill: "bg-blue-100 text-blue-700" },
  quincaillerie: { bg: "hover:bg-orange-50",  border: "hover:border-orange-400", text: "text-orange-700", pill: "bg-orange-100 text-orange-700" },
  meuble:        { bg: "hover:bg-amber-50",   border: "hover:border-amber-400",  text: "text-amber-700",  pill: "bg-amber-100 text-amber-700" },
  bureautique:   { bg: "hover:bg-purple-50",  border: "hover:border-purple-400", text: "text-purple-700", pill: "bg-purple-100 text-purple-700" },
  animaux:       { bg: "hover:bg-pink-50",    border: "hover:border-pink-400",   text: "text-pink-700",   pill: "bg-pink-100 text-pink-700" },
  general:       { bg: "hover:bg-gray-50",    border: "hover:border-gray-400",   text: "text-gray-700",   pill: "bg-gray-100 text-gray-700" },
};

const CATEGORIE_CLES: Record<string, string> = {
  alimentation:  "cat_alimentation",
  pharmacie:     "cat_pharmacie",
  quincaillerie: "cat_quincaillerie",
  meuble:        "cat_meuble",
  bureautique:   "cat_bureautique",
  animaux:       "cat_animaux",
  general:       "cat_general",
};

export default function CirculairesPage() {
  const t = useTranslations("magasins.circulaires");
  const [search, setSearch] = useState("");
  const [categorieActive, setCategorieActive] = useState<string | null>(null);
  const { circulaires } = circulairesData as any;

  const categories = Array.from(
    new Set(circulaires.filter((c: any) => c.actif && c.categorie).map((c: any) => c.categorie))
  ) as string[];

  const filtered = circulaires.filter((c: any) => {
    if (!c.actif) return false;
    if (search && !c.nom.toLowerCase().includes(search.toLowerCase())) return false;
    if (categorieActive && c.categorie !== categorieActive) return false;
    return true;
  });

  const totalActif = circulaires.filter((c: any) => c.actif).length;

  return (
    <main className="relative min-h-screen" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(255,255,255,0.98) 50%, rgba(34,197,94,0.06) 100%)" }}>
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* HERO */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">📰 {t("titre")}</h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">{t("sous_titre")}</p>
          <a href="mailto:contact@prixmalin.ca" className="inline-block mt-2 text-sm font-semibold text-green-700 hover:underline">
            {t("proposer")}
          </a>
        </div>

        {/* RECHERCHE */}
        <div className="relative mb-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t("placeholder")}
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-base shadow-sm bg-white"
          />
          {search && (
            <button onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl">✕</button>
          )}
        </div>

        {/* FILTRES CATÉGORIES */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setCategorieActive(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${
              categorieActive === null
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
          >
            {t("toutes")} ({totalActif})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategorieActive(cat === categorieActive ? null : cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${
                categorieActive === cat
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {t(CATEGORIE_CLES[cat] ?? "cat_general")}
            </button>
          ))}
        </div>

        {/* COMPTEUR */}
        <p className="text-xs text-gray-400 mb-5 text-center">
          {filtered.length <= 1
            ? t("compteur_simple", { count: filtered.length })
            : t("compteur_simple_pluriel", { count: filtered.length })}
          {search && <span> {t("compteur_pour")} <strong>"{search}"</strong></span>}
        </p>

        {/* GRILLE 3 COLONNES */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-semibold">{t("aucun_titre")} <strong>"{search}"</strong></p>
            <p className="text-sm mt-2">
              {t("aucun_proposer")}{" "}
              <a href="mailto:contact@prixmalin.ca" className="text-green-600 hover:underline">{t("aucun_proposer_lien")}</a>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filtered.map((c: any, i: number) => {
              const colors = CATEGORIE_COLORS[c.categorie] ?? CATEGORIE_COLORS.general;
              const catLabel = c.categorie
                ? t(CATEGORIE_CLES[c.categorie] ?? "cat_general").replace(/^\S+\s/, "")
                : null;
              return (
                <a
                  key={i}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    relative flex flex-col items-center justify-between
                    bg-white rounded-2xl border-2 border-gray-100 p-4
                    transition-all duration-200 group
                    ${colors.bg} ${colors.border}
                    hover:shadow-lg hover:-translate-y-1
                  `}
                  style={{ minHeight: "160px" }}
                >
                  {/* BADGE CATÉGORIE */}
                  {catLabel && (
                    <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.pill}`}>
                      {catLabel}
                    </span>
                  )}

                  {/* LOGO ou EMOJI */}
                  <div className="flex-1 flex items-center justify-center w-full py-2 mt-3">
                    {c.logo ? (
                      <div className="relative w-28 h-14 transition-transform duration-200 group-hover:scale-105">
                        <Image
                          src={c.logo}
                          alt={c.nom}
                          fill
                          className="object-contain"
                          sizes="112px"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-4xl transition-transform duration-200 group-hover:scale-110">{c.emoji}</span>
                        <span className="text-xs font-semibold text-gray-600 text-center">{c.nom}</span>
                      </div>
                    )}
                  </div>

                  {/* NOM + DATE */}
                  <div className="w-full flex items-end justify-between mt-2">
                    <span className={`text-xs font-bold ${colors.text} truncate max-w-[60%]`}>
                      {c.nom}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                      ✓ {c.date_verification ?? "—"}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-12 rounded-2xl border border-gray-100 bg-white/60 p-6 text-center">
          <p className="text-xs text-gray-400 leading-relaxed">
            {t("footer")}{" "}
            <a href="mailto:contact@prixmalin.ca" className="text-green-600 hover:underline font-semibold">
              {t("footer_lien")}
            </a>
          </p>
        </div>

        <div className="mt-6 text-center">
          <a href="/magasins" className="text-sm text-gray-400 hover:text-green-600 transition-colors">{t("retour")}</a>
        </div>

      </div>
    </main>
  );
}
