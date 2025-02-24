import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { HTTP_STATUS } from '../../common/constants/http.status.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FixedJwtAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(HTTP_STATUS.UNAUTHORIZED.message);
    }
    const token = authHeader.replace('Bearer ', '').trim();

    // get fixed jwt token from config
    const fixedJwtToken = this.configService.get<string>('FIXED_JWT_TOKEN');
    if (token !== fixedJwtToken) {
      throw new UnauthorizedException(HTTP_STATUS.UNAUTHORIZED.message);
    }

    return true;
  }
}
