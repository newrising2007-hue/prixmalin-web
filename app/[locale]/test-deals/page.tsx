import fs from "fs";
import path from "path";
import Link from "next/link";

export default function TestDeals() {
  const raw = fs.readFileSync(path.join(process.cwd(), "data/deals.json"), "utf8");
  const { items } = JSON.parse(raw);

  const abonnements = items.filter((d: any) => d.type === "abonnement");
  const cartes = items.filter((d: any) => d.type === "carte-cadeau");

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">🔧 DEV ONLY</span>
        <h1 className="text-2xl font-bold">Test Deals — {items.length} items</h1>
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4 text-green-700">📋 Abonnements ({abonnements.length})</h2>
        <div className="space-y-2">
          {abonnements.map((d: any) => (
            <div key={d.slug} className="flex items-center justify-between border rounded-lg px-4 py-3 bg-white shadow-sm">
              <div>
                <p className="font-semibold text-sm">{d.title}</p>
                <p className="text-xs text-gray-400">{d.slug} · {d.platform} · {d.price}$</p>
              </div>
              <div className="flex gap-2">
                {d.intentSlug && (
                  <Link href={`/i/${d.intentSlug}`} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">/i/{d.intentSlug}</Link>
                )}
                <a href={d.affiliateUrl} target="_blank" className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200">Lien affilié →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-4 text-purple-700">🎁 Cartes cadeaux ({cartes.length})</h2>
        <div className="space-y-2">
          {cartes.map((d: any) => (
            <div key={d.slug} className="flex items-center justify-between border rounded-lg px-4 py-3 bg-white shadow-sm">
              <div>
                <p className="font-semibold text-sm">{d.title}</p>
                <p className="text-xs text-gray-400">{d.slug} · {d.platform} · {d.price}$</p>
              </div>
              <div className="flex gap-2">
                {d.intentSlug && (
                  <Link href={`/i/${d.intentSlug}`} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">/i/{d.intentSlug}</Link>
                )}
                <a href={d.affiliateUrl} target="_blank" className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200">Lien affilié →</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
