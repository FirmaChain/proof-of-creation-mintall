import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MintEntity } from '../../entities/mint.entity';
import { MintRequestDto } from '../dto/mint.request.dto';
import { MintResponseDto } from '../dto/mint.response.dto';
import { RedisService } from '../../../shared/redis/redis.service';

@Injectable()
export class MintService {
  private readonly logger = new Logger('MintService');

  constructor(
    private redisService: RedisService, // Inject RedisClient
    @InjectRepository(MintEntity)
    private mintRepository: Repository<MintEntity>,
  ) {}

  async createMint(body: MintRequestDto): Promise<MintResponseDto[]> {
    try {
      const resData = [
        { name: 'test', description: 'test', image: 'test', attributes: [] },
        { name: 'test2', description: 'test2', image: 'test2', attributes: [] },
      ];

      await this.redisService.set('exampleKey', 'exampleValue');

      if (resData.length !== 0) {
        throw new BadRequestException('test');
      }

      return resData;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll(): Promise<MintEntity[]> {
    return this.mintRepository.find();
  }
}
