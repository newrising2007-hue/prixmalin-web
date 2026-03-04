"use client";
import { useState } from "react";
import circulairesData from "@/data/circulaires.json";

export default function CirculairesPage() {
  const [search, setSearch] = useState("");
  const { circulaires, updatedAt } = circulairesData as any;

  const filtered = circulaires.filter((c: any) =>
    c.actif && c.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="relative min-h-screen" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(255,255,255,0.97) 45%, rgba(34,197,94,0.08) 100%)" }}>
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* HERO */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">📰 Circulaires en ligne</h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
            Toutes les circulaires canadiennes en un endroit — liens directs vers les sites officiels.
            Mis à jour régulièrement. Vous connaissez un magasin manquant ?
          </p>
          <a href="mailto:contact@prixmalin.ca"
            className="inline-block mt-3 text-sm font-semibold text-green-700 hover:underline">
            📧 Proposez-le à contact@prixmalin.ca
          </a>
        </div>

        {/* FILTRE */}
        <div className="relative mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍  Rechercher : IGA, Walmart, Canadian Tire..."
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-base shadow-sm"
          />
          {search && (
            <button onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl">✕</button>
          )}
        </div>

        {/* COMPTEUR */}
        <p className="text-xs text-gray-400 mb-4 text-center">
          {filtered.length} circulaire{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
          {search && <span> pour <strong>"{search}"</strong></span>}
          {" · "}Màj {updatedAt}
        </p>

        {/* LISTE */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-3">🔍</div>
              <p>Aucune circulaire trouvée pour <strong>"{search}"</strong></p>
              <p className="text-sm mt-2">Vous la connaissez ? <a href="mailto:contact@prixmalin.ca" className="text-green-600 hover:underline">Proposez-la !</a></p>
            </div>
          ) : (
            filtered.map((c: any, i: number) => (
              <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white border-2 border-gray-100 hover:border-green-300 hover:shadow-md transition-all group">
                <span className="text-2xl">{c.emoji}</span>
                <span className="flex-1 font-semibold text-gray-800 group-hover:text-green-700">{c.nom}</span>
                <span className="text-xs text-white px-3 py-1.5 rounded-xl font-semibold bg-green-600 group-hover:bg-green-700 transition-colors">
                  Voir →
                </span>
              </a>
            ))
          )}
        </div>

        {/* PHILOSOPHIE */}
        <div className="mt-12 rounded-2xl border border-gray-100 bg-white/60 p-6 text-center">
          <p className="text-xs text-gray-400 leading-relaxed">
            🍁 PrixMalin redirige vers les <strong>sites officiels</strong> des détaillants — nous n'hébergeons aucune circulaire.
            Les prix et promotions sont ceux affichés directement par les commerçants.
            Un lien brisé ou un magasin manquant ?{" "}
            <a href="mailto:contact@prixmalin.ca" className="text-green-600 hover:underline font-semibold">
              Écrivez-nous !
            </a>
          </p>
        </div>

        <div className="mt-6 text-center">
          <a href="/magasins" className="text-sm text-gray-400 hover:text-green-600 transition-colors">← Retour Magasinage</a>
        </div>

      </div>
    </main>
  );
}
