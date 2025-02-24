import { Module } from '@nestjs/common';
import { VerificationService } from './service/verification.service';
import { VerificationController } from './controller/verification.controller';
import { NFTCertificateEntity } from '../entities/nft.certificate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NFTCertificateEntity])],
  controllers: [VerificationController],
  providers: [VerificationService],
})
export class VerificationModule {}
