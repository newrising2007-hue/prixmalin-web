// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { defaultMetadata } from "./metadata";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-bold tracking-tight">
              PrixMalin
            </Link>
             <Link href="/" className="rounded-lg px-2 py-1 hover:bg-gray-100">
             Accueil
             </Link>
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

              <Link
                href="/deals"
                className="hidden rounded-xl bg-green-600 px-3 py-2 font-semibold text-white shadow-sm transition hover:bg-green-700 sm:inline-block"
              >
                Voir les deals
              </Link>
            </nav>
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>

        {/* Footer */}
        <footer className="mt-10 border-t">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600">
            <p>
              PrixMalin est une plateforme d’affiliation. Certains liens peuvent
              être rémunérés. Prix affichés seulement si certains.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
