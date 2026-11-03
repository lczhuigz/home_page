// @ts-check
import { defineConfig } from 'astro/config';

// 部署域名在这里改一处即可（同时更新 public/CNAME）。
export default defineConfig({
  site: 'https://me.lczhuigz.cn',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  // 若最终部署在 GitHub Pages 的项目路径（如 /homepage/），把 base 改成 '/homepage'
  // base: '/',
});
