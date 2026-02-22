import Link from "next/link";

export default function RenewMemoPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">
        Mémo — Renouvellement des codes (le 15 de chaque mois)
      </h1>

      <p className="mt-4 text-gray-700">
        Objectif : mettre à jour les codes dans le fichier JSON unique, puis
        vérifier sur le web et via l’API utilisée par l’app mobile.
      </p>

      <section className="mt-8 rounded-2xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold">Liens utiles (site)</h2>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Accueil
          </Link>

          <Link
            href="/codes-bonus/pc"
            className="inline-flex rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Hub PC
          </Link>

          <Link
            href="/codes-bonus/pc/tous-les-codes"
            className="inline-flex rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Tous les codes PC
          </Link>

          <Link
            href="/codes-bonus/pc/world-of-tanks"
            className="inline-flex rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Test WOT (PC)
          </Link>
        </div>

        <p className="mt-4 text-sm text-gray-700">
          API mobile (à tester dans le navigateur) :
        </p>

        <div className="mt-3 space-y-2 text-sm">
          <a
            className="block underline"
            href="/api/bonus-codes?platform=pc"
          >
            /api/bonus-codes?platform=pc
          </a>
          <a
            className="block underline"
            href="/api/bonus-codes?platform=pc&gameSlug=world-of-tanks"
          >
            /api/bonus-codes?platform=pc&gameSlug=world-of-tanks
          </a>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold">Fichier à modifier (source unique)</h2>
        <p className="mt-2 text-sm text-gray-700">
          Chemin dans le projet :
        </p>

        <pre className="mt-3 overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs">
{`src/data/bonus-codes/codes.json`}
        </pre>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold">Checklist “renew” (le 15)</h2>

        <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm text-gray-800">
          <li>
            Ouvrir le fichier JSON :{" "}
            <span className="font-mono">nano src/data/bonus-codes/codes.json</span>
          </li>
          <li>
            Mettre à jour (ou ajouter) les 3 codes par jeu :{" "}
            <span className="font-mono">method: "code"</span> +{" "}
            <span className="font-mono">code: "XXXX"</span>
          </li>
          <li>
            Mettre des dates :{" "}
            <span className="font-mono">cycleStartISO</span> et{" "}
            <span className="font-mono">cycleEndISO</span> (15 → 15)
          </li>
          <li>
            Valider le JSON (zéro erreur) :
            <pre className="mt-2 overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs">
{`node -e "JSON.parse(require('fs').readFileSync('src/data/bonus-codes/codes.json','utf8')); console.log('✅ JSON OK');"`}
            </pre>
          </li>
          <li>
            Tester web :
            <pre className="mt-2 overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs">
{`npm run dev`}
            </pre>
          </li>
          <li>
            Tester API mobile :
            <pre className="mt-2 overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs">
{`http://localhost:3000/api/bonus-codes?platform=pc&gameSlug=world-of-tanks`}
            </pre>
          </li>
          <li>
            Commit + push :
            <pre className="mt-2 overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs">
{`git add src/data/bonus-codes/codes.json
git commit -m "chore: monthly codes refresh (15th)"
git push`}
            </pre>
          </li>
        </ol>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold">Rappel</h2>
        <p className="mt-2 text-sm text-gray-700">
          Les codes sont souvent limités (région/quantité/date). Toujours garder
          des descriptions honnêtes et éviter les promesses “illimité”.
        </p>
      </section>
    </main>
  );
}
