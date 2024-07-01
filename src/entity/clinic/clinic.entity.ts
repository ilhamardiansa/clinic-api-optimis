import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Wilayah } from '../location/wilayah.entity';
import { Poly } from './poly.entity';
import { Record } from 'src/entity/latest/record.entity';
import { Room } from 'src/entity/room.entity';

@Entity()
export class Clinic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  clinic_name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ length: 64 })
  address: string;

  @Column({ length: 10 })
  post_code: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @Column()
  city_id: number;

  @Column()
  wilayah_id: number;

  @ManyToOne(() => Wilayah, (wilayah) => wilayah.clinics)
  @JoinColumn({ name: 'wilayah_id' })
  wilayah: Wilayah;

  @OneToMany(() => Poly, (poly) => poly.clinic)
  poly: Poly[];

  @OneToMany(() => Record, (record) => record.clinic)
  records: Record[];
}
