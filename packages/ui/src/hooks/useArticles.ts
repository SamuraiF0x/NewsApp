import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import type { ArticleData } from "../types/article.type";
import { CategoryEnum, ExcludedHomeEnum } from "../types/categories.type";
import { getNews } from "../utils/getNews";
import { getFilteredArticles } from "../utils/getFilteredArticles";
import { useParams, usePathname } from "solito/navigation";
import { debounce } from "tamagui";

export const useArticles = (latest = false) => {
  const [page, setPage] = useState<number | null>(null);
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [error, setError] = useState("");
  const articleIdsSet = useRef(new Set<string>());
  const isFetchingRef = useRef(false);
  const pathname = usePathname();
  const { id: category } = useParams<{ id: ExcludedHomeEnum }>();

  const filteredCategories = useMemo(() => {
    // Specific category
    if (category) {
      return [category as ExcludedHomeEnum];
    }
    // Home category
    return Object.values(CategoryEnum).filter(
      (cat): cat is ExcludedHomeEnum => cat !== CategoryEnum.Home
    );
  }, [category]);

  const fetchArticles = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      const articlePromises = filteredCategories.map((keyword) =>
        getNews(keyword, !category, latest, page, pathname?.startsWith("/search"))
      );
      const articlesByCategory = await Promise.all(articlePromises);
      const newArticles = getFilteredArticles(articlesByCategory, latest);
      const uniqueNewArticles = newArticles.filter((article) => {
        if (!articleIdsSet.current.has(article.id)) {
          articleIdsSet.current.add(article.id);
          return true;
        }
        return false;
      });

      setArticles((prevArticles) => [...prevArticles, ...uniqueNewArticles]);
    } catch (error) {
      setError(error);
      console.error("Error fetching news:", error);
    } finally {
      isFetchingRef.current = false;
    }
  }, [filteredCategories, page, category]);

  useEffect(() => {
    if (pathname !== "/favorites") fetchArticles();
  }, [fetchArticles, category]);

  useEffect(() => {
    if (pathname === "/favorites") {
      const savedArticles = JSON.parse(localStorage.getItem("articles") || "[]");
      setArticles(savedArticles);
    }
  }, [pathname]);

  const debouncedLoadMore = useCallback(
    debounce(() => {
      if (!isFetchingRef.current) {
        setPage((prevPage) => (prevPage !== null ? prevPage + 1 : 1));
      }
    }, 50),
    []
  );

  const loadMore = useCallback(() => {
    return new Promise<void>((resolve) => {
      debouncedLoadMore();
      resolve();
    });
  }, [debouncedLoadMore]);

  return { articles, loadMore, error };
};
