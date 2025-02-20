import { Test, TestingModule } from '@nestjs/testing';
import { VerificationService } from './verification.service';
import { RedisService } from '../../../shared/redis/redis.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NFTCertificateEntity } from '../../../modules/entities/nft.certificate.entity';
import { VerificationRequestDto } from '../dto/verification.request.dto';
import { NotFoundException } from '@nestjs/common';

describe('VerificationService', () => {
  let service: VerificationService;
  let redisService: RedisService;
  let nftCertificateRepository: Repository<NFTCertificateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerificationService,
        {
          provide: RedisService,
          useValue: {
            hgetall: jest.fn(),
            get: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(NFTCertificateEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VerificationService>(VerificationService);
    redisService = module.get<RedisService>(RedisService);
    nftCertificateRepository = module.get<Repository<NFTCertificateEntity>>(
      getRepositoryToken(NFTCertificateEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return tokenId from cache if exists', async () => {
    const dto = new VerificationRequestDto();
    dto.key = 'imageHash';
    dto.value = 'mockImageHash';

    jest
      .spyOn(redisService, 'hgetall')
      .mockResolvedValue({ tokenId: 'mockTokenId' });

    const result = await service.checkVerification(dto);

    expect(redisService.hgetall).toHaveBeenCalledWith(`image:${dto.value}`);
    expect(result).toBe('mockTokenId');
  });

  it('should return tokenId from database if not in cache', async () => {
    const dto = new VerificationRequestDto();
    dto.key = 'imageHash';
    dto.value = 'mockImageHash';

    jest.spyOn(redisService, 'hgetall').mockResolvedValue({});
    jest.spyOn(nftCertificateRepository, 'findOne').mockResolvedValue({
      tokenId: 'mockDbTokenId',
    } as NFTCertificateEntity);

    const result = await service.checkVerification(dto);

    expect(nftCertificateRepository.findOne).toHaveBeenCalledWith({
      where: { [dto.key]: dto.value },
    });
    expect(result).toBe('mockDbTokenId');
  });

  it('should throw NotFoundException if data not found', async () => {
    const dto = new VerificationRequestDto();
    dto.key = 'imageHash';
    dto.value = 'mockImageHash';

    jest.spyOn(redisService, 'hgetall').mockResolvedValue({});
    jest.spyOn(nftCertificateRepository, 'findOne').mockResolvedValue(null);

    await expect(service.checkVerification(dto)).rejects.toThrow(
      NotFoundException,
    );
  });
});
