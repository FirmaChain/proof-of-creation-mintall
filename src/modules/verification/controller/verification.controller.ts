import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FixedJwtAuthGuard } from 'src/auth/fixed-jwt-auth.guard';
import { VerificationService } from '../service/verification.service';
import { ROUTES } from 'src/constants/routes.constants';

@Controller(ROUTES.VERIFICATION.BASE)
@UseGuards(FixedJwtAuthGuard)
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Get(ROUTES.VERIFICATION.CHECK)
  async checkVerification(@Param('id') id: string): Promise<any> {
    return this.verificationService.checkVerification(id);
  }
}
