"use client";

import { Separator, XStack, YStack, useMedia } from "tamagui";
import { Banner } from "./Banner";
import { NewsHeader } from "./NewsHeader";
import { CategoryMenu } from "./menu/CategoryMenu";
import { getPxValue } from "./utils/getPxValue";

export function PageLayout({ children }: { children: React.ReactNode }) {
  const { gtMd } = useMedia();

  return (
    <YStack>
      {gtMd && <Banner />}

      <YStack gap="$5" px={getPxValue()} py="$5" jc="center">
        <NewsHeader />

        {gtMd && <Separator w="100%" />}

        <XStack gap="$5">
          {gtMd && (
            <YStack w="$8">
              <CategoryMenu />
            </YStack>
          )}
          <YStack f={1} gap="$5">
            {children}
          </YStack>
        </XStack>
      </YStack>
    </YStack>
  );
}
