import { Controller, Post, Body, UseGuards, Logger } from '@nestjs/common';
import { MintService } from '../service/mint.service';
import { ROUTES } from '../../../common/constants/routes.constants';
import { FixedJwtAuthGuard } from '../../../common/guards/fixed-jwt-auth.guard';
import { MintRequestDto } from '../dto/mint.request.dto';

@Controller(ROUTES.MINT.BASE)
@UseGuards(FixedJwtAuthGuard)
export class MintController {
  private readonly logger = new Logger(`${MintController.name}`);

  constructor(private readonly mintService: MintService) {}

  @Post(ROUTES.MINT.CREATE)
  async createMint(@Body() body: MintRequestDto): Promise<any> {
    this.logger.log(`/${ROUTES.MINT.CREATE} - REQ: ${JSON.stringify(body)}`);
    const result = await this.mintService.createMint(body);
    this.logger.log(`/${ROUTES.MINT.CREATE} - RES: success`);
    return result;
  }
}
