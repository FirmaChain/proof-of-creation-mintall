import { Module, Global } from '@nestjs/common';
import { SecretService } from './aws.secret.service';

@Global()
@Module({
  providers: [SecretService],
  exports: [SecretService],
})
export class SecretModule {}
