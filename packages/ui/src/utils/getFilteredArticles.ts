import type { ArticleData } from "../types/article.type";

export const getFilteredArticles = (
  articlesByCategory: ArticleData[][],
  sort = false
): ArticleData[] => {
  return articlesByCategory
    .flat()
    .sort((a: ArticleData, b: ArticleData) => {
      return sort
        ? new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        : Math.random() - 0.5;
    })
    .filter((article) => article.title && !article.title.includes("Remove"));
};
