import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Village } from 'src/entity/village.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Village)
    private readonly villageRepository: Repository<Village>,
  ) {}

  async getAllVillages(): Promise<Village[]> {
    return this.villageRepository.find();
  }

  async getVillageById(id: string): Promise<Village> {
    return this.villageRepository.findOne({
      where: { id },
      relations: ['district'],
    });
  }
}
