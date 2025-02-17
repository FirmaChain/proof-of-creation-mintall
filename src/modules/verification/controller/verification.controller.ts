import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FixedJwtAuthGuard } from '../../../common/guards/fixed-jwt-auth.guard';
import { VerificationService } from '../service/verification.service';
import { ROUTES } from '../../../common/constants/routes.constants';
import { VerificationRequestDto } from '../dto/verification.request.dto';

@Controller(ROUTES.VERIFICATION.BASE)
@UseGuards(FixedJwtAuthGuard)
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Get(ROUTES.VERIFICATION.CHECK)
  async checkVerification(
    @Query() query: VerificationRequestDto,
  ): Promise<any> {
    return this.verificationService.checkVerification(query);
  }
}
