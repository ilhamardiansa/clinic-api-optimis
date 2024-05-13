import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../entity/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  async findById(id): Promise<Doctor> {
    return this.doctorRepository.findOne(id);
  }

  async create(doctor: Doctor): Promise<Doctor> {
    return this.doctorRepository.save(doctor);
  }

  async update(id, doctor: Doctor): Promise<Doctor> {
    await this.doctorRepository.update(id, doctor);
    return this.doctorRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.doctorRepository.delete(id);
  }
}
