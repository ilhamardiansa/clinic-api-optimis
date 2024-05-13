import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../entity/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async findAll(): Promise<City[]> {
    return this.cityRepository.find();
  }

  async findById(id): Promise<City> {
    return this.cityRepository.findOne(id);
  }

  async create(city: City): Promise<City> {
    return this.cityRepository.save(city);
  }

  async update(id, city: City): Promise<City> {
    await this.cityRepository.update(id, city);
    return this.cityRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.cityRepository.delete(id);
  }
}
