"use client";

import { useState } from "react";
import { H2, XStack, useMedia } from "tamagui";
import { SearchBar } from "./searchbar/SearchBar";
import { SwitchThemeButton } from "./SwitchThemeButton";
import { Tooltip } from "./Tooltip";
import { SheetMenu } from "./menu/SheetMenu";
import { LogoTitle } from "./LogoTitle";

export const NewsHeader = () => {
  const [themeName, setThemeName] = useState<string>();
  const { md, gtMd } = useMedia();

  return (
    <XStack f={1} fw="wrap" gap="$5" jc="space-between" w="100%">
      <XStack f={1} ai="center" jc="space-between" gap="$5">
        <LogoTitle />
        {md && (
          <XStack ai="center" gap="$3">
            <SwitchThemeButton onChangeTheme={(name: string) => setThemeName(name)} />
            <SheetMenu />
          </XStack>
        )}
      </XStack>

      <XStack f={1} gap="$6" jc="flex-end">
        {gtMd && (
          <Tooltip themeName={themeName}>
            <SwitchThemeButton onChangeTheme={(name: string) => setThemeName(name)} />
          </Tooltip>
        )}

        <SearchBar />
      </XStack>
    </XStack>
  );
};
