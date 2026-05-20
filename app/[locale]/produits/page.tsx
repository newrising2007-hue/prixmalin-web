import { getAllProducts } from "@/lib/products";
import { getTranslations } from "next-intl/server";
import AdblockBanner from "@/components/AdblockBanner";
import ProduitsClient from "@/components/ProduitsClient";

const CATEGORY_SLUGS = ["toutes","audio","souris","claviers","manettes","accessoires","chaises","ecrans","boitiers","video"];

export default async function ProduitsPage({ params }: { params: Promise<{ locale: string }> }) {
// Fonction principale qui affiche la page des produits en récupérant les produits et les traductions
  const { locale } = await params;
  const products = getAllProducts();
  const t = await getTranslations({ locale, namespace: "produits" });

// Initialisation des labels de traduction utilisés dans la page
  const labels: Record<string, string> = {
    toutes: t("toutes"),
    compteur: t("compteur"),
    compteur_pluriel: t("compteur_pluriel"),
    voir_fiche: t("voir_fiche"),
    voir_amazon: t("voir_amazon"),
    verifie_le: t("verifie_le"),
    image_bientot: t("image_bientot"),
    ...Object.fromEntries(CATEGORY_SLUGS.filter(s => s !== "toutes").map(s => [`cat_${s}`, t(`cat_${s}` as any)])),
    badge_meilleur_vendeur: t("badge_meilleur_vendeur" as any),
    badge_nouveau: t("badge_nouveau" as any),
    badge_deal_du_jour: t("badge_deal_du_jour" as any),
  };
// Rendu JSX principal de la page des produits, incluant l'en-tête et les produits filtrés

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{t("titre")}</h1>
        <p className="mt-2 text-black/70">{t("description")}</p>
        <AdblockBanner message={t("adblock")} />
      </header>
      <ProduitsClient products={products} categorySlugs={CATEGORY_SLUGS} labels={labels} locale={locale} />
    </main>
  );
}
