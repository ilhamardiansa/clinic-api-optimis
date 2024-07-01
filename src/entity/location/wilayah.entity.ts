import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Clinic } from '../clinic/clinic.entity';
import { Doctor } from '../clinic/doctor.entity';

@Entity('wilayah')
export class Wilayah {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  provinsi: string;

  @Column({ type: 'varchar', length: 255 })
  kabupaten: string;

  @Column({ type: 'varchar', length: 255 })
  kecamatan: string;

  @Column({ type: 'varchar', length: 255 })
  kelurahan: string;

  @OneToMany(() => Clinic, (clinic) => clinic.wilayah)
  clinics: Clinic[];

  @OneToMany(() => Doctor, (doctor) => doctor.wilayah)
  doctors: Doctor[];
}
