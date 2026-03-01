import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirects gaming SEO
      { source: "/playstation-plus-prix-canada", destination: "/i/playstation-plus-prix-canada", permanent: true },
      { source: "/carte-psn-canada", destination: "/i/carte-psn-25-canada", permanent: true },
      { source: "/nintendo-switch-online-prix-canada", destination: "/i/carte-nintendo-eshop-20-canada", permanent: true },
      { source: "/xbox-game-pass-prix-canada", destination: "/i/carte-cadeau-xbox-50-canada", permanent: true },
      // Redirects codes → codes-bonus (évite contenu dupliqué SEO)
      { source: "/codes", destination: "/codes-bonus", permanent: true },
      { source: "/codes/:platform", destination: "/codes-bonus/:platform", permanent: true },
      // Redirects langues → magasins FR
      { source: "/en/magasins/:path*", destination: "/magasins/:path*", permanent: false },
      { source: "/es/magasins/:path*", destination: "/magasins/:path*", permanent: false },
      { source: "/ar/magasins/:path*", destination: "/magasins/:path*", permanent: false },
      { source: "/zh/magasins/:path*", destination: "/magasins/:path*", permanent: false },
    ];
  },
};
export default nextConfig;
