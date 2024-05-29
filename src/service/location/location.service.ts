import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cities } from 'src/entity/location/cities';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(Cities)
    private readonly citiesRepository: Repository<Cities>,
  ) {}

  async getByProvinsi(namaProvinsi: string): Promise<Cities[]> {
    return this.citiesRepository.find({ where: { provinsi: namaProvinsi } });
  }

  async getAllcities(): Promise<Cities[]> {
    return this.citiesRepository.find();
  }
}
