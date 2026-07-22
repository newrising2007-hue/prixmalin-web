import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getApp, appPath, LOCALES, type AppId, type Lang } from "@/lib/appRelease";

type PageProps = { params: Promise<{ locale: string }> };

/** Tailwind exige des classes litterales — pas de construction dynamique. */
const CARDS: {
  id: AppId;
  kTitre: string;
  kDesc: string;
  kBadge: string;
  gradient: string;
  badgeClass: string;
}[] = [
  {
    id: "prixmalin",
    kTitre: "prixmalin_titre",
    kDesc: "prixmalin_description",
    kBadge: "prixmalin_badge",
    gradient: "bg-gradient-to-br from-blue-500/15 via-white/35 to-green-500/15",
    badgeClass: "border-emerald-600/25 bg-emerald-50 text-emerald-800",
  },
  {
    id: "machshop",
    kTitre: "machshop_titre",
    kDesc: "machshop_description",
    kBadge: "machshop_badge",
    gradient: "bg-gradient-to-br from-neutral-900/20 via-white/35 to-orange-500/20",
    badgeClass: "border-orange-600/25 bg-orange-50 text-orange-800",
  },
];

export default async function ApplicationsHub({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "applications" });
  const lang = (LOCALES as readonly string[]).includes(locale)
    ? (locale as Lang)
    : "en";

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{t("titre")}</h1>
      <p className="mt-3 text-black/70">{t("description")}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {CARDS.map((card) => {
          const app = getApp(card.id);
          return (
            <Link
              key={card.id}
              href={appPath(app, lang)}
              className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm shadow-black/5 backdrop-blur-sm transition hover:shadow-md hover:shadow-black/10"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className={`absolute inset-0 ${card.gradient}`} />
                <Image
                  src={app.logo}
                  alt=""
                  width={520}
                  height={520}
                  className="absolute right-[-120px] bottom-[-140px] opacity-25 blur-[0.5px]"
                  priority={false}
                  style={{
                    maskImage:
                      "radial-gradient(circle at 50% 50%, black 35%, transparent 68%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at 50% 50%, black 35%, transparent 68%)",
                  }}
                />
              </div>

              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold">{t(card.kTitre)}</h2>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${card.badgeClass}`}
                  >
                    {t(card.kBadge)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-black/70">{t(card.kDesc)}</p>
                <p className="mt-4 text-sm font-semibold">{t("voir_page")}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
