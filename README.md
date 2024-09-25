# News App

## 🛠️ Stack

Next.js + Tamagui + Solito + Typescript + NewsAPI

## 🚀 Installation

> [!CAUTION]
> Use `yarn`

```bash
yarn install
```

> [!IMPORTANT]
> Add your [NewsAPI key](https://newsapi.org/account) `.env.local` to `apps/next` folder:
> `NEXT_PUBLIC_NEWS_API_KEY=YOUR_NEWS_API_KEY`
> (or just add it to `packages/ui/src/constants/constants.ts`):
> `export const NEWS_API_KEY="YOUR_NEWS_API_KEY"`

To start dev:

```bash
cd apps/next && yarn run dev
```

## 📖 About

- The core functionality is handled by the `useArticles` hook, which fetches and manages article data from various categories. It implements features like pagination, deduplication, and debounced loading.
- The `getNews` function handles API calls with caching for efficiency.
- The `useBookmarkArticle` manages bookmarking functionality for news articles. It uses local storage to persist bookmarked articles across sessions. The hook checks if a given article is already saved, and provides a function to toggle its saved status. When the bookmark status changes, it updates both the local state and the storage.
- The code is structured to separate data fetching from UI rendering.
