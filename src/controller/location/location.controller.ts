import { Controller, Get, Param } from '@nestjs/common';
import { CitiesService } from 'src/service/location/location.service';

@Controller('api/v2/cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('provinsi/:namaProvinsi')
  async getByProvinsi(@Param('namaProvinsi') namaProvinsi: string) {
    try {
      const cities = await this.citiesService.getByProvinsi(namaProvinsi);
      return {
        status: 200,
        success: true,
        errors: null,
        meta: null,
        message: 'cities berhasil diambil berdasarkan provinsi',
        data: cities,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        errors: error.message,
        meta: null,
        message: 'Gagal mengambil cities berdasarkan provinsi',
        data: null,
      };
    }
  }

  @Get()
  async getAllcities() {
    try {
      const cities = await this.citiesService.getAllcities();
      return {
        status: 200,
        success: true,
        errors: null,
        meta: null,
        message: 'Semua cities berhasil diambil',
        data: cities,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        errors: error.message,
        meta: null,
        message: 'Gagal mengambil semua cities',
        data: null,
      };
    }
  }
}
