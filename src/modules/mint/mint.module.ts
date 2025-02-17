import { Module } from '@nestjs/common';
import { MintController } from './controller/mint.controller';
import { MintService } from './service/mint.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MintEntity } from '../entities/mint.entity';
import { RedisService } from '../../shared/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([MintEntity])],
  controllers: [MintController],
  providers: [MintService, RedisService],
})
export class MintModule {}
