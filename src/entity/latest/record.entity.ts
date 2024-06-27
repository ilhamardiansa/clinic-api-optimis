import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { MedicalRecordDrug } from 'src/entity/medical_record_drug.entity';
import { Poly } from '../clinic/poly.entity';
import { Clinic } from '../clinic/clinic.entity';
import { Doctor } from '../clinic/doctor.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  consultation_date_time: Date;

  @Column()
  polyclinic: string;

  @Column()
  clinic_name: string;

  @Column()
  doctor_name: string;

  @Column()
  way_to_come: string;

  @Column()
  vistting_time: Date;

  @Column()
  transportation: string;

  @Column()
  reference: string;

  @Column()
  person_responsible: string;

  @Column()
  traumatic: string;

  @Column()
  non_traumatic: string;

  @Column()
  conditions: string;

  @Column('text')
  complaint: string;

  @Column('text')
  history_of_illness: string;

  @Column('text')
  solution: string;

  @Column()
  clinic_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => Poly, (poly) => poly.record)
  poly: Poly;

  @ManyToOne(() => Clinic, (clinic) => clinic.record)
  clinic: Clinic;

  @ManyToOne(() => Doctor, (doctor) => doctor.record)
  doctor: Doctor;

  @ManyToMany(() => MedicalRecordDrug)
  @JoinTable()
  medical_record_drug: MedicalRecordDrug[];
}
