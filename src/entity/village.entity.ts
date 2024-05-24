import {
  Entity,
  Column,
  PrimaryColumn
} from 'typeorm';

@Entity('reg_villages')
export class Village {
  @PrimaryColumn({ type: 'char', length: 255 })
  id: string;

  @Column({ type: 'char', length: 6 })
  district_id: string;

  @Column({ type: 'varchar', length: 255 })
  village_name: string;
}
