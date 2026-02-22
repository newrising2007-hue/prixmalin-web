type Feature = { title: string; desc: string };

export function AppFeatures({ lang }: { lang: "fr" | "en" }) {
  const items: Feature[] =
    lang === "fr"
      ? [
          {
            title: "Recherche local + web",
            desc: "Trouve des produits autour de toi et en ligne, au même endroit.",
          },
          {
            title: "Rapide & mobile-first",
            desc: "Interface simple, optimisée pour aller droit au deal.",
          },
          {
            title: "Transparence",
            desc: "Liens affiliés possibles — même prix pour toi, soutien pour le projet.",
          },
          {
            title: "Multilingue",
            desc: "FR, EN, ES, AR, ZH pour toucher plus de monde au Canada.",
          },
        ]
      : [
          {
            title: "Local + online search",
            desc: "Find products near you and on the web in one place.",
          },
          {
            title: "Fast & mobile-first",
            desc: "A simple interface focused on getting to the deal quickly.",
          },
          {
            title: "Transparent",
            desc: "Affiliate links may be used — same price for you, supports the project.",
          },
          {
            title: "Multilingual",
            desc: "FR, EN, ES, AR, ZH for broader reach across Canada.",
          },
        ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-xl font-extrabold">
        {lang === "fr" ? "Pourquoi installer PrixMalin ?" : "Why install PrixMalin?"}
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
          >
            <h3 className="text-base font-bold">{f.title}</h3>
            <p className="mt-2 text-sm text-black/70">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
