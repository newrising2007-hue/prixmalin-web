// src/data/codes-bonus/pc-games.js

const TODAY = "2026-02-21";
const AMAZON_TAG = "prixmalin-20";

function amazonSearch(query) {
  return `https://www.amazon.ca/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`;
}

export const PC_GAMES = [
  {
    slug: "valorant",
    name: "VALORANT",
    title: "Codes VALORANT PC : bonus, VP, skins et activation (Canada)",
    seoDescription:
      "Guide VALORANT PC : bonus, points VP, cartes cadeaux, activation et sécurité anti-arnaques au Canada.",
    updatedAtISO: TODAY,
    hero: {
      subtitle:
        "On distingue les vrais bonus VALORANT des fausses promesses pour t’éviter les arnaques.",
      highlights: [
        "VP et cartes cadeaux expliqués",
        "Activation correcte sur PC",
        "Méthodes fiables uniquement",
      ],
    },
    intro: [
      "Quand on cherche des codes VALORANT, on trouve beaucoup de fausses promesses. En réalité, les bonus viennent surtout d’événements officiels ou de recharges légitimes.",
      "PrixMalin se concentre uniquement sur des méthodes fiables pour éviter les arnaques.",
    ],
    offers: [
      {
        id: "vp",
        title: "Cartes VALORANT Points (VP)",
        badge: "Populaire",
        priceLabel: "Variable",
        description:
          "Recharge officielle pour acheter skins et bundles dans VALORANT.",
        ctaLabel: "Voir les options",
        href: amazonSearch("Valorant Points card Canada"),
      },
    ],
    sections: [
      {
        id: "types",
        h2: "Types de bonus VALORANT",
        body: [
          "Les bonus VALORANT proviennent d’événements, promotions ou recharges VP.",
        ],
        bullets: ["VP", "Cartes cadeaux", "Événements"],
      },
      {
        id: "activation",
        h2: "Comment activer un code VALORANT",
        body: [
          "Active uniquement via les canaux officiels Riot. Ne partage jamais ton mot de passe.",
        ],
      },
    ],
    faq: [
      {
        q: "Existe-t-il des codes VALORANT gratuits ?",
        a: "Non, sauf bonus limités via événements officiels.",
      },
    ],
    relatedSlugs: ["fortnite", "league-of-legends"],
  },

  {
    slug: "fortnite",
    name: "Fortnite",
    title: "Codes Fortnite PC : V-Bucks, bonus et activation (Canada)",
    seoDescription:
      "Fortnite PC : V-Bucks, cartes cadeaux, bonus et sécurité anti-arnaques.",
    updatedAtISO: TODAY,
    hero: {
      subtitle: "Les V-Bucks gratuits illimités sont une arnaque.",
      highlights: ["Cartes cadeaux", "Activation", "Sécurité"],
    },
    intro: ["Fortnite propose des bonus via V-Bucks et événements officiels."],
    offers: [
      {
        id: "vbucks",
        title: "Cartes V-Bucks Fortnite",
        priceLabel: "Variable",
        description: "Recharge V-Bucks officielle.",
        ctaLabel: "Voir les options",
        href: amazonSearch("Fortnite V Bucks card Canada"),
      },
    ],
    sections: [
      {
        id: "types",
        h2: "Types de bonus Fortnite",
        body: ["Cartes V-Bucks, packs et événements."],
      },
    ],
    faq: [
      {
        q: "Peut-on avoir des V-Bucks gratuits ?",
        a: "Uniquement via événements ou Battle Pass.",
      },
    ],
    relatedSlugs: ["valorant", "roblox"],
  },
  {
    slug: "warframe",
    name: "Warframe",
    title: "Codes Warframe PC : bonus gratuits, glyphes et activation (Canada)",
    seoDescription:
      "Codes Warframe PC valides : glyphes, bonus gratuits et activation officielle au Canada.",
    updatedAtISO: TODAY,
    hero: {
      subtitle:
        "Warframe propose régulièrement des codes officiels gratuits pour obtenir des bonus et glyphes.",
      highlights: [
        "Codes officiels vérifiés",
        "Activation rapide",
        "Bonus gratuits",
      ],
    },
    intro: [
      "Les codes Warframe permettent d’obtenir gratuitement des bonus comme des glyphes ou des boosters. Ils sont distribués lors d’événements ou via des partenaires officiels.",
      "PrixMalin liste uniquement des codes réels et valides pour éviter les fausses promesses.",
    ],
    offers: [],
    sections: [
      {
        id: "types",
        h2: "Types de codes Warframe",
        body: [
          "Les codes Warframe donnent généralement des glyphes cosmétiques ou des bonus temporaires comme des boosters.",
        ],
        bullets: ["Glyphes", "Boosters", "Objets cosmétiques"],
      },
      {
        id: "activation",
        h2: "Comment activer un code Warframe",
        body: [
          "Les codes s’activent sur le site officiel Warframe ou directement dans le jeu via le menu de compte.",
        ],
      },
    ],
    faq: [
      {
        q: "Les codes Warframe sont-ils gratuits ?",
        a: "Oui, les codes officiels Warframe sont gratuits et distribués lors d’événements ou par des partenaires.",
      },
    ],
    relatedSlugs: ["fortnite", "roblox"],
  },
];

// Ajoute des jeux “MVP minimal” pour éviter des trous
const MINIMAL_SLUGS = [
  "league-of-legends",
  "roblox",
  "call-of-duty-warzone",
  "world-of-tanks",
];

for (const slug of MINIMAL_SLUGS) {
  PC_GAMES.push({
    slug,
    name: slug,
    title: `Codes ${slug} PC`,
    seoDescription: `Guide ${slug} PC`,
    updatedAtISO: TODAY,
    hero: {
      subtitle: "Bonus et activation.",
      highlights: ["Bonus", "Activation"],
    },
    intro: ["Informations sur les bonus."],
    offers: [],
    sections: [],
    faq: [],
    relatedSlugs: ["valorant"],
  });
}

export function getPcGame(slug) {
  return PC_GAMES.find((g) => g.slug === slug) ?? null;
}

export function getPcGameSlugs() {
  return PC_GAMES.map((g) => g.slug);
}
