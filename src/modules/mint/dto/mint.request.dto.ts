import { IsOptional, IsString, IsNotEmpty, IsUrl } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  @IsUrl(
    {
      protocols: ['http', 'https', 'ipfs'],
      require_protocol: true,
    },
    {
      message:
        'imageUrl must be a valid URL with http, https, or ipfs protocol',
    },
  )
  imageUrl: string;
}
