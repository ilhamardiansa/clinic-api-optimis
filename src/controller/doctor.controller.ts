import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Doctor } from '../entity/doctor.entity';
import { DoctorService } from '../service/doctor.service';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  async findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Doctor> {
    return this.doctorService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() doctor: Doctor): Promise<Doctor> {
    return this.doctorService.create(doctor);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() doctor: Doctor,
  ): Promise<Doctor> {
    return this.doctorService.update(parseInt(id, 10), doctor);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.doctorService.delete(parseInt(id, 10));
  }
}
