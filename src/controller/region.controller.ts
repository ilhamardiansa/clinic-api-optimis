import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Region } from '../entity/region.entity';
import { RegionService } from '../service/region.service';

@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  async findAll(): Promise<Region[]> {
    return this.regionService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Region> {
    return this.regionService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() region: Region): Promise<Region> {
    return this.regionService.create(region);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() region: Region,
  ): Promise<Region> {
    return this.regionService.update(parseInt(id, 10), region);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.regionService.delete(parseInt(id, 10));
  }
}
