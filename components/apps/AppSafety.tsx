import { PRIXMALIN } from "@/lib/appRelease";

export function AppSafety({ lang }: { lang: "fr" | "en" }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="text-xl font-extrabold">
          {lang === "fr" ? "À propos du téléchargement" : "About the download"}
        </h2>

        <p className="mt-3 text-sm text-black/70">
          {lang === "fr" ? (
            <>
              Pour l’instant, l’application est en <strong>phase de test</strong>.  
              La version publique sera distribuée via <strong>Google Play</strong> pour une installation plus simple et plus sécurisée.
            </>
          ) : (
            <>
              The app is currently in a <strong>testing phase</strong>.  
              The public release will be distributed via <strong>Google Play</strong> for an easier and safer installation.
            </>
          )}
        </p>

        {PRIXMALIN.apkUrl ? (
          <p className="mt-3 text-sm text-black/70">
            {lang === "fr" ? (
              <>
                Si tu télécharges l’APK maintenant, considère-le comme une <strong>version test</strong>  
                (taille <strong>{PRIXMALIN.sizeMb} MB</strong>).
              </>
            ) : (
              <>
                If you download the APK now, treat it as a <strong>test build</strong>  
                (size <strong>{PRIXMALIN.sizeMb} MB</strong>).
              </>
            )}
          </p>
        ) : null}
      </div>
    </section>
  );
}
