import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { MintModule } from './modules/mint/mint.module';
import { VerificationModule } from './modules/verification/verification.module';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';
// import { FirmaModule } from './shared/firma/firma.module';
import { RedisModule } from './shared/redis/redis.module';
import defaultConfig from './config/default.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entityList } from './modules/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // For load default config. If default config is not exist, it will use .env file.
      load: [defaultConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('DATABASE_HOST');
        const port = configService.get<number>('DATABASE_PORT');
        const username = configService.get<string>('DATABASE_USER');
        const password = configService.get<string>('DATABASE_PASSWORD');
        const database = configService.get<string>('DATABASE_NAME');
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          logging: true,
          synchronize: false,
          ssl: {
            rejectUnauthorized: false,
          },
          entities: [...entityList],
        };
      },
    }),
    RedisModule,
    // FirmaModule,
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
