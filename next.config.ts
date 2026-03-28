import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
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
      { source: "/playstation-plus-prix-canada", destination: "/i/playstation-plus-prix-canada", permanent: true },
      { source: "/carte-psn-canada", destination: "/i/carte-psn-25-canada", permanent: true },
      { source: "/nintendo-switch-online-prix-canada", destination: "/i/nintendo-switch-online-12-mois-canada", permanent: true },
      { source: "/xbox-game-pass-prix-canada", destination: "/i/xbox-game-pass-ultimate-3-mois-canada", permanent: true },
      { source: "/codes", destination: "/codes-bonus", permanent: true },
      { source: "/codes/:platform", destination: "/codes-bonus/:platform", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
