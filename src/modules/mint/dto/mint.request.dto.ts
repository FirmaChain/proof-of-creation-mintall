import { IsOptional, IsString, IsObject, IsNotEmpty } from 'class-validator';

export class MintRequestDto {
  @IsString()
  @IsNotEmpty()
  imageHash: string;

  // @IsString()
  imagePerceptualHash: string;

  // @IsString()
  version: string;

  // @IsOptional()
  // @IsObject()
  c2paMetadata?: Record<string, any>;

  // @IsOptional()
  // @IsString()
  creatorName?: string;
}
