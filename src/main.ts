import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { initConfig } from './config/load.config';
import { AllExceptionsFilter } from './common/exception/all.exception.filter';

async function bootstrap() {
  // load default config
  await initConfig();

  const app = await NestFactory.create(AppModule);
  const logger = new Logger('NestApplication', {
    timestamp: true,
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(
    helmet({
      hidePoweredBy: true,
      frameguard: false,
      xssFilter: false,
      noSniff: true,
      ieNoOpen: true,
      contentSecurityPolicy: false,
      dnsPrefetchControl: false,
      permittedCrossDomainPolicies: false,
    }),
  );

  const configService = app.get<ConfigService>(ConfigService);
  const startPort = configService.get<number>('PORT');
  const nodeEnv = configService.get<number>('NODE_ENV');
  await app.listen(startPort || 3000);
  logger.log(`RUN NODE_ENV: ${nodeEnv}`);
  logger.log(`RUN PORT: ${startPort}`);
}
bootstrap();
