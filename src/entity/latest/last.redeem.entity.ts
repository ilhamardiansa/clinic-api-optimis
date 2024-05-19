import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class LastRedeem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  redemption_date_and_time: Date;

  @Column()
  list_of_medications: string;

  @Column()
  total_cost: string;

  @Column()
  bank_transfer_name: string;

  @Column()
  bank_id: number;

  @Column()
  user_id: number;

  @OneToMany((type) => LastRedeem, (lastredeem) => lastredeem.id)
  lastredeem: LastRedeem[];
}
