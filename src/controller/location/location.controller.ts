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

  @Get('countries')
  async getAllCountries() {
    try {
      const countries = await this.locationService.getAllCountries();
      return this.formatJson(
        200,
        true,
        null,
        null,
        'Countries retrieved successfully',
        countries,
      );
    } catch (error) {
      return this.formatJson(
        500,
        false,
        error,
        null,
        'Failed to retrieve countries',
        null,
      );
    }
  }

  @Get('countries/:id')
  async getCountryById(@Param('id') id: number) {
    try {
      const country = await this.locationService.getCountryById(id);
      if (country) {
        return this.formatJson(
          200,
          true,
          null,
          null,
          'Country retrieved successfully',
          country,
        );
      } else {
        return this.formatJson(
          404,
          false,
          null,
          null,
          'Country not found',
          null,
        );
      }
    } catch (error) {
      return this.formatJson(
        500,
        false,
        error,
        null,
        'Failed to retrieve country',
        null,
      );
    }
  }

  @Get('regions')
  async getAllRegions() {
    try {
      const regions = await this.locationService.getAllRegions();
      return this.formatJson(
        200,
        true,
        null,
        null,
        'Regions retrieved successfully',
        regions,
      );
    } catch (error) {
      return this.formatJson(
        500,
        false,
        error,
        null,
        'Failed to retrieve regions',
        null,
      );
    }
  }

  @Get('regions/:id')
  async getRegionById(@Param('id') id: number) {
    try {
      const region = await this.locationService.getRegionById(id);
      if (region) {
        return this.formatJson(
          200,
          true,
          null,
          null,
          'Region retrieved successfully',
          region,
        );
      } else {
        return this.formatJson(
          404,
          false,
          null,
          null,
          'Region not found',
          null,
        );
      }
    } catch (error) {
      return this.formatJson(
        500,
        false,
        error,
        null,
        'Failed to retrieve region',
        null,
      );
    }
  }

  @Get('cities')
  async getAllCities() {
    try {
      const cities = await this.locationService.getAllCities();
      return this.formatJson(
        200,
        true,
        null,
        null,
        'Cities retrieved successfully',
        cities,
      );
    } catch (error) {
      return this.formatJson(
        500,
        false,
        error,
        null,
        'Failed to retrieve cities',
        null,
      );
    }
  }

  @Get('cities/:id')
  async getCityById(@Param('id') id: number) {
    try {
      const city = await this.locationService.getCityById(id);
      if (city) {
        return this.formatJson(
          200,
          true,
          null,
          null,
          'City retrieved successfully',
          city,
        );
      } else {
        return this.formatJson(404, false, null, null, 'City not found', null);
      }
    } catch (error) {
      return this.formatJson(
        500,
        false,
        error,
        null,
        'Failed to retrieve city',
        null,
      );
    }
  }

  @Get('districts')
  async getAllDistricts() {
    try {
      const districts = await this.locationService.getAllDistricts();
      return this.formatJson(
        200,
        true,
        null,
        null,
        'Districts retrieved successfully',
        districts,
      );
    } catch (error) {
      return this.formatJson(
        500,
        false,
        error,
        null,
        'Failed to retrieve districts',
        null,
      );
    }
  }

  @Get('districts/:id')
  async getDistrictById(@Param('id') id: number) {
    try {
      const district = await this.locationService.getDistrictById(id);
      if (district) {
        return this.formatJson(
          200,
          true,
          null,
          null,
          'District retrieved successfully',
          district,
        );
      } else {
        return this.formatJson(
          404,
          false,
          null,
          null,
          'District not found',
          null,
        );
      }
    } catch (error) {
      return this.formatJson(
        500,
        false,
        error,
        null,
        'Failed to retrieve district',
        null,
      );
    }
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
