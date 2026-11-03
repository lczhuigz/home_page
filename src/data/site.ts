/**
 * 站点唯一「配置中心」：改名字、简介、链接、导航都在这个文件里。
 */

export const site = {
  /** 站点域名，和 astro.config.mjs 里的 site 保持一致 */
  url: 'https://me.lczhuigz.cn',
  name: 'lczhuigz',
  /** 中文名 / 昵称，暂时留空则只显示 lczhuigz */
  nameZh: '',
  role: '计算机专业在读 · 什么都想试一点的折腾型选手',
  tagline: 'You Only Live Once —— 把折腾过的东西都留在这里。',
  description:
    'lczhuigz 的个人主页：一个爱折腾 Linux、单片机和前端的计算机专业学生。这里汇总我的项目、笔记与友链。',
  keywords: ['lczhuigz', '个人主页', '博客', 'Linux', '单片机', '前端', 'Astro'],
  locale: 'zh-CN',
  avatar: '/avatar.jpg',
  email: 'lczhuigz@163.com',
  github: 'https://github.com/lczhuigz',
  blogUrl: 'https://blog.lczhuigz.cn',
  sportsUrl: 'https://sports-page.lczhuigz.cn',
  /** 页脚备案号，留空则不显示 */
  icp: '',
  /** 站点从哪一年开始 */
  startYear: 2023,
} as const;

export type Social = {
  label: string;
  href: string;
  /** simple-icons 的图标名，例如 github / bilibili / gitee */
  icon: string;
  /** 可选：外链（默认 true） */
  external?: boolean;
};

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/lczhuigz', icon: 'github' },
  { label: '博客', href: 'https://blog.lczhuigz.cn', icon: 'hexo' },
  { label: '运动主页', href: 'https://sports-page.lczhuigz.cn', icon: 'strava' },
  { label: 'Bilibili', href: 'https://space.bilibili.com/1351041864', icon: 'bilibili' },
  { label: 'Gitee', href: 'https://gitee.com/lczhuigz', icon: 'gitee' },
  { label: 'GitCode', href: 'https://gitcode.com/lczhuigz', icon: 'git' },
  { label: '邮箱', href: 'mailto:lczhuigz@163.com', icon: 'mail', external: false },
];

export type NavItem = { label: string; href: string; external?: boolean; accent?: boolean };

/** 首屏只放最必要的几个，避免一行放不下换行 */
export const heroSocials: Social[] = socials.filter((s) => s.label !== '博客');

export const nav: NavItem[] = [
  { label: '首页', href: '/' },
  { label: '关于', href: '/about/' },
  { label: '项目', href: '/projects/' },
  { label: '友链', href: '/friends/' },
  { label: '博客', href: 'https://blog.lczhuigz.cn', external: true, accent: true },
];

/** 首屏滚动出现的关键词 */
export const rotatingWords = ['写代码', '折腾 Linux', '骑单车', '拆单片机', '拍照片'];

/** 首页数字面板 */
export const stats = [
  { value: '26', label: '个公开仓库' },
  { value: '11', label: '篇博客文章' },
  { value: '4', label: '个线上站点' },
  { value: '∞', label: '次重装系统' },
];

/** 跑马灯里的技能关键词 */
export const skillTicker = [
  'C', 'C++', 'Java', 'Python', 'HTML / CSS', 'JavaScript',
  'Linux', 'WSL', 'Docker', 'Git', 'MySQL', '51 单片机',
  'Astro', 'Hexo', 'Cloudflare', 'Nginx',
];

/** 关于页的「快问快答」 */
export const quickFacts = [
  { icon: 'linux', label: '主力桌面', value: 'Windows 11 + WSL2（Ubuntu）' },
  { icon: 'code', label: '常用编辑器', value: 'VS Code，偶尔 Neovim' },
  { icon: 'terminal', label: '第一门语言', value: 'C —— 从 51 单片机的点灯开始' },
  { icon: 'cloud', label: '部署习惯', value: 'Vercel + Cloudflare' },
  { icon: 'cpu', label: '在学什么', value: '数据结构、Java Web、计算机网络' },
  { icon: 'book', label: '副业爱好', value: '骑行、摄影、收集好用的命令行工具' },
];

/** 时间线：关于页 */
export const timeline = [
  {
    year: '2023',
    title: '注册 GitHub，开始攒代码',
    body: '把课程作业和练习从硬盘搬进仓库，第一次体会到 Git 的价值是在一次误删之后。',
  },
  {
    year: '2025',
    title: '博客上线',
    body: '用 Hexo + Redefine 搭起 blog.lczhuigz.cn，把环境配置、报错排查这些「下次还会用」的东西写下来。',
  },
  {
    year: '2026',
    title: '运动主页与图床',
    body: '基于 running_page 接上小米运动健康 → Keep → GitHub Actions 的数据链路，顺手用 Cloudflare 自建图床。',
  },
  {
    year: '现在',
    title: '就是这页',
    body: '用 Astro 把散落各处的站点、仓库和笔记收拢成一个入口。',
  },
];
