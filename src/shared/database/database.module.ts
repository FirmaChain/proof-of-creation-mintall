import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../../config/typeorm.config';
import { NFTCertificateEntity } from '../../modules/entities/nft.certificate.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([NFTCertificateEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
