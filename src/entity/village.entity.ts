import { District } from 'src/entity/district.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Village {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  village_name: string;

  @Column()
  district_id: number;

  @ManyToOne((type) => District, (district) => district.id)
  district: District[];
}
