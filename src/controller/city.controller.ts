import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { City } from '../entity/city.entity';
import { CityService } from '../service/city.service';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async findAll(): Promise<City[]> {
    return this.cityService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<City> {
    return this.cityService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() city: City): Promise<City> {
    return this.cityService.create(city);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() city: City): Promise<City> {
    return this.cityService.update(parseInt(id, 10), city);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.cityService.delete(parseInt(id, 10));
  }
}
