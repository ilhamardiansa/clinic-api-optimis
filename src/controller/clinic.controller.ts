import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { Clinic } from '../entity/clinic.entity';
import { ClinicService } from '../service/clinic.service';

@Controller('clinics')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Get()
  async findAll(): Promise<Clinic[]> {
    return this.clinicService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Clinic> {
    return this.clinicService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() clinic: Clinic): Promise<Clinic> {
    return this.clinicService.create(clinic);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() clinic: Clinic,
  ): Promise<Clinic> {
    return this.clinicService.update(parseInt(id, 10), clinic);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.clinicService.delete(parseInt(id, 10));
  }
}
