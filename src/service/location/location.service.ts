import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from 'src/entity/country.entity';
import { Region } from 'src/entity/region.entity';
import { City } from 'src/entity/city.entity';
import { District } from 'src/entity/district.entity';
import { Village } from 'src/entity/village.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Village)
    private readonly villageRepository: Repository<Village>,
  ) {}

  async getAllCountries(): Promise<Country[]> {
    return this.countryRepository.find({ relations: ['regions'] });
  }

  async getCountryById(id: number): Promise<Country> {
    return this.countryRepository.findOne({
      where: { id },
      relations: ['regions'],
    });
  }

  async getAllRegions(): Promise<Region[]> {
    return this.regionRepository.find({ relations: ['country'] });
  }

  async getRegionById(id: number): Promise<Region> {
    return this.regionRepository.findOne({
      where: { id },
      relations: ['country'],
    });
  }

  async getAllCities(): Promise<City[]> {
    return this.cityRepository.find({ relations: ['region'] });
  }

  async getCityById(id: number): Promise<City> {
    return this.cityRepository.findOne({
      where: { id },
      relations: ['region'],
    });
  }

  async getAllDistricts(): Promise<District[]> {
    return this.districtRepository.find({ relations: ['city'] });
  }

  async getDistrictById(id: number): Promise<District> {
    return this.districtRepository.findOne({
      where: { id },
      relations: ['city'],
    });
  }

  async getAllVillages(): Promise<Village[]> {
    return this.villageRepository.find({ relations: ['district'] });
  }

  async getVillageById(id: string): Promise<Village> {
    return this.villageRepository.findOne({
      where: { id },
      relations: ['district'],
    });
  }
}
