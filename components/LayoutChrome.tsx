"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitch from "@/components/LanguageSwitch";

type Locale = "fr" | "en" | "es" | "ar" | "zh";

const NAV_TEXT: Record<Locale, {
  home: string; gaming: string; deals: string; products: string;
  apps: string; bonus: string; contact: string;
}> = {
  fr: { home: "Accueil", gaming: "Gaming", deals: "Deals", products: "Produits", apps: "Applications", bonus: "Codes bonus", contact: "Contact" },
  en: { home: "Home", gaming: "Gaming", deals: "Deals", products: "Products", apps: "Apps", bonus: "Bonus Codes", contact: "Contact" },
  es: { home: "Inicio", gaming: "Gaming", deals: "Ofertas", products: "Productos", apps: "Aplicaciones", bonus: "Códigos bonus", contact: "Contacto" },
  ar: { home: "الرئيسية", gaming: "ألعاب", deals: "عروض", products: "منتجات", apps: "تطبيقات", bonus: "رموز المكافآت", contact: "اتصل" },
  zh: { home: "首页", gaming: "游戏", deals: "优惠", products: "产品", apps: "应用", bonus: "奖励码", contact: "联系" },
};

const FOOTER_TEXT: Record<string, string> = {
  fr: "PrixMalin est une plateforme d'affiliation. Certains liens peuvent être rémunérés. Prix affichés seulement si certains.",
  en: "PrixMalin is an affiliate platform. Some links may be compensated. Prices shown only when available.",
  es: "PrixMalin es una plataforma de afiliación. Algunos enlaces pueden ser remunerados. Precios mostrados solo si están disponibles.",
  ar: "PrixMalin منصة تسويق بالعمولة. بعض الروابط قد تكون مدفوعة. الأسعار معروضة فقط عند توفرها.",
  zh: "PrixMalin 是一个联盟营销平台。部分链接可能获得佣金。价格仅在有时显示。",
};

export default function LayoutChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const locale = (pathname.split("/")[1] as Locale) in NAV_TEXT ? pathname.split("/")[1] as Locale : "fr";
  const t = NAV_TEXT[locale];

  const isHub = pathname === "/" || /^\/(en|es|ar|zh)$/.test(pathname);
  const isStore = pathname.startsWith("/magasins");
  const showGamingHeader = !isHub && !isStore;

  return (
    <>
      {/* HUB HEADER */}
      {isHub && (
        <header className="sticky top-0 z-50 border-b border-white/40 bg-white/60 backdrop-blur-md relative">
          <div className="absolute left-0 top-0 h-1 w-full pointer-events-none bg-gradient-to-r from-blue-600 via-white to-green-600 opacity-70" />
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
              <a href="mailto:contact@prixmalin.ca" className="rounded-lg px-2 py-1 hover:bg-gray-100">Contact</a>
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

      {/* GAMING HEADER */}
      {showGamingHeader && (
        <header className="sticky top-0 z-50 border-b border-white/40 bg-white/60 backdrop-blur-md relative">
          <div className="absolute left-0 top-0 h-1 w-full pointer-events-none bg-gradient-to-r from-blue-600 via-white to-green-600 opacity-70" />
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-lg font-bold tracking-tight">
                PrixMalin
              </Link>
              <div className="flex items-center gap-2">
                <Link href="/" className="rounded-lg px-2 py-1 text-sm hover:bg-gray-100">
                  {t.home}
                </Link>
                <Link href="/gaming" className="rounded-lg px-2 py-1 text-sm font-semibold hover:bg-gray-100">
                  {t.gaming}
                </Link>
              </div>
            </div>
            <nav className="flex items-center gap-3 text-sm">
              <Link href="/deals" className="rounded-lg px-2 py-1 hover:bg-gray-100">
                {t.deals}
              </Link>
              <Link href="/produits" className="rounded-lg px-2 py-1 hover:bg-gray-100">
                {t.products}
              </Link>
              <Link href="/applications" className="rounded-lg px-2 py-1 hover:bg-gray-100">
                {t.apps}
              </Link>
              <Link href="/codes-bonus" className="rounded-lg px-2 py-1 hover:bg-gray-100">
                {t.bonus}
              </Link>
              {process.env.NEXT_PUBLIC_DEV_MODE === "true" && (
                <div className="relative group">
                  <button className="rounded-lg px-2 py-1 text-orange-500 hover:bg-orange-50 font-semibold">🔧 Dev</button>
                  <div className="absolute right-0 top-8 hidden group-hover:block bg-white border rounded-xl shadow-lg p-2 z-50 w-48">
                    <a href="/test-deals" className="block px-3 py-2 text-sm hover:bg-orange-50 rounded-lg">🎯 Test Deals</a>
                    <a href="/test-produits" className="block px-3 py-2 text-sm hover:bg-orange-50 rounded-lg">🛍️ Test Produits</a>
                  </div>
                </div>
              )}
              <a href="mailto:contact@prixmalin.ca" className="rounded-lg px-2 py-1 hover:bg-gray-100">{t.contact}</a>
              <LanguageSwitch />
            </nav>
          </div>
        </header>
      )}

      {/* CONTENT */}
      <main className={isHub ? "" : isStore ? "" : "mx-auto max-w-6xl px-4 py-6"}>
        {children}
      </main>

      {/* FOOTER */}
      <footer className="mt-10 border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600">
          <p>
            {FOOTER_TEXT[pathname.split("/")[1]] ?? FOOTER_TEXT.fr}
          </p>
        </div>
      </footer>
    </>
  );
}
