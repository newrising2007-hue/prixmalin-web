import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const pcGamesPath = path.join(ROOT, "src/data/codes-bonus/pc-games.js");
const codesPath = path.join(ROOT, "src/data/bonus-codes/codes.json");

// ESM import (pc-games.js exporte PC_GAMES, getPcGame, getPcGameSlugs)
const pcModule = await import(pathToFileUrl(pcGamesPath));
const { PC_GAMES } = pcModule;

function pathToFileUrl(p) {
  const resolved = path.resolve(p);
  const url = new URL("file://");
  url.pathname = resolved.startsWith("/") ? resolved : `/${resolved}`;
  return url.href;
}

function readJson(file) {
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw);
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function slugToTitle(slug) {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function todayIso() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// Normalisation codes.json: array ou { codes: [] }
const codesRaw = readJson(codesPath);
const codes = Array.isArray(codesRaw) ? codesRaw : (codesRaw?.codes ?? []);

const existingByGame = new Map();
for (const item of codes) {
  const gs = item?.gameSlug;
  if (!gs) continue;
  if (!existingByGame.has(gs)) existingByGame.set(gs, []);
  existingByGame.get(gs).push(item);
}

let added = 0;
let touched = 0;

for (const g of PC_GAMES) {
  const slug = g.slug;
  const list = existingByGame.get(slug) ?? [];

  // Si rien -> on ajoute un item "méthodes officielles"
  if (list.length === 0) {
    const name = g.name && g.name !== slug ? g.name : slugToTitle(slug);
    codes.push({
      id: `pc-${slug}-official-methods`,
      gameSlug: slug,
      title: `Bonus ${name} (PC) : méthodes officielles et sûres`,
      description:
        `Aucun “code gratuit illimité” fiable. Voici les méthodes légitimes pour obtenir des bonus sur ${name} (PC).`,
      steps: [
        "Vérifie les promotions officielles (site/launcher/événements).",
        "Utilise uniquement des cartes cadeaux / recharges légitimes (revendeurs reconnus).",
        "Active les bonus via les canaux officiels (éditeur/plateforme).",
      ],
      note:
        "PrixMalin évite les faux codes et privilégie les méthodes officielles et vérifiables.",
      updatedAt: todayIso(),
    });
    added += 1;
    continue;
  }

  // Sinon, on complète title/description manquants (sans écraser ce qui existe)
  for (const item of list) {
    let changed = false;
    if (!item.title) {
      const name = g.name && g.name !== slug ? g.name : slugToTitle(slug);
      item.title = `Bonus ${name} (PC) : guide et méthodes`;
      changed = true;
    }
    if (!item.description) {
      const name = g.name && g.name !== slug ? g.name : slugToTitle(slug);
      item.description = `Méthodes et informations utiles pour obtenir des bonus sur ${name} (PC).`;
      changed = true;
    }
    if (changed) touched += 1;
  }
}

// Tri stable pour un diff propre
codes.sort((a, b) => {
  const ga = String(a.gameSlug ?? "");
  const gb = String(b.gameSlug ?? "");
  if (ga !== gb) return ga.localeCompare(gb);
  return String(a.id ?? "").localeCompare(String(b.id ?? ""));
});

// Réécrit dans le même format (array simple)
writeJson(codesPath, codes);

console.log("✅ Sync terminé");
console.log("   Jeux PC:", PC_GAMES.length);
console.log("   Items ajoutés:", added);
console.log("   Items complétés:", touched);
console.log("   Total items:", codes.length);
