import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './exception/http.exception.filter';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('NestApplication', {
    timestamp: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get<ConfigService>(ConfigService);
  const startPort = configService.get<number>('PORT');
  const nodeEnv = configService.get<number>('NODE_ENV');
  await app.listen(startPort || 3000);
  logger.log(`RUN NODE_ENV: ${nodeEnv}`);
  logger.log(`RUN PORT: ${startPort}`);
}
bootstrap();
