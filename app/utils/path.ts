/**
 * 获取正确的资源路径（考虑 basePath）
 * 在 GitHub Pages 子路径部署时，需要添加 basePath 前缀
 * 在本地开发时，不需要 basePath
 */
export function getAssetPath(path: string): string {
  // 如果路径已经是完整 URL，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // basePath 配置（与 next.config.ts 中的保持一致）
  const basePath = '/web-flashflash';
  
  // 在客户端，检查当前 URL 是否已经包含 basePath
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;
    // 如果当前路径已经包含 basePath，说明在生产环境，需要添加 basePath
    if (currentPath.startsWith(basePath)) {
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      return `${basePath}${normalizedPath}`;
    }
    // 如果当前路径不包含 basePath，说明在开发环境，不需要添加
    return path.startsWith('/') ? path : `/${path}`;
  }
  
  // 服务端渲染时，检查 process.env
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment) {
    return path.startsWith('/') ? path : `/${path}`;
  }
  
  // 生产环境：添加 basePath
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
