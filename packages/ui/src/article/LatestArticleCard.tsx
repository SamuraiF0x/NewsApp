import type { ArticleData } from "../types/article.type";
import { type ColorTokens, H4, Paragraph, YStack, XStack } from "tamagui";
import { useToastController } from "@tamagui/toast";
import { formatTime } from "../utils/formatDate";
import { findCategory } from "../constants/Categories";
import { Chip } from "../chip/Chip";

export const LatestArticleCard = ({ ...props }: ArticleData) => {
  const {
    title,
    publishedAt,
    category,
    url,
    source: { name: srcName },
  } = props;
  const formattedDate = formatTime(publishedAt);
  const { name, icon, color } = findCategory(category);

  const toast = useToastController();

  return (
    <YStack
      gap="$2"
      p="$2"
      br="$5"
      hoverStyle={{ bw: "$1", boc: `$${color}6` as ColorTokens }}
      enterStyle={{ y: 25 }}
      animation="quick"
      cursor="pointer"
      onPress={() => {
        toast.show("Opened article", {
          message: title.split("-")[0].trim(),
          customData: { theme: color, icon: icon, label: srcName },
        });
        window.open(url, "_blank");
      }}>
      <XStack ai="center" jc="space-between">
        <Paragraph fos="$1" lh="$2" theme="gray_alt1">
          {formattedDate}
        </Paragraph>
        <Chip size="$2" label={name} icon={icon} color={color} />
      </XStack>

      <H4 fos="$4" lh="$4" numberOfLines={2} ellipsizeMode="tail">
        {title}
      </H4>
    </YStack>
  );
};
