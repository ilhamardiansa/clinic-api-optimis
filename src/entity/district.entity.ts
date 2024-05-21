import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { City } from 'src/entity/city.entity';
import { Village } from 'src/entity/village.entity';

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  district_name: string;

  @Column()
  city_id: number;
}
