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
  badge?: string; // ex: "Populaire", "Alternative", "Meilleure valeur"
  priceLabel: string; // "Variable"
  description: string;
  ctaLabel: string;
  href: string; // lien affilié (ou page /produits interne)
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

const TODAY_ISO = "2026-02-21";

// ✅ Amazon Associates tag PrixMalin
const AMAZON_TAG = "prixmalin-20";

// Helper simple: construit une URL Amazon avec tag (sans scraping)
function amazonSearchUrl(query: string) {
  const q = encodeURIComponent(query);
  return `https://www.amazon.ca/s?k=${q}&tag=${AMAZON_TAG}`;
}

export const PC_GAMES: PcGameContent[] = [
  {
    slug: "valorant",
    name: "VALORANT",
    title: "Codes VALORANT PC : bonus, points VP, skins et activation (Canada)",
    seoDescription:
      "Guide VALORANT PC (Canada) : types de codes/bonus, points VP, cartes cadeaux, activation Riot, sécurité anti-arnaques et astuces pour maximiser tes récompenses.",
    updatedAtISO: TODAY_ISO,
    hero: {
      subtitle:
        "VALORANT : on fait le tri entre “codes”, VP, promos, événements et arnaques. Objectif : des récompenses réalistes, activées correctement.",
      highlights: [
        "Comprendre VP, cartes cadeaux et promos (sans mythes)",
        "Activation Riot : étapes simples + erreurs fréquentes",
        "Anti-arnaques : phishing, générateurs, faux giveaways",
      ],
    },
    intro: [
      "Quand on cherche “codes VALORANT PC”, on tombe vite sur des promesses de skins gratuits ou de VP illimités. Dans la réalité, la majorité des récompenses vient plutôt d’événements officiels, de promotions ponctuelles, ou de moyens légitimes de recharger des VALORANT Points (VP).",
      "Cette page PrixMalin est un guide SEO “utile” : on explique les types de bonus, comment activer proprement sur PC, et comment éviter les arnaques. Ensuite, on te propose des offres pertinentes (liens affiliés) liées aux VP et cartes cadeaux.",
    ],

    offers: [
      {
        id: "valorant-vp",
        title: "Cartes VALORANT Points (VP) / Riot Points (RP)",
        badge: "Populaire",
        priceLabel: "Variable",
        description:
          "Recharge officielle pour VP (VALORANT) et parfois RP (selon formats). Idéal si tu vises un bundle, un pass ou des skins.",
        ctaLabel: "Voir les options",
        href: amazonSearchUrl("VALORANT Points card Canada"),
      },
      {
        id: "riot-points",
        title: "Cartes Riot Points (RP) (écosystème Riot)",
        badge: "Alternative",
        priceLabel: "Variable",
        description:
          "Alternative utile si tu joues aussi à d’autres jeux Riot. Vérifie les conditions d’utilisation selon le produit.",
        ctaLabel: "Voir l’offre",
        href: amazonSearchUrl("Riot Points card Canada"),
      },
      {
        id: "gift-card",
        title: "Carte cadeau gaming (alternative)",
        badge: "Meilleure valeur",
        priceLabel: "Variable",
        description:
          "Si tu veux un budget gaming flexible (sans viser uniquement VP), une carte cadeau peut être une alternative pratique.",
        ctaLabel: "Voir les cartes",
        href: amazonSearchUrl("gaming gift card Canada"),
      },
    ],

    sections: [
      {
        id: "types",
        h2: "Quels types de “codes” et bonus existent sur VALORANT (PC) ?",
        body: [
          "Sur VALORANT, le mot “code” est souvent utilisé pour tout : recharges, promos, récompenses d’événements… En pratique, il faut distinguer ce qui est réellement un code à entrer, et ce qui est une récompense liée à un événement/compte.",
          "Ce tri est crucial pour le SEO (intention de recherche) et pour éviter les arnaques : les “VP gratuits illimités” n’existent pas.",
        ],
        bullets: [
          "VP (VALORANT Points) : monnaie premium, obtenue via achat/recharge",
          "Cartes cadeaux / recharges : code de recharge légitime",
          "Promos ponctuelles : rares, limitées (dates, quantité, région)",
          "Événements : récompenses via missions/conditions, pas forcément un code",
          "Arnaques : générateurs, faux sites, fausses pages de connexion",
        ],
      },
      {
        id: "vp",
        h2: "VP sur PC : à quoi ça sert (et comment éviter d’acheter “trop”)",
        body: [
          "Les VP servent à acheter des skins, bundles et parfois des passes/éléments cosmétiques. L’erreur fréquente : acheter des VP “hors période” alors qu’une promo ou un bundle précis t’aurait permis de mieux optimiser ton budget.",
          "Stratégie simple : décide d’abord ton objectif (bundle / skin / pass), puis choisis la recharge la plus proche du besoin, au lieu de recharger “au hasard”.",
        ],
        bullets: [
          "Définis ton objectif (bundle, skin, pass) avant d’acheter",
          "Vérifie les restrictions : région/plateforme/compte",
          "Conserve la preuve d’achat si carte cadeau",
        ],
      },
      {
        id: "activation",
        h2: "Comment activer un code ou une recharge VALORANT (PC)",
        body: [
          "Quand tu as un code légitime (carte cadeau / recharge), l’activation se fait via les canaux officiels associés au compte Riot/au flux prévu. Le principe : toujours passer par un chemin officiel, jamais par un “outil d’activation” tiers.",
          "Si tu participes à un événement, la récompense peut être automatique (missions) ou conditionnelle (compte lié, participation). Dans tous les cas : ne donne jamais ton mot de passe à un site externe.",
        ],
        bullets: [
          "Connecte-toi au bon compte Riot (PC)",
          "Vérifie l’expiration et la région du code",
          "Aucune activation ne doit exiger ton mot de passe hors connexion standard",
          "Évite les sites qui “vérifient ton compte” via formulaire",
        ],
      },
      {
        id: "ou-trouver",
        h2: "Où trouver des bonus fiables (Canada) : ce qui marche vraiment",
        body: [
          "La méthode la plus fiable : suivre les canaux officiels et les promotions clairement identifiées. Les “codes gratuits illimités” sont une arnaque classique. Les vrais bonus sont limités dans le temps, et les recharges (VP) sont des achats légitimes.",
          "PrixMalin vise l’utile : te diriger vers des options réalistes (cartes VP, cartes Riot, alternatives), avec des liens affiliés traçables.",
        ],
        bullets: [
          "Promos limitées et vérifiables (dates/conditions)",
          "Cartes cadeaux / VP : recharge officielle",
          "Événements : bonus via missions/conditions (souvent sans code)",
        ],
      },
      {
        id: "anti-arnaque",
        h2: "Arnaques “codes VALORANT” : les signaux d’alerte",
        body: [
          "Les scams VALORANT ciblent les joueurs via de faux générateurs de skins/VP, des pages qui imitent Riot, ou des concours bidons. Leur but : voler le compte ou monétiser via redirections/publicités.",
          "Checklist : si on te demande d’installer un logiciel, de saisir ton mot de passe, ou de valider un code SMS, tu fermes la page.",
        ],
        bullets: [
          "“Générateur VP / skins” = faux",
          "Pages de connexion qui ne sont pas Riot = danger",
          "Extensions/logiciels miracles = à éviter",
          "Giveaways avec trop d’étapes/redirections = suspect",
        ],
      },
      {
        id: "faq-intent",
        h2: "Questions fréquentes (intention de recherche) : réponses directes",
        body: [
          "Beaucoup de requêtes Google sont très directes. Ici, on répond pareil : pas de promesses impossibles, juste des méthodes fiables et un rappel sécurité.",
        ],
        bullets: [
          "“code valorant gratuit” : non (sauf bonus événementiel limité)",
          "“où entrer code valorant” : via flux officiel lié au compte",
          "“vp pas cher” : promos, cartes cadeaux, optimisation du montant",
        ],
      },
    ],

    faq: [
      {
        q: "Est-ce qu’il existe des codes VALORANT gratuits pour skins ou VP ?",
        a: "Les “codes gratuits illimités” n’existent pas. Les récompenses gratuites proviennent plutôt d’événements, missions ou campagnes ponctuelles officielles. Méfie-toi des générateurs et des promesses trop belles.",
      },
      {
        q: "Où entrer un code VALORANT sur PC ?",
        a: "Quand un code officiel est disponible (souvent carte cadeau/recharge), l’activation se fait via un flux officiel lié au compte. Évite toute page qui demande ton mot de passe ou qui te fait installer un logiciel.",
      },
      {
        q: "Comment éviter les arnaques “codes VALORANT” ?",
        a: "Ne donne jamais tes identifiants, ne partage pas de codes SMS, et n’installe pas de “générateur”. Vérifie l’URL et privilégie uniquement des canaux officiels ou des vendeurs légitimes.",
      },
      {
        q: "Les cartes cadeaux VP sont-elles sûres au Canada ?",
        a: "Oui si elles viennent d’un vendeur légitime. Vérifie la région/conditions avant d’acheter et conserve la preuve d’achat.",
      },
    ],
    relatedSlugs: ["fortnite", "league-of-legends", "counter-strike-2"],
  },

  {
    slug: "fortnite",
    name: "Fortnite",
    title: "Codes Fortnite PC : bonus, V-Bucks, packs et activation (Canada)",
    seoDescription:
      "Fortnite PC (Canada) : types de codes/bonus, V-Bucks, cartes cadeaux, activation, et sécurité anti-arnaques.",
    updatedAtISO: TODAY_ISO,
    hero: {
      subtitle:
        "Fortnite sur PC : ce qui est réel (cartes cadeaux, packs, événements) + comment activer sans te faire avoir.",
      highlights: ["V-Bucks : recharges légitimes", "Activation claire", "Anti-arnaques"],
    },
    intro: [
      "Fortnite sur PC propose des bonus via packs, cartes cadeaux, événements et promotions. Le mot “code” est souvent associé à une recharge V-Bucks ou à un pack qui contient un code.",
      "Ici, on te donne les méthodes fiables (et les pièges à éviter) puis des offres recommandées via liens affiliés.",
    ],

    offers: [
      {
        id: "vbucks-card",
        title: "Cartes V-Bucks (Fortnite) — recharges",
        badge: "Populaire",
        priceLabel: "Variable",
        description:
          "Recharge V-Bucks via cartes/codes légitimes. Utile si tu vises un Battle Pass ou des skins.",
        ctaLabel: "Voir les options",
        href: amazonSearchUrl("Fortnite V-Bucks card Canada"),
      },
      {
        id: "fortnite-pack",
        title: "Packs Fortnite (contenu cosmétique)",
        badge: "Alternative",
        priceLabel: "Variable",
        description:
          "Packs ponctuels avec contenu cosmétique. Vérifie la plateforme/compatibilité avant achat.",
        ctaLabel: "Voir les packs",
        href: amazonSearchUrl("Fortnite pack code Canada"),
      },
    ],

    sections: [
      {
        id: "types",
        h2: "Types de codes et bonus Fortnite sur PC",
        body: [
          "Les codes Fortnite sont généralement liés à des cartes cadeaux V-Bucks, à des packs, ou à des promos limitées. Les “V-Bucks gratuits” illimités sont une arnaque.",
        ],
        bullets: [
          "Cartes cadeaux / recharges V-Bucks",
          "Packs avec contenu cosmétique",
          "Événements à durée limitée (bonus/missions)",
          "Promos partenaires (selon disponibilité)",
        ],
      },
      {
        id: "activation",
        h2: "Comment activer un code Fortnite sur PC",
        body: [
          "Active uniquement via un flux officiel Epic (ou un vendeur légitime de cartes cadeaux). Vérifie le bon compte et la région avant de valider.",
        ],
        bullets: [
          "Connecte-toi au bon compte Epic",
          "Vérifie expiration/région (Canada)",
          "Garde une preuve d’achat si carte cadeau",
        ],
      },
      {
        id: "arnaques",
        h2: "Arnaques courantes : “V-Bucks gratuits”",
        body: [
          "Les générateurs de V-Bucks sont faux. Si un site te demande ton mot de passe ou d’installer un logiciel, c’est non.",
        ],
        bullets: ["Générateurs = scam", "Phishing", "Faux giveaways"],
      },
    ],
    faq: [
      {
        q: "Peut-on avoir des V-Bucks gratuits via un code ?",
        a: "Les offres “gratuites illimitées” sont presque toujours frauduleuses. Les bonus gratuits proviennent plutôt d’événements, du Battle Pass ou de campagnes officielles ponctuelles.",
      },
      {
        q: "Où activer un code Fortnite ?",
        a: "Uniquement via les canaux officiels Epic/flux d’activation, ou via une carte cadeau achetée chez un vendeur légitime.",
      },
    ],
    relatedSlugs: ["valorant", "roblox", "call-of-duty-warzone"],
  },

  // Les autres jeux : on garde le contenu actuel (MVP) pour l’instant.
  {
    slug: "league-of-legends",
    name: "League of Legends",
    title: "Codes League of Legends PC : RP, bonus et promos (Canada)",
    seoDescription:
      "LoL PC : types de codes/bonus, cartes RP, activation et conseils anti-arnaques. Guide fiable au Canada.",
    updatedAtISO: TODAY_ISO,
    hero: {
      subtitle: "RP, promos et événements : comment distinguer le vrai du faux.",
      highlights: ["Cartes RP", "Activation", "Sécurité"],
    },
    intro: [
      "Sur League of Legends, les “codes” sont souvent liés à des promotions, du contenu événementiel, ou des recharges RP via cartes/cadeaux.",
    ],
    offers: [
      {
        id: "lol-rp-card",
        title: "Cartes RP (League of Legends)",
        badge: "Populaire",
        priceLabel: "Variable",
        description: "Recharge RP via cartes cadeaux légitimes. Utile pour skins et contenu.",
        ctaLabel: "Voir les options",
        href: amazonSearchUrl("League of Legends RP card Canada"),
      },
    ],
    sections: [
      {
        id: "types",
        h2: "Types de bonus sur LoL (PC)",
        body: [
          "Les bonus proviennent d’événements, promos ou cartes RP. Les “skins gratuits illimités” n’existent pas.",
        ],
        bullets: ["Événements officiels", "Cartes/cadeaux RP", "Promos ponctuelles"],
      },
      {
        id: "activation",
        h2: "Activation et bonnes pratiques",
        body: [
          "Vérifie toujours que tu es sur un flux/page officielle et connecté au bon compte. Aucun bonus légitime ne demande ton mot de passe hors connexion standard.",
        ],
        bullets: ["Compte Riot", "Région/expiration", "Zéro logiciel à installer"],
      },
    ],
    faq: [
      {
        q: "Existe-t-il des codes RP gratuits ?",
        a: "Des promos existent parfois, mais les “RP gratuits illimités” sont frauduleux. Privilégie les canaux officiels et les offres vérifiables.",
      },
    ],
    relatedSlugs: ["valorant", "minecraft", "counter-strike-2"],
  },

  {
    slug: "minecraft",
    name: "Minecraft",
    title: "Codes Minecraft PC : cartes cadeaux, éditions et activation (Canada)",
    seoDescription:
      "Minecraft PC : comprendre les codes (cartes cadeaux, clés), activer sans erreur, et éviter les arnaques au Canada.",
    updatedAtISO: TODAY_ISO,
    hero: {
      subtitle: "Cartes cadeaux et clés : quoi vérifier (édition, région) avant d’activer.",
      highlights: ["Java vs Bedrock", "Activation", "Anti-arnaques"],
    },
    intro: [
      "Minecraft sur PC utilise souvent des codes via cartes cadeaux, clés d’édition, ou contenus packagés. Les promesses de “Minecraft gratuit” via générateurs sont presque toujours des arnaques.",
    ],
    offers: [
      {
        id: "minecraft-gift",
        title: "Cartes cadeaux / clé Minecraft (PC)",
        badge: "Populaire",
        priceLabel: "Variable",
        description: "Clés ou cartes cadeaux légitimes. Vérifie l’édition (Java/Bedrock).",
        ctaLabel: "Voir les options",
        href: amazonSearchUrl("Minecraft gift card PC Canada"),
      },
    ],
    sections: [
      {
        id: "types",
        h2: "Quels “codes” pour Minecraft PC ?",
        body: ["La plupart du temps : cartes cadeaux/clé d’activation ou contenus associés à une édition."],
        bullets: ["Cartes cadeaux", "Clés d’édition", "Bundles (selon offres)"],
      },
      {
        id: "activation",
        h2: "Activer un code Minecraft : points à vérifier",
        body: ["Vérifie l’édition (Java/Bedrock), la région et le vendeur avant achat/activation."],
        bullets: ["Édition", "Région", "Vendeur légitime"],
      },
    ],
    faq: [
      {
        q: "On peut obtenir Minecraft gratuitement avec un code ?",
        a: "En pratique non : les “codes gratuits” sont quasi toujours frauduleux. Les options légitimes passent par des cartes cadeaux, bundles ou promos officielles.",
      },
    ],
    relatedSlugs: ["roblox", "gta-online", "fortnite"],
  },

  {
    slug: "roblox",
    name: "Roblox",
    title: "Codes Roblox PC : Robux, cartes cadeaux et sécurité (Canada)",
    seoDescription:
      "Roblox PC : Robux, cartes cadeaux, activation, et conseils de sécurité pour éviter les arnaques au Canada.",
    updatedAtISO: TODAY_ISO,
    hero: {
      subtitle: "Robux : méthodes légitimes, activation correcte, et anti-arnaques.",
      highlights: ["Cartes cadeaux", "Activation", "Sécurité"],
    },
    intro: [
      "Sur Roblox, les “codes” sont principalement associés aux cartes cadeaux et à certains bonus ponctuels. Les générateurs Robux sont des pièges.",
    ],
    offers: [
      {
        id: "roblox-robux",
        title: "Cartes Robux / Roblox Gift Card",
        badge: "Populaire",
        priceLabel: "Variable",
        description: "Recharge Robux via cartes cadeaux légitimes.",
        ctaLabel: "Voir les options",
        href: amazonSearchUrl("Roblox gift card Canada"),
      },
    ],
    sections: [
      {
        id: "types",
        h2: "Types de codes/bonus Roblox",
        body: ["Le plus courant : cartes cadeaux et recharges. Les bonus gratuits passent rarement par des codes et sont limités."],
        bullets: ["Cartes cadeaux Robux", "Promos ponctuelles", "Événements"],
      },
      {
        id: "arnaques",
        h2: "Éviter les arnaques Robux",
        body: ["Ne donne jamais ton mot de passe et n’installe aucun logiciel “générateur”. Active uniquement via un flux légitime."],
        bullets: ["Générateurs : faux", "Phishing", "Faux concours"],
      },
    ],
    faq: [
      {
        q: "Les générateurs Robux fonctionnent ?",
        a: "Non. Ils servent à voler des comptes ou à monétiser via des pubs/abonnements. Utilise uniquement des méthodes légitimes.",
      },
    ],
    relatedSlugs: ["minecraft", "fortnite", "league-of-legends"],
  },

  {
    slug: "gta-online",
    name: "GTA Online",
    title: "Codes GTA Online PC : bonus, packs et anti-arnaques (Canada)",
    seoDescription:
      "GTA Online PC : bonus réels, packs, et conseils pour éviter les faux codes cash au Canada.",
    updatedAtISO: TODAY_ISO,
    hero: {
      subtitle: "Bonus réels vs faux “codes cash” : on sécurise et on explique.",
      highlights: ["Bonus réels", "Sécurité", "FAQ"],
    },
    intro: ["Sur GTA Online, les “codes cash gratuits illimités” sont une arnaque classique. Les bonus réels viennent plutôt d’événements, offres et packs."],
    offers: [
      {
        id: "gta-card",
        title: "Carte cadeau gaming (budget flexible)",
        badge: "Alternative",
        priceLabel: "Variable",
        description: "Alternative utile pour achats gaming flexibles.",
        ctaLabel: "Voir les cartes",
        href: amazonSearchUrl("gaming gift card Canada"),
      },
    ],
    sections: [
      { id: "bonus", h2: "Bonus réels : événements et offres", body: ["Les bonus proviennent de périodes promotionnelles, challenges, ou offres packagées."], bullets: ["Événements", "Challenges", "Packs/offres"] },
      { id: "arnaques", h2: "Arnaques cash : quoi éviter", body: ["Évite les générateurs et les services qui demandent l’accès à ton compte."], bullets: ["Générateurs : faux", "Services ‘boost’ risqués", "Phishing"] },
    ],
    faq: [
      { q: "Existe-t-il un code pour avoir du cash gratuit ?", a: "Les ‘codes cash’ illimités sont frauduleux. Privilégie les bonus d’événements et les offres officielles." },
    ],
    relatedSlugs: ["call-of-duty-warzone", "roblox", "minecraft"],
  },

  {
    slug: "call-of-duty-warzone",
    name: "Call of Duty: Warzone",
    title: "Codes Warzone PC : bonus, skins, XP et promos (Canada)",
    seoDescription:
      "Warzone PC : codes/bonus, activation, sécurité et promos fiables. Guide anti-arnaques au Canada.",
    updatedAtISO: TODAY_ISO,
    hero: {
      subtitle: "Promos et bonus réels : comment éviter les faux codes skins.",
      highlights: ["Activation", "Sécurité", "Optimisation"],
    },
    intro: ["Warzone propose des bonus via événements et promos. On fait le tri et on évite les pièges."],
    offers: [
      {
        id: "warzone-points",
        title: "Cartes cadeaux gaming (alternative)",
        badge: "Alternative",
        priceLabel: "Variable",
        description: "Budget flexible si tu n’as pas une recharge spécifique.",
        ctaLabel: "Voir les cartes",
        href: amazonSearchUrl("gaming gift card Canada"),
      },
    ],
    sections: [
      { id: "types", h2: "Types de bonus sur Warzone", body: ["Campagnes promotionnelles, événements et bonus limités."], bullets: ["Événements", "Promos ponctuelles", "Bundles/offres"] },
      { id: "securite", h2: "Sécurité : repérer les faux codes", body: ["N’entre jamais tes identifiants sur une page non officielle et n’installe aucun outil “générateur”."], bullets: ["Phishing", "Faux giveaways", "Générateurs : faux"] },
    ],
    faq: [
      { q: "Comment savoir si un code Warzone est officiel ?", a: "Il vient d’une annonce/partenaire vérifiable et s’active via un flux officiel. Si on te demande ton mot de passe, c’est non." },
    ],
    relatedSlugs: ["fortnite", "valorant", "gta-online"],
  },

  {
    slug: "counter-strike-2",
    name: "Counter-Strike 2",
    title: "Codes Counter-Strike 2 PC : drops, skins et sécurité (Canada)",
    seoDescription:
      "CS2 PC : drops, bonus, achats légitimes, éviter les scams, et optimiser tes récompenses au Canada.",
    updatedAtISO: TODAY_ISO,
    hero: {
      subtitle: "CS2 est un terrain fertile pour les scams : on sécurise et on optimise.",
      highlights: ["Drops", "Sécurité", "FAQ"],
    },
    intro: ["Sur CS2, le mot “code” est souvent utilisé à tort. Les bonus viennent surtout des drops et d’offres légitimes. Les arnaques skins sont nombreuses."],
    offers: [
      {
        id: "cs2-security",
        title: "Clé/Steam Wallet (alternative)",
        badge: "Alternative",
        priceLabel: "Variable",
        description: "Alternative flexible pour achats liés à ton écosystème PC.",
        ctaLabel: "Voir les options",
        href: amazonSearchUrl("Steam gift card Canada"),
      },
    ],
    sections: [
      { id: "drops", h2: "Drops et bonus : ce qui est réel", body: ["Récompenses via drops/événements. Les “codes skins gratuits” sont une promesse classique de scam."], bullets: ["Drops", "Événements", "Achats légitimes"] },
      { id: "scams", h2: "Arnaques CS2 : échanges et phishing", body: ["Attention aux faux échanges et liens qui demandent de se reconnecter."], bullets: ["Phishing", "Faux profils", "‘Free skins’ : scam"] },
    ],
    faq: [{ q: "Existe-t-il des codes skins gratuits CS2 ?", a: "En général non : skins gratuits illimités via code = arnaque. Concentre-toi sur les drops et offres légitimes." }],
    relatedSlugs: ["valorant", "call-of-duty-warzone", "world-of-tanks"],
  },

  {
    slug: "world-of-tanks",
    name: "World of Tanks",
    title: "Codes World of Tanks PC : bonus et activation (Canada)",
    seoDescription:
      "World of Tanks PC : codes promo, bonus, activation, restrictions et anti-arnaques au Canada.",
    updatedAtISO: TODAY_ISO,
    hero: {
      subtitle: "Comprendre les promos WOT et activer tes bonus sans risques.",
      highlights: ["Activation", "Types de bonus", "Conseils"],
    },
    intro: ["World of Tanks propose parfois des codes promo et bonus liés à des événements. On explique comment les repérer et les activer proprement."],
    offers: [
      {
        id: "wot-starter",
        title: "Starter packs / bonus (selon offres)",
        badge: "Alternative",
        priceLabel: "Variable",
        description: "Offres variables selon période. Vérifie conditions avant achat.",
        ctaLabel: "Voir les options",
        href: amazonSearchUrl("World of Tanks code PC"),
      },
    ],
    sections: [
      { id: "types", h2: "Types de codes et bonus", body: ["Promos limitées et récompenses événementielles."], bullets: ["Codes promo", "Événements", "Bonus temporaires"] },
      { id: "activation", h2: "Activation : bonnes pratiques", body: ["Active uniquement via pages officielles et vérifie les conditions (région, date, quantité)."], bullets: ["Compte correct", "Expiration", "Région"] },
    ],
    faq: [{ q: "Pourquoi un code ne marche pas ?", a: "Souvent : expiré, limité en quantité, ou non valide pour ta région/serveur. Vérifie les conditions de la promo." }],
    relatedSlugs: ["counter-strike-2", "valorant", "league-of-legends"],
  },
];

export function getPcGame(slug: string): PcGameContent | null {
  return PC_GAMES.find((g) => g.slug === slug) ?? null;
}

export function getPcGameSlugs(): PcGameSlug[] {
  return PC_GAMES.map((g) => g.slug);
}
