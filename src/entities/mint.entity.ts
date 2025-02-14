import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MintEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageHash: string;

  @Column()
  imagePerceptualHash: string;

  @Column()
  version: string;

  @Column({ nullable: true })
  c2paMetadata: string;

  @Column({ nullable: true })
  creatorName: string;
}
