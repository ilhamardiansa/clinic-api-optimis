import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from '../entity/latest/record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  async findAll(): Promise<Record[]> {
    return this.recordRepository.find();
  }

  async findById(id): Promise<Record> {
    return this.recordRepository.findOne(id);
  }

  async create(record: Record): Promise<Record> {
    return this.recordRepository.save(record);
  }

  async update(id, record: Record): Promise<Record> {
    await this.recordRepository.update(id, record);
    return this.recordRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.recordRepository.delete(id);
  }
}
