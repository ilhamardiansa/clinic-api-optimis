import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from '../entity/region.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}

  async findAll(): Promise<Region[]> {
    return this.regionRepository.find();
  }

  async findById(id): Promise<Region> {
    return this.regionRepository.findOne(id);
  }

  async create(region: Region): Promise<Region> {
    return this.regionRepository.save(region);
  }

  async update(id, region: Region): Promise<Region> {
    await this.regionRepository.update(id, region);
    return this.regionRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.regionRepository.delete(id);
  }
}
