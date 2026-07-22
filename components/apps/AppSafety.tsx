import { formatPrice } from "@/lib/appRelease";
import type { AppDef, AppId, Lang } from "@/lib/appRelease";

type Copy = { title: string; play: string; soon: string; apk: string; note: string };

const SAFETY: Record<AppId, Record<Lang, Copy>> = {
  prixmalin: {
    fr: {
      title: "À propos du téléchargement",
      play: "L’application est distribuée via Google Play — installation simple et sécurisée, mises à jour automatiques.",
      soon: "L’application est en phase de test. La version publique sera distribuée via Google Play.",
      apk: "Si tu télécharges l’APK, considère-le comme une version test",
      note: "Application gratuite. Aucun achat requis.",
    },
    en: {
      title: "About the download",
      play: "The app is distributed through Google Play — simple, secure install with automatic updates.",
      soon: "The app is in a testing phase. The public release will be distributed via Google Play.",
      apk: "If you download the APK, treat it as a test build",
      note: "Free app. No purchase required.",
    },
    es: {
      title: "Sobre la descarga",
      play: "La aplicación se distribuye por Google Play — instalación simple y segura, con actualizaciones automáticas.",
      soon: "La aplicación está en fase de prueba. La versión pública se distribuirá por Google Play.",
      apk: "Si descargas el APK, trátalo como una versión de prueba",
      note: "Aplicación gratuita. No requiere compra.",
    },
    ar: {
      title: "حول التنزيل",
      play: "يتم توزيع التطبيق عبر Google Play — تثبيت بسيط وآمن مع تحديثات تلقائية.",
      soon: "التطبيق في مرحلة اختبار. سيتم توزيع الإصدار العام عبر Google Play.",
      apk: "إذا قمت بتنزيل APK، تعامل معه كإصدار تجريبي",
      note: "تطبيق مجاني. لا يتطلب أي شراء.",
    },
    zh: {
      title: "关于下载",
      play: "该应用通过 Google Play 分发 — 安装简便安全，自动更新。",
      soon: "该应用处于测试阶段。公开版本将通过 Google Play 分发。",
      apk: "如果您下载 APK，请将其视为测试版本",
      note: "免费应用，无需购买。",
    },
  },
  machshop: {
    fr: {
      title: "À propos de l’application",
      play: "MachShop est distribuée via Google Play — installation simple et sécurisée, mises à jour automatiques.",
      soon: "MachShop arrive sur Google Play sous peu.",
      apk: "",
      note: "Fonctionne entièrement hors-ligne. Aucune donnée collectée, aucun partage avec des tiers. Essai de {days} jours, puis achat unique de {price} $ CAD — pas d’abonnement. Valeurs théoriques, à titre de référence : valide toujours selon tes conditions d’atelier.",
    },
    en: {
      title: "About the app",
      play: "MachShop is distributed through Google Play — simple, secure install with automatic updates.",
      soon: "MachShop is coming to Google Play shortly.",
      apk: "",
      note: "Works fully offline. No data collected, nothing shared with third parties. {days}-day trial, then a one-time CAD {price} purchase — no subscription. Theoretical values, for reference only: always validate against your own shop conditions.",
    },
    es: {
      title: "Sobre la aplicación",
      play: "MachShop se distribuye por Google Play — instalación simple y segura, con actualizaciones automáticas.",
      soon: "MachShop llegará a Google Play en breve.",
      apk: "",
      note: "Funciona totalmente sin conexión. No se recopilan datos ni se comparten con terceros. Prueba de {days} días, luego un pago único de {price} CAD — sin suscripción. Valores teóricos, solo de referencia: valida siempre según las condiciones de tu taller.",
    },
    ar: {
      title: "حول التطبيق",
      play: "يتم توزيع MachShop عبر Google Play — تثبيت بسيط وآمن مع تحديثات تلقائية.",
      soon: "سيصل MachShop إلى Google Play قريباً.",
      apk: "",
      note: "يعمل بالكامل دون اتصال بالإنترنت. لا يتم جمع أي بيانات ولا مشاركتها مع أطراف ثالثة. تجربة {days} أيام، ثم شراء لمرة واحدة بقيمة {price} دولار كندي — بدون اشتراك. القيم نظرية للمرجع فقط: تحقق دائماً وفق ظروف ورشتك.",
    },
    zh: {
      title: "关于应用",
      play: "MachShop 通过 Google Play 分发 — 安装简便安全，自动更新。",
      soon: "MachShop 即将登陆 Google Play。",
      apk: "",
      note: "完全离线运行。不收集任何数据，不与第三方共享。{days} 天试用，之后一次性购买 {price} 加元 — 无订阅。数值为理论参考值：请始终根据您的车间实际条件进行验证。",
    },
  },
};

export function AppSafety({ app, lang }: { app: AppDef; lang: Lang }) {
  const c = SAFETY[app.id][lang] ?? SAFETY[app.id].en;

  const note = c.note
    .replace("{days}", String(app.trialDays ?? 0))
    .replace("{price}", formatPrice(app, lang));

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="text-xl font-extrabold">{c.title}</h2>
        <p className="mt-3 text-sm text-black/70">
          {app.release === "play" ? c.play : c.soon}
        </p>
        {app.release !== "play" && app.apkUrl && c.apk ? (
          <p className="mt-3 text-sm text-black/70">
            {c.apk}
            {app.sizeMb !== null ? <> (<strong>{app.sizeMb} MB</strong>)</> : null}.
          </p>
        ) : null}
        {note ? <p className="mt-3 text-sm text-black/70">{note}</p> : null}
      </div>
    </section>
  );
}
