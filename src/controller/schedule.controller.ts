import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Schedule } from '../entity/schedule.entity';
import { ScheduleService } from '../service/schedule.service';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  async findAll(): Promise<Schedule[]> {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Schedule> {
    return this.scheduleService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() schedule: Schedule): Promise<Schedule> {
    return this.scheduleService.create(schedule);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() schedule: Schedule,
  ): Promise<Schedule> {
    return this.scheduleService.update(parseInt(id, 10), schedule);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.scheduleService.delete(parseInt(id, 10));
  }
}
