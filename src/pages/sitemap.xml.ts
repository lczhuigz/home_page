import type { APIRoute } from 'astro';

const pages = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/projects/', changefreq: 'monthly', priority: '0.9' },
  { path: '/about/', changefreq: 'yearly', priority: '0.8' },
  { path: '/friends/', changefreq: 'yearly', priority: '0.6' },
];

/** 由 astro.config.mjs 的 site 生成，换域名不用再改这个文件 */
export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://me.lczhuigz.cn';
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${origin}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
