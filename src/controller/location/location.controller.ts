import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from 'src/service/location/location.service';

@Controller('api')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('countries')
  async getAllCountries() {
    const countries = await this.locationService.getAllCountries();
    return {
      success: true,
      message: 'Countries retrieved successfully',
      data: countries,
    };
  }

  @Get('countries/:id')
  async getCountryById(@Param('id') id: number) {
    const country = await this.locationService.getCountryById(id);
    if (country) {
      return {
        success: true,
        message: 'Country retrieved successfully',
        data: country,
      };
    } else {
      return {
        success: false,
        message: 'Country not found',
        data: null,
      };
    }
  }

  @Get('regions')
  async getAllRegions() {
    const regions = await this.locationService.getAllRegions();
    return {
      success: true,
      message: 'Regions retrieved successfully',
      data: regions,
    };
  }

  @Get('regions/:id')
  async getRegionById(@Param('id') id: number) {
    const region = await this.locationService.getRegionById(id);
    if (region) {
      return {
        success: true,
        message: 'Region retrieved successfully',
        data: region,
      };
    } else {
      return {
        success: false,
        message: 'Region not found',
        data: null,
      };
    }
  }

  @Get('cities')
  async getAllCities() {
    const cities = await this.locationService.getAllCities();
    return {
      success: true,
      message: 'Cities retrieved successfully',
      data: cities,
    };
  }

  @Get('cities/:id')
  async getCityById(@Param('id') id: number) {
    const city = await this.locationService.getCityById(id);
    if (city) {
      return {
        success: true,
        message: 'City retrieved successfully',
        data: city,
      };
    } else {
      return {
        success: false,
        message: 'City not found',
        data: null,
      };
    }
  }

  @Get('districts')
  async getAllDistricts() {
    const districts = await this.locationService.getAllDistricts();
    return {
      success: true,
      message: 'Districts retrieved successfully',
      data: districts,
    };
  }

  @Get('districts/:id')
  async getDistrictById(@Param('id') id: number) {
    const district = await this.locationService.getDistrictById(id);
    if (district) {
      return {
        success: true,
        message: 'District retrieved successfully',
        data: district,
      };
    } else {
      return {
        success: false,
        message: 'District not found',
        data: null,
      };
    }
  }

  @Get('villages')
  async getAllVillages() {
    const villages = await this.locationService.getAllVillages();
    return {
      success: true,
      message: 'Villages retrieved successfully',
      data: villages,
    };
  }

  @Get('villages/:id')
  async getVillageById(@Param('id') id: number) {
    const village = await this.locationService.getVillageById(id);
    if (village) {
      return {
        success: true,
        message: 'Village retrieved successfully',
        data: village,
      };
    } else {
      return {
        success: false,
        message: 'Village not found',
        data: null,
      };
    }
  }
}
