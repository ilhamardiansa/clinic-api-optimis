import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinic } from '../../entity/clinic.entity';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
  ) {}

  async createClinic(clinicData: Partial<Clinic>): Promise<Clinic> {
    const clinic = this.clinicRepository.create(clinicData);
    return this.clinicRepository.save(clinic);
  }

  async updateClinic(id: number, clinicData: Partial<Clinic>): Promise<Clinic> {
    await this.clinicRepository.update(id, clinicData);
    return this.clinicRepository.findOne({ where: { id } })!;
  }

  async deleteClinic(id: number): Promise<void> {
    await this.clinicRepository.delete(id);
  }

  async getAllClinics(): Promise<Clinic[]> {
    return this.clinicRepository.find();
  }

  async getClinicById(id: number): Promise<Clinic> {
    return this.clinicRepository.findOne({ where: { id } });
  }
}
