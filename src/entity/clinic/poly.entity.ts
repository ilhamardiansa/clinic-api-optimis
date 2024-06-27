import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Clinic } from './clinic.entity';
import { Record } from '../latest/record.entity';

@Entity()
export class Poly {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  clinic_id: number;

  @Column({ length: 32 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Record, (record) => record.poly)
  record: Record[];

  @ManyToMany(() => Clinic, (clinic) => clinic.poly)
  clinic: Clinic[];
}
