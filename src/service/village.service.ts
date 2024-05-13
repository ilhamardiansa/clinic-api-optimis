import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Village } from '../entity/village.entity';

@Injectable()
export class VillageService {
  constructor(
    @InjectRepository(Village)
    private readonly villageRepository: Repository<Village>,
  ) {}

  async findAll(): Promise<Village[]> {
    return this.villageRepository.find();
  }

  async findById(id): Promise<Village> {
    return this.villageRepository.findOne(id);
  }

  async create(village: Village): Promise<Village> {
    return this.villageRepository.save(village);
  }

  async update(id, village: Village): Promise<Village> {
    await this.villageRepository.update(id, village);
    return this.villageRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.villageRepository.delete(id);
  }
}
