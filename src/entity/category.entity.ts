import { Drug } from 'src/entity/drug.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_name: string;

  @Column('text')
  description: string;

  @OneToMany((type) => Drug, (drug) => drug.category_id)
  drug: Drug[];
}
