/**
 * 检查构建产物里的链接打开方式：
 *   - 站内链接（href 以 / 开头）不能带 target="_blank"
 *   - 站外链接（http/https）应该带 target="_blank" 和 rel=noopener
 *
 * 用法：node scripts/audit-links.mjs   （先 npm run build）
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const pages = walk(DIST).filter((file) => file.endsWith('.html'));
const problems = [];
let internal = 0;
let external = 0;

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const tag = match[0];
    const href = (tag.match(/href="([^"]*)"/i) ?? [, ''])[1];
    if (!href || href.startsWith('#') || href.startsWith('mailto:')) continue;

    const hasBlank = /target="_blank"/i.test(tag);
    const hasNoopener = /rel="[^"]*noopener/i.test(tag);
    const where = `${relative(DIST, file)} → ${href}`;

    if (href.startsWith('/')) {
      internal++;
      if (hasBlank) problems.push(`站内链接却新开标签页: ${where}`);
    } else if (/^https?:/i.test(href)) {
      external++;
      if (!hasBlank) problems.push(`站外链接没有新开标签页: ${where}`);
      if (!hasNoopener && hasBlank) problems.push(`站外链接缺少 noopener: ${where}`);
    }
  }
}

console.log(`检查了 ${pages.length} 个页面：站内链接 ${internal} 个，站外链接 ${external} 个`);
if (problems.length) {
  console.log(`\n发现 ${problems.length} 个问题：`);
  for (const line of problems) console.log(`  ✗ ${line}`);
  process.exitCode = 1;
} else {
  console.log('✓ 站内链接留在当前页，站外链接新开标签页，全部符合预期');
}
