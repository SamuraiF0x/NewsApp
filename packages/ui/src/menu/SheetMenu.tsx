import { useState } from "react";
import { Menu, X } from "@tamagui/lucide-icons";
import { Button, Sheet, XStack, YStack } from "tamagui";
import { CategoryMenu } from "./CategoryMenu";
import { SearchBar } from "../searchbar/SearchBar";
import { LogoTitle } from "../LogoTitle";

export const SheetMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="$4" icon={Menu} circular onPress={() => setOpen((x) => !x)} />

      <Sheet
        modal
        animation="quick"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        dismissOnSnapToBottom>
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Handle bg="$gray8" />
        <Sheet.Frame ai="center" jc="center" gap="$10" px="$10" bg="$color2">
          <LogoTitle />

          <YStack ai="center" gap="$5">
            <SearchBar />
            <XStack jc="center" fw="wrap" gap="$4">
              <CategoryMenu onPress={() => setOpen(false)} />
            </XStack>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};
