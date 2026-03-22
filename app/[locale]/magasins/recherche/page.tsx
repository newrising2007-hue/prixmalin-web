'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const BACKEND_URL = 'https://prixmalin-backend.onrender.com';
const PROVINCES = [
  { code: "QC", nom: "Québec" },
  { code: "ON", nom: "Ontario" },
  { code: "BC", nom: "Colombie-Britannique" },
  { code: "AB", nom: "Alberta" },
  { code: "MB", nom: "Manitoba" },
  { code: "SK", nom: "Saskatchewan" },
  { code: "NS", nom: "Nouvelle-Écosse" },
  { code: "NB", nom: "Nouveau-Brunswick" },
  { code: "NL", nom: "Terre-Neuve" },
  { code: "PE", nom: "Île-du-Prince-Édouard" },
];

const VILLES_PAR_PROVINCE: Record<string, string[]> = {
  QC: ["Alma","Amos","Baie-Comeau","Baie-Saint-Paul","Beauceville","Blainville","Boisbriand","Boucherville","Bromont","Brossard","Candiac","Châteauguay","Chicoutimi","Coaticook","Cowansville","Dollard-des-Ormeaux","Dorval","Drummondville","Farnham","Gaspé","Gatineau","Granby","Joliette","Kirkland","La Prairie","La Sarre","La Tuque","Lac-Mégantic","Lachute","Laval","Lévis","L'Assomption","Longueuil","Lorraine","Magog","Mascouche","Matane","Mirabel","Mont-Joli","Mont-Laurier","Mont-Royal","Mont-Saint-Hilaire","Montmagny","Montréal","Pincourt","Pointe-Claire","Pont-Rouge","Québec","Repentigny","Rimouski","Rivière-du-Loup","Roberval","Rosemère","Rouyn-Noranda","Saint-Basile-le-Grand","Saint-Bruno-de-Montarville","Saint-Constant","Saint-Eustache","Saint-Georges","Saint-Hyacinthe","Saint-Jean-sur-Richelieu","Saint-Jérôme","Saint-Lambert","Saint-Laurent","Saint-Lazare","Saint-Lin-Laurentides","Saint-Nicolas","Saint-Rémi","Saint-Sauveur","Sainte-Agathe-des-Monts","Sainte-Julie","Sainte-Marie","Sainte-Thérèse","Salaberry-de-Valleyfield","Sept-Îles","Shawinigan","Sherbrooke","Sorel-Tracy","Terrebonne","Thetford Mines","Trois-Rivières","Val-d'Or","Varennes","Vaudreuil-Dorion","Victoriaville","Ville-Marie (Témiscamingue)","Waterloo"],
  ON: ["Ajax","Aurora","Barrie","Belleville","Brampton","Brantford","Burlington","Cambridge","Chatham","Clarington","Cobourg","Cornwall","Guelph","Halton Hills","Hamilton","Innisfil","Kingston","Kitchener","London","Markham","Milton","Mississauga","Newmarket","Niagara Falls","North Bay","Oakville","Oshawa","Ottawa","Peterborough","Pickering","Richmond Hill","Sarnia","Sault Ste. Marie","St. Catharines","Sudbury","Thunder Bay","Timmins","Toronto","Vaughan","Waterloo","Welland","Whitby","Windsor","Woodstock"],
  BC: ["Abbotsford","Armstrong","Burnaby","Campbell River","Castlegar","Chilliwack","Colwood","Comox","Coquitlam","Courtenay","Cranbrook","Delta","Fort St. John","Kamloops","Kelowna","Kimberley","Langford","Langley","Maple Ridge","Mission","Nanaimo","Nelson","New Westminster","North Vancouver","Penticton","Pitt Meadows","Port Coquitlam","Port Moody","Prince George","Richmond","Salmon Arm","Saanich","Surrey","Terrace","Trail","Vancouver","Vernon","Victoria","West Kelowna","White Rock"],
  AB: ["Airdrie","Beaumont","Brooks","Calgary","Camrose","Chestermere","Cold Lake","Edmonton","Fort McMurray","Fort Saskatchewan","Grande Prairie","Lacombe","Leduc","Lethbridge","Lloydminster","Medicine Hat","Okotoks","Red Deer","Spruce Grove","St. Albert","Sherwood Park","Sylvan Lake","Wetaskiwin"],
  MB: ["Brandon","Dauphin","Flin Flon","Morden","Portage la Prairie","Selkirk","Steinbach","The Pas","Thompson","Winkler","Winnipeg"],
  SK: ["Estevan","Humboldt","Lloydminster","Martensville","Meadow Lake","Melfort","Moose Jaw","North Battleford","Prince Albert","Regina","Saskatoon","Swift Current","Warman","Weyburn","Yorkton"],
  NS: ["Amherst","Bridgewater","Dartmouth","Glace Bay","Halifax","Kentville","New Glasgow","Sydney","Truro","Windsor","Yarmouth"],
  NB: ["Bathurst","Campbellton","Dieppe","Edmundston","Fredericton","Miramichi","Moncton","Oromocto","Quispamsis","Rothesay","Saint John","Shediac","Woodstock"],
  NL: ["Conception Bay South","Corner Brook","Gander","Grand Falls-Windsor","Happy Valley-Goose Bay","Labrador City","Mount Pearl","Paradise","St. John's","Stephenville"],
  PE: ["Charlottetown","Cornwall","Montague","Stratford","Summerside"],
};


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
  verified?: boolean;
}

function RechercheContent() {
  const t = useTranslations('magasins.recherche');
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('cat') || 'divers';

  const [onlineResults, setOnlineResults] = useState<Result[]>([]);
  const [localResults, setLocalResults] = useState<Result[]>([]);
  const [loadingOnline, setLoadingOnline] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [search, setSearch] = useState("");
  const [gpsStatus, setGpsStatus] = useState<'idle'|'asking'|'granted'|'denied'>('idle');
  const [userCity, setUserCity] = useState<string>('');
  const [modeVille, setModeVille] = useState(false);
  const [province, setProvince] = useState('QC');
  const [villeInput, setVilleInput] = useState('');
  const [villeActive, setVilleActive] = useState<string | null>(null);
  const [villeLoading, setVilleLoading] = useState(false);
  const [villeCoords, setVilleCoords] = useState<{lat: number; lng: number} | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) return;
    setOnlineResults([]);
    setLocalResults([]);
    loadOnline(query, category);
    loadLocal(query, category);
  }, [query, category]);

  async function loadOnline(q: string, cat: string) {
    setLoadingOnline(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&cat=${cat}`);
      const data = await res.json();
      setOnlineResults(data.results || []);
    } catch {}
    setLoadingOnline(false);
  }

  async function loadLocal(q: string, cat: string, coordsOverride?: {lat: number; lng: number}) {
    setLoadingLocal(true);
    if (!coordsOverride) setGpsStatus('asking');
    let loc = coordsOverride
      ? { latitude: coordsOverride.lat, longitude: coordsOverride.lng }
      : { latitude: 47.3283, longitude: -79.4338 };
    if (!coordsOverride) {
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 8000 })
      );
      loc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
      setGpsStatus('granted');
      try {
        const geo = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`);
        const geoData = await geo.json();
        const city = geoData.address?.city || geoData.address?.town || geoData.address?.village || '';
        const province = geoData.address?.state || '';
        if (city) setUserCity(`${city}, ${province}`);
      } catch {}
    } catch {
      setGpsStatus('denied');
    }
    } // fin if(!coordsOverride)
    try {
      const res = await fetch(`${BACKEND_URL}/api/search-prices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, category: cat, location: loc, radiusKm: 25 }),
      });
      const data = await res.json();
      const locals = (data.results || []).filter((r: Result) =>
        r.type === 'local_with_website' || r.type === 'local_no_website'
      );
      setLocalResults(locals);
    } catch {}
    setLoadingLocal(false);
  }


  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleVilleChange = (val: string) => {
    setVilleInput(val);
    const villes = VILLES_PAR_PROVINCE[province] ?? [];
    if (val.trim().length === 0) { setSuggestions([]); setShowSuggestions(false); return; }
    const q = val.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const found = villes.filter(v => v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').startsWith(q)).slice(0, 8);
    setSuggestions(found);
    setShowSuggestions(found.length > 0);
    setHighlightedIndex(-1);
  };

  const handleVilleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightedIndex(i => Math.min(i + 1, suggestions.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlightedIndex(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && highlightedIndex >= 0) { e.preventDefault(); pickSuggestion(suggestions[highlightedIndex]); }
    else if (e.key === 'Enter') { setShowSuggestions(false); rechercherVille(); }
    else if (e.key === 'Escape') { setShowSuggestions(false); }
  };

  const pickSuggestion = (ville: string) => {
    setVilleInput(ville);
    setSuggestions([]);
    setShowSuggestions(false);
    setVilleLoading(true);
    fetch(`${BACKEND_URL}/api/geocode?ville=${encodeURIComponent(ville + ', ' + province)}`)
      .then(r => r.json())
      .then(data => {
        if (data.lat && data.lng) {
          setVilleActive(data.nom);
          setVilleInput('');
          setVilleCoords({ lat: data.lat, lng: data.lng });
          setLocalResults([]);
          if (query.trim()) loadLocal(query, category, { lat: data.lat, lng: data.lng });
        }
        setVilleLoading(false);
      })
      .catch(() => setVilleLoading(false));
  };

  const rechercherVille = async () => {
    if (!villeInput.trim()) return;
    setVilleLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/geocode?ville=${encodeURIComponent(villeInput + ', ' + province)}`);
      const data = await res.json();
      if (data.lat && data.lng) {
        setVilleActive(data.nom);
        setVilleInput('');
        setVilleCoords({ lat: data.lat, lng: data.lng });
        setLocalResults([]);
        if (query.trim()) loadLocal(query, category, { lat: data.lat, lng: data.lng });
      }
    } catch (e) {
      console.error('Erreur geocoding:', e);
    }
    setVilleLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/magasins/recherche?q=${encodeURIComponent(search.trim())}`;
      setSearch("");
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
          <div className="text-sm text-gray-400">{t('en_ligne_livraison')}</div>
        </div>
        <span className="px-3 py-1.5 rounded-xl text-white text-xs font-semibold" style={{ background: color }}>
          {t('voir_prix')}
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
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-gray-800 group-hover:text-green-700">{r.store}</span>
            {!r.verified && <span className="text-xs font-semibold">via <span style={{color:"#4285F4"}}>G</span><span style={{color:"#EA4335"}}>o</span><span style={{color:"#FBBC05"}}>o</span><span style={{color:"#34A853"}}>g</span><span style={{color:"#EA4335"}}>l</span><span style={{color:"#4285F4"}}>e</span></span>}
          </div>
          {r.address && <div className="text-sm text-gray-500 truncate">{r.address}</div>}
          {r.distance && <div className="text-xs text-green-600 font-semibold mt-0.5">📏 {r.distance}</div>}
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          {r.phone && (
            <span onClick={e => { e.stopPropagation(); window.location.href=`tel:${r.phone}`; }}
              className="text-xs text-blue-500 hover:underline cursor-pointer">📞 {r.phone}</span>
          )}
          <span className="px-3 py-1.5 rounded-xl text-white text-xs font-semibold" style={{ background: '#16a34a' }}>
            {r.type === 'local_with_website' ? t('voir_site') : t('maps')}
          </span>
        </div>
      </a>
    );
  }

  return (
    <main className="relative min-h-screen"
      style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(255,255,255,0.97) 45%, rgba(34,197,94,0.08) 100%)' }}>
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* TOGGLE LOCAL / AUTRE VILLE */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => {
              setModeVille(false);
              setVilleActive(null);
              setVilleInput('');
              setVilleCoords(null);
              setProvince('QC');
              setLocalResults([]);
              if (query.trim()) loadLocal(query, category);
            }}
            className={`rounded-full border text-sm font-semibold transition-all px-3 py-1 ${!modeVille ? 'bg-green-500 text-white border-green-500' : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'}`}>
            📍 Local
          </button>
          <button
            onClick={() => setModeVille(true)}
            className={`rounded-full border text-sm font-semibold transition-all px-3 py-1 ${modeVille ? 'bg-green-500 text-white border-green-500' : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'}`}>
            🗺️ Autre ville
          </button>
          {villeActive && (
            <span className="text-xs text-green-700 font-semibold bg-green-50 px-2 py-1 rounded-full self-center">📍 {villeActive.split(',')[0]}</span>
          )}
        </div>

        {/* SÉLECTION PROVINCE + VILLE */}
        {modeVille && (
          <div className="flex gap-2 flex-wrap mb-4">
            <select
              value={province}
              onChange={e => setProvince(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400 transition-colors bg-white">
              {PROVINCES.map(p => (
                <option key={p.code} value={p.code}>{p.nom}</option>
              ))}
            </select>
            <div ref={autocompleteRef} className="relative flex-1 min-w-[140px]">
              <input
                type="text"
                value={villeInput}
                onChange={e => handleVilleChange(e.target.value)}
                onKeyDown={handleVilleKeyDown}
                placeholder="Ex: Rouyn-Noranda"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400 transition-colors"
                autoComplete="off"
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto text-sm">
                  {suggestions.map((ville, i) => (
                    <li
                      key={ville}
                      onMouseDown={() => pickSuggestion(ville)}
                      className={`px-4 py-2 cursor-pointer transition-colors ${i === highlightedIndex ? 'bg-green-600 text-white' : 'hover:bg-gray-50 text-gray-800'}`}>
                      {ville}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={rechercherVille}
              disabled={villeLoading}
              className="px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors">
              {villeLoading ? '...' : 'Chercher'}
            </button>
          </div>
        )}

        <form onSubmit={handleSearch} className="relative mb-8">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder={t('placeholder')}
            className="w-full px-5 py-4 pr-16 rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-lg shadow-sm" />
          <button type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl text-white font-semibold"
            style={{ background: 'linear-gradient(135deg, #16a34a, #059669)' }}>🔍</button>
        </form>
        {query && (
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {t('titre_resultats')} <span className="text-green-600">"{query}"</span>
          </h1>
        )}
        <div className="space-y-3 mb-8">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">{t('en_ligne')}</h2>
          {loadingOnline ? (
            <div className="text-center py-6 text-gray-400 animate-pulse">{t('chargement')}</div>
          ) : (
            onlineResults.map((r, i) => renderOnline(r, i))
          )}
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">{t('magasins_pres')}</h2>
            <span className="text-xs text-gray-400 ml-2">via <span style={{color:"#4285F4"}}>G</span><span style={{color:"#EA4335"}}>o</span><span style={{color:"#FBBC05"}}>o</span><span style={{color:"#34A853"}}>g</span><span style={{color:"#EA4335"}}>l</span><span style={{color:"#4285F4"}}>e</span></span>
            {userCity && <span className="text-xs text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-full">📍 {userCity}</span>}
            {loadingLocal && <span className="text-xs text-blue-500 animate-pulse">{t('localisation')}</span>}
            {gpsStatus === 'denied' && <span className="text-xs text-yellow-600">{t('position_non_detectee')}</span>}
            {gpsStatus === 'granted' && <span className="text-xs text-green-600">{t('tries_distance')}</span>}
          </div>
          {loadingLocal && localResults.length === 0 ? (
            <div className="p-5 rounded-2xl border-2 border-dashed border-gray-200 text-center text-gray-400">
              <div className="animate-pulse">{t('recherche_magasins')}</div>
            </div>
          ) : localResults.length > 0 ? (
            localResults.map((r, i) => renderLocal(r, i))
          ) : !loadingLocal ? (
            <div className="p-5 rounded-2xl border-2 border-dashed border-gray-200 text-center text-gray-400 text-sm">
              {t('aucun_magasin')}
            </div>
          ) : null}
        </div>
        {!query && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🛍️</div>
            <p className="text-lg font-medium">{t('tapez_produit')}</p>
          </div>
        )}
        <div className="mt-10 text-center">
          <a href="/magasins" className="text-sm text-gray-400 hover:text-green-600 transition-colors">{t('retour')}</a>
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
