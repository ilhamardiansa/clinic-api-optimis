import { Controller, Body, Post, Param, Get } from '@nestjs/common';
import { ProfileConfigurationService } from 'src/service/profile_config/profile.config.service';
import { ProfileConfiguration } from 'src/entity/profile_config/profile.config.entity';

@Controller('api/profile-config')
export class ProfileConfigurationController {
  constructor(
    private readonly profileConfigService: ProfileConfigurationService,
  ) {}

  @Post(':userId')
  async createOrUpdateProfileConfig(
    @Param('userId') userId: number,
    @Body() config: Partial<ProfileConfiguration>,
  ) {
    try {
      const profileConfig =
        await this.profileConfigService.createOrUpdateProfileConfig(
          userId,
          config,
        );
      return {
        status: 200,
        success: true,
        errors: null,
        meta: null,
        message: 'Profile configuration successfully created or updated',
        data: profileConfig,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        errors: error.message,
        meta: null,
        message: 'Failed to create or update profile configuration',
        data: null,
      };
    }
  }

  @Get(':userId')
  async getProfileConfigByUserId(@Param('userId') userId: number) {
    try {
      const profileConfig =
        await this.profileConfigService.getProfileConfigByUserId(userId);
      return {
        status: 200,
        success: true,
        errors: null,
        meta: null,
        message: 'Profile configuration successfully retrieved',
        data: profileConfig,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        errors: error.message,
        meta: null,
        message: 'Failed to retrieve profile configuration',
        data: null,
      };
    }
  }
}
