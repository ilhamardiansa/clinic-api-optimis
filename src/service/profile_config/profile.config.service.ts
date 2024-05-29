import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/profile/user.entity';
import { ProfileConfiguration } from 'src/entity/profile_config/profile.config.entity';

@Injectable()
export class ProfileConfigurationService {
  constructor(
    @InjectRepository(ProfileConfiguration)
    private readonly profileConfigRepository: Repository<ProfileConfiguration>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createOrUpdateProfileConfig(
    userId: number,
    config: Partial<ProfileConfiguration>,
  ): Promise<ProfileConfiguration> {
    let profileConfig = await this.profileConfigRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!profileConfig) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found');
      }

      profileConfig = this.profileConfigRepository.create({ ...config, user });
    } else {
      profileConfig = this.profileConfigRepository.merge(profileConfig, config);
    }

    return this.profileConfigRepository.save(profileConfig);
  }

  async getProfileConfigByUserId(
    userId: number,
  ): Promise<ProfileConfiguration> {
    const profileConfig = await this.profileConfigRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!profileConfig) {
      throw new Error('Profile configuration not found for the user');
    }
    return profileConfig;
  }
}
