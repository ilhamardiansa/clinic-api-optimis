import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileConfiguration } from 'src/entity/profile_config/profile.config.entity';
import { User } from 'src/entity/profile/user.entity';
import { ProfileConfigurationService } from 'src/service/profile_config/profile.config.service';
import { ProfileConfigurationController } from 'src/controller/profile_config/profile.config.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileConfiguration, User])],
  providers: [ProfileConfigurationService],
  controllers: [ProfileConfigurationController],
})
export class ProfileConfigurationModule {}
