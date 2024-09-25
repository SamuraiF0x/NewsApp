"use client";

import { useState } from "react";
import { Sun, Moon, Monitor } from "@tamagui/lucide-icons";
import { Button, useIsomorphicLayoutEffect, useMedia } from "tamagui";
import { useThemeSetting, useRootTheme } from "@tamagui/next-theme";

const getThemeIcon = (theme: string) => {
  switch (theme) {
    case "light":
      return <Sun />;
    case "dark":
      return <Moon />;
    case "system":
      return <Monitor />;
    default:
      return null;
  }
};

export const SwitchThemeButton = ({ onChangeTheme }) => {
  const themeSetting = useThemeSetting();
  const [theme] = useRootTheme();
  const { md } = useMedia();

  const [clientTheme, setClientTheme] = useState<string>("light");

  useIsomorphicLayoutEffect(() => {
    setClientTheme(themeSetting.forcedTheme || themeSetting.current || theme);
    onChangeTheme(themeSetting.current);
  }, [themeSetting.current, themeSetting.resolvedTheme]);

  return (
    <Button
      size="$4"
      circular={md}
      icon={getThemeIcon(clientTheme)}
      onPress={themeSetting.toggle}
    />
  );
};
