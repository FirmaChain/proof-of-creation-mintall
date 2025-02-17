import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('nft_certificates')
export class NFTCertificateEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'image_hash', type: 'text', unique: true })
  imageHash: string;

  @Column({ name: 'image_perceptual_hash', type: 'text' })
  imagePerceptualHash: string;

  @Column({ name: 'version', type: 'text', default: '1.0' })
  version: string;

  @Column({ name: 'c2pa_metadata', type: 'jsonb', nullable: true })
  c2paMetadata?: Record<string, any>;

  @Column({ name: 'creator_name', type: 'text', nullable: true })
  creatorName?: string;

  @Column({ name: 'nft_contract_address', type: 'text', nullable: true })
  nftContractAddress?: string;

  @Column({ name: 'token_id', type: 'text' })
  tokenId: string;

  @Column({ name: 'transaction_hash', type: 'text', nullable: true })
  transactionHash?: string;

  @Column({ name: 'nft_metadata_url', type: 'text' })
  nftMetadataUrl: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
