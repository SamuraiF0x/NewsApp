import type { IconProps } from "@tamagui/helpers-icon";

export enum CategoryEnum {
  Home = "Home",
  General = "General",
  Business = "Business",
  Health = "Health",
  Science = "Science",
  Sports = "Sports",
  Technology = "Technology",
}

export type ExcludedHomeEnum = Exclude<CategoryEnum, CategoryEnum.Home>;

export enum CategoryColors {
  Red = "red",
  Green = "green",
  Blue = "blue",
  Purple = "purple",
  Pink = "pink",
  Orange = "orange",
  Yellow = "yellow",
  Color = "color",
}

export interface Category {
  name: CategoryEnum;
  icon: React.NamedExoticComponent<IconProps>;
  color: CategoryColors;
}
