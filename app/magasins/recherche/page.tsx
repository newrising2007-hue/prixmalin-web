'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Result {
  id: string;
  store: string;
  logo: string;
  label: string;
  badge: string;
  url: string;
  type: string;
  color: string;
}

function RechercheContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('cat') || 'divers';

  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(query);

  useEffect(() => {
    if (!query.trim()) { setLoading(false); return; }
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}&cat=${category}`)
      .then(r => r.json())
      .then(data => { setResults(data.results || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [query, category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/magasins/recherche?q=${encodeURIComponent(search.trim())}`;
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(255,255,255,0.97) 45%, rgba(34,197,94,0.08) 100%)' }}>
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Barre de recherche */}
        <form onSubmit={handleSearch} className="relative mb-8">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full px-5 py-4 pr-16 rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-lg shadow-sm"
          />
          <button type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl text-white font-semibold text-sm"
            style={{ background: 'linear-gradient(135deg, #16a34a, #059669)' }}>
            🔍
          </button>
        </form>

        {/* Titre résultats */}
        {query && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Résultats pour <span className="text-green-600">"{query}"</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Amazon.ca · Walmart.ca · Commerces locaux à venir</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3 animate-pulse">🔍</div>
            <p>Recherche en cours...</p>
          </div>
        )}

        {/* Résultats */}
        {!loading && results.length > 0 && (
          <div className="space-y-4">
            {results.map(r => (
              <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-white border-2 border-gray-100 hover:border-green-300 hover:shadow-md transition-all group">
                <div className="text-4xl">{r.logo}</div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                    {r.store}
                  </div>
                  <div className="text-sm text-gray-500">{r.label}</div>
                </div>
                <div className="px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-sm"
                  style={{ background: r.color }}>
                  {r.badge} →
                </div>
              </a>
            ))}

            {/* Message locaux à venir */}
            <div className="p-5 rounded-2xl border-2 border-dashed border-gray-200 text-center text-gray-400">
              <div className="text-2xl mb-2">📍</div>
              <p className="text-sm font-medium">Commerces locaux — Bientôt disponible</p>
              <p className="text-xs mt-1">Résultats GPS · Facebook Marketplace · Kijiji</p>
            </div>
          </div>
        )}

        {/* Aucune recherche */}
        {!loading && !query && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🛍️</div>
            <p className="text-lg font-medium">Tapez un produit pour commencer</p>
          </div>
        )}

        {/* Retour */}
        <div className="mt-10 text-center">
          <a href="/magasins" className="text-sm text-gray-400 hover:text-green-600 transition-colors">
            ← Retour Magasinage
          </a>
        </div>
      </div>
    </main>
  );
}

export default function RecherchePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-pulse">🔍</div>
      </div>
    }>
      <RechercheContent />
    </Suspense>
  );
}
