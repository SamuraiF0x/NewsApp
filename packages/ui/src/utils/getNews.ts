import { BASE_URL, NEWS_API_KEY } from "../constants/constants";
import type { ArticleData, NewsAPIResponse } from "../types/article.type";
import type { ExcludedHomeEnum } from "../types/categories.type";
import { createCache } from "./cache";

const cache = createCache<ArticleData[]>();

export async function getNews(
  category: ExcludedHomeEnum,
  home: boolean,
  latest?: boolean,
  page?: number | null,
  search?: boolean
): Promise<ArticleData[]> {
  const cacheKey = `${category.toLowerCase()}-${home ? "limited" : "full"}-${page}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData;

  const url = new URL(BASE_URL);
  url.searchParams.append("country", "us");
  if (!search) url.searchParams.append("category", category.toLowerCase());
  if (search) url.searchParams.append("q", category);
  if (home || latest) url.searchParams.append("pageSize", latest ? "2" : "3");
  if (page) url.searchParams.append("page", page.toString());

  try {
    const res = await fetch(url.toString(), {
      headers: { "X-Api-Key": NEWS_API_KEY },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
    }

    const data: NewsAPIResponse = await res.json();

    const articles: ArticleData[] = data.articles.map((article) => ({
      id: `${article.publishedAt}-${article.title.slice(0, 20)}-${category}-${article.source.id}`,
      category: category,
      ...article,
    }));

    cache.set(cacheKey, articles);

    return articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}
