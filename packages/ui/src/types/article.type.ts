import { ExcludedHomeEnum } from "./categories.type";

export interface Source {
  id: string | null;
  name: string;
}

export interface Article {
  source: Source;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface ArticleData extends Article {
  id: string;
  category: ExcludedHomeEnum;
}
