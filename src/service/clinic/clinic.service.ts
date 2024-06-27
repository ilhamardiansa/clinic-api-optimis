import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicDto } from 'src/dto/clinic/clinic.dto';
import { UpdateClinicDto } from 'src/dto/clinic/update.clinic.dto';
import { Clinic } from 'src/entity/clinic/clinic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private clinicRepository: Repository<Clinic>,
  ) {}

  async createClinic(clinicDto: ClinicDto): Promise<Clinic> {
    const clinic = this.clinicRepository.create(clinicDto);
    return this.clinicRepository.save(clinic);
  }

  async updateClinic(
    id: number,
    updateClinicDto: UpdateClinicDto,
  ): Promise<Clinic> {
    await this.clinicRepository.update(id, updateClinicDto);
    return this.clinicRepository.findOne({
      where: { id },
      relations: ['wilayah'],
    });
  }

  async findOne(id: number): Promise<Clinic> {
    return this.clinicRepository.findOne({
      where: { id },
      relations: ['wilayah'],
    });
  }

  async findAll(): Promise<Clinic[]> {
    return this.clinicRepository.find({ relations: ['wilayah'] });
  }

  async removeClinic(id: number): Promise<void> {
    await this.clinicRepository.delete(id);
  }
}
