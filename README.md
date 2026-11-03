# lczhuigz · 个人主页

仿 [iBug](https://ibug.io/) 的内容结构（首页 / 关于 / 项目 / 友链），用 **Astro** 重写成现代视觉版本：
渐变光斑背景、玻璃拟态卡片、滚动入场动画、深浅色主题，全部是构建期生成的静态 HTML。

- 站点：`https://me.lczhuigz.cn`（域名可在两处修改，见下文）
- 技术栈：Astro 7 + 原生 CSS（无 Tailwind、无 UI 框架）+ 少量内联脚本
- 产物：`dist/`，纯静态，可直接丢到 GitHub Pages / Cloudflare Pages / Vercel

## 快速开始

```bash
npm install      # 安装依赖
npm run dev      # 本地开发，默认 http://localhost:4321
npm run build    # 构建到 dist/
npm run preview  # 本地预览构建产物（需要先 build）
npm run verify   # 逐页 / 逐主题 / 桌面+移动截图到 .shots/，并检查横向溢出
```

> 提示：如果 `pnpm` 因为 store 目录权限报 `ERR_PNPM_STORE_DIR_OPEN_OPERATION_LOCK`，
> 用 `npm install`，或 `pnpm install --store-dir .pnpm-store` 把 store 放进仓库目录。

`npm run verify` 需要本机装了 Chrome 或 Edge（用 `puppeteer-core` 驱动，不额外下载浏览器），
跑之前先 `npm run preview`。截图和检查结果都在 `.shots/`（已加入 .gitignore）。

## 目录结构

```
src/
├─ data/                 ← 想改内容，基本只动这里
│  ├─ site.ts            站点名、简介、社交链接、导航、统计、时间线
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
│  └─ 404.astro
└─ styles/global.css     设计令牌与全部样式（改配色从这里开始）
```

`public/` 里放着 `avatar.jpg`（头像）、`og.png`（社交分享图，1200×630，由
`python scripts/make-og.py` 生成）、`favicon.svg`、`CNAME`、`robots.txt`、`sitemap.xml`。

## 改成你自己的

1. **名字 / 简介 / 社交链接**：`src/data/site.ts`
2. **头像**：替换 `public/avatar.jpg`（当前是 GitHub 头像）
3. **项目**：`src/data/projects.ts`，`tone` 可选 `violet | cyan | pink | amber | lime`
4. **文章**：`src/data/posts.ts`（博客是独立 Hexo 站点，这里手填最近几篇）
5. **友链**：`src/data/friends.ts`
6. **主题色**：`src/styles/global.css` 里的 `--accent`、`--accent-2`、`--accent-3`
7. **域名**：`astro.config.mjs` 的 `site`、`public/CNAME`、`public/robots.txt`、`public/sitemap.xml`

## 部署到 GitHub Pages + 自有域名

1. 新建仓库（例如 `lczhuigz/homepage`），把本目录推上去，默认分支 `main`。
2. 仓库 → **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**。
   `.github/workflows/deploy.yml` 会在每次 push 后自动构建并发布。
3. 域名解析：添加一条 CNAME 记录
   `me` → `lczhuigz.github.io`（若用 Cloudflare 代理，把该记录设为「仅 DNS」或按需开橙云）。
4. Pages 设置里填 `me.lczhuigz.cn` 并勾选 **Enforce HTTPS**。
   `public/CNAME` 已经写好域名，构建后会自动出现在 `dist/` 根目录。

如果不想用自定义域名，改成项目路径部署：仓库名叫 `homepage` 时，
在 `astro.config.mjs` 里把 `base: '/homepage'` 打开，并把 `site` 改成
`https://lczhuigz.github.io`。

## 部署到 Cloudflare Pages（备选）

- Build command：`npm run build`
- Output directory：`dist`
- Node 版本：22

## 说明

版式结构参考 [iBug](https://ibug.io/)（[iBug-source](https://github.com/iBug/iBug-source)），
但代码是重新写的 Astro 实现，没有沿用其 Jekyll / Minimal Mistakes 主题。
本仓库代码可自由使用；站点内的文字与图片版权归 lczhuigz 所有。
