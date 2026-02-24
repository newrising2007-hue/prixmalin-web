"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Gamepad2, Search, Smartphone } from "lucide-react";

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, isVisible };
}

export default function HomePage() {
  const hero = useRevealOnScroll();
  const gaming = useRevealOnScroll();
  const stores = useRevealOnScroll();

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
      <header
        ref={hero.ref}
        className={[
          "relative z-10 mx-auto max-w-5xl px-6 pt-14 text-center",
          "transition-all duration-700 ease-out",
          hero.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        ].join(" ")}
      >
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Bienvenue sur PrixMalin
        </h1>

        <p className="mt-4 text-base text-gray-600 sm:text-lg">
          La plateforme canadienne pour découvrir des bons plans gaming et des
          offres de magasinage. Nous sélectionnons des promotions fiables via
          nos partenaires pour vous aider à économiser simplement — sur le web
          et bientôt sur mobile.
        </p>

        {/* teaser mobile */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur">
            <Smartphone className="h-4 w-4" />
            Application mobile (bientôt)
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <Gamepad2 className="h-4 w-4" />
            Gaming
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            <Search className="h-4 w-4" />
            Magasinage
          </span>
        </div>
      </header>

      {/* SECTION GAMING */}
      <section className="relative overflow-hidden px-6">
        {/* background diagonal bleu + hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-100" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-100/40 to-blue-200/40" />
        </div>

        <div
          ref={gaming.ref}
          className={[
            "relative z-10 mx-auto flex min-h-[85vh] max-w-4xl flex-col items-center justify-center text-center",
            "transition-all duration-700 ease-out",
            gaming.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
        >
          <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-blue-700 sm:text-3xl">
            <Gamepad2 className="h-7 w-7" />
            Zone Gaming
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
              {/* glow premium (2 couches) */}
              <div className="absolute inset-0 rounded-full bg-blue-400/35 blur-3xl opacity-70 animate-pulse group-hover:opacity-100" />
              <div className="absolute inset-0 rounded-full bg-blue-300/20 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

              <Image
                src="/prixmalin-logo.png"
                alt="Accéder à la zone gaming PrixMalin"
                width={290}
                height={290}
                className="relative transition-transform duration-300 group-hover:scale-[1.06]"
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
      <section className="relative overflow-hidden px-6">
        {/* background diagonal vert + hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-green-50 to-green-100" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-tr from-white via-green-100/40 to-green-200/40" />
        </div>

        <div
          ref={stores.ref}
          className={[
            "relative z-10 mx-auto flex min-h-[85vh] max-w-4xl flex-col items-center justify-center text-center",
            "transition-all duration-700 ease-out",
            stores.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
        >
          <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-green-700 sm:text-3xl">
            <Search className="h-7 w-7" />
            Vos Magasins
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
              {/* glow premium (2 couches) */}
              <div className="absolute inset-0 rounded-full bg-green-400/35 blur-3xl opacity-70 animate-pulse group-hover:opacity-100" />
              <div className="absolute inset-0 rounded-full bg-green-300/20 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

              <Image
                src="/prixmalin-logo.png"
                alt="Accéder à la section magasins PrixMalin"
                width={290}
                height={290}
                className="relative transition-transform duration-300 group-hover:scale-[1.06]"
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
