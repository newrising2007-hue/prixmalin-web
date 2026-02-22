export function AppSteps({ lang }: { lang: "fr" | "en" }) {
  const steps =
    lang === "fr"
      ? [
          { t: "1. Cherche", d: "Tape un produit ou explore les catégories." },
          { t: "2. Compare", d: "Repère l’offre la plus intéressante (local ou web)." },
          { t: "3. Achète", d: "Passe chez un vendeur ou partenaire officiel." },
        ]
      : [
          { t: "1. Search", d: "Type a product or browse categories." },
          { t: "2. Pick", d: "Find the best option (local or online)." },
          { t: "3. Buy", d: "Purchase from an official seller or partner." },
        ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-xl font-extrabold">
        {lang === "fr" ? "Comment ça marche" : "How it works"}
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.t}
            className="rounded-2xl border border-black/10 bg-white p-5"
          >
            <p className="text-sm font-bold">{s.t}</p>
            <p className="mt-2 text-sm text-black/70">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
