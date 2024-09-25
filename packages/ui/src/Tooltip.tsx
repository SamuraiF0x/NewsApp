import { Paragraph, Tooltip as TTooltip } from "tamagui";

interface TooltipProps {
  children: React.ReactNode;
  themeName?: string;
}

export const Tooltip = ({ themeName, children }: TooltipProps) => {
  return (
    <TTooltip restMs={50}>
      <TTooltip.Trigger>{children}</TTooltip.Trigger>
      <TTooltip.Content
        px="$4"
        py="$2"
        scale={1}
        x={0}
        y={0}
        bg="$color4"
        boc="$color8"
        bw="$1"
        br="$4"
        o={1}
        enterStyle={{ x: 0, y: -5, o: 0, scale: 0.9 }}
        exitStyle={{ x: 0, y: -5, o: 0, scale: 0.9 }}
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}>
        <TTooltip.Arrow boc="$color8" bw="$2" />
        <Paragraph size="$2" fow="bold" color="$color12">
          {themeName}
        </Paragraph>
      </TTooltip.Content>
    </TTooltip>
  );
};
