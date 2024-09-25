import { Toast, useToastState } from "@tamagui/toast";
import { XStack, YStack } from "tamagui";
import { Chip } from "./chip/Chip";

export const NativeToast = () => {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) {
    return null;
  }

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      theme={currentToast.theme}
      y={0}
      o={1}
      scale={1}
      br="$6"
      enterStyle={{ o: 0, scale: 0.95, x: 50 }}
      exitStyle={{ o: 0, scale: 1, x: 50 }}
      animation="quick">
      <YStack py="$1.5" px="$2" maw="$20">
        <XStack w="100%" ai="center" jc="space-between">
          <Toast.Title lh="$1" fow="bold" color="$color11">
            {currentToast.title}
          </Toast.Title>
          <Chip
            size="$2"
            label={currentToast.label}
            icon={currentToast.icon}
            color={currentToast.theme}
          />
        </XStack>

        {!!currentToast.message && (
          <Toast.Description fos="$3" color="$color12">
            {currentToast.message}
          </Toast.Description>
        )}
      </YStack>
    </Toast>
  );
};
