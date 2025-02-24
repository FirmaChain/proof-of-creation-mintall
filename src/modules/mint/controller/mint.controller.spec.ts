import { Test, TestingModule } from '@nestjs/testing';
import { MintController } from './mint.controller';
import { MintService } from '../service/mint.service';
import { MintRequestDto } from '../dto/mint.request.dto';
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

describe('MintController', () => {
  let controller: MintController;
  let mintService: MintService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MintController],
      providers: [
        {
          provide: MintService,
          useValue: {
            createMint: jest.fn().mockResolvedValue('mockTokenId'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mockValue'),
          },
        },
      ],
    }).compile();

    controller = module.get<MintController>(MintController);
    mintService = module.get<MintService>(MintService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return tokenId if minting is successful', async () => {
    const dto = new MintRequestDto();
    dto.imageHash = 'mockImageHash';
    dto.imagePerceptualHash = 'mockImagePerceptualHash';

    const result = await controller.createMint(dto);

    expect(result).toBe('mockTokenId');
    expect(mintService.createMint).toHaveBeenCalledWith(dto);
  });

  it('should throw BadRequestException if minting fails', async () => {
    jest
      .spyOn(mintService, 'createMint')
      .mockRejectedValueOnce(new BadRequestException());

    const dto = new MintRequestDto();
    dto.imageHash = 'mockImageHash';
    dto.imagePerceptualHash = 'mockImagePerceptualHash';

    await expect(controller.createMint(dto)).rejects.toThrow(
      BadRequestException,
    );
  });
});
