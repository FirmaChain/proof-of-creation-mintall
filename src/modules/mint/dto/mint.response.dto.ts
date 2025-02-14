export class MintResponseDto {
  name: string;
  description: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
}
