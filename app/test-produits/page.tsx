import { getAllProducts } from "@/lib/products";
import AffiliateButton from "@/components/AffiliateButton";

export const metadata = {
  robots: "noindex, nofollow",
};

export default function TestProduitsPage() {
  const products = getAllProducts();
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Test — Produits affiliés</h1>
        <p className="mt-2 text-black/70">Page de test (noindex). {products.length} produits chargés.</p>
      </header>
      <section className="grid gap-6">
        {products.map((p) => (
          <article key={p.slug} className="rounded-2xl border p-5 shadow-sm">
            <div className="flex gap-4 items-start">
              <div className="w-32 h-32 border rounded-xl bg-white overflow-hidden shrink-0">
                {p.image
                  ? <img src={p.image} alt={p.title} className="w-full h-full object-contain p-2" />
                  : <div className="w-full h-full flex items-center justify-center text-xs text-black/40">Pas d'image</div>
                }
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-semibold">{p.title}</h2>
                  {p.category && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">{p.category}</span>}
                  {p.badge && p.badge !== 'Aucun' && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{p.badge}</span>}
                </div>
                <p className="text-sm text-black/60 mt-1">{p.shortDescription}</p>
                {p.prix && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-orange-600">{p.prix}$</span>
                    {p.prixBarre && <span className="text-sm line-through text-black/40">{p.prixBarre}$</span>}
                  </div>
                )}
                <p className="text-xs text-black/40 mt-1 font-mono">{p.amazonUrl}</p>
                <div className="mt-3">
                  <AffiliateButton url={p.amazonUrl} label="Tester lien Amazon →" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
