import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisModule as RedisModuleLiaoliao } from '@liaoliaots/nestjs-redis';
import { RedisConfigService } from '../../config/redis.config';

@Global()
@Module({
  imports: [
    RedisModuleLiaoliao.forRootAsync({
      useClass: RedisConfigService,
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
