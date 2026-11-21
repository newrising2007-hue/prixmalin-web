import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "f.wishabi.net" },
      { protocol: "https", hostname: "dam.flippenterprise.net" },
    ],
  },
  async redirects() {
    return [
      { source: "/deals/xbox-game-pass-ultimate-3m", destination: "/i/xbox-game-pass-ultimate-3-mois-canada", permanent: true },
      { source: "/deals/xbox-game-pass-ultimate-1m", destination: "/i/xbox-game-pass-ultimate-1-mois-canada", permanent: true },
      { source: "/deals/xbox-gift-card-50", destination: "/i/carte-cadeau-xbox-50-canada", permanent: true },
      { source: "/deals/xbox-gift-card-25", destination: "/i/carte-cadeau-xbox-25-canada", permanent: true },
      { source: "/deals/ps-plus-premium-12m", destination: "/i/playstation-plus-prix-canada", permanent: true },
      { source: "/deals/playstation-plus-3-mois", destination: "/i/playstation-plus-3-mois-canada", permanent: true },
      { source: "/deals/playstation-plus-1-mois", destination: "/i/playstation-plus-1-mois-canada", permanent: true },
      { source: "/deals/psn-gift-card-100", destination: "/i/carte-psn-100-canada", permanent: true },
      { source: "/deals/psn-gift-card-50", destination: "/i/carte-psn-50-canada", permanent: true },
      { source: "/deals/psn-gift-card-25", destination: "/i/carte-psn-25-canada", permanent: true },
      { source: "/deals/nintendo-switch-online-12m", destination: "/i/nintendo-switch-online-12-mois-canada", permanent: true },
      { source: "/deals/nintendo-switch-online-expansion-12m", destination: "/i/nintendo-switch-online-expansion-pack-canada", permanent: true },
      { source: "/deals/nintendo-eshop-35", destination: "/i/carte-nintendo-eshop-35-canada", permanent: true },
      { source: "/deals/nintendo-eshop-20", destination: "/i/carte-nintendo-eshop-20-canada", permanent: true },
      // 20 nov. 2026 — 7 vieilles adresses /deals/<slug> qui tombaient sur la route morte (404)
      { source: "/deals/nintendo-eshop-5", destination: "/i/carte-nintendo-eshop-5-canada", permanent: true },
      { source: "/deals/nintendo-eshop-10", destination: "/i/carte-nintendo-eshop-10-canada", permanent: true },
      { source: "/deals/nintendo-eshop-25", destination: "/i/carte-nintendo-eshop-25-canada", permanent: true },
      { source: "/deals/nintendo-eshop-50", destination: "/i/carte-nintendo-eshop-50-canada", permanent: true },
      { source: "/deals/xbox-game-pass-essential-1-month-membership", destination: "/i/xbox-game-pass-essential-1-mois-canada", permanent: true },
      { source: "/deals/xbox-game-pass-essential-3-month-membership", destination: "/i/xbox-game-pass-essential-3-mois-canada", permanent: true },
      { source: "/deals/xbox-gift-card-15", destination: "/deals", permanent: true },
      { source: "/playstation-plus-prix-canada", destination: "/i/playstation-plus-prix-canada", permanent: true },
      { source: "/carte-psn-canada", destination: "/i/carte-psn-25-canada", permanent: true },
      { source: "/nintendo-switch-online-prix-canada", destination: "/i/nintendo-switch-online-12-mois-canada", permanent: true },
      { source: "/xbox-game-pass-prix-canada", destination: "/i/xbox-game-pass-ultimate-3-mois-canada", permanent: true },
      // 17 nov. 2026 — codes gaming retirés : toutes les anciennes adresses → /gaming (301)
      { source: "/codes/:path*", destination: "/gaming", permanent: true },
      { source: "/codes-bonus/:path*", destination: "/gaming", permanent: true },
      { source: "/:locale(fr|en|es|ar|zh)/codes-bonus/:path*", destination: "/:locale/gaming", permanent: true },
      { source: "/magasins/coupons", destination: "/magasins/circulaires", permanent: true },
      { source: "/:locale(fr|en|es|ar|zh)/magasins/coupons", destination: "/:locale/magasins/circulaires", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
