import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../entity/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find();
  }

  async findById(id): Promise<Schedule> {
    return this.scheduleRepository.findOne(id);
  }

  async create(schedule: Schedule): Promise<Schedule> {
    return this.scheduleRepository.save(schedule);
  }

  async update(id, schedule: Schedule): Promise<Schedule> {
    await this.scheduleRepository.update(id, schedule);
    return this.scheduleRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.scheduleRepository.delete(id);
  }
}
