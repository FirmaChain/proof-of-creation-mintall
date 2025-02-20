import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class VerificationRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['imageHash', 'tokenId', 'transactionHash'], {
    message: 'Invalid search key',
  })
  key: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}
