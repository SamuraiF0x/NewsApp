"use client";

import { useLink, usePathname } from "solito/navigation";
import {
  ScrollView,
  YStack,
  Paragraph,
  Circle,
  XStack,
  Button,
  Spinner,
  View,
  useMedia,
  useWindowDimensions,
} from "tamagui";
import { useArticles } from "../hooks/useArticles";
import { LatestArticleCard } from "./LatestArticleCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { RequestWarning } from "../RequestWarning";
import { useTimer } from "../hooks/useTimer";
import { NotFound } from "../NotFound";

export const LatestArticles = ({ currentTab }: { currentTab?: string }) => {
  const { md } = useMedia();
  const { height: screenHeight } = useWindowDimensions();

  const latest = true;
  const { articles, loadMore, error } = useArticles(latest);
  const { handleScroll, isLoading } = useInfiniteScroll(loadMore);
  const showNoArticles = useTimer();

  const linkProps = useLink({
    href: `/latest`,
  });

  const pathname = usePathname();
  const isLatestScreen = pathname === "/latest";

  const renderContent = () => {
    if (error) {
      return <RequestWarning />;
    }
    if (articles.length > 0) {
      return (
        <YStack
          h={isLatestScreen ? 475 : 500}
          w={isLatestScreen ? "100%" : 350}
          gap="$2"
          p="$2"
          $md={{ w: "100%", h: screenHeight ? screenHeight - 260 : 500, p: 0 }}
          elevation={md ? 0 : 1}
          br="$4">
          {!isLatestScreen && (
            <XStack ai="center" gap="$3" ml="$2">
              <Circle size={10} bg="$red11" shadowColor="$red11" shadowRadius="$2" />
              <Paragraph fow="bold">Latest news</Paragraph>
            </XStack>
          )}

          <ScrollView onScroll={handleScroll} scrollEventThrottle={500}>
            <YStack jc="center" gap="$1">
              {articles.map((article) => (
                <LatestArticleCard key={article.id} {...article} />
              ))}
            </YStack>

            <Paragraph fow="bold" col="$color8" als="center" mt="$2">
              {isLoading ? "Loading..." : "Scroll to load more"}
            </Paragraph>
          </ScrollView>
          {!isLatestScreen && !md && (
            <Button als="flex-end" color="$red11" cursor="pointer" {...linkProps}>
              See all news
            </Button>
          )}
        </YStack>
      );
    }
    if (showNoArticles) {
      return <NotFound />;
    }
    return (
      <View mt="$8">
        {(isLatestScreen || currentTab) && <Spinner size="large" color="$red11" />}
      </View>
    );
  };

  return <View $md={{ f: 1 }}>{renderContent()}</View>;
};
