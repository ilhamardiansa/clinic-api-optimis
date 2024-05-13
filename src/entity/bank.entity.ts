import { Payment } from 'src/entity/payment.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bank_name: string;

  @Column()
  account_number: string;

  @Column()
  bank_images: string;

  // @ManyToOne((type) => Payment, (payment) => payment.bank_id)
  // payment: Payment[];
}
