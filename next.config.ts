import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/hack-n-roll",
  assetPrefix: "/hack-n-roll/",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;