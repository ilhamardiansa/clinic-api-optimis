import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Village } from '../entity/village.entity';
import { VillageService } from '../service/village.service';

@Controller('villages')
export class VillageController {
  constructor(private readonly villageService: VillageService) {}

  @Get()
  async findAll(): Promise<Village[]> {
    return this.villageService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Village> {
    return this.villageService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() village: Village): Promise<Village> {
    return this.villageService.create(village);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() village: Village,
  ): Promise<Village> {
    return this.villageService.update(parseInt(id, 10), village);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.villageService.delete(parseInt(id, 10));
  }
}
