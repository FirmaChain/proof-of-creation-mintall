import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common';
import { FixedJwtAuthGuard } from '../../../common/guards/fixed-jwt-auth.guard';
import { VerificationService } from '../service/verification.service';
import { ROUTES } from '../../../common/constants/routes.constants';
import { VerificationRequestDto } from '../dto/verification.request.dto';

@Controller(ROUTES.VERIFICATION.BASE)
@UseGuards(FixedJwtAuthGuard)
export class VerificationController {
  private readonly logger = new Logger(`${VerificationController.name}`);
  constructor(private readonly verificationService: VerificationService) {}

  @Get(ROUTES.VERIFICATION.CHECK)
  async checkVerification(
    @Query() query: VerificationRequestDto,
  ): Promise<any> {
    this.logger.log(
      `GET ${ROUTES.VERIFICATION.BASE}/${ROUTES.VERIFICATION.CHECK} - REQ: ${JSON.stringify(query)}`,
    );
    const result = await this.verificationService.checkVerification(query);
    this.logger.log(
      `GET ${ROUTES.VERIFICATION.BASE}/${ROUTES.VERIFICATION.CHECK} - RES: success`,
    );
    return result;
  }
}
