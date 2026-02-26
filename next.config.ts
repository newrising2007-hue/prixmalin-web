import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/playstation-plus-prix-canada",
        destination: "/i/playstation-plus-prix-canada",
        permanent: true,
      },
      {
        source: "/carte-psn-canada",
        destination: "/i/carte-psn-25-canada",
        permanent: true,
      },
      {
        source: "/nintendo-switch-online-prix-canada",
        destination: "/i/carte-nintendo-eshop-20-canada",
        permanent: true,
      },
      {
        source: "/xbox-game-pass-prix-canada",
        destination: "/i/carte-cadeau-xbox-50-canada",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
