import { Test, TestingModule } from '@nestjs/testing';
import { MintService } from './mint.service';
import { RedisService } from '../../../shared/redis/redis.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NFTCertificateEntity } from '../../../modules/entities/nft.certificate.entity';
import { FirmaService } from '../../../shared/firma/firma.service';
import { ConfigService } from '@nestjs/config';
import { MintRequestDto } from '../dto/mint.request.dto';
import { BadRequestException } from '@nestjs/common';
import { CertificateStatus } from '../../../common/constants/service.constants';

describe('MintService', () => {
  let service: MintService;
  let redisService: RedisService;
  let nftCertificateRepository: Repository<NFTCertificateEntity>;
  let firmaService: FirmaService;
  // let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MintService,
        {
          provide: RedisService,
          useValue: {
            get: jest.fn().mockResolvedValue(null),
            hset: jest.fn().mockResolvedValue(null),
            set: jest.fn().mockResolvedValue(null),
            hgetall: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: getRepositoryToken(NFTCertificateEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(null),
            save: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: FirmaService,
          useValue: {
            getSDK: jest.fn().mockReturnValue({
              Wallet: {
                fromPrivateKey: jest.fn().mockResolvedValue({}),
              },
              Cw721: {
                getTotalNfts: jest.fn().mockResolvedValue(0),
                mintWithExtension: jest.fn().mockResolvedValue({
                  code: 0,
                  events: [
                    {}, {}, {}, {}, {}, {}, {}, {}, {},
                    {
                      attributes: [
                        {}, {}, {}, {},
                        { value: 'mockTokenId' },
                      ],
                    },
                  ],
                  transactionHash: 'mockTransactionHash',
                }),
              },
            }),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mockPrivateKey'),
          },
        },
      ],
    }).compile();

    service = module.get<MintService>(MintService);
    redisService = module.get<RedisService>(RedisService);
    nftCertificateRepository = module.get<Repository<NFTCertificateEntity>>(
      getRepositoryToken(NFTCertificateEntity),
    );
    firmaService = module.get<FirmaService>(FirmaService);
    // configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return tokenId if minting is successful', async () => {
    const dto = new MintRequestDto();
    dto.imageHash = 'mockImageHash';
    dto.imagePerceptualHash = 'mockImagePerceptualHash';
    dto.imageUrl = 'https://example.com/image.jpg';

    jest.spyOn(nftCertificateRepository, 'save').mockResolvedValueOnce({
      createdAt: new Date('2025-01-15T00:00:00.000Z')
    } as unknown as NFTCertificateEntity);

    const result = await service.createMint(dto);

    expect(result).toEqual({
      tokenId: 'mockTokenId',
      transactionHash: 'mockTransactionHash',
      certificatedTime: '2025-01-15T00:00:00.000Z',
      status: CertificateStatus.New
    });
    expect(redisService.hset).toHaveBeenCalled();
    expect(nftCertificateRepository.save).toHaveBeenCalled();
  });

  it('should throw BadRequestException if minting fails', async () => {
    jest
      .spyOn(firmaService.getSDK().Cw721, 'mintWithExtension')
      .mockResolvedValueOnce({
        code: 1,
        events: [],
        transactionHash: '',
        height: 0,
        txIndex: 0,
        msgResponses: [],
        gasUsed: 0,
        gasWanted: 0,
      } as any);

    const dto = new MintRequestDto();
    dto.imageHash = 'mockImageHash';
    dto.imagePerceptualHash = 'mockImagePerceptualHash';

    await expect(service.createMint(dto)).rejects.toThrow(BadRequestException);
  });

  it('should generate a new tokenId based on total NFTs', async () => {
    jest.spyOn(firmaService.getSDK().Cw721, 'getTotalNfts').mockResolvedValueOnce(5);

    const dto = new MintRequestDto();
    dto.imageHash = 'mockImageHash';
    dto.imagePerceptualHash = 'mockImagePerceptualHash';
    dto.imageUrl = 'https://example.com/image.jpg';

    jest.spyOn(nftCertificateRepository, 'save').mockResolvedValueOnce({
      createdAt: new Date('2025-01-15T00:00:00.000Z')
    } as unknown as NFTCertificateEntity);

    const result = await service.createMint(dto);

    expect(result.tokenId).toBe('mockTokenId');
    expect(firmaService.getSDK().Cw721.getTotalNfts).toHaveBeenCalled();
  });
});
