import { Test, TestingModule } from '@nestjs/testing';
import { MintService } from './mint.service';
import { RedisService } from '../../../shared/redis/redis.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NFTCertificateEntity } from '../../../modules/entities/nft.certificate.entity';
import { FirmaService } from '../../../shared/firma/firma.service';
import { SecretService } from '../../../shared/aws/aws.secret.service';
import { MintRequestDto } from '../dto/mint.request.dto';
import { BadRequestException } from '@nestjs/common';

describe('MintService', () => {
  let service: MintService;
  let redisService: RedisService;
  let nftCertificateRepository: Repository<NFTCertificateEntity>;
  let firmaService: FirmaService;
  let secretService: SecretService;

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
              Nft: {
                mint: jest.fn().mockResolvedValue({
                  code: 0,
                  rawLog: JSON.stringify([
                    {
                      events: [
                        {
                          attributes: [{}, {}, { value: 'mockTokenId' }],
                        },
                      ],
                    },
                  ]),
                  transactionHash: 'mockTransactionHash',
                }),
              },
            }),
          },
        },
        {
          provide: SecretService,
          useValue: {
            getPrivateKey: jest.fn().mockReturnValue('mockPrivateKey'),
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
    secretService = module.get<SecretService>(SecretService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return tokenId if minting is successful', async () => {
    const dto = new MintRequestDto();
    dto.imageHash = 'mockImageHash';
    dto.imagePerceptualHash = 'mockImagePerceptualHash';

    const result = await service.createMint(dto);

    expect(result).toBe('mockTokenId');
    expect(redisService.hset).toHaveBeenCalledWith(`image:${dto.imageHash}`, {
      tokenId: 'mockTokenId',
      transactionHash: 'mockTransactionHash',
    });
    expect(nftCertificateRepository.save).toHaveBeenCalled();
  });

  it('should throw BadRequestException if minting fails', async () => {
    jest.spyOn(firmaService.getSDK().Nft, 'mint').mockResolvedValueOnce({
      code: 1,
      rawLog: '',
      transactionHash: '',
      height: 0,
    });

    const dto = new MintRequestDto();
    dto.imageHash = 'mockImageHash';
    dto.imagePerceptualHash = 'mockImagePerceptualHash';

    await expect(service.createMint(dto)).rejects.toThrow(BadRequestException);
  });
});
