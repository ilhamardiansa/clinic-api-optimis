import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Transaction } from '../entity/transaction.entity';
import { TransactionService } from '../service/transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Transaction> {
    return this.transactionService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() transaction: Transaction): Promise<Transaction> {
    return this.transactionService.create(transaction);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() transaction: Transaction,
  ): Promise<Transaction> {
    return this.transactionService.update(parseInt(id, 10), transaction);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.transactionService.delete(parseInt(id, 10));
  }
}
