import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class MintRequestDto {
  @IsString()
  @IsNotEmpty()
  imageHash: string;

  @IsString()
  @IsNotEmpty()
  imagePerceptualHash: string;

  @IsString()
  @IsNotEmpty()
  version: string;

  @IsOptional()
  // @IsObject()
  c2paMetadata?: Record<string, any>;

  // @IsOptional()
  // @IsString()
  creatorName?: string;
}
