import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Country } from '../entity/country.entity';
import { CountryService } from '../service/country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async findAll(): Promise<Country[]> {
    return this.countryService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Country> {
    return this.countryService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() country: Country): Promise<Country> {
    return this.countryService.create(country);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() country: Country): Promise<Country> {
    return this.countryService.update(parseInt(id, 10), country);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.countryService.delete(parseInt(id, 10));
  }
}