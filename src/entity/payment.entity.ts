import { Bank } from 'src/entity/bank.entity';
import { Transaction } from 'src/entity/transaction.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  payment_name: string;

  @Column()
  bank_id: number;

  @ManyToOne((type) => Transaction, (transaction) => transaction.payment_id)
  transaction: Transaction[];

  @OneToOne((type) => Bank, (bank) => bank.id)
  bank: Bank[];
}
