// Format canonique d'affichage des prix — toujours 2 décimales.
// Le JSON stocke des strings "N.NN" ; sans ce helper, "325.00" s'affiche "325".
// Partagé par les cartes de /produits (ProduitsClient) et la fiche /produit/[slug] (22 nov. 2026).
export function fmtPrix(v?: string | number | null): string | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : parseFloat(String(v).replace(",", "."));
  return Number.isFinite(n) ? n.toFixed(2) : null;
}

// Coupon Amazon : "37.77" + "$" → "37.77$" ; "10.00" + "%" → "10 %". Rien si vide.
export function fmtCoupon(v?: string | null, type?: string | null): string | null {
  const n = parseFloat(String(v ?? ""));
  if (!Number.isFinite(n) || n <= 0) return null;
  return type === "%" ? `${Number(n.toFixed(2))} %` : `${n.toFixed(2)}$`;
}
