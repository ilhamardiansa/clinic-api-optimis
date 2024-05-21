import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../entity/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async findAll(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  async findById(id): Promise<Country> {
    return this.countryRepository.findOne(id);
  }

  async create(country: Country): Promise<Country> {
    return this.countryRepository.save(country);
  }

  async update(id, country: Country): Promise<Country> {
    await this.countryRepository.update(id, country);
    return this.countryRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.countryRepository.delete(id);
  }
}
