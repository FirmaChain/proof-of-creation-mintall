import { Injectable, Logger } from '@nestjs/common';
import { RedisService as RedisClient } from '@liaoliaots/nestjs-redis';
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

  async delete(key: string) {
    return await this.redis.del(key);
  }

  async hset(key: string, field: string, value: string) {
    return await this.redis.hset(key, field, value);
  }

  async hget(key: string, field: string) {
    return await this.redis.hget(key, field);
  }

  async hdel(key: string, field: string) {
    return await this.redis.hdel(key, field);
  }

  async hgetall(key: string) {
    return await this.redis.hgetall(key);
  }

  async hkeys(key: string) {
    return await this.redis.hkeys(key);
  }

  async hvals(key: string) {
    return await this.redis.hvals(key);
  }

  async hlen(key: string) {
    return await this.redis.hlen(key);
  }
}
