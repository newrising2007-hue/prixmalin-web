"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("accueil");

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* HEADER */}
      <header className="relative z-10 mx-auto max-w-5xl px-6 pt-14 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {t("titre")}
        </h1>
        <p className="mt-4 text-base text-gray-600 sm:text-lg">
          {t("description")}
        </p>
      </header>


      {/* SECTION PARTENAIRES */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-4">
        <h2 className="text-center text-2xl font-bold mb-6">
          🏅 <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">{t("partenaires_titre")}</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-6">

          {/* Bergeron Électronique */}
          <Link href="/partenaires/bergerons" className="group flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl opacity-60 animate-pulse group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src="/partenaires/bergerons/logo.png"
                alt="Bergeron Électronique — Circulaire"
                width={180}
                height={60}
                className="relative transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
              />
            </div>
          </Link>
        </div>
      </section>
      {/* SECTION GAMING */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-blue-50/40 to-blue-100/30" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-blue-700 sm:text-3xl">
            {t("gaming_titre")}
          </h2>
          <p className="mt-3 text-gray-600">
            {t("gaming_description")}
          </p>
          <ul className="mt-4 space-y-1 text-sm text-gray-600">
            <li>• {t("gaming_item1")}</li>
            <li>• {t("gaming_item2")}</li>
            <li>• {t("gaming_item3")}</li>
          </ul>
          <Link href="/gaming" className="group mt-10 inline-flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-400/40 blur-3xl opacity-70 animate-pulse group-hover:opacity-100" />
              <Image
                src="/prixmalin-logo.webp"
                alt={t("gaming_logo_alt")}
                width={280}
                height={280}
                className="relative transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <span className="mt-4 text-sm font-semibold text-blue-700">
              {t("gaming_cta")}
            </span>
          </Link>
        </div>
      </section>

      {/* SECTION MAGASINS */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/50 via-green-50/40 to-green-100/30" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-green-700 sm:text-3xl">
            {t("magasins_titre")}
          </h2>
          <p className="mt-3 text-gray-600">
            {t("magasins_description")}
          </p>
          <ul className="mt-4 space-y-1 text-sm text-gray-600">
            <li>• {t("magasins_item1")}</li>
            <li>• {t("magasins_item2")}</li>
            <li>• {t("magasins_item3")}</li>
          </ul>
          <Link href="/magasins" className="group mt-10 inline-flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-400/40 blur-3xl opacity-70 animate-pulse group-hover:opacity-100" />
              <Image
                src="/prixmalin-logo.webp"
                alt={t("magasins_logo_alt")}
                width={280}
                height={280}
                className="relative transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="mt-4 text-sm font-semibold text-green-700">
              {t("magasins_cta")}
            </span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/40 bg-white/60 backdrop-blur-sm py-10 text-center text-sm text-gray-500">
        {t("footer", { year: new Date().getFullYear() })}
      </footer>

    </main>
  );
}
