import github from './github-stats.json';

export type Stat = { value: string; label: string };

/** 博客是独立的 Hexo 站点，没有可用的 feed，这里手填文章总数 */
const BLOG_POSTS = 11;

const compact = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n);

/**
 * 首页数字面板。
 * 前三个来自 src/data/github-stats.json（由 scripts/fetch-stats.mjs 生成，
 * GitHub Actions 每天自动更新），改数据不要手改这个文件。
 */
export const stats: Stat[] = [
  { value: compact(github.repos), label: '个公开仓库' },
  { value: compact(github.stars), label: '个 Star' },
  { value: compact(github.followers), label: '位关注者' },
  { value: String(BLOG_POSTS), label: '篇博客文章' },
];

export const statsUpdatedAt = github.updatedAt;

export const statsUpdatedLabel = new Intl.DateTimeFormat('zh-CN', {
  dateStyle: 'medium',
  timeZone: 'Asia/Shanghai',
}).format(new Date(statsUpdatedAt));
