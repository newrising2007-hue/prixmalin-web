"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "https://prixmalin-backend.onrender.com";

const TYPES_CUISINE = [
  { value: "all", labelKey: "cuisine_tous", emoji: "🍽️" },
  { value: "québécois", labelKey: "cuisine_quebecois", emoji: "🍁" },
  { value: "fast-food", labelKey: "cuisine_fastfood", emoji: "🍔" },
  { value: "pizza", labelKey: "cuisine_pizza", emoji: "🍕" },
  { value: "buffet", labelKey: "cuisine_buffet", emoji: "🍱" },
  { value: "grillades", labelKey: "cuisine_grillades", emoji: "🥩" },
  { value: "fruits-de-mer", labelKey: "cuisine_fruitsmer", emoji: "🦞" },
  { value: "mexicain", labelKey: "cuisine_mexicain", emoji: "🌮" },
  { value: "chinois", labelKey: "cuisine_chinois", emoji: "🥢" },
  { value: "japonais", labelKey: "cuisine_japonais", emoji: "🍣" },
  { value: "italien", labelKey: "cuisine_italien", emoji: "🍝" },
  { value: "indien", labelKey: "cuisine_indien", emoji: "🍛" },
  { value: "café", labelKey: "cuisine_cafe", emoji: "☕" },
  { value: "bar", labelKey: "cuisine_bar", emoji: "🍺" },
  { value: "végétarien", labelKey: "cuisine_vegetarien", emoji: "🥗" },
  { value: "déjeuner", labelKey: "cuisine_dejeuner", emoji: "🥞" },
];

const SERVICES = [
  { value: "surplace", labelKey: "service_surplace", emoji: "🪑" },
  { value: "takeout", labelKey: "service_takeout", emoji: "🥡" },
  { value: "livraison", labelKey: "service_livraison", emoji: "🚗" },
  { value: "drive", labelKey: "service_drive", emoji: "🚘" },
];

const RAYONS = [50, 100, 150];

const JOURS_FR = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const JOURS_LABEL: Record<string, string> = {
  lundi: "Lun", mardi: "Mar", mercredi: "Mer", jeudi: "Jeu",
  vendredi: "Ven", samedi: "Sam", dimanche: "Dim"
};

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function isOpenNow(horaires: Record<string, { ouverture: string; fermeture: string }> | undefined): boolean | null {
  if (!horaires) return null;
  const now = new Date();
  const jour = JOURS_FR[now.getDay() === 0 ? 6 : now.getDay() - 1];
  const h = horaires[jour];
  if (!h) return false;
  const [oh, om] = h.ouverture.split(":").map(Number);
  const [fh, fm] = h.fermeture.split(":").map(Number);
  const nowMin = now.getHours() * 60 + now.getMinutes();
  return nowMin >= oh * 60 + om && nowMin <= fh * 60 + fm;
}

interface Horaire { ouverture: string; fermeture: string; note?: string; }
interface Restaurant {
  id: string; name: string; address?: string; phone?: string; website?: string;
  latitude?: number; longitude?: number; rating?: number; note?: string;
  cuisine?: string[]; service?: string[]; keywords?: string[];
  note_en?: string; note_es?: string; note_ar?: string; note_zh?: string;
  reservation?: boolean; reservationSurplace?: boolean; reservationInfo?: string;
  horaires?: Record<string, Horaire>;
  source?: "prixmalin" | "google";
  distance?: number;
}

function HorairesAccordion({ horaires, phone, t }: { horaires?: Record<string, Horaire>; phone?: string; t: (k: string) => string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-700 transition-colors font-medium"
      >
        <span>{t("horaires_voir")}</span>
        <span className="text-xs">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-2 p-3 rounded-xl bg-gray-50 border border-gray-100">
          {!horaires ? (
            <div className="text-sm text-gray-500 italic">
              <p className="mb-2">{t("horaires_contacter")}</p>
              {phone && (
                <a href={`tel:${phone}`} className="inline-flex items-center gap-1 text-green-700 font-semibold hover:underline">
                  📞 {phone}
                </a>
              )}
            </div>
          ) : (
            <div className="grid gap-1">
              {JOURS_FR.map(jour => {
                const h = horaires[jour];
                return (
                  <div key={jour} className={`flex items-center gap-3 text-sm py-0.5 ${!h ? "text-gray-300" : "text-gray-700"}`}>
                    <span className="w-8 font-mono text-xs">{JOURS_LABEL[jour]}</span>
                    {h ? (
                      <>
                        <span className="font-medium">{h.ouverture} – {h.fermeture}</span>
                        {h.note && <span className="text-xs text-amber-600 italic">· {h.note}</span>}
                      </>
                    ) : (
                      <span className="text-xs">{t("horaires_ferme")}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CarteRestaurant({ r, t, locale }: { r: Restaurant; t: (k: string) => string; locale: string }) {
  const ouvert = isOpenNow(r.horaires);
  const mapsUrl = r.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.address)}` : undefined;
  const correctionSubject = encodeURIComponent(`Correction - ${r.name}`);
  const correctionBody = encodeURIComponent(`Bonjour,\n\nJe souhaite signaler une correction pour le restaurant ${r.name} :\n\n`);
  const isGoogle = r.source === "google";

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-5">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-bold text-gray-900 text-base">{r.name}</h3>
            {ouvert === true && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">{t("badge_ouvert")}</span>
            )}
            {ouvert === false && r.horaires && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-600">{t("badge_ferme")}</span>
            )}
          </div>

          {/* CUISINE TAGS */}
          <div className="flex flex-wrap gap-1 mb-2">
            {(Array.isArray(r.cuisine) ? r.cuisine : r.cuisine ? [r.cuisine] : []).map(c => (
              <span key={c} className="px-2 py-0.5 rounded-full text-xs bg-orange-50 text-orange-700 border border-orange-100 capitalize">{(() => { const tc = TYPES_CUISINE.find(x => x.value === c); return tc ? t(tc.labelKey) : c; })()}</span>
            ))}
          </div>
        </div>

        {/* DISTANCE + SOURCE */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          {r.distance !== undefined && (
            <span className="text-xs font-mono text-gray-400">{r.distance.toFixed(1)} km</span>
          )}
          {isGoogle ? (
            <span className="text-xs text-blue-400 font-medium">{t("badge_google")}</span>
          ) : (
            <span className="text-xs text-green-600 font-medium">{t("badge_verifie")}</span>
          )}
        </div>
      </div>

      {/* SERVICES */}
      {(r.service || []).length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {(r.service || []).map(s => {
            const sv = SERVICES.find(x => x.value === s);
            return <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-100">{sv?.emoji} {t(sv?.labelKey || s)}</span>;
          })}
        </div>
      )}

      {/* RÉSERVATION */}
      {r.reservation && (
        <div className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-1.5 mb-3">
          📋 {r.reservationSurplace ? t("reservation_recommandee") : t("reservation_acceptee")}
          {r.reservationInfo && <span className="block text-amber-600 mt-0.5">→ {r.reservationInfo}</span>}
        </div>
      )}

      {/* NOTE ÉDITORIALE */}
      {(r[`note_${locale}` as keyof typeof r] || r.note) && (
        <p className="text-sm text-gray-600 italic mb-3 border-l-2 border-green-200 pl-3">&ldquo;{String(r[`note_${locale}` as keyof typeof r] || r.note)}&rdquo;</p>
      )}

      {/* ADRESSE */}
      {r.address && <p className="text-xs text-gray-400 mb-3">📍 {r.address}</p>}

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-2 mb-1">
        {r.phone && (
          <a href={`tel:${r.phone}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors">
            📞 {t("btn_appeler")}
          </a>
        )}
        {mapsUrl && (
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors">
            🗺️ {t("btn_directions")}
          </a>
        )}
        {r.website && (
          <a href={r.website} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-100 hover:bg-gray-100 transition-colors">
            🌐 {t("btn_site")}
          </a>
        )}
      </div>

      {/* HORAIRES ACCORDION */}
      <HorairesAccordion horaires={r.horaires} phone={r.phone} t={t} />

      {/* SIGNALER CORRECTION */}
      <div className="mt-3 pt-3 border-t border-gray-50">
        {isGoogle ? (
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.name + " " + (r.address || ""))}`}
            target="_blank" rel="noopener noreferrer"
            className="text-xs text-gray-300 hover:text-blue-400 transition-colors">
            {t("corriger_google")}
          </a>
        ) : (
          <a href={`mailto:contact@prixmalin.ca?subject=${correctionSubject}&body=${correctionBody}`}
            className="text-xs text-gray-300 hover:text-amber-500 transition-colors">
            {t("corriger_email")}
          </a>
        )}
      </div>
    </div>
  );
}

export default function RestaurantsPage() {
  const locale = (typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "fr") || "fr";
  const t = useTranslations("restaurants");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  const [rayon, setRayon] = useState(100);
  const [cuisine, setCuisine] = useState("all");
  const [services, setServices] = useState<string[]>([]);
  const [reservationOnly, setReservationOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [villeInput, setVilleInput] = useState("");
  const [villeActive, setVilleActive] = useState<string | null>(null);
  const [villeLoading, setVilleLoading] = useState(false);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://prixmalin-backend.onrender.com";

  const rechercherVille = async () => {
    if (!villeInput.trim()) return;
    setVilleLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/geocode?ville=${encodeURIComponent(villeInput)}`);
      const data = await res.json();
      if (data.lat && data.lng) {
        setVilleActive(data.nom);
        setVilleInput("");
        fetch(`${BACKEND_URL}/api/restaurants/google?lat=${data.lat}&lng=${data.lng}&rayon=${rayon}`)
          .then(r => r.json())
          .then(d => {
            setRestaurants(d.restaurants || []);
            setLoading(false);
          });
      }
    } catch (e) {
      console.error("Erreur geocoding:", e);
    }
    setVilleLoading(false);
  };

  const DEFAULT_LAT = 47.3340;
  const DEFAULT_LNG = -79.4335;

  useEffect(() => {
    const fetchRestaurants = (lat: number, lng: number) => {
      fetch(`${BACKEND}/api/restaurants/google?lat=${lat}&lng=${lng}&rayon=${rayon}`)
        .then(r => r.json())
        .then(data => {
          setRestaurants(data.restaurants || []);
          setLoading(false);
        })
        .catch(() => {
          setError("Impossible de charger les restaurants. Réessayez dans quelques instants.");
          setLoading(false);
        });
    };

    if (navigator.geolocation) {
      setGpsLoading(true);
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setUserPos({ lat, lng });
          setGpsLoading(false);
          fetchRestaurants(lat, lng);
        },
        () => {
          setGpsLoading(false);
          fetchRestaurants(DEFAULT_LAT, DEFAULT_LNG);
        },
        { timeout: 8000 }
      );
    } else {
      fetchRestaurants(DEFAULT_LAT, DEFAULT_LNG);
    }
  }, []);

  const centerLat = userPos?.lat ?? DEFAULT_LAT;
  const centerLng = userPos?.lng ?? DEFAULT_LNG;

  const filtered = restaurants
    .map(r => ({
      ...r,
      distance: (r.latitude && r.longitude)
        ? getDistance(centerLat, centerLng, r.latitude, r.longitude)
        : undefined
    }))
    .filter(r => {
      if (r.distance !== undefined && r.distance > rayon) return false;
      if (cuisine !== "all" && !(Array.isArray(r.cuisine) ? r.cuisine : r.cuisine ? [r.cuisine] : []).includes(cuisine)) return false;
      if (services.length > 0 && !services.every(s => (r.service || []).includes(s))) return false;
      if (reservationOnly && !r.reservation) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return r.name.toLowerCase().includes(q) ||
          (r.address || "").toLowerCase().includes(q) ||
          (Array.isArray(r.cuisine) ? r.cuisine : r.cuisine ? [r.cuisine] : []).some(c => c.toLowerCase().includes(q)) ||
          (r.keywords || []).some(k => k.toLowerCase().includes(q));
      }
      return true;
    })
    .sort((a, b) => {
      if (a.source === 'prixmalin' && b.source !== 'prixmalin') return -1;
      if (b.source === 'prixmalin' && a.source !== 'prixmalin') return 1;
      return (a.distance ?? 999) - (b.distance ?? 999);
    });

  const toggleService = (s: string) => {
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* FOND */}
      <div className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.10) 0%, rgba(255,255,255,0.97) 50%, rgba(16,185,129,0.08) 100%)" }} />

      {/* HERO */}
      <section className="pt-12 pb-6 px-6 text-center">
        <div className="text-5xl mb-4">🍽️</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
          {t("hero_titre")}{" "}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #16a34a, #059669)" }}>
            {t("hero_titre_accent")}
          </span>
        </h1>
        <p className="text-gray-500 text-sm mb-1">{villeActive ? `📍 ${villeActive}` : t("hero_region")}</p>
        <p className="text-xs text-gray-400">
          {gpsLoading ? t("gps_loading") : userPos ? t("gps_position") : t("gps_defaut")}
        </p>
      </section>

      {/* FILTRES */}
      <section className="px-4 pb-6 max-w-5xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">

          {/* VILLE */}
          <div className="flex gap-2">
            <input
              type="text"
              value={villeInput}
              onChange={e => setVilleInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && rechercherVille()}
              placeholder="🗺️ Rechercher une autre ville..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400 transition-colors"
            />
            <button
              onClick={rechercherVille}
              disabled={villeLoading}
              className="px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors">
              {villeLoading ? "..." : "Chercher"}
            </button>
            {villeActive && (
              <button
                onClick={() => { setVilleActive(null); }}
                className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:border-red-300 hover:text-red-500 transition-colors">
                ✕
              </button>
            )}
          </div>
          {/* RECHERCHE */}
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t("filtre_recherche")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400 transition-colors"
          />

          {/* RAYON */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t("filtre_rayon")}</p>
            <div className="flex gap-2">
              {RAYONS.map(r => (
                <button key={r} onClick={() => setRayon(r)}
                  className={`px-4 py-1.5 rounded-xl text-sm font-semibold border transition-all ${rayon === r ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-600 border-gray-200 hover:border-green-300"}`}>
                  {r} km
                </button>
              ))}
            </div>
          </div>

          {/* TYPE DE CUISINE */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t("filtre_cuisine")}</p>
            <div className="flex flex-wrap gap-2">
              {TYPES_CUISINE.map(tc => (
                <button key={tc.value} onClick={() => setCuisine(tc.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${cuisine === tc.value ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}>
                  {tc.emoji} {t(tc.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {/* SERVICE */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t("filtre_service")}</p>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map(s => (
                <button key={s.value} onClick={() => toggleService(s.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${services.includes(s.value) ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}>
                  {s.emoji} {t(s.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {/* RÉSERVATION */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={reservationOnly} onChange={e => setReservationOnly(e.target.checked)}
              className="w-4 h-4 accent-green-600" />
            <span className="text-sm text-gray-600">{t("filtre_reservation")}</span>
          </label>
        </div>
      </section>

      {/* RÉSULTATS */}
      <section className="px-4 pb-10 max-w-5xl mx-auto">
        <p className="text-sm text-gray-400 mb-4 font-medium">
          {loading ? t("loading") : filtered.length !== 1 ? t("resultats_pluriel", { n: filtered.length }) : t("resultats", { n: filtered.length })}
        </p>

        {error && (
          <div className="text-center py-12 text-red-500 text-sm">{error}</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🍽️</div>
            <p className="text-gray-500 font-medium mb-2">{t("aucun_titre")}</p>
            <p className="text-gray-400 text-sm">{t("aucun_desc")}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(r => <CarteRestaurant key={r.id} r={r} t={t} locale={locale} />)}
        </div>
      </section>

      {/* CTA BAS DE PAGE */}
      <section className="px-6 pb-16 max-w-3xl mx-auto text-center">
        <div className="rounded-2xl border border-dashed border-green-200 bg-green-50/50 p-6">
          <p className="text-gray-600 text-sm mb-2">{t("cta_desc")}</p>
          <a href="mailto:contact@prixmalin.ca?subject=Suggestion restaurant"
            className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm hover:underline">
            {t("cta_btn")}
          </a>
        </div>
      </section>

      {/* RETOUR */}
      <div className="pb-10 text-center">
        <Link href="/magasins" className="text-sm text-gray-400 hover:text-green-600 transition-colors">
          {t("retour")}
        </Link>
      </div>

    </main>
  );
}
