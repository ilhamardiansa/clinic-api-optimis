import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Drug } from '../entity/drug.entity';
import { DrugService } from '../service/drug.service';

@Controller('drugs')
export class DrugController {
  constructor(private readonly drugService: DrugService) {}

  @Get()
  async findAll(): Promise<Drug[]> {
    return this.drugService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Drug> {
    return this.drugService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() drug: Drug): Promise<Drug> {
    return this.drugService.create(drug);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() drug: Drug): Promise<Drug> {
    return this.drugService.update(parseInt(id, 10), drug);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.drugService.delete(parseInt(id, 10));
  }
}
