import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { MintModule } from './modules/mint/mint.module';
import { VerificationModule } from './modules/verification/verification.module';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisConfigService } from './config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    RedisModule.forRootAsync({
      useClass: RedisConfigService,
    }),
    MintModule,
    VerificationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessInterceptor,
    },
  ],
})
export class AppModule {}
