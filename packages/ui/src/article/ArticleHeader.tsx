import { Suspense } from "react";
import { Image, Paragraph, Spinner, View, YStack } from "tamagui";
import { Article } from "../types/article.type";

const FallbackComponent = ({ loading = true }: { loading?: boolean }) => {
  return (
    <YStack ai="center" jc="center">
      <Image
        source={{ uri: "./banner.png" }}
        height={175}
        alignSelf="stretch"
        objectFit="contain"
        // resizeMode="contain"
      />
      {loading && (
        <View pos="absolute">
          <Spinner size="small" />
        </View>
      )}
    </YStack>
  );
};

export const ArticleHeader = ({
  description,
  urlToImage,
}: Pick<Article, "description" | "urlToImage">) => {
  return (
    <View
      fd="column"
      br="$3"
      overflow="hidden"
      $group-hover={{ bblr: "$10", bbrr: "$10" }}
      $group-press={{ bblr: "$10", bbrr: "$10" }}
      animation="quick">
      <Suspense fallback={<FallbackComponent />}>
        {urlToImage ? (
          <View enterStyle={{ y: -15, opacity: 0 }} animation="quick">
            <Image
              source={{ uri: urlToImage }}
              height={175}
              alignSelf="stretch"
              objectFit="cover"
              // resizeMode="contain"
            />
          </View>
        ) : (
          <FallbackComponent loading={false} />
        )}
      </Suspense>

      {description !== undefined && (
        <View
          f={1}
          w="100%"
          h="100%"
          ai="center"
          jc="center"
          pos="absolute"
          $group-hover={{
            backdropFilter: "blur(15px)",
            bg: "$background05",
          }}
          $group-press={{
            backdropFilter: "blur(15px)",
            bg: "$background05",
          }}
          animation="medium">
          <Paragraph
            h="100%"
            px="$6"
            py="$5"
            color="$color12"
            o={0}
            fos="$4"
            lh="$3"
            ta="justify"
            numberOfLines={6}
            ellipsizeMode="tail"
            $group-hover={{ opacity: 1 }}
            $group-press={{ opacity: 1 }}
            animation="medium">
            {description}
          </Paragraph>
        </View>
      )}
    </View>
  );
};
