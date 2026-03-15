// src/data/codes-bonus/nintendo-games.js
// Liste Nintendo (codes réels uniquement — si pas de codes, page = état vide propre)

const TODAY = "2026-02-27";

export const NINTENDO_GAMES = [
  {
    slug: "genshin-impact",
    name: "Genshin Impact",
    updatedAtISO: TODAY,
    seoDescription: "Codes Genshin Impact sur Nintendo : récompenses, primogems et activation (Canada).",
    hero: {
      subtitle: "Codes officiels (quand disponibles), vérifiés et listés proprement.",
      highlights: ["Codes officiels", "Expiration", "Activation simple"],
    },
    relatedSlugs: ["fortnite", "roblox", "warframe"],
  },
  {
    slug: "call-of-duty",
    name: "Call of Duty",
    updatedAtISO: TODAY,
    seoDescription: "Codes Call of Duty sur Nintendo : promos, bonus et activation (Canada).",
    hero: {
      subtitle: "On liste uniquement des codes réels (pas de fausses promesses).",
      highlights: ["Codes promo", "Bonus", "Activation"],
    },
    relatedSlugs: ["fortnite", "apex-legends", "warframe"],
  },
  {
    slug: "warframe",
    name: "Warframe",
    updatedAtISO: TODAY,
    seoDescription: "Codes Warframe sur Nintendo : bonus, glyphs et activation (Canada).",
    hero: {
      subtitle: "Codes réels quand disponibles, avec date et source.",
      highlights: ["Bonus", "Expiration", "Source"],
    },
    relatedSlugs: ["genshin-impact", "fortnite", "dead-by-daylight"],
  },
  {
    slug: "dead-by-daylight",
    name: "Dead by Daylight",
    updatedAtISO: TODAY,
    seoDescription: "Codes Dead by Daylight sur Nintendo : bloodpoints, charms et activation (Canada).",
    hero: {
      subtitle: "On garde seulement des codes actifs et vérifiés.",
      highlights: ["Codes actifs", "Expiration", "Activation"],
    },
    relatedSlugs: ["warframe", "fortnite", "roblox"],
  },
  {
    slug: "fortnite",
    name: "Fortnite",
    updatedAtISO: TODAY,
    seoDescription: "Codes Fortnite sur Nintendo : rewards, bonus et activation (Canada).",
    hero: {
      subtitle: "Codes réels uniquement (pas de listes douteuses).",
      highlights: ["Rewards", "Bonus", "Activation"],
    },
    relatedSlugs: ["genshin-impact", "roblox", "call-of-duty"],
  },
  {
    slug: "roblox",
    name: "Roblox",
    updatedAtISO: TODAY,
    seoDescription: "Codes Roblox sur Nintendo : items promo et activation (Canada).",
    hero: {
      subtitle: "Items promo quand disponibles, affichés clairement.",
      highlights: ["Codes promo", "Items", "Activation"],
    },
    relatedSlugs: ["fortnite", "genshin-impact", "dead-by-daylight"],
  },
  {
    slug: "pokemon-scarlet-violet",
    name: "Pokémon Écarlate/Violet",
    updatedAtISO: TODAY,
    seoDescription: "Codes Pokémon Écarlate et Violet sur Nintendo : tenues et items gratuits (Canada).",
    hero: { subtitle: "Tenues et items exclusifs.", highlights: ["Tenues", "Items", "Cadeaux mystère"] },
    relatedSlugs: ["warframe", "roblox"],
  },
  {
    slug: "honkai-star-rail",
    name: "Honkai: Star Rail",
    updatedAtISO: TODAY,
    seoDescription: "Codes Honkai: Star Rail sur Nintendo : Stellar Jades gratuits (Canada).",
    hero: { subtitle: "Stellar Jades et ressources gratuites.", highlights: ["Stellar Jades", "Crédits", "Permanent"] },
    relatedSlugs: ["genshin-impact", "warframe"],
  },
];

export function getNintendoGameSlugs() {
  return NINTENDO_GAMES.map((g) => g.slug);
}

export function getNintendoGame(slug) {
  return NINTENDO_GAMES.find((g) => g.slug === slug) ?? null;
}
