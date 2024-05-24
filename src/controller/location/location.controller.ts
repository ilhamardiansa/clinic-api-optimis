import { Controller, Get, Param } from '@nestjs/common';
import { WilayahService } from 'src/service/location/location.service';

@Controller('api/wilayah')
export class WilayahController {
  constructor(private readonly wilayahService: WilayahService) {}

  @Get('provinsi/:namaProvinsi')
  async getByProvinsi(@Param('namaProvinsi') namaProvinsi: string) {
    try {
      const wilayah = await this.wilayahService.getByProvinsi(namaProvinsi);
      return {
        message: 'Wilayah berhasil diambil berdasarkan provinsi',
        data: wilayah,
      };
    } catch (error) {
      return {
        message: 'Gagal mengambil wilayah berdasarkan provinsi',
        error: error.message,
      };
    }
  }
}
