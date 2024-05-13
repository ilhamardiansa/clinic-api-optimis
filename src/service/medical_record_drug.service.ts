import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalRecordDrug } from '../entity/medical_record_drug.entity';

@Injectable()
export class MedicalRecordDrugService {
  constructor(
    @InjectRepository(MedicalRecordDrug)
    private readonly medicalRecordDrugRepository: Repository<MedicalRecordDrug>,
  ) {}

  async findAll(): Promise<MedicalRecordDrug[]> {
    return this.medicalRecordDrugRepository.find();
  }

  async findById(id): Promise<MedicalRecordDrug> {
    return this.medicalRecordDrugRepository.findOne(id);
  }

  async create(
    medicalrecorddrug: MedicalRecordDrug,
  ): Promise<MedicalRecordDrug> {
    return this.medicalRecordDrugRepository.save(medicalrecorddrug);
  }

  async update(
    id,
    medicalrecorddrug: MedicalRecordDrug,
  ): Promise<MedicalRecordDrug> {
    await this.medicalRecordDrugRepository.update(id, medicalrecorddrug);
    return this.medicalRecordDrugRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.medicalRecordDrugRepository.delete(id);
  }
}
