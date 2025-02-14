import { Injectable, Logger } from '@nestjs/common';
import {
  RedisService as RedisClient,
  DEFAULT_REDIS,
} from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger('RedisService');
  private readonly redis: Redis;

  constructor(private readonly redisClient: RedisClient) {
    this.redis = this.redisClient.getOrThrow();
    this.redis.on('connect', () => {
      this.logger.log(`Connected to Redis`);
    });
    this.redis.on('error', (error) => {
      this.logger.error(`Failed to connect`, error);
    });
  }

  async set(key: string, value: string) {
    return await this.redis.set(key, value);
  }

  async get(key: string) {
    return await this.redis.get(key);
  }
}
