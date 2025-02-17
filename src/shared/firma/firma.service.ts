import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { FirmaSDK, FirmaConfig } from '@firmachain/firma-js';

@Injectable()
export class FirmaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger('FirmaService');
  private firma: FirmaSDK;

  constructor() {
    const env = process.env.NODE_ENV;
    if (env === 'production') {
      this.firma = new FirmaSDK(FirmaConfig.MainNetConfig);
    } else {
      this.firma = new FirmaSDK(FirmaConfig.TestNetConfig);
    }
  }

  onModuleInit() {
    this.logger.log('FirmaService initialized');
  }

  onModuleDestroy() {
    this.logger.log('FirmaService destroyed');
  }

  getSDK(): FirmaSDK {
    return this.firma;
  }
}
