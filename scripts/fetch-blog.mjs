/**
 * 抓取博客 Atom feed，写入 src/data/blog.json
 *
 * 用法：
 *   node scripts/fetch-blog.mjs
 *   BLOG_FEED=https://blog.lczhuigz.cn/atom.xml node scripts/fetch-blog.mjs
 *
 * 在 .github/workflows/update-stats.yml 里和 fetch-stats.mjs 一起跑，
 * 有变化才写文件，然后 commit 触发 Vercel 重新部署。
 */
import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const FEED = process.env.BLOG_FEED ?? 'https://blog.lczhuigz.cn/atom.xml';
const OUT = 'src/data/blog.json';
const TAKE = 6;

const res = await fetch(FEED, {
  headers: { 'User-Agent': 'lczhuigz-homepage-blog', Accept: 'application/atom+xml, application/xml' },
});
if (!res.ok) throw new Error(`${FEED} -> ${res.status} ${res.statusText}`);

const xml = await res.text();

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

const decode = (text) =>
  text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (all, name) => ENTITIES[name.toLowerCase()] ?? all);

const stripTags = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' '),
  ).trim();

const pick = (block, tag) => {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return match ? match[1] : '';
};

/** feed 里是 UTC 时间，按北京时间取日期，和博客 URL 里的日期一致 */
const toDate = (iso) => {
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return '';
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(time));
};

const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)].map((match) => {
  const block = match[1];

  const title = stripTags(pick(block, 'title'));
  const link = (block.match(/<link[^>]*href="([^"]+)"/i) ?? [, ''])[1];
  const published = pick(block, 'published') || pick(block, 'updated');
  const updated = pick(block, 'updated') || published;

  const categories = [...block.matchAll(/<category[^>]*term="([^"]*)"[^>]*scheme="([^"]*)"/gi)];
  const category =
    categories.find(([, , scheme]) => scheme.includes('/categories/'))?.[1] ??
    categories[0]?.[1] ??
    '';

  const content = pick(block, 'content').replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '');
  let summary = stripTags(content);

  // 正文开头通常是 <h1> 标题，去掉重复的标题（含《》包裹的写法）
  for (const prefix of [title, `《${title}》`, `「${title}」`]) {
    if (prefix && summary.startsWith(prefix)) {
      summary = summary.slice(prefix.length).trim();
      break;
    }
  }

  summary = summary.slice(0, 110);

  return {
    title,
    href: link,
    date: toDate(published || updated),
    updated: toDate(updated || published),
    category: decode(category),
    summary: summary.length >= 110 ? `${summary}…` : summary,
  };
});

entries.sort((a, b) => b.date.localeCompare(a.date));

const data = {
  source: FEED,
  updatedAt: new Date().toISOString(),
  count: entries.length,
  latestAt: entries[0]?.date ?? null,
  posts: entries.slice(0, TAKE),
};

const before = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : null;
const changed =
  !before ||
  before.count !== data.count ||
  before.latestAt !== data.latestAt ||
  JSON.stringify(before.posts) !== JSON.stringify(data.posts);

if (changed) {
  writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`已更新 ${OUT}：${data.count} 篇文章，最新 ${data.latestAt}`);
} else {
  console.log('博客数据没有变化，跳过写入');
}
console.log(JSON.stringify({ ...data, posts: data.posts.map((p) => p.title) }, null, 2));
