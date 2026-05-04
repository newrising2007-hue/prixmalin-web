import epicerieData from "@/data/epicerie.json";

export type EpicerieItem = {
  id: string;
  marchand: string;
  merchant_id: number;
  flyer_id: number;
  region: string;
  nom: string;
  marque?: string | null;
  prix: number;
  image?: string | null;
  valid_from: string;
  valid_to: string;
  categorie?: string;
  unite?: string;
  statut?: string;
};

function isEpicerieItem(value: any): value is EpicerieItem {
  return (
    value &&
    typeof value === "object" &&
    typeof value.id === "string" &&
    typeof value.marchand === "string" &&
    typeof value.region === "string" &&
    typeof value.nom === "string" &&
    typeof value.prix === "number"
  );
}

export function getEpicerie(): EpicerieItem[] {
  const raw = epicerieData as unknown;
  if (!Array.isArray(raw)) return [];
  return raw.filter(isEpicerieItem).filter(
    (item) => item.categorie && item.categorie !== "autres"
  );
}

export function getRegions(): string[] {
  const items = getEpicerie();
  return [...new Set(items.map((i) => i.region))].sort();
}

export function getMarchands(): string[] {
  const items = getEpicerie();
  return [...new Set(items.map((i) => i.marchand))].sort();
}
