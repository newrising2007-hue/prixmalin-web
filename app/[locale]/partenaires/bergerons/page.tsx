import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import partenaire from "@/data/partenaires/bergerons.json";

export async function generateStaticParams() {
  const locales = ["fr", "en", "es", "ar", "zh"];
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partenaires" });
  return {
    title: `${partenaire.nom} — ${t("meta_titre")}`,
  };
}

export default async function PageBergerons({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partenaires" });

  return (
    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header
        className="py-10 px-6 text-white text-center"
        style={{ backgroundColor: partenaire.couleurs.primaire }}
      >
        <Image
          src={`/partenaires/${partenaire.slug}/logo.png`}
          alt={partenaire.nom}
          width={240}
          height={80}
          className="mx-auto mix-blend-multiply"
        />
        <p className="mt-3 text-sm opacity-80">{partenaire.slogan}</p>
      </header>

      {/* PRODUITS */}
      <section className="max-w-4xl mx-auto py-10 px-6">
        {partenaire.produits.length === 0 ? (
          <p className="text-center text-gray-400 italic">
            {/* Produits à venir */}
            {t("produits_a_venir")}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {/* TODO: itérer sur partenaire.produits */}
          </div>
        )}
      </section>

      {/* COUPON */}
      <section className="max-w-4xl mx-auto px-6 pb-10">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
          <p className="text-lg font-bold">{t("coupon_titre")}</p>
          <p className="mt-2 text-3xl font-black tracking-widest"
             style={{ color: partenaire.couleurs.primaire }}>
            {partenaire.coupon.code}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {partenaire.coupon.rabais} {t("coupon_rabais_label")}
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-6 text-center text-sm"
        style={{ backgroundColor: partenaire.couleurs.secondaire, color: partenaire.couleurs.accent }}
      >
        {partenaire.nom} · {t("footer_presente_par")} PrixMalin.ca
      </footer>

    </main>
  );
}
