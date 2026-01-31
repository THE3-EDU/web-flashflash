import type { NextConfig } from "next";

// basePath 只在生产构建时使用（GitHub Pages 部署）
// 开发模式下不使用 basePath，方便本地开发
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/web-flashflash' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
