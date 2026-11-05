/**
 * 链接打开方式的统一约定：
 * - 站内页面（关于 / 项目 / 友链…）：当前标签页跳转
 * - 站外链接（博客、GitHub、友链站点…）：新标签页，带 noopener noreferrer
 */

export const externalAttrs = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** 明确标了 external: true 才新开标签页（导航这类默认站内的链接用） */
export const attrsFor = (isExternal: boolean | undefined) =>
  isExternal ? externalAttrs : {};

/** 默认新开标签页，只有显式 external: false 才留在当前页（社交账号、mailto 用） */
export const attrsForSocial = (isExternal: boolean | undefined) =>
  isExternal === false ? {} : externalAttrs;
