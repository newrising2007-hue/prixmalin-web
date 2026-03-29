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

const joursOrdre = [
  "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"
];

const joursLabels: Record<string, string> = {
  lundi: "Lun",
  mardi: "Mar",
  mercredi: "Mer",
  jeudi: "Jeu",
  vendredi: "Ven",
  samedi: "Sam",
  dimanche: "Dim",
};

export default async function PageBergerons({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partenaires" });

  return (
    <main className="min-h-screen bg-gray-50 font-sans">

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-100 shadow-sm">

        {/* Bande accent turquoise top */}
        <div className="h-1.5 w-full" style={{
          background: "linear-gradient(90deg, #2eaabf 0%, #1d8fa3 40%, #6ec6d4 100%)"
        }} />

        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col items-center gap-4">

          {/* Retour partenaires */}
          <a
            href={`/${locale}`}
            className="self-end flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span>←</span>
            <span>{t("retour_partenaires")}</span>
          </a>

          {/* Logo */}
          <Image
              src={`/partenaires/${partenaire.slug}/logo.png`}
              alt={partenaire.nom}
              width={320}
              height={120}
              className="object-contain"
              priority
            />

          <p
            className="text-xl sm:text-2xl font-bold text-center leading-snug"
            style={{
              background: "linear-gradient(90deg, #2eaabf 0%, #8b5cf6 35%, #f97316 65%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {partenaire.slogan}
          </p>

          {/* Boutons contact */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <a
              href={`tel:${partenaire.contact.telephone.replace(/-/g, "")}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 transition-colors"
            >
              <span>📞</span>
              <span>{partenaire.contact.telephone}</span>
            </a>

            <a
              href={partenaire.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 transition-colors"
            >
              <span>📘</span>
              <span>{t("facebook")}</span>
            </a>

            {/* Horaire — accordéon simple */}
            <details className="relative">
              <summary className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 cursor-pointer transition-colors list-none">
                <span>🕐</span>
                <span>{t("horaires")}</span>
                <span className="text-xs text-gray-400">▾</span>
              </summary>
              <div className="absolute z-10 top-full mt-2 left-1/2 -translate-x-1/2 bg-white border border-gray-100 shadow-lg rounded-xl p-4 min-w-[200px]">
                {joursOrdre.map((jour) => {
                  const heures = (partenaire.heures as Record<string, string>)[jour];
                  const estFerme = heures === t("ferme");
                  return (
                    <div key={jour} className="flex justify-between gap-6 py-1 text-sm border-b border-gray-50 last:border-0">
                      <span className="font-medium text-gray-600">{joursLabels[jour]}</span>
                      <span className={estFerme ? "text-red-400" : "text-gray-700"}>{estFerme ? t("ferme") : heures}</span>
                    </div>
                  );
                })}
              </div>
            </details>
          </div>
        </div>

        {/* Séparateur décoratif */}
        <div className="max-w-4xl mx-auto px-6 pb-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </header>

      {/* ── BADGE PARTENAIRE LOCAL ──────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
          style={{ backgroundColor: "#e8f8fb", color: "#1d8fa3" }}>
          <span>🤝</span>
          <span>{t("badge_partenaire")}</span>
        </div>
      </div>

      {/* ── PRODUITS ───────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto py-8 px-6">
        <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
          <span style={{ color: "#2eaabf" }}>●</span>
          {t("produits_vedette")}
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {partenaire.produits.map((produit: {
            nom: string;
            image: string;
            prix_regulier: number;
            prix_special: number;
            badge: string;
          }) => (
            <div key={produit.nom} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">

              {/* Image + badge */}
              <div className="relative w-full h-36 bg-gray-50">
                <Image
                  src={`/partenaires/${partenaire.slug}/${produit.image}`}
                  alt={produit.nom}
                  fill
                  className="object-contain p-3"
                />
                {/* Badge PrixMalin */}
                {produit.badge !== "none" && (
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full"
                    style={{ backgroundColor: "#2eaabf" }}>
                    <Image
                      src="/icons/icon-192.png"
                      alt="PrixMalin"
                      width={14}
                      height={14}
                      className="object-contain"
                    />
                    <span className="text-white font-bold leading-none"
                      style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                      {t("badge_moins5", { rabais: partenaire.coupon?.rabais || "5%" })}
                    </span>
                  </div>
                )}
              </div>

              {/* Infos */}
              <div className="p-3 flex flex-col gap-1 flex-1">
                <p className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">{produit.nom}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400 line-through">{produit.prix_regulier.toFixed(2)}$</span>
                  <span className="text-base font-black" style={{ color: "#2eaabf" }}>{produit.prix_special.toFixed(2)}$</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ── COUPON ─────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pb-10">
        <div className="relative overflow-hidden rounded-2xl border-2 border-dashed p-6 text-center"
          style={{ borderColor: "#2eaabf", backgroundColor: "#f0fbfd" }}>

          {/* Coins décoratifs */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 rounded-tl-xl" style={{ borderColor: "#2eaabf" }} />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 rounded-tr-xl" style={{ borderColor: "#2eaabf" }} />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 rounded-bl-xl" style={{ borderColor: "#2eaabf" }} />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 rounded-br-xl" style={{ borderColor: "#2eaabf" }} />

          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">{t("coupon_titre")}</p>
          <p className="text-4xl font-black tracking-widest mb-1" style={{ color: "#2eaabf" }}>
            {partenaire.coupon.code}
          </p>
          <p className="text-sm text-gray-500 mb-3">
            {partenaire.coupon.rabais} {t("coupon_rabais_label")}
          </p>
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-xs font-medium text-gray-600 border border-gray-100 shadow-sm">
            <span>📱</span>
            <span>{t("montrer_ecran")}</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-100 py-8 text-center">
        <div className="h-px max-w-xs mx-auto mb-6 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <p className="text-sm text-gray-500 mb-1">
          📍 {partenaire.contact.adresse}
        </p>
        <p className="text-xs text-gray-400 mt-3">
          {t("footer_presente_par")}{" "}
          <span className="font-semibold" style={{ color: "#2eaabf" }}>PrixMalin.ca</span>
        </p>
        {partenaire.slogan && <p className="text-xs text-gray-300 mt-1">{partenaire.slogan}</p>}
      </footer>

    </main>
  );
}
