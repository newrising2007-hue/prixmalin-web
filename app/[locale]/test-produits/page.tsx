import fs from "fs";
import path from "path";

export default function TestProduits() {
  const raw = fs.readFileSync(path.join(process.cwd(), "data/products.json"), "utf8");
  const items = JSON.parse(raw);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">🔧 DEV ONLY</span>
        <h1 className="text-2xl font-bold">Test Produits — {items.length} items</h1>
      </div>

      <div className="space-y-2">
        {items.map((p: any) => (
          <div key={p.slug} className="flex items-center justify-between border rounded-lg px-4 py-3 bg-white shadow-sm">
            <div>
              <p className="font-semibold text-sm">{p.title}</p>
              <p className="text-xs text-gray-400">{p.slug} · {p.category} · {p.prix}$</p>
            </div>
            <div className="flex gap-2">
              <a href={`/produit/${p.slug}`} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">Fiche →</a>
              <a href={p.amazonUrl} target="_blank" className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200">Amazon →</a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
