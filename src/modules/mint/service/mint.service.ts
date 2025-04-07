import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MintRequestDto } from '../dto/mint.request.dto';
import { RedisService } from '../../../shared/redis/redis.service';
import { NFTCertificateEntity } from '../../../modules/entities/nft.certificate.entity';
import { FirmaService } from '../../../shared/firma/firma.service';
import { FirmaSDK } from '@firmachain/firma-js';
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

  async createMint(
    body: MintRequestDto,
  ): Promise<{ tokenId: string; transactionHash: string }> {
    try {
      // Get private key from secret manager
      const privateKey = this.configService.get<string>(
        'PRIVATE_KEY',
      ) as string;
      const contractAddress = this.configService.get<string>(
        'CONTRACT_ADDRESS',
      ) as string;
      const walletAddress = this.configService.get<string>(
        'WALLET_ADDRESS',
      ) as string;
      const tokenUri = body.imageUrl;

      // check cache data
      const cacheData = await this.redisService.hgetall(
        `image:${body.imageHash}`,
      );
      if (cacheData && cacheData.tokenId) {
        this.logger.log(`DATA already exists in cache`);
        return {
          tokenId: cacheData.tokenId,
          transactionHash: cacheData.transactionHash,
        };
      }

      // check database data
      const nftCertificate = await this.nftCertificateRepository.findOne({
        where: { imageHash: body.imageHash },
      });
      if (nftCertificate) {
        this.logger.log(`DATA already exists in database`);
        return {
          tokenId: nftCertificate.tokenId,
          transactionHash: nftCertificate.transactionHash,
        };
      }

      // wallet
      const wallet = await this.firmaSDK.Wallet.fromPrivateKey(privateKey);

      // get all nft id list for calculate token id
      const nftIdList =
        await this.firmaSDK.Cw721.getAllNftIdList(contractAddress);
      let newTokenId: number;
      if (nftIdList.length === 0) {
        newTokenId = 1;
      } else {
        nftIdList.sort((a, b) => parseInt(a) - parseInt(b));
        const maxId = parseInt(nftIdList[nftIdList.length - 1]);
        newTokenId = maxId + 1;
      }

      // mint
      const res = await this.firmaSDK.Cw721.mintWithExtension(
        wallet,
        contractAddress,
        walletAddress,
        newTokenId.toString(),
        {
          name: 'mintall nft certificate',
          description: 'mintall nft certificate',
          image: tokenUri,
        },
      );

      // check mint result
      if (!res || res.code !== 0 || !res.rawLog || res.rawLog.length === 0) {
        this.logger.error(res.rawLog);
        throw new BadRequestException('NFT mint failed');
      }

      // parse rawLog
      const rawLog = JSON.parse(res.rawLog) as RowLog;
      const tokenId = rawLog[0].events[2].attributes[4].value;

      // save nft certificate in database
      const nftCertificateEntity = new NFTCertificateEntity();
      nftCertificateEntity.imageHash = body.imageHash;
      nftCertificateEntity.imagePerceptualHash = body.imagePerceptualHash || '';
      nftCertificateEntity.nftMetadataUrl = tokenUri;
      nftCertificateEntity.tokenId = tokenId;
      nftCertificateEntity.creatorName = body.creatorName || '';
      nftCertificateEntity.c2paMetadata = body.c2paMetadata || {};
      nftCertificateEntity.transactionHash = res.transactionHash;
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

      return {
        tokenId,
        transactionHash: res.transactionHash,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
