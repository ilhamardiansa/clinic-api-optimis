import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entity/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  async findById(id): Promise<Profile> {
    return this.profileRepository.findOne(id);
  }

  async create(profile: Profile): Promise<Profile> {
    return this.profileRepository.save(profile);
  }

  async update(id, profile: Profile): Promise<Profile> {
    await this.profileRepository.update(id, profile);
    return this.profileRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.profileRepository.delete(id);
  }
}
