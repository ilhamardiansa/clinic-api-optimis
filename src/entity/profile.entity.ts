import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/entity/user.entity';
import { Country } from 'src/entity/country.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  profil_image: string;

  @Column()
  no_identity: number;

  @Column()
  birth_date: Date;

  @Column()
  birth_place: string;

  @Column()
  address: string;

  @Column()
  gender: string;

  @Column()
  work_in: string;

  @Column()
  blood_type: string;

  @Column()
  marital_status: string;

  @Column()
  nationality: string;

  @Column()
  religion: string;

  @Column()
  user_id: number;

  @Column()
  country_id: number;

  @Column()
  region_id: number;

  @Column()
  city_id: number;

  @Column()
  district_id: number;

  @Column()
  village_id: number;

  @Column()
  neighborhood_no: number;

  @Column()
  citizen_no: number;

  @Column()
  area_code: number;
}
