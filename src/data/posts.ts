export type Post = {
  title: string;
  href: string;
  date: string;
  summary: string;
  category: string;
};

/**
 * 首页「最近在写」区块的手工清单。
 * 博客是独立的 Hexo 站点，这里不做构建期抓取（避免构建依赖网络），
 * 写完新文章回来改这个数组即可。
 */
export const posts: Post[] = [
  {
    title: '国产银河麒麟操作系统安装 JDK',
    href: 'https://blog.lczhuigz.cn/2026/09/16/kylinos-install-jdk/',
    date: '2026-09-16',
    summary: '以 Oracle JDK 为例，记录 CPU 架构、版本号、安装路径的对应关系，以及 Linux 下大小写敏感带来的坑。',
    category: '银河麒麟操作系统',
  },
  {
    title: 'WSL 发行版安装后迁移到其他盘（完整指南）',
    href: 'https://blog.lczhuigz.cn/2026/06/22/wsl-migration-to-other-drive/',
    date: '2026-06-22',
    summary: 'ext4.vhdx 动辄几十 GB，把发行版整体搬到 D 盘的完整流程与注意事项。',
    category: 'WSL',
  },
  {
    title: '极速安装 Claude Code + CC-Switch，接入 DeepSeek V4',
    href: 'https://blog.lczhuigz.cn/2026/05/19/claude-code-access-deepseek/',
    date: '2026-05-19',
    summary: '用 Anthropic 兼容接口 + CC-Switch 可视化切换模型，全程 GUI，不手改 JSON。',
    category: '技术教程',
  },
  {
    title: '从小米运动健康到运动主页：骑行数据自动同步全攻略',
    href: 'https://blog.lczhuigz.cn/2026/05/14/xiaomi-keep-sports-page/',
    date: '2026-05-14',
    summary: '小米手环 → Keep → GitHub Actions 的数据链路怎么搭，以及踩过的坑。',
    category: '技术教程',
  },
  {
    title: 'GitHub 配置 SSH',
    href: 'https://blog.lczhuigz.cn/2025/11/15/Configure_SSH_on_Github/',
    date: '2025-11-15',
    summary: '检查已有密钥、生成新密钥、上传公钥、测试连接，一次讲清。',
    category: '技术教程',
  },
];
