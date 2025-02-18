import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MintRequestDto } from '../dto/mint.request.dto';
import { RedisService } from '../../../shared/redis/redis.service';
import { NFTCertificateEntity } from '../../../modules/entities/nft.certificate.entity';
import { FirmaService } from '../../../shared/firma/firma.service';
import { FirmaSDK } from '@firmachain/firma-js';
import { BroadcastTxResponse } from '@firmachain/firma-js/dist/sdk/firmachain/common/stargateclient';
import { RowLog } from '../interface/mint.interface';
import { VerificationRequestDto } from '../../../modules/verification/dto/verification.request.dto';

@Injectable()
export class MintService {
  private readonly logger = new Logger(`${MintService.name}`);
  private readonly firmaSDK: FirmaSDK;

  constructor(
    private redisService: RedisService,
    @InjectRepository(NFTCertificateEntity)
    private nftCertificateRepository: Repository<NFTCertificateEntity>,
    private firmaService: FirmaService,
  ) {
    this.firmaSDK = this.firmaService.getSDK();
  }

  async createMint(body: MintRequestDto): Promise<string> {
    try {
      // private key
      const privateKey =
        '0x7c2821a07f52e8ed0a15c3ee34a42195ed2e276f9cfd4bf50ac9f3066070fbc7';
      const tokenUri = 'https://images.app.goo.gl/it644rEhzNcvDXLSA';

      // verification
      const verificationRequest = new VerificationRequestDto();
      verificationRequest.imageHash = body.imageHash;

      // check cache data
      const cacheData = await this.redisService.get(body.imageHash);
      if (cacheData) {
        this.logger.log(`DATA already exists in cache`);
        return cacheData;
      }

      // check database data
      const nftCertificate = await this.nftCertificateRepository.findOne({
        where: { imageHash: body.imageHash },
      });
      if (nftCertificate) {
        this.logger.log(`DATA already exists in database`);
        return nftCertificate.nftMetadataUrl;
      }

      // wallet
      const wallet = await this.firmaSDK.Wallet.fromPrivateKey(privateKey);

      // mint
      const res: BroadcastTxResponse = await this.firmaSDK.Nft.mint(
        wallet,
        tokenUri,
      );

      // check mint result
      if (!res || res.code !== 0 || !res.rawLog || res.rawLog.length === 0) {
        throw new BadRequestException('NFT mint failed');
      }

      // parse rawLog
      const rawLog = JSON.parse(res.rawLog) as RowLog;
      const tokenId = rawLog[0].events[0].attributes[2].value;

      // save nft certificate in database
      const nftCertificateEntity = new NFTCertificateEntity();
      nftCertificateEntity.imageHash = body.imageHash;
      nftCertificateEntity.imagePerceptualHash = body.imagePerceptualHash || '';
      nftCertificateEntity.nftMetadataUrl = tokenUri;
      nftCertificateEntity.tokenId = tokenId;
      await this.nftCertificateRepository.save(nftCertificateEntity);
      this.logger.log(`Save nft certificate in database`);

      // set cache
      await this.redisService.set(body.imageHash, tokenUri);
      this.logger.log(`Set cache`);

      // return tokenId
      return tokenUri;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
