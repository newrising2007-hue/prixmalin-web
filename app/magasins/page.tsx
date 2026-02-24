export default function MagasinsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Vos Magasins PrixMalin 🛍
      </h1>

      <p className="mt-4 text-gray-600">
        Découvrez bientôt une sélection de produits, offres partenaires et bons
        plans pour économiser sur vos achats au Canada.
      </p>

      <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
        <p className="text-gray-700 font-medium">
          🚧 Section en préparation
        </p>

        <p className="mt-2 text-sm text-gray-600">
          Nous travaillons actuellement sur cette section afin de vous proposer
          des offres fiables et utiles. Revenez bientôt !
        </p>
      </div>

      <a
        href="/"
        className="inline-block mt-8 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
      >
        Retour à l’accueil
      </a>
    </main>
  );
}
