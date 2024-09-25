import { Frown } from "@tamagui/lucide-icons";
import { H4, XStack } from "tamagui";

export const NotFound = () => {
  return (
    <XStack ai="center" gap="$4" p="$4" theme="red" bg="$color5" br="$4">
      <Frown size="$2" col="$color11" />
      <H4 col="$color11">No articles found</H4>
    </XStack>
  );
};
