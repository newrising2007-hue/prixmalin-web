import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "data", "partenaires");
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    const partenaires = files
      .filter((file) => {
        const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8"));
        return data.statut === "publie";
      })
      .map((file) => {
      const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8"));
      return {
        slug: data.slug,
        nom: data.nom,
        slogan: data.slogan,
        couleur: data.couleurs?.primaire || "#2eaabf",
        ville: data.contact?.adresse?.split(",")[1]?.trim() || "",
        url: `https://prixmalin.ca/fr/partenaires/${data.slug}`,
        logo_url: `https://prixmalin.ca/partenaires/${data.slug}/logo.png`,
      };
    });
    return NextResponse.json({ success: true, partenaires });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
