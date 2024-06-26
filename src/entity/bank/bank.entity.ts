import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Payment } from '../payment/payment.entity';
import { BankCategory } from './bank.category.entity';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  bank_name: string;

  @Column({ length: 64 })
  account_number: string;

  @Column({ length: 64 })
  account_name: string;

  @Column('int', { nullable: true })
  service_charge?: number;

  @Column('int', { nullable: true })
  handling_fee?: number;

  @Column('text', { nullable: true })
  bank_images?: string;

  @ManyToOne(() => BankCategory, (bankCategory) => bankCategory.banks)
  bankCategory: BankCategory;

  // @ManyToOne((type) => Payment, (payment) => payment.bank_id)
  // payment: Payment[];
}