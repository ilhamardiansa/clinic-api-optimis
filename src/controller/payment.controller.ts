import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Payment } from '../entity/payment.entity';
import { PaymentService } from '../service/payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() payment: Payment): Promise<Payment> {
    return this.paymentService.create(payment);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payment: Payment,
  ): Promise<Payment> {
    return this.paymentService.update(parseInt(id, 10), payment);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.paymentService.delete(parseInt(id, 10));
  }
}
