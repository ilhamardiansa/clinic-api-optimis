import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinic } from '../entity/clinic.entity';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
  ) {}

  async findAll(): Promise<Clinic[]> {
    return this.clinicRepository.find();
  }

  async findById(id): Promise<Clinic> {
    return this.clinicRepository.findOne(id);
  }

  async create(clinic: Clinic): Promise<Clinic> {
    return this.clinicRepository.save(clinic);
  }

  async update(id, clinic: Clinic): Promise<Clinic> {
    await this.clinicRepository.update(id, clinic);
    return this.clinicRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.clinicRepository.delete(id);
  }
}
