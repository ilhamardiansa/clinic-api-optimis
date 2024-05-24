import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wilayah } from 'src/entity/wilayah.entity';

@Injectable()
export class WilayahService {
  constructor(
    @InjectRepository(Wilayah)
    private readonly wilayahRepository: Repository<Wilayah>,
  ) {}

  async getByProvinsi(namaProvinsi: string): Promise<Wilayah[]> {
    return this.wilayahRepository.find({ where: { provinsi: namaProvinsi } });
  }
}
