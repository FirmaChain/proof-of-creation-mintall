import { Module } from '@nestjs/common';
import { FirmaService } from './firma.service';
@Module({
  providers: [FirmaService],
  exports: [FirmaService],
})
export class FirmaModule {}
