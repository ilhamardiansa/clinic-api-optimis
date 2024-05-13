import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entity/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findById(id): Promise<Role> {
    return this.roleRepository.findOne(id);
  }

  async create(role: Role): Promise<Role> {
    return this.roleRepository.save(role);
  }

  async update(id, role: Role): Promise<Role> {
    await this.roleRepository.update(id, role);
    return this.roleRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
