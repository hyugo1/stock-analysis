// lib/redis.ts
import Redis from "ioredis";

let redis: Redis | null = null;

if (!redis) {
  const redisUrl = process.env.REDIS_URL!;
  redis = new Redis(redisUrl, {
    // optional for Upstash
    lazyConnect: true,
  });
}

export default redis;