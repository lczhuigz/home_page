import blog from './blog.json';

export type Post = {
  title: string;
  href: string;
  date: string;
  summary: string;
  category: string;
};

/**
 * 首页「最近在写」+ 统计面板里的文章数。
 * 数据由 scripts/fetch-blog.mjs 抓博客的 atom.xml 生成（src/data/blog.json），
 * 构建时不联网；想手动刷新就 `npm run blog`。
 */
export const posts: Post[] = blog.posts;

/** 博客文章总数（来自 feed 里的 entry 数量） */
export const postCount: number = blog.count;

/** 最新一篇的日期，YYYY-MM-DD */
export const latestPostDate: string | null = blog.latestAt;
