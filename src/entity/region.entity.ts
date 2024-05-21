import { City } from 'src/entity/city.entity';
import { Country } from 'src/entity/country.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  region_name: string;

  @Column()
  country_id: number;

  @OneToMany((type) => City, (city) => city.region_id)
  city: City[];

  @ManyToOne((type) => Country, (country) => country.regions)
  country: Country[];
}
