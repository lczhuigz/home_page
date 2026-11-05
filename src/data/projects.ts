export type Project = {
  slug: string;
  title: string;
  /** 一句话定位 */
  subtitle: string;
  description: string;
  href?: string;
  repo?: string;
  /** 展示用的状态标签 */
  status?: string;
  tags: string[];
  /** 卡片渐变主题：violet / cyan / pink / amber / lime */
  tone: 'violet' | 'cyan' | 'pink' | 'amber' | 'lime';
  featured?: boolean;
  /** 卡片左上角的短标 */
  kicker: string;
};

export const projects: Project[] = [
  {
    slug: 'blog',
    title: 'lczhuigz 的博客',
    subtitle: '写下来的坑，下次就不用再踩',
    description:
      '基于 Hexo + Redefine 主题的中文技术博客。写过 WSL 迁移、麒麟系统装 JDK、VS Code 配 MinGW 这类「配置一次能省很多时间」的内容，也放一些随记和课程设计记录。',
    href: 'https://blog.lczhuigz.cn',
    status: '持续更新',
    tags: ['Hexo', 'Redefine', '写作'],
    tone: 'violet',
    featured: true,
    kicker: 'BLOG',
  },
  {
    slug: 'sports-page',
    title: '运动主页',
    subtitle: '把骑行数据从手机搬到网页上',
    description:
      'Fork 自 running_page，接了一条「小米运动健康 → Keep → GitHub Actions → 静态站」的数据链路，每次骑完车自动刷新轨迹、里程和年度统计，不用手动导表。',
    href: 'https://sports-page.lczhuigz.cn',
    repo: 'https://github.com/lczhuigz/running_page',
    status: '自动同步',
    tags: ['TypeScript', 'GitHub Actions', '数据可视化'],
    tone: 'cyan',
    featured: true,
    kicker: 'SPORTS',
  },
  {
    slug: 'imgbed',
    title: '自建图床',
    subtitle: '博客里的图，得有自己的地方放',
    description:
      '部署在 Cloudflare 上的 CloudFlare-ImgBed：图片直传、外链稳定、不占仓库体积。博客封面和正文配图基本都走这里。',
    href: 'https://cloudflare-imgbed.lczhuigz.cn',
    repo: 'https://github.com/lczhuigz/CloudFlare-ImgBed',
    status: '运行中',
    tags: ['Cloudflare', 'Workers', '文件托管'],
    tone: 'pink',
    featured: true,
    kicker: 'IMAGE',
  },
  {
    slug: 'gallery',
    title: '晴朗的日子',
    subtitle: '一些好看的照片',
    description: '相册站点，用来放随手拍的天空、街道和骑车路上遇到的光。',
    href: 'https://gallery.lczhuigz.cn',
    repo: 'https://github.com/lczhuigz/fine_weather_gallery',
    tags: ['相册', '前端'],
    tone: 'amber',
    kicker: 'GALLERY',
  },
  {
    slug: 'courses',
    title: '课程代码合集',
    subtitle: '数据结构、Java Web、Python、C/C++',
    description:
      '把课上敲的代码按语言分开收进仓库：数据结构作业、Java Web 实验、Python 练习，还有 cpp-learning 里的小栗子。',
    repo: 'https://github.com/lczhuigz?tab=repositories',
    tags: ['C', 'Java', 'Python', '课程'],
    tone: 'lime',
    kicker: 'COURSE',
  },
  {
    slug: 'mcu',
    title: '51 单片机课设',
    subtitle: '爱心流水灯 · 多功能数字钟',
    description:
      '用 STC89C52RC 做的两个课设：一个是爱心形状的 LED 流水灯，一个是带 LCD1602、DS1302、DS18B20 的数字钟。原理图和代码都写在博客里了。',
    href: 'https://blog.lczhuigz.cn/2025/08/29/love-flow-lamp/',
    tags: ['单片机', 'C', '电路'],
    tone: 'violet',
    kicker: 'MCU',
  },
];
