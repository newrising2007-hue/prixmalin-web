"use client";
import { useState } from "react";

interface Produit {
  nom: string;
  prix_regulier: number;
  prix_special: number;
}

interface Props {
  slug: string;
  produit: Produit;
}

export default function CouponEmailButton({ slug, produit }: Props) {
  const [ouvert, setOuvert] = useState(false);
  const [email, setEmail] = useState("");
  const [statut, setStatut] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const envoyer = async () => {
    if (!email) return;
    setStatut("loading");
    try {
      const res = await fetch(
        `https://prixmalin-backend.onrender.com/api/coupon/${slug}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, produit }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setStatut("ok");
        setTimeout(() => { setOuvert(false); setStatut("idle"); setEmail(""); }, 2500);
      } else {
        setStatut("error");
      }
    } catch {
      setStatut("error");
    }
  };

  return (
    <>
      <button
        onClick={() => setOuvert(true)}
        className="mt-2 w-full flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-1.5 text-xs text-gray-500 hover:border-[#2eaabf] hover:text-[#2eaabf] transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        M&apos;envoyer
      </button>

      {ouvert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setOuvert(false); }}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <p className="text-sm font-semibold text-gray-800 mb-1">M&apos;envoyer un rappel pour :</p>
            <p className="text-sm font-bold mb-4" style={{ color: "#2eaabf" }}>
              {produit.nom} — {produit.prix_special.toFixed(2)}$
            </p>

            {statut === "ok" ? (
              <p className="text-center text-sm font-semibold" style={{ color: "#2eaabf" }}>
                ✅ Courriel envoyé !
              </p>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && envoyer()}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-[#2eaabf]"
                />
                {statut === "error" && (
                  <p className="text-xs text-red-500 mb-2">Erreur — réessayez.</p>
                )}
                <button
                  onClick={envoyer}
                  disabled={statut === "loading"}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity"
                  style={{ backgroundColor: "#2eaabf", opacity: statut === "loading" ? 0.7 : 1 }}
                >
                  {statut === "loading" ? "Envoi..." : "Envoyer le rappel"}
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Code PRIXMALIN5 inclus dans le courriel
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
