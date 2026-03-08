type Feature = { title: string; desc: string };
type Lang = "fr" | "en" | "es" | "ar" | "zh";

const FEATURES: Record<Lang, Feature[]> = {
  fr: [
    { title: "Recherche local + web", desc: "Trouve des produits autour de toi et en ligne, au même endroit." },
    { title: "Rapide & mobile-first", desc: "Interface simple, optimisée pour aller droit au deal." },
    { title: "Transparence", desc: "Liens affiliés possibles — même prix pour toi, soutien pour le projet." },
    { title: "Multilingue", desc: "FR, EN, ES, AR, ZH pour toucher plus de monde au Canada." },
  ],
  en: [
    { title: "Local + online search", desc: "Find products near you and on the web in one place." },
    { title: "Fast & mobile-first", desc: "A simple interface focused on getting to the deal quickly." },
    { title: "Transparent", desc: "Affiliate links may be used — same price for you, supports the project." },
    { title: "Multilingual", desc: "FR, EN, ES, AR, ZH for broader reach across Canada." },
  ],
  es: [
    { title: "Búsqueda local + web", desc: "Encuentra productos cerca de ti y en línea, en un mismo lugar." },
    { title: "Rápido & mobile-first", desc: "Interfaz simple, optimizada para llegar rápido a la oferta." },
    { title: "Transparencia", desc: "Posibles enlaces de afiliado — mismo precio para ti, apoyo al proyecto." },
    { title: "Multilingüe", desc: "FR, EN, ES, AR, ZH para llegar a más personas en Canadá." },
  ],
  ar: [
    { title: "بحث محلي + ويب", desc: "ابحث عن المنتجات بالقرب منك وعبر الإنترنت في مكان واحد." },
    { title: "سريع ومتوافق مع الجوال", desc: "واجهة بسيطة مُحسَّنة للوصول السريع إلى العروض." },
    { title: "الشفافية", desc: "روابط تابعة محتملة — نفس السعر لك، دعم للمشروع." },
    { title: "متعدد اللغات", desc: "FR, EN, ES, AR, ZH للوصول إلى المزيد من الناس في كندا." },
  ],
  zh: [
    { title: "本地 + 网络搜索", desc: "在同一个地方找到您附近和网上的产品。" },
    { title: "快速 & 移动优先", desc: "简单界面，专注于快速找到优惠。" },
    { title: "透明度", desc: "可能使用联盟链接——您支付相同价格，支持项目发展。" },
    { title: "多语言", desc: "FR, EN, ES, AR, ZH，覆盖加拿大更多用户。" },
  ],
};

const WHY_TITLE: Record<Lang, string> = {
  fr: "Pourquoi installer PrixMalin ?",
  en: "Why install PrixMalin?",
  es: "¿Por qué instalar PrixMalin?",
  ar: "لماذا تثبت PrixMalin؟",
  zh: "为什么安装 PrixMalin？",
};

export function AppFeatures({ lang }: { lang: Lang }) {
  const items = FEATURES[lang] ?? FEATURES.en;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-xl font-extrabold">{WHY_TITLE[lang] ?? WHY_TITLE.en}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((f) => (
          <div key={f.title} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <h3 className="text-base font-bold">{f.title}</h3>
            <p className="mt-2 text-sm text-black/70">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
