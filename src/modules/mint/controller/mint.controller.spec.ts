import { Test, TestingModule } from '@nestjs/testing';
import { MintController } from './mint.controller';
import { MintService } from '../service/mint.service';
import { MintRequestDto } from '../dto/mint.request.dto';

describe('MintController', () => {
  let controller: MintController;
  let service: MintService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MintController],
      providers: [
        {
          provide: MintService,
          useValue: {
            createMint: jest.fn().mockResolvedValue('mockTokenUri'),
          },
        },
      ],
    }).compile();

    controller = module.get<MintController>(MintController);
    service = module.get<MintService>(MintService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createMint and return a token URI', async () => {
    const dto = new MintRequestDto();
    dto.imageHash = 'mockImageHash';

    const result = await controller.createMint(dto);

    expect(service.createMint).toHaveBeenCalledWith(dto);
    expect(result).toBe('mockTokenUri');
  });
});
