import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Record } from 'src/entity/latest/record.entity';
import { MedicalRecordDto } from 'src/dto/medical record/medical.record.dto';
import { UpdateMedicalRecordDto } from 'src/dto/medical record/update.medical.record.dto';
import { RecordResponseDto } from 'src/dto/medical record/medical.record.response.dto';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(Record)
    private medicalRecordRepository: Repository<Record>,
  ) {}

  async createRecord(medicalRecordDto: MedicalRecordDto): Promise<Record> {
    const record = this.medicalRecordRepository.create(medicalRecordDto);
    return this.medicalRecordRepository.save(record);
  }

  async updateRecord(
    id: number,
    updateMedicalRecordDto: UpdateMedicalRecordDto,
  ): Promise<Record> {
    await this.medicalRecordRepository.update(id, updateMedicalRecordDto);
    return this.medicalRecordRepository.findOne({
      where: { id },
      relations: ['poly', 'clinic', 'doctor'],
    });
  }

  async findOne(id: number): Promise<Record> {
    return this.medicalRecordRepository.findOne({
      where: { id },
      relations: ['poly', 'clinic', 'doctor'],
    });
  }

  async findAll(): Promise<Record[]> {
    return this.medicalRecordRepository.find({
      relations: ['poly', 'clinic', 'doctor'],
    });
  }

  async removeRecord(id: number): Promise<void> {
    await this.medicalRecordRepository.delete(id);
  }

  async getRecords(): Promise<RecordResponseDto[]> {
    const records = await this.medicalRecordRepository.find({
      relations: ['poly', 'clinic', 'doctor'],
    });

    return records.map((record) => ({
      id: record.id,
      consultation_date_time: record.consultation_date_time,
      way_to_come: record.way_to_come,
      visiting_time: record.vistting_time,
      transportation: record.transportation,
      reference: record.reference,
      person_responsible: record.person_responsible,
      traumatic: record.traumatic,
      non_traumatic: record.non_traumatic,
      conditions: record.conditions,
      complaint: record.complaint,
      history_of_illness: record.history_of_illness,
      solution: record.solution,
      user_id: record.user_id,
      poly_id: record.poly.id,
      poly: { name: record.poly.name },
      clinic_id: record.clinic.id,
      clinic: { clinic_name: record.clinic.clinic_name },
      doctor_id: record.doctor.id,
      doctor: { doctor_name: record.doctor.doctor_name },
    }));
  }
}
