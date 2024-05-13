import { Profile } from 'src/entity/profile.entity';
import { Region } from 'src/entity/region.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country_name: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  deletedAt: string;

  @OneToMany((type) => Profile, (profile) => profile.country_id)
  profile: Profile;

  @OneToMany((type) => Region, (region) => region.country_id)
  region: Region;
}
