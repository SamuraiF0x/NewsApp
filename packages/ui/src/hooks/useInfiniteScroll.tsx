import { useState, useRef, useCallback } from "react";

const useInfiniteScroll = (loadMore: () => Promise<void>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const hasCalledLoadMore = useRef(false);
  const scrollOffset = 200;

  const handleScroll = useCallback(
    (event) => {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
      const currentScrollPos = contentOffset.y;

      if (
        currentScrollPos > prevScrollPos &&
        contentSize.height - (contentOffset.y + layoutMeasurement.height) <= scrollOffset &&
        !isLoading &&
        !hasCalledLoadMore.current
      ) {
        setIsLoading(true);
        hasCalledLoadMore.current = true;
        loadMore().then(() => {
          setIsLoading(false);
          hasCalledLoadMore.current = false;
        });
      }

      setPrevScrollPos(currentScrollPos);
    },
    [loadMore, isLoading, prevScrollPos]
  );

  return { handleScroll, isLoading };
};

export default useInfiniteScroll;
