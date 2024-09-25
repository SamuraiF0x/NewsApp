import { CACHE_DURATION } from "../constants/constants";

export function createCache<T>() {
  const cache = new Map<string, { data: T; timestamp: number }>();

  function get(key: string): T | null {
    const item = cache.get(key);
    if (item && Date.now() - item.timestamp < CACHE_DURATION) {
      return item.data;
    }
    return null;
  }

  function set(key: string, data: T): void {
    cache.set(key, { data, timestamp: Date.now() });
  }

  return { get, set };
}
