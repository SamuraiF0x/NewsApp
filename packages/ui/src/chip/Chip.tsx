import type { SizeTokens, ThemeName } from "tamagui";
import type { IconProps } from "@tamagui/helpers-icon";
import { TChip } from "./chipParts";

interface ChipProps {
  label: string;
  color: string;
  icon: React.NamedExoticComponent<IconProps>;
  size?: SizeTokens;
}

export const Chip = ({ label, color = "active", icon: Icon, size = "$2" }: ChipProps) => {
  return (
    <TChip backgroundColor="$color4" rounded theme={color as ThemeName} size={size} gap="$1">
      <TChip.Icon y={-1} scaleIcon={1.1} color="$color9">
        <Icon />
      </TChip.Icon>
      <TChip.Text color="$color10">{label}</TChip.Text>
    </TChip>
  );
};
