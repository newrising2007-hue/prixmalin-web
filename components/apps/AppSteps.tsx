type Lang = "fr" | "en" | "es" | "ar" | "zh";

const STEPS: Record<Lang, { t: string; d: string }[]> = {
  fr: [
    { t: "1. Cherche", d: "Tape un produit ou explore les catégories." },
    { t: "2. Compare", d: "Repère l'offre la plus intéressante (local ou web)." },
    { t: "3. Achète", d: "Passe chez un vendeur ou partenaire officiel." },
  ],
  en: [
    { t: "1. Search", d: "Type a product or browse categories." },
    { t: "2. Pick", d: "Find the best option (local or online)." },
    { t: "3. Buy", d: "Purchase from an official seller or partner." },
  ],
  es: [
    { t: "1. Busca", d: "Escribe un producto o explora las categorías." },
    { t: "2. Elige", d: "Encuentra la mejor opción (local o en línea)." },
    { t: "3. Compra", d: "Adquiere con un vendedor o socio oficial." },
  ],
  ar: [
    { t: "1. ابحث", d: "اكتب منتجاً أو تصفح الفئات." },
    { t: "2. اختر", d: "ابحث عن أفضل خيار (محلي أو عبر الإنترنت)." },
    { t: "3. اشترِ", d: "اشترِ من بائع أو شريك رسمي." },
  ],
  zh: [
    { t: "1. 搜索", d: "输入产品名称或浏览分类。" },
    { t: "2. 选择", d: "找到最佳选项（本地或网络）。" },
    { t: "3. 购买", d: "从官方卖家或合作伙伴处购买。" },
  ],
};

const HOW_TITLE: Record<Lang, string> = {
  fr: "Comment ça marche",
  en: "How it works",
  es: "Cómo funciona",
  ar: "كيف يعمل",
  zh: "如何使用",
};

export function AppSteps({ lang }: { lang: Lang }) {
  const steps = STEPS[lang] ?? STEPS.en;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-xl font-extrabold">{HOW_TITLE[lang] ?? HOW_TITLE.en}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.t} className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="text-sm font-bold">{s.t}</p>
            <p className="mt-2 text-sm text-black/70">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
