import { Articles, H4 } from "@my/ui";
import { ExcludedHomeEnum } from "@my/ui/src/types/categories.type";
import { useParams } from "solito/navigation";

export function CategoryScreen() {
  const { id: category } = useParams<{ id: ExcludedHomeEnum }>();

  return (
    <>
      <H4>{category}</H4>
      <Articles />
    </>
  );
}
