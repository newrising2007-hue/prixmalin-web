"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitch from "@/components/LanguageSwitch";

export default function LayoutChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isHub = pathname === "/";

  // Magasinage (header différent plus tard)
  const isStore =
    pathname.startsWith("/magasins") ||
    pathname.startsWith("/produit") ||
    pathname.startsWith("/produits");

  // Pour l’instant: tout le reste = "Gaming universe"
  const showGamingHeader = !isHub && !isStore;

  return (
    <>
      {/* HUB HEADER */}
      {isHub && (
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-lg font-bold tracking-tight">
                PrixMalin
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  href="/gaming"
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                >
                  🎮 Gaming
                </Link>

                <Link
                  href="/magasins"
                  className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-semibold text-green-700 hover:bg-green-100"
                >
                  🔍 Magasinage
                </Link>
              </div>
            </div>

            <LanguageSwitch />
          </div>
        </header>
      )}

      {/* GAMING HEADER */}
      {showGamingHeader && (
        <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-lg font-bold tracking-tight">
                PrixMalin
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="rounded-lg px-2 py-1 text-sm hover:bg-gray-100"
                >
                  Accueil
                </Link>

                <Link
                  href="/gaming"
                  className="rounded-lg px-2 py-1 text-sm font-semibold hover:bg-gray-100"
                >
                  Gaming
                </Link>
              </div>
            </div>

            <nav className="flex items-center gap-3 text-sm">
              <Link href="/deals" className="rounded-lg px-2 py-1 hover:bg-gray-100">
                Deals
              </Link>

              <Link href="/produits" className="rounded-lg px-2 py-1 hover:bg-gray-100">
                Produits
              </Link>

              <Link href="/applications" className="rounded-lg px-2 py-1 hover:bg-gray-100">
                Applications
              </Link>

              <Link href="/codes-bonus" className="rounded-lg px-2 py-1 hover:bg-gray-100">
                Codes bonus
              </Link>

              <LanguageSwitch />

              <Link
                href="/deals"
                className="hidden rounded-xl bg-green-600 px-3 py-2 font-semibold text-white shadow-sm transition hover:bg-green-700 sm:inline-block"
              >
                Voir les deals
              </Link>
            </nav>
          </div>
        </header>
      )}

      {/* CONTENT */}
      <main className={isHub ? "" : "mx-auto max-w-6xl px-4 py-6"}>
        {children}
      </main>

      {/* FOOTER */}
      <footer className="mt-10 border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600">
          <p>
            PrixMalin est une plateforme d’affiliation. Certains liens peuvent
            être rémunérés. Prix affichés seulement si certains.
          </p>
        </div>
      </footer>
    </>
  );
}
