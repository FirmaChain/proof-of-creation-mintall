import { Module } from '@nestjs/common';
import { MintController } from './controller/mint.controller';
import { MintService } from './service/mint.service';
import { FirmaModule } from '../../shared/firma/firma.module';

@Module({
  imports: [FirmaModule],
  controllers: [MintController],
  providers: [MintService],
})
export class MintModule {}
