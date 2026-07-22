"use client";
import AdblockBanner from "@/components/AdblockBanner";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { getApp, getPrimaryDownloadUrl } from "@/lib/appRelease";

export default function MagasinsPage() {
  const t = useTranslations("magasins");
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const [search, setSearch] = useState("");

  const mainSections = [
    {
      icon: "📰",
      label: t("circulaires_label"),
      desc: t("circulaires_desc"),
      href: locale === "fr" ? "/magasins/circulaires" : `/${locale}/magasins/circulaires`,
      glow: "rgba(16,185,129,0.5)",
      gradient: "from-emerald-400/20 to-teal-500/10",
      border: "border-emerald-200 hover:border-emerald-400",
    },

    {
      icon: "🍽️",
      label: t("restaurants_label"),
      desc: t("restaurants_desc"),
      href: locale === "fr" ? "/magasins/restaurants" : `/${locale}/magasins/restaurants`,
      glow: "rgba(5,150,105,0.5)",
      gradient: "from-teal-400/20 to-green-500/10",
      border: "border-teal-200 hover:border-teal-400",
    },
    {
      icon: "🛒",
      label: t("epicerie_label"),
      desc: t("epicerie_desc"),
      href: locale === "fr" ? "/epicerie" : `/${locale}/epicerie`,
      glow: "rgba(16,185,129,0.5)",
      gradient: "from-green-400/20 to-emerald-500/10",
      border: "border-green-200 hover:border-green-400",
    },
  ];


function normalizeQ(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  bijoux: ['bijou','bijoux','bague','collier','bracelet','jonc','or','argent','diamant','pendentif','alliance','medaille','bijouterie','joaillerie','montre','horlogerie'],
  vehicules: ['voiture','auto','camion','moto','motoneige','vtt','quad','bateau','ski-doo','sea-doo','can-am'],
  pieces: ['pneu','frein','filtre a huile','piece auto','amortisseur','courroie','batterie auto'],
  boucherie: ['viande','boeuf','poulet','porc','steak','saucisse','bacon','boucherie','charcuterie'],
  epicerie: ['pain','lait','beurre','fromage','oeuf','yaourt','farine','sucre','epicerie','alimentation'],
  electro: ['telephone','cellulaire','ordinateur','laptop','tablette','television','tele','console','playstation','xbox','nintendo'],
  quincaillerie: ['marteau','tournevis','perceuse','vis','clou','peinture','quincaillerie','hardware'],
  sport: ['velo','ski','raquette','hockey','sport','randonnee','camping'],
  vetements: ['manteau','pantalon','chemise','robe','vetement','chaussure','mode'],
};
function detectCategory(q: string): string {
  const norm = normalizeQ(q);
  for (const [cat, kws] of Object.entries(CATEGORY_KEYWORDS)) {
    if (kws.some(kw => norm.includes(normalizeQ(kw)))) return cat;
  }
  return 'divers';
}
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      const cat = detectCategory(search.trim());
      const prefix = locale === "fr" ? "" : `/${locale}`;
      window.location.href = `${prefix}/magasins/recherche?q=${encodeURIComponent(search.trim())}&cat=${cat}`;
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(255,255,255,0.95) 45%, rgba(34,197,94,0.15) 100%)" }} />
      <div className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: "radial-gradient(800px circle at 10% 20%, rgba(59,130,246,0.08), transparent 60%), radial-gradient(900px circle at 90% 80%, rgba(34,197,94,0.10), transparent 60%)" }} />

      <section className="relative pt-16 pb-10 px-6 text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(circle, rgba(34,197,94,0.6), transparent 70%)" }} />
          <Image src="/prixmalin-logo.webp" alt="PrixMalin" width={110} height={110} className="relative drop-shadow-lg" priority />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">
          {t("hero_titre")}{" "}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #16a34a, #059669)" }}>
            {t("hero_titre_accent")}
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-2">{t("hero_desc")}</p>
        <AdblockBanner message={t("adblock")} />
        <p className="text-sm text-gray-400 mb-8">{t("hero_tags")}</p>
      </section>

      <section className="px-6 pb-14 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Link href={locale === "fr" ? "/magasins/recherche" : `/${locale}/magasins/recherche`}
            className="group relative flex flex-col items-center text-center p-8 rounded-2xl border-2 border-green-200 bg-white/70 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-green-400">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
              style={{ background: "radial-gradient(circle, rgba(34,197,94,0.4), transparent 70%)" }} />
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-500/10 flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform duration-300">🔍</div>
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">{t("recherche_titre")}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">{t("recherche_desc")}</p>
            <p className="text-xs text-green-600 font-medium italic mb-4">{t("recherche_exemple")}</p>
            <span className="px-5 py-2 rounded-xl text-white text-sm font-semibold shadow-sm group-hover:scale-105 transition-transform"
              style={{ background: "linear-gradient(135deg, #16a34a, #059669)" }}>{t("recherche_btn")}</span>
          </Link>
          {mainSections.map((section) => (
            <Link key={section.label} href={section.href}
              className={`group relative flex flex-col items-center text-center p-8 rounded-2xl border-2 bg-white/70 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${section.border}`}>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                style={{ background: `radial-gradient(circle, ${section.glow}, transparent 70%)` }} />
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform duration-300 mb-4`}>
                {section.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">{section.label}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">{section.desc}</p>
              <span className="mt-2 text-green-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">{t("explorer")} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16 max-w-3xl mx-auto text-center">
        <div className="relative rounded-3xl border border-green-100 bg-white/60 backdrop-blur-sm p-10 shadow-sm overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 rounded-br-full opacity-10" style={{ background: "linear-gradient(135deg, #3b82f6, #16a34a)" }} />
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-10" style={{ background: "linear-gradient(315deg, #3b82f6, #16a34a)" }} />
          <div className="relative">
            <span className="text-4xl mb-4 block">🍁</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("mission_titre")}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{t("mission_p1")}</p>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{t("mission_p2")}</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="px-4 py-2 rounded-full bg-green-50 text-green-700 border border-green-100 font-medium">🏪 {t("tag_locaux")}</span>
              <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium">📦 {t("tag_amazon")}</span>
              <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium">📍 {t("tag_gps")}</span>
              <span className="px-4 py-2 rounded-full bg-teal-50 text-teal-700 border border-teal-100 font-medium">🇨🇦 {t("tag_canada")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <div className="rounded-3xl p-8 text-center text-white overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #15803d 100%)" }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative">
            <Image src="/prixmalin-logo.webp" alt="App PrixMalin" width={70} height={70} className="mx-auto mb-4 drop-shadow-lg" />
            <h3 className="text-xl font-bold mb-2">{t("app_titre")}</h3>
            <p className="text-white/80 text-sm mb-4">{t("app_desc")}</p>
            <a
              href={getPrimaryDownloadUrl(getApp("prixmalin")) ?? "/applications/prixmalin"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white font-semibold text-sm backdrop-blur-sm transition hover:bg-white/30"
            >
              {t("app_btn")}
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 max-w-3xl mx-auto text-center">
        <div className="rounded-2xl border border-dashed border-green-200 bg-green-50/50 p-6">
          <p className="text-gray-600 text-sm mb-2">{t("cta_commerce_desc")}</p>
          <a href="mailto:contact@prixmalin.ca?subject=Visibilite commerce"
            className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm hover:underline">
            {t("cta_commerce_btn")}
          </a>
        </div>
      </section>
    </main>
  );
}
