import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entity/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  async findById(id): Promise<Payment> {
    return this.paymentRepository.findOne(id);
  }

  async create(payment: Payment): Promise<Payment> {
    return this.paymentRepository.save(payment);
  }

  async update(id, payment: Payment): Promise<Payment> {
    await this.paymentRepository.update(id, payment);
    return this.paymentRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}
