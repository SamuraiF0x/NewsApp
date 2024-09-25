export const BASE_URL = "https://newsapi.org/v2/top-headlines";
export const LATEST_BASE_URL = "https://newsapi.org/v2/everything";
export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
export const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY ?? "missing key";

if (!NEWS_API_KEY) {
  throw new Error("NEWS_API_KEY is not defined in environment variables");
}
