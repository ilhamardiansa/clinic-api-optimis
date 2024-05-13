import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MedicalRecordDrug } from '../entity/medical_record_drug.entity';
import { MedicalRecordDrugService } from '../service/medical_record_drug.service';

@Controller('medicalRecordDrugs')
export class MedicalRecordDrugController {
  constructor(
    private readonly medicalRecordDrugService: MedicalRecordDrugService,
  ) {}

  @Get()
  async findAll(): Promise<MedicalRecordDrug[]> {
    return this.medicalRecordDrugService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<MedicalRecordDrug> {
    return this.medicalRecordDrugService.findById(parseInt(id, 10));
  }

  @Post()
  async create(
    @Body() medicalRecordDrug: MedicalRecordDrug,
  ): Promise<MedicalRecordDrug> {
    return this.medicalRecordDrugService.create(medicalRecordDrug);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() medicalRecordDrug: MedicalRecordDrug,
  ): Promise<MedicalRecordDrug> {
    return this.medicalRecordDrugService.update(
      parseInt(id, 10),
      medicalRecordDrug,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.medicalRecordDrugService.delete(parseInt(id, 10));
  }
}
