import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MedicalRecordDrug } from 'src/entity/medical_record_drug.entity';

@Entity()
export class LastMedicalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date_and_time_consultation: Date;

  @Column()
  polyclinic: string;

  @Column()
  clinic_name: string;

  @Column()
  condition: string;

  @Column()
  clinic_id: number;

  @Column()
  user_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(
    (type) => MedicalRecordDrug,
    (medical_record_drug) => medical_record_drug.id,
  )
  medical_record_drug: MedicalRecordDrug[];
}
