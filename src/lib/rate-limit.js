import { LRUCache } from "lru-cache";

export function rateLimit({ interval, uniqueTokenPerInterval = 500 }) {
  const tokenCache = new LRUCache({
    max: uniqueTokenPerInterval,
    ttl: interval,
  });

  return {
    check: async (request, limit) => {
      const ip = request.headers.get("x-forwarded-for") || "anonymous";
      const tokenCount = (tokenCache.get(ip) || 0) + 1;

      if (tokenCount > limit) {
        throw new Error("Rate limit exceeded");
      }

      tokenCache.set(ip, tokenCount);
    },
  };
}
