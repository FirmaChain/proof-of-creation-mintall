import { Module } from '@nestjs/common';
import { VerificationService } from './service/verification.service';
import { VerificationController } from './controller/verification.controller';

@Module({
  controllers: [VerificationController],
  providers: [VerificationService],
})
export class VerificationModule {}
