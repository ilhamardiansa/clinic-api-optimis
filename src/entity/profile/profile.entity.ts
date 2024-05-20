import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  IsNull,
} from 'typeorm';
import { User } from 'src/entity/profile/user.entity';
import { Country } from 'src/entity/country.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  phone_number: string;

  @Column({ nullable: true })
  profil_image: string;

  @Column({ nullable: true })
  no_identity: number;

  @Column({ nullable: true })
  birth_date: Date;

  @Column({ nullable: true })
  birth_place: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  work_in: string;

  @Column({ nullable: true })
  blood_type: string;

  @Column({ nullable: true })
  marital_status: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  religion: string;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  country_id: number;

  @Column({ nullable: true })
  region_id: number;

  @Column({ nullable: true })
  city_id: number;

  @Column({ nullable: true })
  district_id: number;

  @Column({ nullable: true })
  village_id: number;

  @Column({ nullable: true })
  neighborhood_no: number;

  @Column({ nullable: true })
  citizen_no: number;

  @Column({ nullable: true })
  area_code: number;
}
