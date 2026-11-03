import github from './github-stats.json';
import { postCount } from './posts';

export type Stat = { value: string; label: string };

const compact = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n);

/**
 * 首页数字面板，全部来自自动抓取的数据：
 * - 仓库 / Star / 关注者：src/data/github-stats.json（scripts/fetch-stats.mjs）
 * - 博客文章数：src/data/blog.json（scripts/fetch-blog.mjs，数 atom.xml 的 entry）
 * 两者都由 GitHub Actions 每天更新，不要手改这些 JSON。
 */
export const stats: Stat[] = [
  { value: compact(github.repos), label: '个公开仓库' },
  { value: compact(github.stars), label: '个 Star' },
  { value: compact(github.followers), label: '位关注者' },
  { value: compact(postCount), label: '篇博客文章' },
];

export const statsUpdatedAt = github.updatedAt;

export const statsUpdatedLabel = new Intl.DateTimeFormat('zh-CN', {
  dateStyle: 'medium',
  timeZone: 'Asia/Shanghai',
}).format(new Date(statsUpdatedAt));
