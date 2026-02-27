import fs from "node:fs";

const codesPath = "src/data/bonus-codes/codes.json";

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}
function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf-8");
}
function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

const raw = readJson(codesPath);
const codes = Array.isArray(raw) ? raw : (raw?.codes ?? []);

const before = codes.length;

const kept = codes.filter((c) => {
  if (!c) return false;

  if (c.platform !== "pc") return true;

  if (c.isActive === false) return false;

  return isNonEmptyString(c.code);
});

const after = kept.length;

const pcSlugsKept = Array.from(
  new Set(
    kept
      .filter((c) => c?.platform === "pc" && isNonEmptyString(c?.gameSlug))
      .map((c) => c.gameSlug)
  )
).sort();

const report = {
  beforeTotal: before,
  afterTotal: after,
  removedCount: before - after,
  pcSlugsKept,
  removedPolicy: 'Removed PC items where code is null/empty OR isActive=false. Non-PC items kept as-is.',
};

writeJson(codesPath, kept);
fs.writeFileSync("scripts/keep-real-codes-only.report.json", JSON.stringify(report, null, 2) + "\n");

console.log("✅ Nettoyage terminé");
console.log("  codes.json avant:", before);
console.log("  codes.json après :", after);
console.log("  PC slugs gardés :", pcSlugsKept.length);
console.log("  Report -> scripts/keep-real-codes-only.report.json");
