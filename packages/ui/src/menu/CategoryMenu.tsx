"use client";

import { Categories } from "../constants/Categories";
import { CategoryEnum } from "../types/categories.type";
import { useLink, usePathname } from "solito/navigation";
import { Heart } from "@tamagui/lucide-icons";
import { IconButton } from "./IconButton";

export const CategoryMenu = ({ onPress }: { onPress?: () => void }) => {
  const pathname = usePathname();
  const currentCategory = pathname?.split("/").pop();

  const favoriteLink = useLink({
    href: `/favorites`,
  });

  const handlePress = (linkProps) => {
    if (onPress) {
      onPress();
    }
    linkProps.onPress();
  };

  return (
    <>
      {Categories.map(({ name, icon, color }) => {
        const linkProps = useLink({
          href: name === CategoryEnum.Home ? "/" : `/category/${name}`,
        });

        return (
          <IconButton
            key={name}
            active={name === currentCategory || (pathname === "/" && name === CategoryEnum.Home)}
            icon={icon}
            label={name}
            color={color}
            onPress={() => handlePress(linkProps)}
          />
        );
      })}

      <IconButton
        active={pathname === "/favorites"}
        icon={Heart}
        label="Favorites"
        color="red"
        onPress={() => handlePress(favoriteLink)}
      />
    </>
  );
};
