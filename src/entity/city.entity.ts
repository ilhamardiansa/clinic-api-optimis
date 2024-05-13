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

  @Column()
  region_id: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToMany((type) => District, (district) => district.city_id)
  district: District[];

  @ManyToOne((type) => Region, (region) => region.id)
  region: Region[];
}
