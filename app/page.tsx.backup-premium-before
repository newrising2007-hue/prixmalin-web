"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">

      {/* COIN REPLIE + EPINGLE */}
      <div className="pointer-events-none absolute right-0 top-0 z-30">
        <div className="relative h-28 w-28">

          {/* feuille */}
          <div className="absolute right-0 top-0 h-full w-full">
            <div className="absolute right-0 top-0 h-full w-full rounded-bl-3xl bg-white shadow-xl" />
            <div className="absolute right-0 top-0 h-full w-full origin-top-right rotate-6 rounded-bl-3xl bg-white/80 shadow-md" />
          </div>

          {/* epingle */}
          <div className="absolute right-10 top-6 h-4 w-4 rounded-full bg-red-600 shadow-lg ring-2 ring-white" />

          {/* badge */}
          <div className="absolute right-2 top-10 rotate-12 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
            🇨🇦 Plateforme canadienne
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="relative z-10 mx-auto max-w-5xl px-6 pt-14 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Bienvenue sur PrixMalin
        </h1>

        <p className="mt-4 text-base text-gray-600 sm:text-lg">
          La plateforme canadienne pour découvrir des bons plans gaming et des
          offres de magasinage. Nous sélectionnons des promotions fiables via
          nos partenaires pour vous aider à économiser simplement — sur le web
          et bientôt sur mobile.
        </p>
      </header>

      {/* SECTION GAMING */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6">

        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-100" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">

          <h2 className="text-2xl font-bold text-blue-700 sm:text-3xl">
            🎮 Zone Gaming
          </h2>

          <p className="mt-3 text-gray-600">
            Cartes cadeaux, codes numériques et promotions gaming sélectionnées
            pour les joueurs au Canada.
          </p>

          <ul className="mt-4 space-y-1 text-sm text-gray-600">
            <li>• Codes PlayStation, Xbox et Nintendo instantanés</li>
            <li>• Cartes cadeaux populaires à prix avantageux</li>
            <li>• Offres vérifiées chez nos partenaires</li>
          </ul>

          <Link
            href="/gaming"
            className="group mt-10 inline-flex flex-col items-center"
          >
            <div className="relative">

              {/* glow premium */}
              <div className="absolute inset-0 rounded-full bg-blue-400/40 blur-3xl opacity-70 animate-pulse group-hover:opacity-100" />

              <Image
                src="/prixmalin-logo.png"
                alt="Accéder à la zone gaming PrixMalin"
                width={280}
                height={280}
                className="relative transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>

            <span className="mt-4 text-sm font-semibold text-blue-700">
              ➜ Accéder à la Zone Gaming
            </span>
          </Link>

        </div>
      </section>

      {/* SECTION MAGASINS */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6">

        <div className="absolute inset-0 bg-gradient-to-tr from-white via-green-50 to-green-100" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">

          <h2 className="text-2xl font-bold text-green-700 sm:text-3xl">
            🛍 Vos Magasins
          </h2>

          <p className="mt-3 text-gray-600">
            Produits en ligne, offres partenaires et sélections populaires pour
            économiser sur vos achats.
          </p>

          <ul className="mt-4 space-y-1 text-sm text-gray-600">
            <li>• Produits disponibles chez Amazon et partenaires</li>
            <li>• Bons plans sélectionnés selon les tendances</li>
            <li>• Recherche rapide de produits</li>
          </ul>

          <Link
            href="/magasins"
            className="group mt-10 inline-flex flex-col items-center"
          >
            <div className="relative">

              {/* glow premium */}
              <div className="absolute inset-0 rounded-full bg-green-400/40 blur-3xl opacity-70 animate-pulse group-hover:opacity-100" />

              <Image
                src="/prixmalin-logo.png"
                alt="Accéder à la section magasins PrixMalin"
                width={280}
                height={280}
                className="relative transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <span className="mt-4 text-sm font-semibold text-green-700">
              ➜ Explorer Vos Magasins
            </span>
          </Link>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PrixMalin — Liens partenaires pouvant générer une commission.
      </footer>

    </main>
  );
}
