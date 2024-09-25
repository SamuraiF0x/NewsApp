import { Button, Paragraph, type ThemeName, YStack, ColorTokens } from "tamagui";

interface IconButtonProps {
  icon: React.NamedExoticComponent;
  label: string;
  color?: string;
  active?: boolean;
  onPress: () => void;
}

export const IconButton = ({
  icon,
  label = "Label",
  color = "red",
  active = true,
  onPress,
}: IconButtonProps) => {
  return (
    <YStack
      group
      theme={color as ThemeName}
      ai="center"
      pressStyle={{ scale: 0.9 }}
      animation="100ms">
      {/* @ts-ignore */}
      <Button
        fd="column"
        ai="center"
        h="$6"
        w="$8"
        icon={icon}
        scaleIcon={1.5}
        color={active ? "$color11" : "$gray10"}
        bg="$color0"
        $group-hover={{ color: "$color11" }}
        onPress={onPress}>
        <Paragraph
          fow={active ? "bold" : "normal"}
          fos="$2"
          lh={0}
          color={active ? "$color11" : "$gray10"}
          $group-hover={{ color: "$color11" }}>
          {label}
        </Paragraph>
      </Button>
    </YStack>
  );
};
