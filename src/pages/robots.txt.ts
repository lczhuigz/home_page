import type { APIRoute } from 'astro';

/** 由 astro.config.mjs 的 site 生成，换域名不用再改这个文件 */
export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://me.lczhuigz.cn';
  const body = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
