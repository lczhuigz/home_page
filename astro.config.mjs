// @ts-check
import { defineConfig } from 'astro/config';

/**
 * 站点域名只在这里配置一次：
 * - 本地默认 https://me.lczhuigz.cn
 * - 在 Vercel 后台设置环境变量 SITE_URL（例如 https://me.lczhuigz.cn 或 https://xxx.vercel.app），
 *   构建时会自动采用，canonical / og:url / robots.txt / sitemap.xml 全部跟着变。
 */
const siteUrl = process.env.SITE_URL ?? 'https://me.lczhuigz.cn';

export default defineConfig({
  site: siteUrl,
  compressHTML: true,
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
});
