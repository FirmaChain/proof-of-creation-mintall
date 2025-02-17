import { Controller, Get } from '@nestjs/common';
import { ROUTES } from './common/constants/routes.constants';

@Controller()
export class AppController {
  @Get(ROUTES.HEALTHCHECK)
  getHello(): string {
    return 'OK';
  }
}
