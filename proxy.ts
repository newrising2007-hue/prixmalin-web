import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const LOCALES = ["en", "es", "ar", "zh"];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🛡️ GARDE — ignorer les fichiers statiques
  if (pathname.match(/\.(webp|png|jpg|jpeg|gif|ico|svg|css|js|woff|woff2)$/)) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    // 1. Cookie prioritaire
    const cookie = req.cookies.get("NEXT_LOCALE")?.value;
    if (cookie && (LOCALES.includes(cookie) || cookie === "fr")) {
      if (cookie !== "fr") {
        return NextResponse.redirect(new URL(`/${cookie}`, req.url));
      }
      return intlMiddleware(req);
    }
    // 2. Accept-Language
    const acceptLang = req.headers.get("accept-language") ?? "";
    const preferred = acceptLang.split(",")[0].split("-")[0].toLowerCase();
    if (preferred === "fr") return intlMiddleware(req);
    if (LOCALES.includes(preferred)) {
      return NextResponse.redirect(new URL(`/${preferred}`, req.url));
    }
    // 3. Inconnu → anglais
    return NextResponse.redirect(new URL(`/en`, req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"  ]
};
