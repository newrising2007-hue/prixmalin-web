import dealsData from "@/data/deals.json";

export const metadata = { robots: "noindex" };

const platformColors: Record<string, string> = {
  Xbox: "bg-green-100 text-green-800",
  PlayStation: "bg-blue-100 text-blue-800",
  Nintendo: "bg-red-100 text-red-800",
};

export default function TestDealsPage() {
  const { items, updatedAt } = dealsData as any;
  const actifs = items.filter((i: any) => i.actif === true);
  const inactifs = items.filter((i: any) => i.actif === false);
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Test Deals</h1>
      <p className="text-sm text-gray-500 mb-6">
        Page de test (noindex). {items.length} deals — maj {updatedAt}
        {" · "}<span className="text-green-600 font-semibold">{actifs.length} actifs</span>
        {" · "}<span className="text-red-500">{inactifs.length} inactifs</span>
      </p>
      {["abonnement", "carte-cadeau"].map((type) => (
        <section key={type} className="mb-10">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">
            {type === "abonnement" ? "Abonnements" : "Cartes cadeaux"}
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({items.filter((i: any) => i.type === type).length} items)
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.filter((i: any) => i.type === type).map((deal: any) => (
              <div key={deal.slug} className={"border rounded-xl p-4 relative " + (deal.actif === false ? "opacity-40 grayscale" : "")}>
                {deal.actif === false && <span className="absolute top-2 right-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">INACTIF</span>}
                {deal.badge && deal.actif === true && <span className="absolute top-2 right-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">{deal.badge}</span>}
                <span className={(platformColors[deal.platform] ?? "bg-gray-100 text-gray-700") + " text-xs font-semibold px-2 py-0.5 rounded-full"}>{deal.platform}</span>
                <h3 className="font-semibold mt-2 mb-1 text-sm">{deal.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{deal.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-700">{deal.price} $</span>
                  <a href={deal.affiliateUrl} target="_blank" rel="noopener noreferrer" className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700">Voir sur Amazon</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
