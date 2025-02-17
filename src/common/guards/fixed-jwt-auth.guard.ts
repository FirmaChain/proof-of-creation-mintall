import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from '../../config/default.config';
import { HTTP_STATUS } from 'src/common/constants/http.status.constants';

@Injectable()
export class FixedJwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(HTTP_STATUS.UNAUTHORIZED.message);
    }

    const token = authHeader.replace('Bearer ', '').trim();

    if (token !== jwtConstants.token) {
      throw new UnauthorizedException(HTTP_STATUS.UNAUTHORIZED.message);
    }

    return true;
  }
}
