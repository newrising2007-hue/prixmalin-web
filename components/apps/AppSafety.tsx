import { PRIXMALIN } from "@/lib/appRelease";
type Lang = "fr" | "en" | "es" | "ar" | "zh";

const SAFETY: Record<Lang, { title: string; phase: string; google: string; test: string }> = {
  fr: {
    title: "À propos du téléchargement",
    phase: "phase de test",
    google: "Pour l'instant, l'application est en phase de test. La version publique sera distribuée via Google Play pour une installation plus simple et plus sécurisée.",
    test: "Si tu télécharges l'APK maintenant, considère-le comme une version test",
  },
  en: {
    title: "About the download",
    phase: "testing phase",
    google: "The app is currently in a testing phase. The public release will be distributed via Google Play for an easier and safer installation.",
    test: "If you download the APK now, treat it as a test build",
  },
  es: {
    title: "Sobre la descarga",
    phase: "fase de prueba",
    google: "La aplicación está actualmente en fase de prueba. La versión pública se distribuirá a través de Google Play para una instalación más fácil y segura.",
    test: "Si descargas el APK ahora, trátalo como una versión de prueba",
  },
  ar: {
    title: "حول التنزيل",
    phase: "مرحلة اختبار",
    google: "التطبيق حالياً في مرحلة اختبار. سيتم توزيع الإصدار العام عبر Google Play لتثبيت أسهل وأكثر أماناً.",
    test: "إذا قمت بتنزيل APK الآن، تعامل معه كإصدار تجريبي",
  },
  zh: {
    title: "关于下载",
    phase: "测试阶段",
    google: "该应用目前处于测试阶段。公开版本将通过 Google Play 分发，安装更简便安全。",
    test: "如果您现在下载 APK，请将其视为测试版本",
  },
};

export function AppSafety({ lang }: { lang: Lang }) {
  const c = SAFETY[lang] ?? SAFETY.en;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="text-xl font-extrabold">{c.title}</h2>
        <p className="mt-3 text-sm text-black/70">{c.google}</p>
        {PRIXMALIN.apkUrl ? (
          <p className="mt-3 text-sm text-black/70">
            {c.test} (<strong>{PRIXMALIN.sizeMb} MB</strong>).
          </p>
        ) : null}
      </div>
    </section>
  );
}
