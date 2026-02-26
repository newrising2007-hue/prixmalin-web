// Remplacer le bloc {/* GAMING HEADER */} dans LayoutChrome.tsx
// et ajouter le header magasinage AVANT ce bloc

      {/* MAGASINS HEADER */}
      {isStore && (
        <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-md relative">
          <div className="absolute left-0 top-0 h-1 w-full pointer-events-none"
            style={{ background: "linear-gradient(90deg, #3b82f6, #ffffff, #16a34a)" }}
          />
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-lg font-bold tracking-tight">
                PrixMalin
              </Link>
              <div className="flex items-center gap-2">
                <Link href="/" className="rounded-lg px-2 py-1 text-sm hover:bg-gray-100">
                  Accueil
                </Link>
                <Link href="/magasins" className="rounded-lg px-2 py-1 text-sm font-semibold text-green-700 hover:bg-green-50">
                  Magasinage
                </Link>
              </div>
            </div>

            <nav className="flex items-center gap-3 text-sm">
              <Link href="/magasins/recherche" className="rounded-lg px-2 py-1 hover:bg-gray-100">
                Recherche
              </Link>
              <Link href="/magasins/circulaires" className="rounded-lg px-2 py-1 hover:bg-gray-100">
                Circulaires
              </Link>
              <Link href="/magasins/restaurants" className="rounded-lg px-2 py-1 hover:bg-gray-100">
                Restaurants
              </Link>
              <Link href="/magasins/coupons" className="rounded-lg px-2 py-1 hover:bg-gray-100">
                Coupons
              </Link>

              <LanguageSwitch />

              <Link
                href="/magasins/recherche"
                className="hidden rounded-xl px-3 py-2 font-semibold text-white shadow-sm transition hover:opacity-90 sm:inline-block"
                style={{ background: "linear-gradient(135deg, #16a34a, #059669)" }}
              >
                Magasiner
              </Link>
            </nav>
          </div>
        </header>
      )}
