import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/web-flashflash',
  assetPrefix: '/web-flashflash',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
