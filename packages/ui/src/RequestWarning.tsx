import { H4, H5, YStack } from "tamagui";

export const RequestWarning = () => {
  return (
    <YStack gap="$2" p="$4" theme="red" bg="$color5" br="$4">
      <H4>All requests used for this period</H4>
      <H5 col="$red11" fow="bold">
        Renew your API Key!
      </H5>
    </YStack>
  );
};
