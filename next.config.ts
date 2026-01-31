import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // 如果 GitHub Pages 部署在根路径 (https://the3-edu.github.io)，不需要 basePath
  // 如果部署在子路径 (https://the3-edu.github.io/web-flashflash)，取消下面的注释
  // basePath: '/web-flashflash',
  // assetPrefix: '/web-flashflash',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
