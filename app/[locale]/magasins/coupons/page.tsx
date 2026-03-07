"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Coupon {
  id: string;
  store: string;
  logo: string;
  code: string;
  description: string;
  url: string;
  category: string;
  discount: string;
  expiry: string;
  verified: boolean;
  actif: boolean;
}

const CATEGORIES = [
  { value: "all", label: "Tous", emoji: "🏷️" },
  { value: "electro", label: "Électronique", emoji: "📱" },
  { value: "epicerie", label: "Épicerie", emoji: "🛒" },
  { value: "restaurant", label: "Restaurant", emoji: "🍔" },
  { value: "mode", label: "Mode", emoji: "👕" },
  { value: "maison", label: "Maison", emoji: "🏠" },
  { value: "sport", label: "Sport", emoji: "⚽" },
];

function isExpired(expiry: string): boolean {
  return new Date(expiry) < new Date();
}

function daysLeft(expiry: string): number {
  const diff = new Date(expiry).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function CarteCoupon({ c }: { c: Coupon }) {
  const [copied, setCopied] = useState(false);
  const expired = isExpired(c.expiry);
  const days = daysLeft(c.expiry);

  const handleCopy = () => {
    navigator.clipboard.writeText(c.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 p-5 ${expired ? "opacity-50 border-gray-100" : "border-gray-100"}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{c.logo}</span>
          <div>
            <p className="font-bold text-gray-900 text-sm">{c.store}</p>
            <p className="text-xs text-gray-500">{c.description}</p>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">{c.discount}</span>
          {c.verified && <p className="text-xs text-green-500 mt-1">✅ Vérifié</p>}
        </div>
      </div>

      {/* CODE */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 bg-gray-50 border border-dashed border-gray-300 rounded-xl px-4 py-2 text-center">
          <span className="font-mono font-bold text-gray-800 tracking-widest text-sm">{c.code}</span>
        </div>
        <button onClick={handleCopy}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${copied ? "bg-green-600 text-white" : "bg-gray-900 text-white hover:bg-gray-700"}`}>
          {copied ? "✅ Copié!" : "📋 Copier"}
        </button>
      </div>

      {/* EXPIRY */}
      <p className={`text-xs mb-3 ${expired ? "text-red-400" : days <= 7 ? "text-amber-500" : "text-gray-400"}`}>
        {expired ? "⛔ Expiré" : days <= 7 ? `⚠️ Expire dans ${days} jour${days > 1 ? "s" : ""}` : `📅 Valide jusqu'au ${new Date(c.expiry).toLocaleDateString("fr-CA")}`}
      </p>

      {/* CTA */}
      <a href={c.url} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl text-xs font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors">
        🛍️ Magasiner sur {c.store} →
      </a>
    </div>
  );
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [showExpired, setShowExpired] = useState(false);

  useEffect(() => {
    fetch("/data/coupons.json")
      .then(r => r.json())
      .then(data => setCoupons(data.coupons || []));
  }, []);

  const filtered = coupons.filter(c => {
    if (!c.actif) return false;
    if (!showExpired && isExpired(c.expiry)) return false;
    if (category !== "all" && c.category !== category) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return c.store.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(255,255,255,0.97) 50%, rgba(34,197,94,0.08) 100%)" }} />

      {/* HERO */}
      <section className="pt-12 pb-6 px-6 text-center">
        <div className="text-5xl mb-4">🏷️</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
          Codes Promo &{" "}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #2563eb, #16a34a)" }}>
            Rabais
          </span>
        </h1>
        <p className="text-gray-500 text-sm">Codes vérifiés · Grands détaillants canadiens · Économies garanties</p>
      </section>

      {/* FILTRES */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Rechercher un magasin, un code..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-colors" />

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Catégorie</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button key={cat.value} onClick={() => setCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${category === cat.value ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}>
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={showExpired} onChange={e => setShowExpired(e.target.checked)} className="w-4 h-4 accent-blue-600" />
            <span className="text-sm text-gray-600">Afficher les codes expirés</span>
          </label>
        </div>
      </section>

      {/* RÉSULTATS */}
      <section className="px-4 pb-10 max-w-4xl mx-auto">
        <p className="text-sm text-gray-400 mb-4 font-medium">{filtered.length} code{filtered.length !== 1 ? "s" : ""} disponible{filtered.length !== 1 ? "s" : ""}</p>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🏷️</div>
            <p className="text-gray-500 font-medium mb-2">Aucun coupon trouvé</p>
            <p className="text-gray-400 text-sm">Revenez bientôt — de nouveaux codes sont ajoutés régulièrement</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(c => <CarteCoupon key={c.id} c={c} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-16 max-w-3xl mx-auto text-center">
        <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-6">
          <p className="text-gray-600 text-sm mb-2">Vous connaissez un bon code promo à partager ?</p>
          <a href="mailto:contact@prixmalin.ca?subject=Suggestion coupon"
            className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm hover:underline">
            ✉️ Contactez-nous, on l'ajoute
          </a>
        </div>
      </section>

      <div className="pb-10 text-center">
        <Link href="/magasins" className="text-sm text-gray-400 hover:text-green-600 transition-colors">
          ← Retour Magasinage
        </Link>
      </div>
    </main>
  );
}