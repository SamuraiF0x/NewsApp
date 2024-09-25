import type { ArticleData } from "../types/article.type";
import { Heart } from "@tamagui/lucide-icons";

import {
  Card,
  type ColorTokens,
  H4,
  Paragraph,
  YStack,
  XStack,
  Button,
  View,
  ThemeName,
} from "tamagui";
import { useToastController } from "@tamagui/toast";
import { formatDate } from "../utils/formatDate";
import { findCategory } from "../constants/Categories";
import { Chip } from "../chip/Chip";
import { ArticleHeader } from "./ArticleHeader";
import { useBookmarkArticle } from "../hooks/useBookmarkArticle";

export const ArticleCard = ({ ...props }: ArticleData) => {
  const {
    description,
    urlToImage,
    title,
    author,
    publishedAt,
    category,
    url,
    source: { name: srcName },
  } = props;

  const formattedDate = formatDate(publishedAt);
  const displayedAuthors = author?.split(",").slice(0, 2).join(", ");
  const { name, icon, color } = findCategory(category);

  const toast = useToastController();

  const { isSaved, handleBookmarkArticle } = useBookmarkArticle(props);

  return (
    <View theme={color as ThemeName}>
      <Card
        group
        elevate
        size="$4"
        bordered
        h="100%"
        maw={350}
        mah={400}
        $lg={{ w: 300, h: 350 }}
        bg="$color1"
        hoverStyle={{ elevation: "$2", boc: `$${color}8` as ColorTokens }}
        enterStyle={{ y: -5 }}
        animation="quick"
        cursor="pointer"
        onPress={() => {
          toast.show("Opened article", {
            message: title.split("-")[0].trim(),
            customData: { theme: color, icon: icon, label: srcName },
          });
          window.open(url, "_blank");
        }}>
        <Card.Header padded p={0} mb="$3">
          <ArticleHeader description={description} urlToImage={urlToImage} />
        </Card.Header>

        <YStack px="$5">
          <XStack ai="center" jc="space-between">
            <H4 fos="$1" theme="gray_alt1">
              {formattedDate}
            </H4>

            <View theme={isSaved ? "red" : "gray"}>
              <Button
                circular
                size="$3"
                icon={<Heart />}
                scaleIcon={1.25}
                color="$color11"
                bg="$color6"
                onPress={handleBookmarkArticle}
                pressStyle={{ scale: 1.1 }}
                animation="100ms"
              />
            </View>
          </XStack>

          <H4 fos="$6" lh="$2" numberOfLines={3} ellipsizeMode="tail" $xl={{ fos: "$4" }}>
            {title}
          </H4>
        </YStack>

        <Card.Footer padded ai="center" jc="space-between" gap="$2">
          <Paragraph theme="gray_alt1" numberOfLines={1} ellipsizeMode="tail" $lg={{ fos: "$2" }}>
            {displayedAuthors}
          </Paragraph>
          <Chip label={name} icon={icon} color={color} />
        </Card.Footer>
      </Card>
    </View>
  );
};
