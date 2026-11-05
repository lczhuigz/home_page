/**
 * 站点唯一「配置中心」：改名字、简介、链接、导航都在这个文件里。
 */

export const site = {
  /** 站点域名，和 astro.config.mjs 里的 site 保持一致 */
  url: 'https://me.lczhuigz.cn',
  name: 'lczhuigz',
  /** 中文名 / 昵称，留空则页面上只显示 lczhuigz */
  nameZh: '',
  role: '计算机科学与技术在读 · 嵌入式与 FPGA 方向',
  tagline: 'You Only Live Once —— 把折腾过的东西都留在这里。',
  motto: '知行合一，止于至善',
  description:
    '段辉园（lczhuigz）的个人主页：计算机科学与技术专业在读，方向是嵌入式与 FPGA。记录 C/C++、单片机、FPGA 与硬件调试，也写 Linux 和前端折腾笔记。',
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

/** 页面上优先展示中文名，没填就退回 lczhuigz */
export const displayName = site.nameZh || site.name;

/** 「段辉园（lczhuigz）」这种中英并排的写法，用于自我介绍和友链信息 */
export const fullName = site.nameZh ? `${site.nameZh}（${site.name}）` : site.name;

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
  { label: '抖音', href: 'https://www.douyin.com/user/MS4wLjABAAAAqf_sgaer0yOK3WFpoxUuIDXEmaOxOe-nB3JQRYKV2ALPnp0nRjZO-jBp3vc0PKph', icon: 'tiktok'},
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

/** 跑马灯里的技能关键词 */
export const skillTicker = [
  'C', 'C++', 'Python', 'Verilog', 'STM32', 'ESP32', 'FPGA',
  'Keil', 'STM32CubeMX', 'Git', 'Linux / WSL', 'Docker',
  'I2C / SPI / UART / CAN', 'Hexo', 'Cloudflare', 'Astro',
];

/** 关于页的「快问快答」 */
export const quickFacts = [
  { icon: 'book', label: '现在在读', value: '湖北文理学院理工学院' },
  { icon: 'code', label: '专业', value: '计算机科学与技术（专升本）' },
  { icon: 'terminal', label: '主力语言', value: 'C / C++，Python 辅助' },
  { icon: 'cpu', label: '硬件平台', value: 'STM32 / ESP32，正在学 FPGA' },
  { icon: 'layers', label: '常用工具', value: 'Keil、STM32CubeMX、VS Code、Git' },
  { icon: 'spark', label: '信条', value: '知行合一，止于至善' },
];

/** 学历：关于页 */
export const education = [
  {
    status: '在读',
    school: '湖北文理学院理工学院',
    major: '计算机科学与技术（专升本）',
    note: '正在补数据结构与算法、操作系统原理、计算机网络这些计算机基础。',
  },
  {
    status: '已毕业',
    school: '湖北三峡职业技术大学',
    major: '电子信息工程技术',
    note: '在这里第一次把代码烧进单片机，也第一次意识到硬件和软件之间只隔着一层寄存器。',
  },
];

/** 技术栈：关于页 */
export const techStack = [
  {
    title: '编程语言',
    items: ['C / C++', 'Python', 'Verilog', 'SQL'],
  },
  {
    title: '嵌入式与硬件',
    items: ['STM32', 'ESP32', '传感器驱动', 'I2C / SPI / UART / CAN'],
  },
  {
    title: '工具链',
    items: ['Keil', 'STM32CubeMX', 'VS Code', 'Git', '示波器 / 万用表'],
  },
  {
    title: '正在补的课',
    items: ['数据结构与算法', '操作系统原理', '计算机网络', 'FPGA 时序'],
  },
];

/** 荣誉与奖项：关于页 */
export const awards = [
  { year: '2026', title: '湖北省职业院校技能大赛 · 集成电路与电器赛道三等奖' },
  {
    year: '2025',
    title: '“中银杯”湖北省职业院校技能大赛 · 智能电子产品设计与开发赛项（推荐队）三等奖',
  },
  { year: '2025', title: '中国国际大学生创新大赛湖北省复赛 · 职教赛道铜奖' },
  { year: '2025', title: '第十七届感恩征文活动二等奖' },
  { year: '2025', title: '“三职星青年”提名奖' },
  {
    year: '2024–2025',
    title: '国家奖学金',
  },
  {
    year: '2024 / 2025',
    title: '一带一路暨金砖国家技能发展与技术创新大赛 · 决赛二等奖',
  },
  { year: '2024', title: '一带一路暨金砖国家技能发展与技术创新大赛 · 选拔赛优秀奖' },
  { year: '2023–2024', title: '国家励志奖学金、院级优秀学生' },
  {
    year: '报道',
    title: '《宜昌综合》对参赛经历的事迹报道',
    href: 'https://nginx-sxrmtzx.sxrmapp.cn3x.com.cn/sxrmtzx/site1/m/c175/a952597.html',
  },
];

/** 证书：关于页 */
export const certificates = [
  '全国计算机等级考试 二级（C 语言）',
  '全国计算机等级考试 一级（成绩优秀）',
  '特种作业操作证（电工，三级）',
  '机动车驾驶证 C1',
];

/** 博客里写什么：关于页 */
export const blogTopics = [
  { label: '技术解析', note: 'C/C++、外设驱动、RTOS 原理' },
  { label: '项目实战', note: '嵌入式项目的开发日志' },
  { label: '效率工具', note: '开发与学习的工作流' },
  { label: '碎片思考', note: '读书、看文章后的随想' },
];

/** 时间线：关于页 */
export const timeline = [
  {
    year: '2023',
    title: '注册 GitHub，开始攒代码',
    body: '把课程作业和练习从硬盘搬进仓库，第一次体会到 Git 的价值是在一次误删之后。',
  },
  {
    year: '2024–2025',
    title: '竞赛与奖学金',
    body: '金砖国家技能大赛、湖北省职业院校技能大赛、大学生创新大赛陆续有了结果，也拿到了国家奖学金。',
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
    year: '2026',
    title: '专升本，继续往上补',
    body: '从电子信息工程技术转到计算机科学与技术，一边补数据结构与操作系统，一边把嵌入式项目做深。',
  },
  {
    year: '现在',
    title: '就是这页',
    body: '用 Astro 把散落各处的站点、仓库和笔记收拢成一个入口。',
  },
];
