import { ToastViewport as ToastViewportOg, useMedia } from "@my/ui";

export const ToastViewport = () => {
  const { md } = useMedia();
  return <ToastViewportOg right={md ? "$3" : "$8"} bottom={md ? "$3" : "$8"} />;
};
