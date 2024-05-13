import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Bank } from '../entity/bank.entity';
import { BankService } from '../service/bank.service';

@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  async findAll(): Promise<Bank[]> {
    return this.bankService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Bank> {
    return this.bankService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() bank: Bank): Promise<Bank> {
    return this.bankService.create(bank);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() bank: Bank): Promise<Bank> {
    return this.bankService.update(parseInt(id, 10), bank);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.bankService.delete(parseInt(id, 10));
  }
}
