"use client";

import { useToastController } from "@tamagui/toast";
import { useState } from "react";
import { AnimatePresence, Button, Image, Paragraph, View, XStack } from "tamagui";

export const Banner = () => {
  const toast = useToastController();
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <XStack
          key="banner"
          t={0}
          ai="center"
          jc="space-between"
          w="100%"
          px="$19"
          py="$2.5"
          bg="$red11"
          exitStyle={{ y: -50, opacity: 0 }}
          animation="100ms"
          $lg={{ px: "$6" }}
          $xl={{ px: "$8" }}
          $xxl={{ px: "$10" }}>
          <XStack f={1} fw="wrap" columnGap="$11">
            <Paragraph fow="bold" fos="$5" col="$color1">
              Make MyNews your homepage
            </Paragraph>
            <Paragraph fow="300" fos="$5" col="$color1">
              Every day discover what’s trending on the internet!
            </Paragraph>
          </XStack>

          <View zi={2} pos="absolute" r="$18" mr="$12">
            <Image
              source={{
                uri: "banner.png",
                width: 600,
                height: 60,
              }}
            />
          </View>

          <XStack zi={3} gap="$5" ai="center">
            <Paragraph fos="$5" col="$color1" cursor="pointer" onPress={() => setIsVisible(false)}>
              No, thanks
            </Paragraph>
            <Button
              bg="$background"
              onPress={() => {
                toast.show("Bookmark MyNews!", {
                  message: "Press Ctrl+D (Windows) or Command+D (Mac) on your keyboard.",
                });
              }}>
              <Paragraph fow="bold" fos="$4">
                GET
              </Paragraph>
            </Button>
          </XStack>
        </XStack>
      )}
    </AnimatePresence>
  );
};
