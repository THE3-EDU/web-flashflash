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
  
  // 检查是否在本地开发环境
  const isDevelopment = 
    typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname === '127.0.0.1' ||
     process.env.NODE_ENV === 'development');
  
  // 如果在开发环境，直接返回路径
  if (isDevelopment) {
    return path.startsWith('/') ? path : `/${path}`;
  }
  
  // 生产环境：basePath 配置（与 next.config.ts 中的保持一致）
  const basePath = '/web-flashflash';
  
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 返回包含 basePath 的完整路径
  return `${basePath}${normalizedPath}`;
}
