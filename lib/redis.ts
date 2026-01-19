import Redis from "ioredis";

declare global {
  // eslint-disable-next-line no-var
  var redis: Redis | undefined;
}

// Helper to parse Redis URL and extract connection options
const parseRedisUrl = (url: string): { host: string; port: number; tls?: Record<string, unknown> } => {
  try {
    const urlObj = new URL(url);
    return {
      host: urlObj.hostname,
      port: parseInt(urlObj.port, 10) || 6379,
      // Enable TLS if using rediss:// protocol
      tls: urlObj.protocol === 'rediss:' ? { rejectUnauthorized: true } : undefined,
    };
  } catch {
    return { host: 'localhost', port: 6379 };
  }
};

const redisOptions = parseRedisUrl(process.env.REDIS_URL!);

const redis =
  global.redis ??
  new Redis({
    ...redisOptions,
    password: process.env.REDIS_PASSWORD || undefined,
    lazyConnect: true,
    maxRetriesPerRequest: 3,
    retryStrategy: (times) => {
      if (times > 3) return null;
      return Math.min(times * 100, 1000);
    },
    // Security: Enable ready check
    enableReadyCheck: true,
    // Connection timeouts
    connectTimeout: 10000,
    commandTimeout: 5000,
  });

if (process.env.NODE_ENV !== "production") {
  global.redis = redis;
}

export default redis;
