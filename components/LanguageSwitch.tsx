"use client";
import { useState, useRef, useEffect } from "react";
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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fermer si clic en dehors
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function navigateTo(lang: Lang) {
    const href = buildHref(lang, rest);
    document.cookie = "NEXT_LOCALE=; path=/; max-age=0";
    router.push(href);
    setOpen(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const lang = e.target.value as Lang;
    navigateTo(lang);
  }

  return (
    <>
      {/* Desktop — dropdown compact */}
      <div ref={ref} className="relative hidden sm:block">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 rounded-xl border bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
        >
          {LABEL[currentLang]}
          <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
        </button>

        {open && (
          <div className="absolute right-0 top-9 z-50 min-w-[80px] rounded-xl border bg-white shadow-lg py-1">
            {LANGUAGES.map((lang) => {
              const active = lang === currentLang;
              return (
                <button
                  key={lang}
                  onClick={() => navigateTo(lang)}
                  className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-gray-100 transition-colors ${
                    active ? "text-gray-900 bg-gray-50" : "text-gray-600"
                  }`}
                >
                  {active ? `${LABEL[lang]} ✓` : LABEL[lang]}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile — select natif */}
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
