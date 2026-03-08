import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

type PageProps = { params: Promise<{ locale: string }> };

export default async function ApplicationsHub({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "applications" });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{t("titre")}</h1>
      <p className="mt-3 text-black/70">
        {t("description")}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/applications/prixmalin"
          className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 backdrop-blur-sm p-6 shadow-sm shadow-blue-500/10 transition hover:shadow-md hover:shadow-blue-500/20"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-white/35 to-green-500/15" />
            <Image
              src="/apps/prixmalin/logo-512.webp"
              alt=""
              width={520}
              height={520}
              className="absolute right-[-120px] bottom-[-140px] opacity-25 blur-[0.5px]"
              priority={false}
            />
          </div>
          <div className="relative">
            <h2 className="text-lg font-bold">{t("prixmalin_titre")}</h2>
            <p className="mt-2 text-sm text-black/70">
              {t("prixmalin_description")}
            </p>
            <p className="mt-4 text-sm font-semibold">{t("voir_page")}</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
