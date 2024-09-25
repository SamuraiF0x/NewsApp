import { useLink } from "solito/navigation";
import { H2, XStack } from "tamagui";

export const LogoTitle = () => {
  const linkProps = useLink({
    href: `/`,
  });

  return (
    <XStack {...linkProps} cursor="pointer">
      <H2 fow="900" col="$red11">
        My
      </H2>
      <H2 fow="900">News</H2>
    </XStack>
  );
};
