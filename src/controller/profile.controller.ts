import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Profile } from '../entity/profile.entity';
import { ProfileService } from '../service/profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async findAll(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Profile> {
    return this.profileService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() profile: Profile): Promise<Profile> {
    return this.profileService.create(profile);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() profile: Profile,
  ): Promise<Profile> {
    return this.profileService.update(parseInt(id, 10), profile);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.profileService.delete(parseInt(id, 10));
  }
}
