import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entity/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async findById(id): Promise<Transaction> {
    return this.transactionRepository.findOne(id);
  }

  async create(transaction: Transaction): Promise<Transaction> {
    return this.transactionRepository.save(transaction);
  }

  async update(id, transaction: Transaction): Promise<Transaction> {
    await this.transactionRepository.update(id, transaction);
    return this.transactionRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
