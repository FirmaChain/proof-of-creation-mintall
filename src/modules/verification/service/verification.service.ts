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
      const searchKey = param.key;
      const searchValue = param.value;

      // check if the imageHash is already exists in the cache
      let cacheData: { [key: string]: string } | null = null;
      if (searchKey === 'imageHash') {
        cacheData = await this.redisService.hgetall(`image:${searchValue}`);
      } else {
        const imageHash = await this.redisService.get(
          `image:index:${searchValue}`,
        );
        cacheData = await this.redisService.hgetall(`image:${imageHash}`);
      }
      if (cacheData) {
        this.logger.log(`DATA already exists in cache`);
        return cacheData.tokenId;
      }

      // if the imageHash is not in the cache, check if it is in the database
      const nftCertificate = await this.nftCertificateRepository.findOne({
        where: { [searchKey]: searchValue },
      });
      this.logger.log(`DATA already exists in database`);

      // if the imageHash is in the database
      if (nftCertificate) {
        this.logger.log(`Reset cache data`);
        // set the data in the cache
        await this.redisService.hset(`image:${nftCertificate.imageHash}`, {
          tokenId: nftCertificate.tokenId,
          transactionHash: nftCertificate.transactionHash,
        });
        // make index
        await this.redisService.set(
          `image:index:${nftCertificate.tokenId}`,
          nftCertificate.imageHash,
        );
        await this.redisService.set(
          `image:index:${nftCertificate.transactionHash}`,
          nftCertificate.imageHash,
        );
        return nftCertificate.tokenId;
      }

      // if the imageHash is not in the cache or database, throw an error
      throw new NotFoundException('NFT certificate not found');
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
