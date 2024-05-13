import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  check_time: Date;

  @Column()
  complaint: string;

  @Column()
  doctor_id: number;

  @Column()
  user_id: number;
}
