import { getAllProducts } from "@/lib/products";
import { getTranslations } from "next-intl/server";
import ProduitsClient from "@/components/ProduitsClient";

const CATEGORY_SLUGS = ["toutes","audio","souris","claviers","manettes","accessoires","chaises","ecrans","boitiers"];

export default async function ProduitsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const products = getAllProducts();
  const t = await getTranslations({ locale, namespace: "produits" });

  const labels: Record<string, string> = {
    toutes: t("toutes"),
    compteur: t("compteur"),
    compteur_pluriel: t("compteur_pluriel"),
    voir_fiche: t("voir_fiche"),
    voir_amazon: t("voir_amazon"),
    image_bientot: t("image_bientot"),
    ...Object.fromEntries(CATEGORY_SLUGS.filter(s => s !== "toutes").map(s => [`cat_${s}`, t(`cat_${s}` as any)])),
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{t("titre")}</h1>
        <p className="mt-2 text-black/70">{t("description")}</p>
      </header>
      <ProduitsClient products={products} categorySlugs={CATEGORY_SLUGS} labels={labels} locale={locale} />
    </main>
  );
}
