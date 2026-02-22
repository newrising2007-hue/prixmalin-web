// src/data/codes-bonus/pc-games.ts

export type PcGameSlug =
  | "world-of-tanks"
  | "league-of-legends"
  | "fortnite"
  | "valorant"
  | "minecraft"
  | "roblox"
  | "gta-online"
  | "call-of-duty-warzone"
  | "counter-strike-2";

export type PcOffer = {
  id: string;
  title: string;
  badge?: string;
  priceLabel: string;
  description: string;
  ctaLabel: string;
  href: string;
};

export type ActiveCode = {
  id: string;
  title: string;
  description: string;
  method: "code" | "event" | "bundle" | "gift-card";
  code?: string;
  expiresAtISO?: string;
  sourceLabel: string;
};

export type PcGameContent = {
  slug: PcGameSlug;
  name: string;
  title: string;
  seoDescription: string;
  updatedAtISO: string;

  hero: {
    subtitle: string;
    highlights: string[];
  };

  intro: string[];

  offers: PcOffer[];

  activeCodes: ActiveCode[];

  sections: Array<{
    id: string;
    h2: string;
    body: string[];
    bullets?: string[];
  }>;

  faq: Array<{
    q: string;
    a: string;
  }>;

  relatedSlugs: PcGameSlug[];
};

const TODAY = "2026-02-21";

const AMAZON_TAG = "prixmalin-20";

function amazonSearch(query: string) {
  return `https://www.amazon.ca/s?k=${encodeURIComponent(
    query
  )}&tag=${AMAZON_TAG}`;
}

export const PC_GAMES: PcGameContent[] = [
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

    activeCodes: [
      {
        id: "info",
        title: "Pas de code VP gratuit illimité",
        description:
          "Les VP gratuits illimités n’existent pas. Les bonus viennent d’événements ou promotions officielles uniquement.",
        method: "event",
        sourceLabel: "Officiel",
      },
      {
        id: "recharge",
        title: "Recharge via carte cadeau",
        description:
          "Méthode légitime pour obtenir des VP : carte cadeau ou recharge officielle.",
        method: "gift-card",
        sourceLabel: "Vendeur légitime",
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

    relatedSlugs: ["fortnite", "league-of-legends", "counter-strike-2"],
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

    intro: [
      "Fortnite propose des bonus via V-Bucks et événements officiels.",
    ],

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

    activeCodes: [
      {
        id: "info",
        title: "V-Bucks gratuits illimités = arnaque",
        description:
          "Les générateurs V-Bucks sont faux. Utilise uniquement les méthodes officielles.",
        method: "event",
        sourceLabel: "Officiel",
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

  // Jeux restants MVP minimal
  ...[
    "league-of-legends",
    "minecraft",
    "roblox",
    "gta-online",
    "call-of-duty-warzone",
    "counter-strike-2",
    "world-of-tanks",
  ].map((slug) => ({
    slug: slug as PcGameSlug,
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
    activeCodes: [
      {
        id: "info",
        title: "Bonus variables",
        description:
          "Les bonus dépendent des événements officiels et promotions.",
        method: "event",
        sourceLabel: "Officiel",
      },
    ],
    sections: [],
    faq: [],
    relatedSlugs: ["valorant"],
  })),
];

export function getPcGame(slug: string): PcGameContent | null {
  return PC_GAMES.find((g) => g.slug === slug) ?? null;
}

export function getPcGameSlugs(): PcGameSlug[] {
  return PC_GAMES.map((g) => g.slug);
}
