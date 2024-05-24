import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from 'src/service/location/location.service';

@Controller('api')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  private formatJson(
    status: number,
    success: boolean,
    error: any,
    meta: any,
    message: any,
    data: any,
  ) {
    return { status, success, errors: error, meta, message, data };
  }



  @Get('villages')
  async getAllVillages() {
    try {
      const villages = await this.locationService.getAllVillages();
      return this.formatJson(
        200,
        true,
        null,
        null,
        'Villages retrieved successfully',
        villages,
      );
    } catch (error) {
      return this.formatJson(
        500,
        false,
        error,
        null,
        'Failed to retrieve villages',
        null,
      );
    }
  }

  @Get('villages/:id')
  async getVillageById(@Param('id') id: string) {
    try {
      const village = await this.locationService.getVillageById(id);
      if (village) {
        return this.formatJson(
          200,
          true,
          null,
          null,
          'Village retrieved successfully',
          village,
        );
      } else {
        return this.formatJson(
          404,
          false,
          null,
          null,
          'Village not found',
          null,
        );
      }
    } catch (error) {
      return this.formatJson(
        500,
        false,
        error,
        null,
        'Failed to retrieve village',
        null,
      );
    }
  }
}
