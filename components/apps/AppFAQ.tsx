export type FAQItem = { q: string; a: string };
type Lang = "fr" | "en" | "es" | "ar" | "zh";

const FAQ_DATA: Record<Lang, FAQItem[]> = {
  fr: [
    { q: "PrixMalin est gratuit ?", a: "Oui. Le service est gratuit. Le site peut utiliser des liens affiliés : tu paies le même prix, et cela soutient le projet." },
    { q: "Pourquoi pas sur Google Play tout de suite ?", a: "La publication est en préparation. La sortie sur Google Play arrive bientôt." },
    { q: "Quelles langues sont supportées ?", a: "Français, anglais, espagnol, chinois et arabe." },
    { q: "Est-ce un comparateur de prix en temps réel ?", a: "Non. PrixMalin aide à repérer des offres et des produits (local + web)." },
  ],
  en: [
    { q: "Is PrixMalin free?", a: "Yes. The service is free. The site may use affiliate links: you pay the same price, and it supports the project." },
    { q: "Why isn't it on Google Play yet?", a: "The release is being prepared. Google Play availability is coming soon." },
    { q: "Which languages are supported?", a: "French, English, Spanish, Chinese and Arabic." },
    { q: "Is it a live price comparison tool?", a: "No. PrixMalin helps you discover products and offers (local + online)." },
  ],
  es: [
    { q: "¿PrixMalin es gratuito?", a: "Sí. El servicio es gratuito. El sitio puede usar enlaces de afiliado: pagas el mismo precio y apoya el proyecto." },
    { q: "¿Por qué aún no está en Google Play?", a: "La publicación está en preparación. La disponibilidad en Google Play llegará pronto." },
    { q: "¿Qué idiomas son compatibles?", a: "Francés, inglés, español, chino y árabe." },
    { q: "¿Es una herramienta de comparación de precios en tiempo real?", a: "No. PrixMalin te ayuda a descubrir productos y ofertas (local + web)." },
  ],
  ar: [
    { q: "هل PrixMalin مجاني؟", a: "نعم. الخدمة مجانية. قد يستخدم الموقع روابط تابعة: تدفع نفس السعر وهذا يدعم المشروع." },
    { q: "لماذا لم يصدر على Google Play بعد؟", a: "الإصدار قيد التحضير. سيتوفر على Google Play قريباً." },
    { q: "ما اللغات المدعومة؟", a: "الفرنسية والإنجليزية والإسبانية والصينية والعربية." },
    { q: "هل هو أداة مقارنة أسعار في الوقت الفعلي؟", a: "لا. يساعدك PrixMalin على اكتشاف المنتجات والعروض (محلي + ويب)." },
  ],
  zh: [
    { q: "PrixMalin 是免费的吗？", a: "是的。该服务免费。网站可能使用联盟链接：您支付相同价格，同时支持项目发展。" },
    { q: "为什么还没有在 Google Play 上发布？", a: "发布正在准备中。Google Play 版本即将推出。" },
    { q: "支持哪些语言？", a: "法语、英语、西班牙语、中文和阿拉伯语。" },
    { q: "这是实时价格比较工具吗？", a: "不是。PrixMalin 帮助您发现产品和优惠（本地 + 网络）。" },
  ],
};

export function getFAQ(lang: Lang): FAQItem[] {
  return FAQ_DATA[lang] ?? FAQ_DATA.en;
}

export function AppFAQ({ lang }: { lang: Lang }) {
  const items = getFAQ(lang);

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-xl font-extrabold">FAQ</h2>
      <div className="mt-6 grid gap-3">
        {items.map((it) => (
          <details key={it.q} className="group rounded-2xl border border-black/10 bg-white p-5">
            <summary className="cursor-pointer list-none font-bold">
              {it.q}
              <span className="float-right text-black/40 group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-black/70">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
