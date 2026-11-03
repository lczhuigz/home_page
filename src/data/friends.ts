export type Friend = {
  name: string;
  href: string;
  description: string;
  avatar?: string;
  group: '一直联系' | '经常串门';
};

/**
 * 友链。头像直接用对方站点的图片地址，
 * 加载失败时会自动退化成「首字母色块」。
 */
export const friends: Friend[] = [
  {
    name: "Jun_XiaoBu'blog",
    href: 'https://jun-xiaobu.github.io/',
    description: 'Let life take me where it may.',
    avatar: 'https://jun-xiaobu.github.io/images/Icon/logo.jpg',
    group: '一直联系',
  },
  {
    name: 'Zarijaden Blog',
    href: 'https://zarijaden.cc.cd/',
    description: '万物可爱，生活明朗',
    avatar: 'https://zarijaden.cc.cd/images/logo.jpg',
    group: '一直联系',
  },
  {
    name: 'KOK.PLUS',
    href: 'https://kok.plus/',
    description: '说心里的话，读喜欢的书，论身边的事，走自己的路。',
    avatar: 'https://kok.plus/images/tx.jpeg',
    group: '经常串门',
  },
  {
    name: '冠恩书屋',
    href: 'https://guanen.top/',
    description: '让美好有迹可循 · 爱你们',
    avatar: 'https://guanen.top/assets/images/autumn-rose.webp',
    group: '经常串门',
  },
];

/** 灵感来源，单独列在「参考」区 */
export const inspirations = [
  { name: 'iBug', href: 'https://ibug.io/', note: '这个主页的版式与内容结构参考' },
  { name: 'Hexo', href: 'https://hexo.io/', note: '博客框架' },
  { name: 'Redefine', href: 'https://github.com/EvanNotFound/hexo-theme-redefine', note: '博客主题' },
  { name: 'running_page', href: 'https://github.com/yihong0618/running_page', note: '运动主页的源头项目' },
];
