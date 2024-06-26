import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../category.entity';
import { LastRedeem } from '../latest/last.redeem.entity';

@Entity()
export class Drug {
  map(arg0: (drug: any) => { id: any; name: any; price: any }): any {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  drug_name: string;

  @Column()
  stock: number;

  @Column('text')
  drug_summary: string;

  @Column('bigint')
  buy_price: string;

  @Column('bigint')
  sell_price: string;

  @Column({ nullable: true })
  image_url: string;

  @Column()
  company_name: string;

  @ManyToOne(() => Category, (category) => category.drugs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: number;

  @ManyToOne(() => LastRedeem, (lastRedeem) => lastRedeem.drugs)
  @JoinColumn({ name: 'redeem_id' })
  lastRedeem: LastRedeem;

  @Column()
  redeem_id: number;
}
