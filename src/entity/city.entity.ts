import { District } from 'src/entity/district.entity';
import { Region } from 'src/entity/region.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city_name: string;

  @Column('int')
  region_id: number;

  @Column('int')
  latitude: number;

  @Column('int')
  longitude: number;

  @Column('int')
  regionId: number;
}
