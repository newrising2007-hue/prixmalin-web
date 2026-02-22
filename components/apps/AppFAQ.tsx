export type FAQItem = { q: string; a: string };

export function getFAQ(lang: "fr" | "en"): FAQItem[] {
  if (lang === "fr") {
    return [
      {
        q: "PrixMalin est gratuit ?",
        a: "Oui. Le service est gratuit. Le site peut utiliser des liens affiliés : tu paies le même prix, et cela soutient le projet.",
      },
      {
        q: "Pourquoi pas sur Google Play tout de suite ?",
        a: "La publication est en préparation. La sortie sur Google Play arrive bientôt.",
      },
      {
        q: "Quelles langues sont supportées ?",
        a: "Français, anglais, espagnol, chinois et arabe.",
      },
      {
        q: "Est-ce un comparateur de prix en temps réel ?",
        a: "Non. PrixMalin aide à repérer des offres et des produits (local + web).",
      },
    ];
  }

  return [
    {
      q: "Is PrixMalin free?",
      a: "Yes. The service is free. The site may use affiliate links: you pay the same price, and it supports the project.",
    },
    {
      q: "Why isn’t it on Google Play yet?",
      a: "The release is being prepared. Google Play availability is coming soon.",
    },
    {
      q: "Which languages are supported?",
      a: "French, English, Spanish, Chinese and Arabic.",
    },
    {
      q: "Is it a live price comparison tool?",
      a: "No. PrixMalin helps you discover products and offers (local + online).",
    },
  ];
}

export function AppFAQ({ lang }: { lang: "fr" | "en" }) {
  const items = getFAQ(lang);

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-xl font-extrabold">FAQ</h2>

      <div className="mt-6 grid gap-3">
        {items.map((it) => (
          <details
            key={it.q}
            className="group rounded-2xl border border-black/10 bg-white p-5"
          >
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
