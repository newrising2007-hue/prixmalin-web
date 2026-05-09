import { getTranslations } from "next-intl/server";
import EpicerieClient from "@/components/EpicerieClient";
import { getEpicerie } from "@/lib/epicerie";

export default async function EpiceriePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "epicerie" });
  const items = getEpicerie();

  const labels = {
    titre:          t("titre"),
    accent:         t("accent"),
    desc:           t("desc"),
    toutes_regions: t("toutes_regions"),
    region_label:   t("region_label"),
    tous_marchands: t("tous_marchands"),
    toutes_cats:    t("toutes_cats"),
    mise_a_jour:    t("mise_a_jour"),
    valide_jusqua:  t("valide_jusqua"),
    voir_tout:      t("voir_tout"),
    aucun_resultat: t("aucun_resultat"),
    retour:         t("retour"),
    deja_compare:   t("deja_compare"),
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          {labels.titre}{" "}
          <span className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #16a34a, #059669)" }}>
            {labels.accent}
          </span>
        </h1>
        <p className="mt-2 text-black/70">{labels.desc}</p>
        <p className="mt-1 text-sm text-green-700 font-medium">{labels.deja_compare}</p>
      </header>
      <EpicerieClient items={items} labels={labels} locale={locale} />
    </main>
  );
}
