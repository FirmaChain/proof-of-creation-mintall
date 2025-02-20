import { Test, TestingModule } from '@nestjs/testing';
import { VerificationController } from './verification.controller';
import { VerificationService } from '../service/verification.service';
import { FixedJwtAuthGuard } from '../../../common/guards/fixed-jwt-auth.guard';
import { VerificationRequestDto } from '../dto/verification.request.dto';

describe('VerificationController', () => {
  let controller: VerificationController;
  let service: VerificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerificationController],
      providers: [
        {
          provide: VerificationService,
          useValue: {
            checkVerification: jest.fn().mockResolvedValue('mockTokenId'),
          },
        },
      ],
    })
      .overrideGuard(FixedJwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<VerificationController>(VerificationController);
    service = module.get<VerificationService>(VerificationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call checkVerification and return tokenId', async () => {
    const query = new VerificationRequestDto();
    query.key = 'imageHash';
    query.value = 'mockImageHash';

    const result = await controller.checkVerification(query);

    expect(service.checkVerification).toHaveBeenCalledWith(query);
    expect(result).toBe('mockTokenId');
  });
});
