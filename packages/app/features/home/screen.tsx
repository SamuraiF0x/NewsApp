import { Articles, H4, LatestArticles, NewsTabs, XStack, useMedia } from "@my/ui";

export function HomeScreen() {
  const { md, gtMd } = useMedia();

  return (
    <>
      {gtMd && <H4>News</H4>}

      {md ? (
        <NewsTabs />
      ) : (
        <XStack f={1} w="100%" gap="$5">
          <Articles />
          <LatestArticles />
        </XStack>
      )}
    </>
  );
}
