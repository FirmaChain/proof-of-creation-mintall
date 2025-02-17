import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from '../../config/typeorm.config';
import { NFTCertificateEntity } from '../../modules/entities/nft.certificate.entity';

@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([NFTCertificateEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
