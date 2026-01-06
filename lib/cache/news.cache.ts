// lib/cache/news.cache.ts

// can swap this for Upstash / Redis / Prisma later
import redis from "@/lib/redis";

export async function getCachedNews(key: string): Promise<string | null> {
  if (!redis) {
    return null;
  }
  const value = await redis.get(key);
  return value;
}

export async function setCachedNews(
  key: string,
  value: string,
  ttlSeconds = 60 * 60 * 24 // 24 hours
) {
  if (!redis) {
    return;
  }
  await redis.set(key, value, "EX", ttlSeconds);
}