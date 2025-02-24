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
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MintService {
  private readonly logger = new Logger(`${MintService.name}`);
  private readonly firmaSDK: FirmaSDK;

  constructor(
    private redisService: RedisService,
    private configService: ConfigService,
    @InjectRepository(NFTCertificateEntity)
    private nftCertificateRepository: Repository<NFTCertificateEntity>,
    private firmaService: FirmaService,
  ) {
    this.firmaSDK = this.firmaService.getSDK();
  }

  async createMint(body: MintRequestDto): Promise<string> {
    try {
      // Get private key from secret manager
      const privateKey = this.configService.get<string>(
        'PRIVATE_KEY',
      ) as string;

      // token uri (TODO: 환경변수로 변경)
      const tokenUri = 'https://images.app.goo.gl/it644rEhzNcvDXLSA';

      // check cache data
      const cacheData = await this.redisService.hgetall(
        `image:${body.imageHash}`,
      );
      if (cacheData && cacheData.tokenId) {
        this.logger.log(`DATA already exists in cache`);
        return cacheData.tokenId;
      }

      // check database data
      const nftCertificate = await this.nftCertificateRepository.findOne({
        where: { imageHash: body.imageHash },
      });
      if (nftCertificate) {
        this.logger.log(`DATA already exists in database`);
        return nftCertificate.tokenId;
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

      // hset cache
      await this.redisService.hset(`image:${body.imageHash}`, {
        tokenId,
        transactionHash: res.transactionHash,
      });
      // make index
      await this.redisService.set(`image:index:${tokenId}`, body.imageHash);
      await this.redisService.set(
        `image:index:${res.transactionHash}`,
        body.imageHash,
      );
      this.logger.log('Set cache');

      return tokenId;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
