import { Test, TestingModule } from '@nestjs/testing';
import { MintService } from './mint.service';
import { RedisService } from '../../../shared/redis/redis.service';
import { FirmaService } from '../../../shared/firma/firma.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NFTCertificateEntity } from '../../../modules/entities/nft.certificate.entity';
import { MintRequestDto } from '../dto/mint.request.dto';
import { BadRequestException } from '@nestjs/common';
import { BroadcastTxResponse } from '@firmachain/firma-js/dist/sdk/firmachain/common/stargateclient';

describe('MintService', () => {
  let service: MintService;
  let redisService: RedisService;
  let firmaService: FirmaService;
  let nftCertificateRepository: Repository<NFTCertificateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MintService,
        {
          provide: RedisService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
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
                          type: 'message',
                          attributes: [
                            { key: 'action', value: 'Mint' },
                            { key: 'Owner', value: 'ownerAddress' },
                            { key: 'nftID', value: '320' },
                          ],
                        },
                      ],
                    },
                  ]),
                }),
              },
            }),
          },
        },
        {
          provide: getRepositoryToken(NFTCertificateEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MintService>(MintService);
    redisService = module.get<RedisService>(RedisService);
    firmaService = module.get<FirmaService>(FirmaService);
    nftCertificateRepository = module.get<Repository<NFTCertificateEntity>>(
      getRepositoryToken(NFTCertificateEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a mint and return a token URI', async () => {
    const dto = new MintRequestDto();
    dto.imageHash = 'mockImageHash';

    jest.spyOn(redisService, 'get').mockResolvedValue(null);
    jest.spyOn(nftCertificateRepository, 'findOne').mockResolvedValue(null);

    const result = await service.createMint(dto);

    expect(redisService.get).toHaveBeenCalledWith(dto.imageHash);
    expect(nftCertificateRepository.findOne).toHaveBeenCalledWith({
      where: { imageHash: dto.imageHash },
    });
    expect(result).toBe('https://images.app.goo.gl/it644rEhzNcvDXLSA');
  });

  it('should throw BadRequestException if mint fails', async () => {
    const dto = new MintRequestDto();
    dto.imageHash = 'mockImageHash';

    jest.spyOn(firmaService.getSDK().Nft, 'mint').mockResolvedValue({
      code: 1,
      rawLog: '',
      height: 0,
      transactionHash: '',
    } as BroadcastTxResponse);

    await expect(service.createMint(dto)).rejects.toThrow(BadRequestException);
  });
});
