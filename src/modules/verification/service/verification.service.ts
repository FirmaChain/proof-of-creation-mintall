import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NFTCertificateEntity } from '../../../modules/entities/nft.certificate.entity';
import { RedisService } from '../../../shared/redis/redis.service';
import { Repository } from 'typeorm';
import { VerificationRequestDto } from '../dto/verification.request.dto';

@Injectable()
export class VerificationService {
  private readonly logger = new Logger(VerificationService.name);

  constructor(
    private redisService: RedisService,
    @InjectRepository(NFTCertificateEntity)
    private nftCertificateRepository: Repository<NFTCertificateEntity>,
  ) {}

  async checkVerification(
    param: VerificationRequestDto,
  ): Promise<string | null> {
    try {
      // check if the imageHash is already exists in the cache
      const cacheData = await this.redisService.get(param.imageHash);

      // if the imageHash is already exists in the cache, return the data
      if (cacheData) {
        this.logger.log(`Get data from cache`);
        return cacheData;
      }

      // if the imageHash is not in the cache, check if it is in the database
      const nftCertificate = await this.nftCertificateRepository.findOne({
        where: { imageHash: param.imageHash },
      });
      this.logger.log(`Get data from database`);

      // if the imageHash is in the database
      if (nftCertificate) {
        this.logger.log(`Reset cache data`);
        // set the data in the cache
        await this.redisService.set(
          param.imageHash,
          nftCertificate.nftMetadataUrl,
        );
        return nftCertificate.nftMetadataUrl;
      }

      // if the imageHash is not in the cache or database, throw an error
      throw new NotFoundException('NFT certificate not found');
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
