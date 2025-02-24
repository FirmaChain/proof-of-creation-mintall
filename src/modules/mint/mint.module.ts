import { Module } from '@nestjs/common';
import { MintController } from './controller/mint.controller';
import { MintService } from './service/mint.service';
import { FirmaModule } from '../../shared/firma/firma.module';
import { NFTCertificateEntity } from '../entities/nft.certificate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [FirmaModule, TypeOrmModule.forFeature([NFTCertificateEntity])],
  controllers: [MintController],
  providers: [MintService],
})
export class MintModule {}
