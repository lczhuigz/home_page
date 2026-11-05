/**
 * 开发期视觉验收脚本（不参与构建）：
 *   node scripts/verify.mjs [http://localhost:4321]
 *
 * - 逐页、逐主题、逐视口截图到 .shots/
 * - 输出每页的 scrollWidth / innerWidth，并列出造成横向溢出的元素
 */
import { mkdirSync } from 'node:fs';
import { existsSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const BASE = process.argv[2] ?? 'http://localhost:4321';
const OUT = '.shots';
mkdirSync(OUT, { recursive: true });

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => existsSync(p));

if (!CHROME) {
  console.error('没有找到 Chrome / Edge 可执行文件');
  process.exit(1);
}

const pages = [
  ['home', '/'],
  ['about', '/about/'],
  ['projects', '/projects/'],
  ['friends', '/friends/'],
  ['notfound', '/404.html'],
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  userDataDir: '.chrome-profile-puppeteer',
  args: ['--hide-scrollbars', '--no-first-run', '--no-default-browser-check'],
});

const report = [];

for (const [theme, size, suffix] of [
  ['dark', { width: 1440, height: 900 }, 'desktop'],
  ['light', { width: 1440, height: 900 }, 'desktop-light'],
  ['dark', { width: 414, height: 844 }, 'mobile'],
]) {
  const page = await browser.newPage();
  await page.setViewport({ ...size, deviceScaleFactor: 1 });

  for (const [name, path] of pages) {
    if (suffix === 'mobile' && !['home', 'projects', 'about'].includes(name)) continue;

    await page.evaluateOnNewDocument((t) => {
      try {
        localStorage.setItem('theme', t);
      } catch {}
    }, theme);

    await page.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 30000 });

    // 逐屏滚动，触发 IntersectionObserver 的入场动画，再回到顶部
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = 'auto';
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 1200));
    });

    const metrics = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const offenders = [];
      if (docW > winW + 1) {
        for (const el of Array.from(document.querySelectorAll('body *'))) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (r.right > winW + 1 || r.left < -1) {
            offenders.push({
              tag: el.tagName.toLowerCase(),
              cls: (el.className || '').toString().slice(0, 60),
              left: Math.round(r.left),
              right: Math.round(r.right),
            });
          }
        }
      }
      const unrevealed = Array.from(document.querySelectorAll('.reveal')).filter(
        (el) => !el.classList.contains('is-in'),
      ).length;
      return { docW, winW, offenders: offenders.slice(0, 8), unrevealed };
    });

    const file = `${OUT}/${name}-${suffix}.png`;
    await page.screenshot({ path: file, fullPage: true });
    report.push({ name, suffix, ...metrics, file });
    console.log(
      `${name.padEnd(9)} ${suffix.padEnd(12)} doc=${metrics.docW} win=${metrics.winW} ` +
        `未入场=${metrics.unrevealed} 溢出元素=${metrics.offenders.length}`,
    );
    if (metrics.offenders.length) {
      for (const o of metrics.offenders) {
        console.log(`   ↳ ${o.tag}.${o.cls} [${o.left} → ${o.right}]`);
      }
    }
  }

  await page.close();
}

await browser.close();

const bad = report.filter((r) => r.docW > r.winW + 1 || r.unrevealed > 0);
console.log(bad.length ? `\n有 ${bad.length} 项需要检查` : '\n全部页面通过：无横向溢出，入场动画均已完成');
