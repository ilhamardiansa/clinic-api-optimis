import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from '../entity/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async findAll(): Promise<Menu[]> {
    return this.menuRepository.find();
  }

  async findById(id): Promise<Menu> {
    return this.menuRepository.findOne(id);
  }

  async create(menu: Menu): Promise<Menu> {
    return this.menuRepository.save(menu);
  }

  async update(id, menu: Menu): Promise<Menu> {
    await this.menuRepository.update(id, menu);
    return this.menuRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }
}
