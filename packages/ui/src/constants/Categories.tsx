import { Category, CategoryColors, CategoryEnum } from "../types/categories.type";
import {
  Home,
  Newspaper,
  Briefcase,
  Stethoscope,
  Microscope,
  Dumbbell,
  Tv2,
} from "@tamagui/lucide-icons";

export const Categories: Category[] = [
  { name: CategoryEnum.Home, icon: Home, color: CategoryColors.Red },
  { name: CategoryEnum.General, icon: Newspaper, color: CategoryColors.Orange },
  { name: CategoryEnum.Business, icon: Briefcase, color: CategoryColors.Blue },
  { name: CategoryEnum.Health, icon: Stethoscope, color: CategoryColors.Pink },
  { name: CategoryEnum.Science, icon: Microscope, color: CategoryColors.Purple },
  { name: CategoryEnum.Sports, icon: Dumbbell, color: CategoryColors.Green },
  { name: CategoryEnum.Technology, icon: Tv2, color: CategoryColors.Yellow },
];

const DefaultCategory = (category) => {
  return { name: category, icon: Newspaper, color: CategoryColors.Color };
};

// export const findCategory = (category: CategoryEnum | string) =>
//      Categories.find((item) => item.name.toLowerCase() === category.toLowerCase())!

export const findCategory = (category: CategoryEnum | string) => {
  const foundCategory = Categories.find(
    (item) => item.name.toLowerCase() === category.toLowerCase()
  );
  return foundCategory ? foundCategory : DefaultCategory(category);
};
