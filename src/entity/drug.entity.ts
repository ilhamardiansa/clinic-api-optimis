import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { MedicalRecordDrug } from 'src/entity/medical_record_drug.entity';
import { Review } from 'src/entity/review.entity';

@Entity()
export class Drug {
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

  @Column()
  category_id: number;

  @ManyToMany(
    (type) => MedicalRecordDrug,
    (medical_record_drug) => medical_record_drug.drug_id,
  )
  medical_record_drug: MedicalRecordDrug[];

  @OneToMany((type) => Review, (review) => review.drug_id)
  drug: Drug[];
}
