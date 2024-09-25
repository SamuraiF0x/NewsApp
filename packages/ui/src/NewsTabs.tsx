"use client";

import { useState } from "react";
import type { StackProps, TabLayout, TabsTabProps } from "tamagui";
import { AnimatePresence, H5, SizableText, Tabs, YStack, styled } from "tamagui";
import { LatestArticles } from "./article/LatestArticles";
import { Articles } from "./article/Articles";

export const NewsTabs = () => {
  const [tabState, setTabState] = useState<{
    currentTab: string;
    /**
     * Layout of the Tab user might intend to select (hovering / focusing)
     */
    intentAt: TabLayout | null;
    /**
     * Layout of the Tab user selected
     */
    activeAt: TabLayout | null;
    /**
     * Used to get the direction of activation for animating the active indicator
     */
    prevActiveAt: TabLayout | null;
  }>({
    activeAt: null,
    currentTab: "featured",
    intentAt: null,
    prevActiveAt: null,
  });
  const setCurrentTab = (currentTab: string) => setTabState({ ...tabState, currentTab });
  const setIntentIndicator = (intentAt) => setTabState({ ...tabState, intentAt });
  const setActiveIndicator = (activeAt) =>
    setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt });
  const { activeAt, intentAt, prevActiveAt, currentTab } = tabState;

  // 1 = right, 0 = nowhere, -1 = left
  const direction = (() => {
    if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
      return 0;
    }

    return activeAt.x > prevActiveAt.x ? -1 : 1;
  })();

  const handleOnInteraction: TabsTabProps["onInteraction"] = (type, layout) => {
    if (type === "select") {
      setActiveIndicator(layout);
    } else {
      setIntentIndicator(layout);
    }
  };

  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      orientation="horizontal"
      size="$4"
      gap="$4"
      padding="$2"
      height={150}
      flexDirection="column"
      activationMode="manual"
      backgroundColor="$background"
      borderRadius="$4"
      position="relative"
      h="100%">
      <YStack als="center" theme="red">
        <AnimatePresence>
          {intentAt && (
            <TabsRovingIndicator
              borderRadius="$8"
              width={intentAt.width}
              height={intentAt.height}
              x={intentAt.x}
              y={intentAt.y}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeAt && (
            <TabsRovingIndicator
              borderRadius="$8"
              theme="active"
              width={activeAt.width}
              height={activeAt.height}
              x={activeAt.x}
              y={activeAt.y}
            />
          )}
        </AnimatePresence>

        <Tabs.List
          disablePassBorderRadius
          loop={false}
          aria-label="Read news"
          gap="$2"
          backgroundColor="transparent">
          <Tabs.Tab
            unstyled
            paddingVertical="$2"
            paddingHorizontal="$3"
            value="featured"
            onInteraction={handleOnInteraction}>
            <SizableText fow="bold" col={currentTab === "featured" ? "$color11" : "$color12"}>
              Featured
            </SizableText>
          </Tabs.Tab>

          <Tabs.Tab
            unstyled
            paddingVertical="$2"
            paddingHorizontal="$3"
            value="latest"
            onInteraction={handleOnInteraction}>
            <SizableText fow="bold" col={currentTab === "latest" ? "$color11" : "$color12"}>
              Latest
            </SizableText>
          </Tabs.Tab>
        </Tabs.List>
      </YStack>

      <AnimatePresence exitBeforeEnter custom={{ direction }} initial={false}>
        <AnimatedYStack key={currentTab} f={1} h="100%">
          <Tabs.Content value={currentTab} forceMount flex={1} justifyContent="center">
            {currentTab === "featured" ? <Articles /> : <LatestArticles currentTab={currentTab} />}
          </Tabs.Content>
        </AnimatedYStack>
      </AnimatePresence>
    </Tabs>
  );
};

const TabsRovingIndicator = ({ active, ...props }: { active?: boolean } & StackProps) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="$color5"
      opacity={0.7}
      animation="100ms"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: "$color8",
        opacity: 0.6,
      })}
      {...props}
    />
  );
};

const AnimatedYStack = styled(YStack, {
  flex: 1,
  x: 0,
  opacity: 1,
  animation: "100ms",
  variants: {
    // 1 = right, 0 = nowhere, -1 = left
    direction: {
      ":number": (direction) => ({
        enterStyle: {
          y: 25,
          opacity: 0,
        },
        exitStyle: {
          zIndex: 0,
          y: 25,
          opacity: 0,
        },
      }),
    },
  } as const,
});
