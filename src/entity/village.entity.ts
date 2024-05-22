import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { District } from './district.entity';

@Entity('reg_villages')
export class Village {
  @PrimaryColumn({ type: 'char', length: 255 })
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  district_id: number;

  @ManyToOne(() => District, (district) => district.villages)
  @JoinColumn({ name: 'district_id' })
  district: District;
}
