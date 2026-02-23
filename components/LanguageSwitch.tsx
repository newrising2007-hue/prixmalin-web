"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DEFAULT_LANG, LANGUAGES, type Lang, getLangPrefix } from "@/lib/i18n";

function stripLangPrefix(pathname: string): { lang: Lang; rest: string } {
  const path = pathname || "/";
  const parts = path.split("/").filter(Boolean);

  const first = parts[0] as Lang | undefined;
  const isKnown = first && (LANGUAGES as readonly string[]).includes(first);

  if (isKnown) {
    const restParts = parts.slice(1);
    const rest = "/" + restParts.join("/");
    return { lang: first as Lang, rest: rest === "/" ? "/" : rest };
  }

  return { lang: DEFAULT_LANG, rest: path.startsWith("/") ? path : `/${path}` };
}

function buildHref(targetLang: Lang, rest: string): string {
  const base = getLangPrefix(targetLang);
  if (base === "") return rest === "" ? "/" : rest;
  if (rest === "/") return base;
  return `${base}${rest}`;
}

const LABEL: Record<Lang, string> = {
  fr: "FR",
  en: "EN",
  es: "ES",
  ar: "AR",
  zh: "中文",
};

export default function LanguageSwitch() {
  const pathname = usePathname() || "/";
  const router = useRouter();

  const { lang: currentLang, rest } = stripLangPrefix(pathname);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const lang = e.target.value as Lang;
    const href = buildHref(lang, rest);
    router.push(href);
  }

  return (
    <>
      {/* Desktop buttons */}
      <div className="hidden sm:flex items-center gap-1 rounded-xl border bg-white px-1 py-1 text-xs">
        {LANGUAGES.map((lang) => {
          const href = buildHref(lang, rest);
          const active = lang === currentLang;

          return (
            <Link
              key={lang}
              href={href}
              className={
                active
                  ? "rounded-lg bg-gray-900 px-2 py-1 font-semibold text-white"
                  : "rounded-lg px-2 py-1 font-semibold text-gray-700 hover:bg-gray-100"
              }
              aria-current={active ? "page" : undefined}
            >
              {LABEL[lang]}
            </Link>
          );
        })}
      </div>

      {/* Mobile dropdown */}
      <select
        value={currentLang}
        onChange={handleChange}
        className="sm:hidden rounded-lg border px-2 py-1 text-xs bg-white"
        aria-label="Choisir la langue"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {LABEL[lang]}
          </option>
        ))}
      </select>
    </>
  );
}
