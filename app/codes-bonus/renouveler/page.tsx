export const dynamic = "force-static";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mémo — Renouvellement des codes | PrixMalin",
  description: "Page interne PrixMalin (mémo).",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string
) {
  const v = searchParams[key];
  if (!v) return null;
  if (Array.isArray(v)) return v[0] ?? null;
  return v;
}

export default async function RenewMemoPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  const requiredKey = process.env.RENEW_PAGE_KEY ?? "";
  const providedKey = getParam(sp, "key") ?? "";

  const isAllowed = requiredKey.length > 0 && providedKey === requiredKey;

  if (!isAllowed) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-2xl font-bold">Accès refusé</h1>
        <p className="mt-3 text-sm text-gray-700">Cette page est interne.</p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
        >
          Retour à l’accueil
        </Link>
      </main>
    );
  }

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
            href="/codes-bonus"
            className="inline-flex rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Voir les plateformes
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
          <a className="block underline" href="/api/bonus-codes?platform=pc">
            /api/bonus-codes?platform=pc
          </a>
          <a
            className="block underline"
            href="/api/bonus-codes?platform=pc&gameSlug=world-of-tanks"
          >
            /api/bonus-codes?platform=pc&amp;gameSlug=world-of-tanks
          </a>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold">Fichier à modifier (source unique)</h2>
        <p className="mt-2 text-sm text-gray-700">Chemin dans le projet :</p>

        <pre className="mt-3 overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs">
{`src/data/bonus-codes/codes.json`}
        </pre>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold">Checklist “renew” (le 15)</h2>

        <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm text-gray-800">
          <li>
            Ouvrir le fichier :{" "}
            <span className="font-mono">
              nano src/data/bonus-codes/codes.json
            </span>
          </li>
          <li>
            Mettre à jour (ou ajouter) les 3 codes par jeu :{" "}
            <span className="font-mono">method: "code"</span> +{" "}
            <span className="font-mono">code: "XXXX"</span>
          </li>
          <li>
            Mettre les dates :{" "}
            <span className="font-mono">cycleStartISO</span> et{" "}
            <span className="font-mono">cycleEndISO</span> (15 → 15)
          </li>
          <li>
            Valider le JSON :
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
  <h2 className="text-lg font-bold">Accès privé</h2>

  <p className="mt-2 text-sm text-gray-700">
    Cette page est protégée par une clé privée.
  </p>

  <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-4">
    <p className="text-sm font-semibold text-green-800">
      ✔️ Accès autorisé
    </p>
    <p className="mt-1 text-xs text-green-700">
      Astuce : ajoute cette page dans tes favoris navigateur pour y accéder
      rapidement chaque mois.
    </p>
  </div>
</section>

    </main>
  );
}
