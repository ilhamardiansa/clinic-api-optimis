import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MedicalRecordDrug {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  medical_record_id: number;

  @Column()
  drug_id: number;
}
