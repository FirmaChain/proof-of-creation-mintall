import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entityList } from '../entities';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const database = this.configService.get<string>('DATABASE_NAME');
    const username = this.configService.get<string>('DATABASE_USER');
    const password = this.configService.get<string>('DATABASE_PASSWORD');
    const host = this.configService.get<string>('DATABASE_HOST');
    const port = this.configService.get<number>('DATABASE_PORT');
    const env = this.configService.get<string>('NODE_ENV');
    return {
      type: 'postgres',
      host,
      port,
      username,
      database,
      password,
      synchronize: false,
      entities: [...entityList],
      logging: env === 'prod' ? false : true,
    };
  }
}
