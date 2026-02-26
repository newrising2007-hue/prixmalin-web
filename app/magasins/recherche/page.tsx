'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const BACKEND_URL = 'https://prixmalin-backend.onrender.com';

interface Result {
  product_name: string;
  store: string;
  address?: string;
  distance?: string;
  phone?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  type: string;
  rating?: number;
  affiliate_url?: string;
  url?: string;
}

function RechercheContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('cat') || 'divers';

  const [onlineResults, setOnlineResults] = useState<Result[]>([]);
  const [localResults, setLocalResults] = useState<Result[]>([]);
  const [loadingOnline, setLoadingOnline] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [search, setSearch] = useState(query);
  const [gpsStatus, setGpsStatus] = useState<'idle'|'asking'|'granted'|'denied'>('idle');

  useEffect(() => {
    if (!query.trim()) return;
    setOnlineResults([]);
    setLocalResults([]);
    loadOnline(query, category);
    loadLocal(query, category);
  }, [query, category]);

  // Rapide — API locale Next.js
  async function loadOnline(q: string, cat: string) {
    setLoadingOnline(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&cat=${cat}`);
      const data = await res.json();
      setOnlineResults(data.results || []);
    } catch {}
    setLoadingOnline(false);
  }

  // Lent — Backend Render.com + GPS
  async function loadLocal(q: string, cat: string) {
    setLoadingLocal(true);
    setGpsStatus('asking');

    let loc = { latitude: 45.5017, longitude: -73.5673 };

    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 8000 })
      );
      loc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
      setGpsStatus('granted');
    } catch {
      setGpsStatus('denied');
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/search-prices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, category: cat, location: loc, radiusKm: 150 }),
      });
      const data = await res.json();
      const locals = (data.results || []).filter((r: Result) =>
        r.type === 'local_with_website' || r.type === 'local_no_website'
      );
      setLocalResults(locals);
    } catch {}
    setLoadingLocal(false);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/magasins/recherche?q=${encodeURIComponent(search.trim())}`;
    }
  };

  function renderOnline(r: Result, i: number) {
    const url = r.url || r.affiliate_url || '#';
    const logo = r.store.includes('Amazon') ? '📦' : r.store.includes('Walmart') ? '🛒' : r.store.includes('eBay') ? '🏷️' : r.store.includes('Facebook') ? '📘' : '📢';
    const color = r.store.includes('Amazon') ? '#FF9900' : r.store.includes('Walmart') ? '#0071CE' : r.store.includes('eBay') ? '#E53238' : r.store.includes('Facebook') ? '#1877F2' : '#373373';

    return (
      <a key={i} href={url} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-4 p-5 rounded-2xl bg-white border-2 border-gray-100 hover:border-green-300 hover:shadow-md transition-all group">
        <div className="text-3xl">{logo}</div>
        <div className="flex-1">
          <div className="font-bold text-gray-800 group-hover:text-green-700">{r.store}</div>
          <div className="text-sm text-gray-400">En ligne · Livraison disponible</div>
        </div>
        <span className="px-3 py-1.5 rounded-xl text-white text-xs font-semibold" style={{ background: color }}>
          Voir les prix →
        </span>
      </a>
    );
  }

  function renderLocal(r: Result, i: number) {
    const url = r.website || r.affiliate_url || `https://www.google.com/maps/search/?q=${encodeURIComponent(r.store)}`;
    return (
      <a key={i} href={url} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-4 p-5 rounded-2xl bg-white border-2 border-gray-100 hover:border-green-300 hover:shadow-md transition-all group">
        <div className="text-3xl">📍</div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-800 group-hover:text-green-700">{r.store}</div>
          {r.address && <div className="text-sm text-gray-500 truncate">{r.address}</div>}
          {r.distance && <div className="text-xs text-green-600 font-semibold mt-0.5">📏 {r.distance}</div>}
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          {r.phone && (
            <span onClick={e => { e.stopPropagation(); window.location.href=`tel:${r.phone}`; }}
              className="text-xs text-blue-500 hover:underline cursor-pointer">📞 {r.phone}</span>
          )}
          <span className="px-3 py-1.5 rounded-xl text-white text-xs font-semibold"
            style={{ background: '#16a34a' }}>
            {r.type === 'local_with_website' ? 'Voir site →' : 'Maps →'}
          </span>
        </div>
      </a>
    );
  }

  return (
    <main className="relative min-h-screen"
      style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(255,255,255,0.97) 45%, rgba(34,197,94,0.08) 100%)' }}>
      <div className="max-w-2xl mx-auto px-4 py-10">

        <form onSubmit={handleSearch} className="relative mb-8">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full px-5 py-4 pr-16 rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-lg shadow-sm" />
          <button type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl text-white font-semibold"
            style={{ background: 'linear-gradient(135deg, #16a34a, #059669)' }}>🔍</button>
        </form>

        {query && (
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Résultats pour <span className="text-green-600">"{query}"</span>
          </h1>
        )}

        {/* EN LIGNE — apparaît en premier */}
        <div className="space-y-3 mb-8">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">🌐 En ligne</h2>
          {loadingOnline ? (
            <div className="text-center py-6 text-gray-400 animate-pulse">Chargement...</div>
          ) : (
            onlineResults.map((r, i) => renderOnline(r, i))
          )}
        </div>

        {/* LOCAUX — apparaît après GPS + Render */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">📍 Magasins près de vous</h2>
            {loadingLocal && <span className="text-xs text-blue-500 animate-pulse">● Localisation en cours...</span>}
            {gpsStatus === 'denied' && <span className="text-xs text-yellow-600">⚠️ Position non détectée</span>}
            {gpsStatus === 'granted' && <span className="text-xs text-green-600">✅ Triés par distance</span>}
          </div>

          {loadingLocal && localResults.length === 0 ? (
            <div className="p-5 rounded-2xl border-2 border-dashed border-gray-200 text-center text-gray-400">
              <div className="animate-pulse">🔍 Recherche des magasins près de vous...</div>
            </div>
          ) : localResults.length > 0 ? (
            localResults.map((r, i) => renderLocal(r, i))
          ) : !loadingLocal ? (
            <div className="p-5 rounded-2xl border-2 border-dashed border-gray-200 text-center text-gray-400 text-sm">
              Aucun magasin trouvé dans votre région pour cette recherche.
            </div>
          ) : null}
        </div>

        {!query && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🛍️</div>
            <p className="text-lg font-medium">Tapez un produit pour commencer</p>
          </div>
        )}

        <div className="mt-10 text-center">
          <a href="/magasins" className="text-sm text-gray-400 hover:text-green-600 transition-colors">← Retour Magasinage</a>
        </div>
      </div>
    </main>
  );
}

export default function RecherchePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-4xl animate-pulse">🔍</div></div>}>
      <RechercheContent />
    </Suspense>
  );
}
