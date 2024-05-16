import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/profile/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
