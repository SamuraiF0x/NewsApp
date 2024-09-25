"use client";

import { Spinner, View, XStack } from "tamagui";
import { ArticleCard } from "./ArticleCard";
import { useTimer } from "../hooks/useTimer";
import { useArticles } from "../hooks/useArticles";
import { RequestWarning } from "../RequestWarning";
import { NotFound } from "../NotFound";

export const Articles = () => {
  const { articles, error } = useArticles();
  const showNoArticles = useTimer();

  const renderContent = () => {
    if (error) {
      return <RequestWarning />;
    }
    if (articles.length > 0) {
      return (
        <XStack fw="wrap" jc="center" gap="$4.5">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </XStack>
      );
    }
    if (showNoArticles) {
      return <NotFound />;
    }
    return (
      <View mt="$8">
        <Spinner size="large" color="$red11" />
      </View>
    );
  };

  return <View f={1}>{renderContent()}</View>;
};
