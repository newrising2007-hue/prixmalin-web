"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitch from "@/components/LanguageSwitch";
import ShareButtons from "@/components/ShareButtons";

type Locale = "fr" | "en" | "es" | "ar" | "zh";

const NAV_TEXT: Record<Locale, {
  home: string; gaming: string; shopping: string; deals: string; products: string;
  apps: string; bonus: string; contact: string;
  search: string; flyers: string; restaurants: string; coupons: string; shopBtn: string;
}> = {
  fr: { home: "Accueil", gaming: "Gaming", shopping: "Magasinage", deals: "Deals", products: "Produits", apps: "Applications", bonus: "Codes bonus", contact: "Contact", search: "Recherche", flyers: "Circulaires", restaurants: "Restaurants", coupons: "Coupons", shopBtn: "Magasiner" },
  en: { home: "Home", gaming: "Gaming", shopping: "Shopping", deals: "Deals", products: "Products", apps: "Apps", bonus: "Bonus Codes", contact: "Contact", search: "Search", flyers: "Flyers", restaurants: "Restaurants", coupons: "Coupons", shopBtn: "Shop" },
  es: { home: "Inicio", gaming: "Gaming", shopping: "Tiendas", deals: "Ofertas", products: "Productos", apps: "Aplicaciones", bonus: "Códigos bonus", contact: "Contacto", search: "Búsqueda", flyers: "Folletos", restaurants: "Restaurantes", coupons: "Cupones", shopBtn: "Comprar" },
  ar: { home: "الرئيسية", gaming: "ألعاب", shopping: "تسوق", deals: "عروض", products: "منتجات", apps: "تطبيقات", bonus: "رموز المكافآت", contact: "اتصل", search: "بحث", flyers: "نشرات", restaurants: "مطاعم", coupons: "كوبونات", shopBtn: "تسوق" },
  zh: { home: "首页", gaming: "游戏", shopping: "购物", deals: "优惠", products: "产品", apps: "应用", bonus: "奖励码", contact: "联系", search: "搜索", flyers: "传单", restaurants: "餐厅", coupons: "优惠券", shopBtn: "购物" },
};

const FOOTER_TEXT: Record<string, string> = {
  fr: "PrixMalin participe au programme Partenaires d'Amazon. En tant qu'associé Amazon, nous recevons une commission sur les achats qualifiés effectués via nos liens.",
  en: "PrixMalin participates in the Amazon Associates Program. As an Amazon Associate, we earn from qualifying purchases made through our links.",
  es: "PrixMalin participa en el Programa de Afiliados de Amazon. Como asociado de Amazon, ganamos comisiones por las compras realizadas a través de nuestros enlaces.",
  ar: "يشارك PrixMalin في برنامج شركاء Amazon. بصفتنا شركاء في Amazon، نكسب عمولات على المشتريات المؤهلة عبر روابطنا.",
  zh: "PrixMalin参与亚马逊联盟计划。作为亚马逊联盟会员，我们通过链接产生的合格购买获得佣金。",
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
  const isStore = /\/(magasins)(\/|$)/.test(pathname);
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
                  href={locale === "fr" ? "/gaming" : `/${locale}/gaming`}
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                >
                  🎮 {t.gaming}
                </Link>
                <Link
                  href={locale === "fr" ? "/magasins" : `/${locale}/magasins`}
                  className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-semibold text-green-700 hover:bg-green-100"
                >
                  🔍 {t.shopping}
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShareButtons locale={locale} />
              <LanguageSwitch />
            </div>
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
                  {t.home}
                </Link>
                <Link href={locale === "fr" ? "/magasins" : `/${locale}/magasins`} className="rounded-lg px-2 py-1 text-sm font-semibold text-green-700 hover:bg-green-50">
                  {t.shopping}
                </Link>
                <Link
                  href={locale === "fr" ? "/gaming" : `/${locale}/gaming`}
                  className="rounded-lg px-2 py-1 text-sm font-semibold text-blue-700 hover:bg-gray-100"
                >
                  {t.gaming}
                </Link>
              </div>
            </div>
            <nav className="flex items-center gap-3 text-sm">
              <Link href={locale === "fr" ? "/magasins/recherche" : `/${locale}/magasins/recherche`} className="rounded-lg px-2 py-1 hover:bg-gray-100">
                {t.search}
              </Link>
              <Link href={locale === "fr" ? "/magasins/circulaires" : `/${locale}/magasins/circulaires`} className="rounded-lg px-2 py-1 hover:bg-gray-100">
                {t.flyers}
              </Link>
              <Link href={locale === "fr" ? "/magasins/restaurants" : `/${locale}/magasins/restaurants`} className="rounded-lg px-2 py-1 hover:bg-gray-100">
                {t.restaurants}
              </Link>
              <Link href={locale === "fr" ? "/magasins/coupons" : `/${locale}/magasins/coupons`} className="rounded-lg px-2 py-1 hover:bg-gray-100">
                {t.coupons}
              </Link>
              <a href="mailto:contact@prixmalin.ca" className="rounded-lg px-2 py-1 hover:bg-gray-100">{t.contact}</a>
              <LanguageSwitch />
              <ShareButtons locale={locale} />

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
                {/* ICI : Ajout de text-blue-700 pour le Gaming Header */}
                <Link
                  href={locale === "fr" ? "/gaming" : `/${locale}/gaming`}
                  className="rounded-lg px-2 py-1 text-sm font-semibold text-blue-700 hover:bg-gray-100"
                >
                  {t.gaming}
                </Link>
                <Link
                  href={locale === "fr" ? "/magasins" : `/${locale}/magasins`}
                  className="rounded-lg px-2 py-1 text-sm font-semibold text-green-700 hover:bg-gray-100"
                >
                  {t.shopping}
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
              <ShareButtons locale={locale} />
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
          <div className="flex flex-col items-center justify-center text-center gap-2">
            <p>
              {FOOTER_TEXT[pathname.split("/")[1]] ?? FOOTER_TEXT.fr}
            </p>
            <a
              href="/privacy-policy"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors underline"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}