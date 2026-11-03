/**
 * 抓取 GitHub 统计并写入 src/data/github-stats.json
 *
 * 用法：
 *   node scripts/fetch-stats.mjs                 # 未认证，60 次/小时
 *   GITHUB_TOKEN=xxx node scripts/fetch-stats.mjs  # 认证后 5000 次/小时
 *
 * 在 GitHub Actions 里由 .github/workflows/update-stats.yml 每天跑一次，
 * 有变化就 commit，Vercel 会跟着那次 commit 重新部署。
 */
import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const USER = process.env.GITHUB_USER ?? 'lczhuigz';
const TOKEN = process.env.GITHUB_TOKEN ?? '';
const OUT = 'src/data/github-stats.json';

const headers = {
  'User-Agent': `${USER}-homepage-stats`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};
if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

async function api(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${path} -> ${res.status} ${res.statusText} ${body.slice(0, 200)}`);
  }
  return res.json();
}

/** 拉全部仓库（每页 100，最多 10 页，够用且不会失控） */
async function allRepos() {
  const repos = [];
  for (let page = 1; page <= 10; page++) {
    const batch = await api(`/users/${USER}/repos?per_page=100&page=${page}&sort=updated`);
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos;
}

const user = await api(`/users/${USER}`);
const repos = await allRepos();

const own = repos.filter((r) => !r.fork);
const stars = own.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);
const forks = own.reduce((sum, r) => sum + (r.forks_count ?? 0), 0);

const langCount = new Map();
for (const repo of own) {
  if (!repo.language) continue;
  langCount.set(repo.language, (langCount.get(repo.language) ?? 0) + 1);
}
const topLanguages = [...langCount.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([name, count]) => ({ name, count }));

const lastPush = own
  .map((r) => r.pushed_at)
  .filter(Boolean)
  .sort()
  .at(-1);

const data = {
  user: USER,
  updatedAt: new Date().toISOString(),
  repos: user.public_repos ?? own.length,
  followers: user.followers ?? 0,
  following: user.following ?? 0,
  stars,
  forks,
  topLanguages,
  lastPush: lastPush ?? null,
  reposScanned: own.length,
};

// 只在数据真的变了才写文件，避免每天的 commit 只有时间戳变化
const before = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : null;
const changed =
  !before ||
  ['repos', 'followers', 'following', 'stars', 'forks', 'lastPush'].some(
    (k) => before[k] !== data[k],
  );

if (changed) {
  writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`已更新 ${OUT}`);
} else {
  console.log('统计没有变化，跳过写入');
}
console.log(JSON.stringify(data, null, 2));
