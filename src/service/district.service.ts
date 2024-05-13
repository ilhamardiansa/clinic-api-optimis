import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from '../entity/district.entity';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
  ) {}

  async findAll(): Promise<District[]> {
    return this.districtRepository.find();
  }

  async findById(id): Promise<District> {
    return this.districtRepository.findOne(id);
  }

  async create(district: District): Promise<District> {
    return this.districtRepository.save(district);
  }

  async update(id, district: District): Promise<District> {
    await this.districtRepository.update(id, district);
    return this.districtRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.districtRepository.delete(id);
  }
}
