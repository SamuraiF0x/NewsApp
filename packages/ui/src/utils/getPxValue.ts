import { useMedia } from "tamagui";

export const getPxValue = () => {
  const { sm, lg, xl, xxl } = useMedia();

  if (sm) {
    return "$4";
  } else if (lg) {
    return "$6";
  } else if (xl) {
    return "$8";
  } else if (xxl) {
    return "$10";
  } else {
    return "$19";
  }
};
