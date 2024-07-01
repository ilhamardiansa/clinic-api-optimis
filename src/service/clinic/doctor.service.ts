import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorDto } from 'src/dto/clinic/doctor.dto';
import { UpdateDoctorDto } from 'src/dto/clinic/update.doctor.dto';
import { Doctor } from 'src/entity/clinic/doctor.entity';
import { Like, Repository } from 'typeorm';
import { PolyService } from './poly.service';
import { WilayahService } from '../location/location.service';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    private readonly wilayahService: WilayahService,
    private readonly polyService: PolyService,
  ) {}

  async createDoctor(doctorDto: DoctorDto): Promise<Doctor> {
    const doctor = this.doctorRepository.create(doctorDto);
    return this.doctorRepository.save(doctor);
  }

  async updateDoctor(
    id: number,
    updateDoctorDto: UpdateDoctorDto,
  ): Promise<Doctor> {
    await this.doctorRepository.update(id, updateDoctorDto);
    return this.doctorRepository.findOne({
      where: { id },
      relations: ['poly', 'wilayah'],
    });
  }

  async findOne(id: number): Promise<Doctor> {
    return this.doctorRepository.findOne({
      where: { id },
      relations: ['poly', 'wilayah'],
    });
  }

  async findAll(
    query: string,
    page: number,
    limit: number,
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<Doctor[]> {
    const skip = (page - 1) * limit;

    const whereClause = query
      ? [
          { doctor_name: Like(`%${query}%`) },
          { description: Like(`%${query}%`) },
          { address: Like(`%${query}%`) },
          { education: Like(`%${query}%`) },
        ]
      : {};

    const cities = await this.doctorRepository.find({
      where: whereClause,
      take: limit || 10,
      skip: skip || 0,
      order: {
        doctor_name: order,
      },
      relations: ['poly', 'wilayah'],
    });

    return cities;
  }

  async removeDoctor(id: number): Promise<void> {
    await this.doctorRepository.delete(id);
  }
}
