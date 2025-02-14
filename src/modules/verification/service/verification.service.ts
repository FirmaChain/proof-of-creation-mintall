import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class VerificationService {
  private readonly logger = new Logger('VerificationService');

  async checkVerification(id: string): Promise<any> {
    return { message: 'Verification successful' };
  }
}
