import { useState, useEffect } from "react";
import { ArticleData } from "../types/article.type";

export const useBookmarkArticle = (article: ArticleData) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem("articles") || "[]");
    const articleIsSaved = savedArticles.some((savedArticle) => savedArticle.id === article.id);
    setIsSaved(articleIsSaved);
  }, [article.id]);

  const handleBookmarkArticle = (e) => {
    e.stopPropagation();

    const savedArticles = JSON.parse(localStorage.getItem("articles") || "[]");
    const articleIndex = savedArticles.findIndex((savedArticle) => savedArticle.id === article.id);

    if (articleIndex !== -1) {
      savedArticles.splice(articleIndex, 1);
      setIsSaved(false);
    } else {
      savedArticles.push(article);
      setIsSaved(true);
    }

    localStorage.setItem("articles", JSON.stringify(savedArticles));
  };

  return { isSaved, handleBookmarkArticle };
};
