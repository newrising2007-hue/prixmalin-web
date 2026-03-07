"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

const categoriesSlugs = [
  { icon: "🛒", slug: "epicerie" },
  { icon: "🥩", slug: "boucherie" },
  { icon: "⚡", slug: "electronique" },
  { icon: "🏠", slug: "maison" },
  { icon: "🛋️", slug: "meuble" },
  { icon: "🔧", slug: "quincaillerie" },
  { icon: "🏗️", slug: "renovation" },
  { icon: "👕", slug: "mode" },
  { icon: "💊", slug: "sante" },
  { icon: "🐾", slug: "animaux" },
  { icon: "🏃", slug: "sport" },
  { icon: "🚗", slug: "auto" },
  { icon: "🎨", slug: "loisirs" },
  { icon: "💆", slug: "beaute" },
  { icon: "💻", slug: "bureautique" },
  { icon: "🖥️", slug: "informatique" },
  { icon: "🔞", slug: "intimes" },
];

export default function CategoriesPage() {
  const t = useTranslations("magasins.categories");
  const tMag = useTranslations("magasins");

  return (
    <main className="relative min-h-screen"
      style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(255,255,255,0.97) 45%, rgba(34,197,94,0.08) 100%)" }}>
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">🗂️ {t("titre")}</h1>
          <p className="text-gray-500 text-sm">{t("sous_titre")}</p>
        </div>
        {/* GRILLE */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoriesSlugs.map((cat) => (
            <Link key={cat.slug} href={`/magasins/categorie/${cat.slug}`}
              className="group flex flex-col items-center text-center p-5 rounded-2xl border-2 border-gray-100 bg-white/80 hover:bg-white hover:border-green-300 hover:shadow-lg transition-all duration-200">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
              <span className="font-bold text-gray-800 text-sm leading-tight mb-1">{t(`${cat.slug}.label`)}</span>
              <span className="text-xs text-gray-400 leading-tight hidden sm:block">{t(`${cat.slug}.desc`)}</span>
              <span className="mt-2 text-xs text-green-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{t("explorer")}</span>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/magasins" className="text-sm text-gray-400 hover:text-green-600 transition-colors">{tMag("explorer")} ←</Link>
        </div>
      </div>
    </main>
  );
}
