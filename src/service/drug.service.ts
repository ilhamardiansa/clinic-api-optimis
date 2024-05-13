import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drug } from '../entity/drug.entity';

@Injectable()
export class DrugService {
  constructor(
    @InjectRepository(Drug)
    private readonly drugRepository: Repository<Drug>,
  ) {}

  async findAll(): Promise<Drug[]> {
    return this.drugRepository.find();
  }

  async findById(id): Promise<Drug> {
    return this.drugRepository.findOne(id);
  }

  async create(drug: Drug): Promise<Drug> {
    return this.drugRepository.save(drug);
  }

  async update(id, drug: Drug): Promise<Drug> {
    await this.drugRepository.update(id, drug);
    return this.drugRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.drugRepository.delete(id);
  }
}
