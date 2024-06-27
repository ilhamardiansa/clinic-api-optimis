import { Record } from 'src/entity/latest/record.entity';
import { Room } from 'src/entity/room.entity';
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

  @OneToMany((type) => Room, (room) => room.clinic_id)
  room: Room[];

  @OneToMany((type) => Record, (record) => record.clinic_id)
  record: Record[];

  @ManyToOne(() => Wilayah, (wilayah) => wilayah.clinics)
  @JoinColumn({ name: 'wilayahId' })
  wilayah: Wilayah;

  @ManyToOne(() => Poly, (poly) => poly.clinic)
  @JoinColumn({ name: 'poly_id' })
  poly: Poly;
}
