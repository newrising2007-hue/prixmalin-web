export default function CirculairesComingSoon() {
  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.10) 0%, rgba(255,255,255,0.95) 45%, rgba(34,197,94,0.10) 100%)" }}>
      <div className="text-center px-6">
        <div className="text-6xl mb-6">📰</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Circulaires</h1>
        <p className="text-gray-500 mb-2">IGA · Metro · Maxi · Canadian Tire · Walmart · Rona · Pharmaprix</p>
        <p className="text-sm text-gray-400 mb-8">Cette section est en cours de développement. Revenez bientôt !</p>
        <a href="/magasins" className="inline-block px-6 py-3 rounded-xl font-semibold text-white shadow-md"
          style={{ background: "linear-gradient(135deg, #16a34a, #059669)" }}>
          ← Retour Magasinage
        </a>
      </div>
    </main>
  );
}
