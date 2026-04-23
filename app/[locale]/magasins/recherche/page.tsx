'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

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
  verified?: boolean;
  partner?: string | null;
}

function RechercheContent() {
  const t = useTranslations('magasins.recherche');
  const pathname = usePathname();
  const localePrefix = pathname.startsWith('/en') ? '/en' :
                       pathname.startsWith('/es') ? '/es' :
                       pathname.startsWith('/ar') ? '/ar' :
                       pathname.startsWith('/zh') ? '/zh' : '';
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('cat') || 'divers';

  const [onlineResults, setOnlineResults] = useState<Result[]>([]);
  const [localResults, setLocalResults] = useState<Result[]>([]);
  const [loadingOnline, setLoadingOnline] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [search, setSearch] = useState(query);
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'asking' | 'granted' | 'denied'>('idle');
  const [userCity, setUserCity] = useState<string>('');

  useEffect(() => {
    if (!query.trim()) return;
    setSearch(query);
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
    setSearch('');
  }

  async function loadLocal(q: string, cat: string) {
    setLoadingLocal(true);
    setGpsStatus('asking');
    let loc = { latitude: 47.3283, longitude: -79.4338 };
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 8000 })
      );
      loc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
      setGpsStatus('granted');
      try {
        const geo = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
        );
        const geoData = await geo.json();
        const city = geoData.address?.city || geoData.address?.town || geoData.address?.village || '';
        const province = geoData.address?.state || '';
        if (city) setUserCity(`${city}, ${province}`);
      } catch {}
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
      const locals = (data.results || []).filter(
        (r: Result) => r.type === 'local_with_website' || r.type === 'local_no_website'
      );
      setLocalResults(locals);
    } catch {}
    setLoadingLocal(false);
  }

  function normalizeQ(s: string): string {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  const CATEGORY_KEYWORDS: Record<string, string[]> = {
    vehicules: [
      'voiture','auto','camion','moto','motocyclette','motoneige',
      'ski-doo','skidoo','vtt','quad','bateau','chaloupe','kayak',
      'canot','sea-doo','seadoo','can-am','canam','yamaha','honda',
      'kawasaki','suzuki','polaris','arctic cat','bombardier','brp',
      'lynx','ktm','husqvarna','ford','toyota','chevrolet','dodge',
      'gmc','ram','jeep','hyundai','kia','mazda','nissan','subaru',
      'harley','ducati','triumph','rzr','maverick','outlander',
      'mxz','summit','renegade','expedition','skandic',
      'motoneige','motomarine','concessionnaire',
      'f-150','f-250','f-350','f150','f250','f350',
      'ranger','escape','explorer','silverado','colorado',
    ],
    pieces: [
      'pneu','pneus','pare-brise','freins','frein','filtre a huile',
      'piece auto','pieces auto','amortisseur','courroie','batterie auto',
      'echappement','radiateur','alternateur','demarreur','embrayage',
      'transmission','huile moteur','essuie-glace','plaquettes',
      'rotule','roulement','catalyseur','silencieux',
      'outil mecanique','cle dynamometrique','cric','soudeuse','soudure',
      'meuleuse','piece detachee','carrosserie','debosselage',
    ],
    epicerie: [
      'pain','lait','beurre','fromage','oeuf','oeufs','yaourt',
      'yogourt','farine','sucre','riz','pates','cereales',
      'jus','cafe','the','chocolat','biscuits','chips',
      'epicerie','alimentation','nourriture','legume','fruit',
      'huile','vinaigre','sel','poivre','confiture','miel',
      'viande','boeuf','poulet','porc','steak','saucisse','bacon',
      'boucherie','charcuterie','jambon','boulangerie','viennoiserie',
      'traiteur','depanneur',
    ],
    electro: [
      'telephone','cellulaire','ordinateur','laptop','tablette',
      'ecran','moniteur','clavier','souris','casque','ecouteurs',
      'television','tele','tv','imprimante','camera','appareil photo',
      'console','playstation','xbox','nintendo','switch','manette',
      'disque dur','ssd','processeur','carte graphique','gpu','cpu',
      'routeur','modem','speaker','enceinte','drone','smartwatch',
      'composante','arduino','raspberry','cable','adaptateur',
      'chargeur','reseau','securite','camera surveillance',
    ],
    quincaillerie: [
      'quincaillerie','outil','marteau','tournevis','perceuse','scie',
      'clou','vis','boulon','ecrou','rondelle','peinture','plomberie',
      'tuyau','robinet','drain','electricite','fil electrique','disjoncteur',
      'prise','interrupteur','colle','scellant','mastic','calfeutrage',
      'meuleuse','sableuse','compresseur','niveau','ruban a mesurer',
      'paysagement','gazon','engrais','tondeuse','souffleuse feuilles',
    ],
    maison: [
      'electromenager','refrigerateur','laveuse','secheuse','lave-vaisselle',
      'cuisiniere','four','micro-ondes','congelateur','hotte',
      'meuble','canape','sofa','lit','matelas','armoire','commode',
      'table','chaise','bureau','etagere','rangement','garde-robe',
      'decoration','rideau','tapis','lampe','tableau','coussin',
      'cuisine','batterie de cuisine','chaudron','poele','ustensile',
    ],
    mode: [
      'vetement','habit','manteau','pantalon','chemise','robe',
      'chandail','veste','blouson','jupe','t-shirt','sous-vetement',
      'chaussure','botte','espadrille','sandales','talon',
      'boutique','mode','fashion','collection',
      'vetement enfant','vetement femme','vetement homme',
    ],
    sport: [
      'sport','hockey','patin','raquette','tennis','soccer','ballon',
      'natation','velo','ski','snowboard','golf','basketball','volleyball',
      'baseball','football','course','running','musculation','gym',
      'fitness','haltere','tapis roulant','equipement sportif',
      'vetement sport','maillot','short sport',
    ],
    plein_air: [
      'chasse','peche','camping','randonnee','raquette neige',
      'tente','sac de couchage','lampe frontale','boussole','gps',
      'fusil','carabine','munition','appat','leurre','canne a peche',
      'moulinet','fil peche','gilet de peche','waders','canoeing',
      'survie','couteau','hache','allume-feu','rations',
    ],
    machinerie: [
      'tracteur','john deere','kubota','case','new holland','massey',
      'machinerie','excavatrice','chargeuse','niveleuse','compacteur',
      'agricole','ferme','agriculture','faucheuse','semoir','charrue',
      'grue','camion benne','camion citerne','remorque',
    ],
    sante: [
      'pharmacie','medicament','ordonnance','vitamine','supplement',
      'sante','optique','lunette','lentille','verres',
      'coiffure','coiffeur','salon','coupe','teinture','meche',
      'esthetique','esthete','massage','soin visage','epilation',
      'manucure','pedicure','soins personnels','lotion',
      'shampooing','deodorant','parfum','maquillage',
    ],
    animalerie: [
      'animal','animaux','chien','chat','oiseau','poisson','lapin',
      'hamster','animalerie','veterinaire','veto','clinique veterinaire',
      'nourriture animaux','croquette','litiere','cage','aquarium',
      'collier chien','laisse','jouet chien','jouet chat',
    ],
    loisirs: [
      'jeux','jouet','puzzle','lego','figurine','jeux de societe',
      'hobby','modelisme','maquette','collection','carte collectionnable',
      'peinture hobby','bricolage','couture','tricot','crochet',
      'instrument musique','guitare','piano','batterie',
    ],
    bijoux: [
      'bijou','bijoux','bague','collier','bracelet','jonc',
      'or','argent','diamant','pendentif','alliance','medaille',
      'bijouterie','joaillerie','montre','horlogerie',
      'sac','sac a main','portefeuille','ceinture','accessoire mode',
    ],
    bureautique: [
      'bureau','imprimante','cartouche','toner','papier bureau',
      'classeur','reliure','laminage','plastification',
      'papeterie','crayon','stylo','marqueur','cahier','bloc-notes',
      'imprimerie','impression','affiche','carte affaire',
    ],
  };
  function detectCategory(q: string): string {
    const norm = normalizeQ(q);
    const wordMatch = (text: string, kw: string): boolean => {
      if (kw.includes(' ')) return text.includes(kw);
      const re = new RegExp('(^|\\s)' + kw.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&') + '(\\s|$)');
      return re.test(text);
    };
    for (const [cat, kws] of Object.entries(CATEGORY_KEYWORDS)) {
      if (kws.some((kw) => wordMatch(norm, normalizeQ(kw)))) return cat;
    }
    return 'divers';
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      const cat = detectCategory(search.trim());
      window.location.href = `${localePrefix}/magasins/recherche?q=${encodeURIComponent(search.trim())}&cat=${cat}`;
      setSearch('');
    }
  };

  // ─── Fiche EN LIGNE ────────────────────────────────────────────────────────
  function renderOnline(r: Result, i: number) {
    const url = r.url || r.affiliate_url || '#';
    const logo =
      r.store.includes('Amazon') ? '📦' :
      r.store.includes('Walmart') ? '🛒' :
      r.store.includes('eBay') ? '🏷️' :
      r.store.includes('Facebook') ? '📘' : '📢';
    const color =
      r.store.includes('Amazon') ? '#FF9900' :
      r.store.includes('Walmart') ? '#0071CE' :
      r.store.includes('eBay') ? '#E53238' :
      r.store.includes('Facebook') ? '#1877F2' : '#373373';

    return (
      <a key={i} href={url} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-4 p-5 rounded-2xl bg-white border-2 border-gray-100 hover:border-green-300 hover:shadow-md transition-all group">
        <div className="text-3xl">{logo}</div>
        <div className="flex-1">
          <div className="font-bold text-gray-800 group-hover:text-green-700">{r.store}</div>
          <div className="text-sm text-gray-400">{t('en_ligne_livraison')}</div>
        </div>
        <span
          className="px-3 py-1.5 rounded-xl text-white text-xs font-semibold transition-all duration-200"
          style={{ background: color }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 14px 3px ${color}66`; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
        >
          {t('voir_prix')}
        </span>
      </a>
    );
  }

  // ─── Fiche LOCALE ──────────────────────────────────────────────────────────
  function renderLocal(r: Result, i: number) {
    const isPartner = !!r.partner;
    const mapsUrl = `https://www.google.com/maps/search/?q=${encodeURIComponent(r.store + ' ' + (r.address || ''))}`;
    const circulaireUrl = r.partner ? `/partenaires/${r.partner}` : null;

    // Dégradé bordure : plus intense pour partenaire
    const gradientBorder = isPartner
      ? 'linear-gradient(135deg, #3b82f6, #2eaabf, #16a34a)'
      : 'linear-gradient(135deg, #60a5fa, #4ade80)';
    const shadowBase = isPartner
      ? '0 2px 12px rgba(59,130,246,0.18)'
      : '0 1px 6px rgba(34,197,94,0.10)';
    const shadowHover = isPartner
      ? '0 6px 28px rgba(59,130,246,0.28), 0 2px 8px rgba(22,163,74,0.18)'
      : '0 4px 18px rgba(34,197,94,0.20), 0 1px 6px rgba(59,130,246,0.10)';

    return (
      <div key={i}
        style={{ borderRadius: '16px', padding: '2px', background: gradientBorder, boxShadow: shadowBase, transition: 'box-shadow 0.2s ease' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = shadowHover; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = shadowBase; }}
      >
        <div style={{ background: 'white', borderRadius: '14px', padding: '1rem 1.25rem' }}
          className="flex items-start gap-4">

          {/* Icône */}
          <div className="text-3xl mt-0.5">📍</div>

          {/* Infos */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-gray-800">{r.store}</span>

              {/* Badge Fier Partenaire — cliquable vers la circulaire */}
              {isPartner && circulaireUrl && (
                <a href={circulaireUrl}
                  onClick={e => e.stopPropagation()}
                  className="text-xs font-bold px-2 py-0.5 rounded-full transition-all duration-200"
                  style={{ background: 'rgba(46,170,191,0.15)', color: '#2eaabf', border: '1px solid rgba(46,170,191,0.4)', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(46,170,191,0.28)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(46,170,191,0.15)'; }}
                >
                  🤝 Fier Partenaire
                </a>
              )}

              {!r.verified && (
                <span className="text-xs font-semibold">
                  via <span style={{color:'#4285F4'}}>G</span><span style={{color:'#EA4335'}}>o</span>
                  <span style={{color:'#FBBC05'}}>o</span><span style={{color:'#34A853'}}>g</span>
                  <span style={{color:'#EA4335'}}>l</span><span style={{color:'#4285F4'}}>e</span>
                </span>
              )}
            </div>
            {r.address && <div className="text-sm text-gray-500 truncate mt-1">{r.address}</div>}
            {r.distance && <div className="text-xs text-green-600 font-semibold mt-1">📏 {r.distance}</div>}
            {r.phone && (
              <a href={`tel:${r.phone}`} className="text-xs text-blue-500 hover:underline mt-1 block">
                📞 {r.phone}
              </a>
            )}
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col items-end gap-2 shrink-0">

            {/* Maps — toujours présent */}
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl text-white text-xs font-semibold transition-all duration-200"
              style={{ background: '#3b82f6' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 14px 3px rgba(59,130,246,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              {t('maps')}
            </a>

            {/* Site web — si disponible */}
            {r.website && (
              <a href={r.website} target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl text-white text-xs font-semibold transition-all duration-200"
                style={{ background: '#16a34a' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 14px 3px rgba(22,163,74,0.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                {t('voir_site')}
              </a>
            )}

            {/* Circulaire — partenaires seulement */}
            {circulaireUrl && (
              <a href={circulaireUrl}
                className="px-3 py-1.5 rounded-xl text-white text-xs font-semibold transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #2eaabf, #16a34a)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 14px 3px rgba(46,170,191,0.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                {t('voir_circulaire')}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen"
      style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(255,255,255,0.97) 45%, rgba(34,197,94,0.08) 100%)' }}>
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* ─── Barre de recherche ─── */}
        <form onSubmit={handleSearch} className="relative mb-8">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('placeholder')}
            className="w-full px-5 py-4 pr-16 rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-lg shadow-sm"
          />
          {/* ✕ rouge = chargement en cours | loupe verte = sinon */}
          {(loadingOnline || loadingLocal) ? (
            <button
              type="button"
              onClick={() => {
                window.location.href = `${localePrefix}/magasins/recherche`;
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl text-white font-semibold text-lg transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}
            >
              ✕
            </button>
          ) : (
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl text-white font-semibold transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #16a34a, #059669)' }}
            >
              🔍
            </button>
          )}
        </form>

        {/* ─── Titre résultats ─── */}
        {query && (
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {t('titre_resultats')} <span className="text-green-600">"{query}"</span>
          </h1>
        )}

        {/* ─── Section EN LIGNE ─── */}
        <div className="space-y-3 mb-8">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">{t('en_ligne')}</h2>
          {loadingOnline ? (
            <div className="text-center py-6 text-gray-400 animate-pulse">{t('chargement')}</div>
          ) : (
            onlineResults.map((r, i) => renderOnline(r, i))
          )}
        </div>

        {/* ─── Section MAGASINS LOCAUX ─── */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">{t('magasins_pres')}</h2>
            <span className="text-xs text-gray-400 ml-2">
              via <span style={{color:'#4285F4'}}>G</span><span style={{color:'#EA4335'}}>o</span>
              <span style={{color:'#FBBC05'}}>o</span><span style={{color:'#34A853'}}>g</span>
              <span style={{color:'#EA4335'}}>l</span><span style={{color:'#4285F4'}}>e</span>
            </span>
            {userCity && (
              <span className="text-xs text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
                📍 {userCity}
              </span>
            )}
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

        {/* ─── État vide ─── */}
        {!query && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🛍️</div>
            <p className="text-lg font-medium">{t('tapez_produit')}</p>
          </div>
        )}

        <div className="mt-10 text-center">
          <a href={localePrefix ? `${localePrefix}/magasins` : "/magasins"} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-300 text-blue-600 font-semibold text-sm hover:text-blue-400 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            {t('retour')}
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
