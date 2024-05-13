import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '../entity/bank.entity';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private readonly bankRepository: Repository<Bank>,
  ) {}

  async findAll(): Promise<Bank[]> {
    return this.bankRepository.find();
  }

  async findById(id): Promise<Bank> {
    return this.bankRepository.findOne(id);
  }

  async create(bank: Bank): Promise<Bank> {
    return this.bankRepository.save(bank);
  }

  async update(id, bank: Bank): Promise<Bank> {
    await this.bankRepository.update(id, bank);
    return this.bankRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.bankRepository.delete(id);
  }
}
