import { IsNotEmpty, IsString } from 'class-validator';

export class VerificationRequestDto {
  @IsNotEmpty()
  @IsString()
  imageHash: string;

  // id?: string;
  // imagePerceptualHash?: string;
  // tokenId?: string;
  // transactionHash?: string;
  // nftMetadataUrl?: string;
}
