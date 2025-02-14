import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MintService } from '../service/mint.service';
import { ROUTES } from '../../../constants/routes.constants';
import { FixedJwtAuthGuard } from '../../../auth/fixed-jwt-auth.guard';
import { MintRequestDto } from '../dto/mint.request.dto';

@Controller(ROUTES.MINT.BASE)
@UseGuards(FixedJwtAuthGuard)
export class MintController {
  constructor(private readonly mintService: MintService) {}

  @Post(ROUTES.MINT.CREATE)
  async createMint(@Body() body: MintRequestDto): Promise<any> {
    // Call the service to handle the minting logic
    return await this.mintService.createMint(body);
  }
}
