import { LatestArticles, H4, Circle, XStack } from "@my/ui";

export function LatestNewsScreen() {
  return (
    <>
      <XStack ai="center" gap="$3" ml="$2">
        <Circle size={10} bg="$red11" shadowColor="$red11" shadowRadius="$2" />
        <H4>Latest news</H4>
      </XStack>
      <LatestArticles />
    </>
  );
}
