# lczhuigz · 个人主页

仿 [iBug](https://ibug.io/) 的内容结构（首页 / 关于 / 项目 / 友链），用 **Astro** 重写成现代视觉版本：
渐变光斑背景、玻璃拟态卡片、滚动入场动画、深浅色主题，全部是构建期生成的静态 HTML。

- 站点：`https://me.lczhuigz.cn`（域名只配一处：`astro.config.mjs` 的 `site`，可用 `SITE_URL` 环境变量覆盖）
- 技术栈：Astro 7 + 原生 CSS（无 Tailwind、无 UI 框架）+ 少量内联脚本
- 产物：`dist/`，纯静态，直接部署到 **Vercel**（也兼容 Cloudflare Pages / Netlify）

## 快速开始

```bash
npm install      # 安装依赖
npm run dev      # 本地开发，默认 http://localhost:4321
npm run build    # 构建到 dist/
npm run preview  # 本地预览构建产物（需要先 build）
npm run verify   # 逐页 / 逐主题 / 桌面+移动截图到 .shots/，并检查横向溢出
npm run stats    # 手动刷新 GitHub 统计（仓库数 / Star / 关注者）
```

> 提示：如果 `pnpm` 因为 store 目录权限报 `ERR_PNPM_STORE_DIR_OPEN_OPERATION_LOCK`，
> 用 `npm install`，或 `pnpm install --store-dir .pnpm-store` 把 store 放进仓库目录。

`npm run verify` 需要本机装了 Chrome 或 Edge（用 `puppeteer-core` 驱动，不额外下载浏览器），
跑之前先 `npm run preview`。截图和检查结果都在 `.shots/`（已加入 .gitignore）。

## 目录结构

```
src/
├─ data/                 ← 想改内容，基本只动这里
│  ├─ site.ts            站点名、简介、社交链接、导航、时间线
│  ├─ stats.ts           首页数字面板（读 github-stats.json）
│  ├─ github-stats.json  GitHub 统计快照，自动生成，不要手改
│  ├─ projects.ts        项目卡片（标题 / 描述 / 标签 / 主题色）
│  ├─ posts.ts           「最近在写」的文章清单
│  └─ friends.ts         友链与灵感来源
├─ layouts/Base.astro    <head>、SEO、导航、页脚、全局脚本
├─ components/
│  ├─ Nav.astro          吸顶导航 + 移动端抽屉
│  ├─ Footer.astro       页脚
│  ├─ Backdrop.astro     光斑 / 网格 / 噪点背景
│  ├─ Icon.astro         品牌图标（simple-icons）+ 手写描边图标
│  └─ ProjectCard.astro  项目卡片
├─ pages/
│  ├─ index.astro        首页：首屏 / 数字面板 / 项目 / 文章 / 关于
│  ├─ about.astro        关于：自我介绍 / 快问快答 / 技能 / 时间线
│  ├─ projects.astro     全部项目 + 仓库清单
│  ├─ friends.astro      友链 + 申请友链
│  ├─ robots.txt.ts      robots.txt（按站点域名生成）
│  ├─ sitemap.xml.ts     sitemap.xml（按站点域名生成）
│  └─ 404.astro
└─ styles/global.css     设计令牌与全部样式（改配色从这里开始）

scripts/
├─ fetch-stats.mjs       抓 GitHub 统计 → src/data/github-stats.json
├─ make-og.py            生成 public/og.png 分享图
└─ verify.mjs            截图 + 横向溢出检查
```

`public/` 里只放静态资源：`avatar.jpg`（头像）、`og.png`（社交分享图，1200×630，由
`python scripts/make-og.py` 生成）、`favicon.svg`、`grain.svg`（噪点纹理）。
`robots.txt` 和 `sitemap.xml` 不是静态文件，而是由 `src/pages/robots.txt.ts`、
`src/pages/sitemap.xml.ts` 在构建时按站点域名生成。

## 改成你自己的

1. **名字 / 简介 / 社交链接**：`src/data/site.ts`
2. **头像**：替换 `public/avatar.jpg`（当前是 GitHub 头像）
3. **项目**：`src/data/projects.ts`，`tone` 可选 `violet | cyan | pink | amber | lime`
4. **文章**：`src/data/posts.ts`（博客是独立 Hexo 站点，这里手填最近几篇）
5. **友链**：`src/data/friends.ts`
6. **主题色**：`src/styles/global.css` 里的 `--accent`、`--accent-2`、`--accent-3`
7. **域名**：只改 `astro.config.mjs` 的 `site`（或在 Vercel 里设 `SITE_URL` 环境变量）。
   canonical、`og:url`、`robots.txt`、`sitemap.xml` 全都会跟着变，不用再动别的文件。

## 首页统计怎么来的

数字面板的三个数字（公开仓库 / Star / 关注者）不是手写的，链路是：

```
.github/workflows/update-stats.yml（每天 UTC 02:10 + 可手动触发）
  → node scripts/fetch-stats.mjs（GitHub REST API，用仓库自带 token，5000 次/小时）
  → 有变化才写 src/data/github-stats.json
  → bot commit 推回 main
  → Vercel 检测到新 commit，自动重新部署
```

- 本地想立刻刷新：`npm run stats`（未认证 60 次/小时，只够一次手动跑）
- 面板下方会显示「数据更新于 X 年 X 月 X 日」，数据新鲜度一眼可见
- 「篇博客文章」因为博客是独立 Hexo 站点且没有 feed，仍然手填，
  改 `src/data/stats.ts` 里的 `BLOG_POSTS` 即可

> **为什么不构建时直接抓？** 每次部署都依赖 GitHub API：Vercel 构建机 IP 共享，
> 未认证只有 60 次/小时，容易 403；国内本地构建也可能超时。
> 把抓取放到 Actions、结果进仓库后，构建是零网络依赖的，历史也能 review。

> 如果你给 `main` 开了分支保护（要求 PR），bot 的直推会被拒；两种解法：
> 关掉「Include administrators」那条限制，或者让 workflow 开 PR 而不是直推。

## 部署到 Vercel

### 方式一：网页导入（推荐）

1. 把仓库推到 GitHub（例如 `lczhuigz/homepage`），默认分支 `main`。
2. 打开 [vercel.com/new](https://vercel.com/new)，**Import Git Repository**，选中该仓库。
3. 框架会被识别为 **Astro**，保持默认即可：
   - Framework Preset：`Astro`
   - Build Command：`npm run build`
   - Output Directory：`dist`
   - Install Command：`npm install`
   - Node 版本：`22.x`（Project → Settings → General → Node.js Version）
4. 点 **Deploy**，首次会拿到 `xxx.vercel.app` 的地址。
5. **绑定域名**：Project → Settings → Domains → 添加 `me.lczhuigz.cn`，
   Vercel 会列出需要配置的 DNS 记录，在域名商（或 Cloudflare）那里加：

   | 类型 | 名称 | 值 |
   |---|---|---|
   | CNAME | `me` | `cname.vercel-dns.com` |

   > 域名托管在 Cloudflare 时：加完记录可以保持「仅 DNS」（灰云）；
   > 想开橙云就把 SSL/TLS 设成 Full (strict)，避免重定向循环。Vercel 会自动签发证书。
6. **设置环境变量 `SITE_URL`**（Project → Settings → Environment Variables）：
   `SITE_URL=https://me.lczhuigz.cn`，然后 **Redeploy** 一次，
   让 canonical / sitemap / robots 用正式域名（不设则用 `astro.config.mjs` 里的默认值）。

### 方式二：命令行

```bash
npm i -g vercel
vercel login
vercel            # 首次会问项目配置，全部回车用默认值即可
vercel --prod     # 发布到生产环境
```

### 每次更新

`git push` 到 `main` 会自动触发构建发布；其他分支和 PR 会生成 Preview 地址。

## 换到别的平台

- **Cloudflare Pages**：Build command `npm run build`，Output directory `dist`，Node 22。
- **Netlify**：同上，界面里填即可，不需要额外的配置文件。

产物是纯 HTML / CSS / JS，没有服务端依赖，任何静态托管都能用。

## 说明

版式结构参考 [iBug](https://ibug.io/)（[iBug-source](https://github.com/iBug/iBug-source)），
但代码是重新写的 Astro 实现，没有沿用其 Jekyll / Minimal Mistakes 主题。
本仓库代码可自由使用；站点内的文字与图片版权归 lczhuigz 所有。
