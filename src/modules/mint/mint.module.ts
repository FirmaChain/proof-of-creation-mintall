import { Module } from '@nestjs/common';
import { MintController } from './controller/mint.controller';
import { MintService } from './service/mint.service';

@Module({
  controllers: [MintController],
  providers: [MintService],
})
export class MintModule {}
