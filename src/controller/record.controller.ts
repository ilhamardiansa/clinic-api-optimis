import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Record } from '../entity/latest/record.entity';
import { RecordService } from '../service/record.service';

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  async findAll(): Promise<Record[]> {
    return this.recordService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Record> {
    return this.recordService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() record: Record): Promise<Record> {
    return this.recordService.create(record);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() record: Record,
  ): Promise<Record> {
    return this.recordService.update(parseInt(id, 10), record);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.recordService.delete(parseInt(id, 10));
  }
}
