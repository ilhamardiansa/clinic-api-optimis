import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { District } from '../entity/district.entity';
import { DistrictService } from '../service/district.service';

@Controller('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  async findAll(): Promise<District[]> {
    return this.districtService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<District> {
    return this.districtService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() district: District): Promise<District> {
    return this.districtService.create(district);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() district: District,
  ): Promise<District> {
    return this.districtService.update(parseInt(id, 10), district);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.districtService.delete(parseInt(id, 10));
  }
}
