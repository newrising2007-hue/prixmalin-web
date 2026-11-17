import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
const CTA_GREEN = "relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-950 shadow-sm shadow-emerald-500/10 transition-all duration-200 will-change-transform hover:bg-emerald-100 hover:shadow-md hover:shadow-emerald-500/20 hover:-translate-y-0.5 hover:ring-2 hover:ring-emerald-200/60 active:translate-y-px active:shadow-sm";
const CTA_BLUE = "relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-950 shadow-sm shadow-blue-500/10 transition-all duration-200 will-change-transform hover:bg-blue-100 hover:shadow-md hover:shadow-blue-500/20 hover:-translate-y-0.5 hover:ring-2 hover:ring-blue-200/60 active:translate-y-px active:shadow-sm";

export default async function GamingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("gaming");

  return (
    <main className="mx-auto max-w-6xl px-4 pt-2 pb-4">
      <section className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("hero_titre")}</h1>
        <p className="mt-4 mb-6 max-w-2xl text-gray-600">{t("hero_description")}</p>
      </section>
      <section className="relative mb-10">
        <Link href={locale === "fr" ? "/deals" : `/${locale}/deals`} className="group relative block w-full cursor-pointer" aria-label="Voir tous les deals gaming">
          <div className="relative flex flex-col items-center">
            <div className="relative z-10 mb-0 transition-transform duration-300 group-hover:-translate-y-2">
              <p className="text-[11px] font-bold tracking-[6px] text-blue-400/70 uppercase text-center mb-1">{t("slogan_label")}</p>
              <h2 className="text-center font-black uppercase tracking-widest leading-none select-none"
                style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", fontSize: "clamp(32px, 7vw, 80px)", letterSpacing: "0.08em",
                  background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 25%, #ec4899 50%, #f59e0b 75%, #10b981 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", textShadow: "none",
                  filter: "drop-shadow(0 2px 8px rgba(59,130,246,0.25))" }}>
                {t("slogan")}
              </h2>
              <p className="text-center text-sm font-semibold text-gray-500 mt-1 tracking-wide">{t("slogan_sub")}</p>
            </div>
            <div className="relative w-full -mb-2" style={{ height: "80px" }}>
              <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M 480 0 C 480 40, 280 40, 240 80" stroke="url(#filGauche)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 600 0 C 600 30, 600 50, 600 80" stroke="url(#filCentre)" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M 720 0 C 720 40, 920 40, 960 80" stroke="url(#filDroit)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <defs>
                  <linearGradient id="filGauche" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3"/></linearGradient>
                  <linearGradient id="filCentre" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#6366f1" stopOpacity="0.9"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4"/></linearGradient>
                  <linearGradient id="filDroit" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3"/></linearGradient>
                </defs>
              </svg>
            </div>
            <div className="relative w-full transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
              <picture>
                <source srcSet="/images/personnages.webp" type="image/webp" />
                <Image src="/images/personnages.png" alt="Nintendo Switch, PlayStation 5 et Xbox Series X" width={1200} height={400} className="w-full h-auto object-contain" priority />
              </picture>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
