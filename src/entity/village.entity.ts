import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('reg_villages')
export class Village {
  @PrimaryColumn({ type: 'char', length: 255 }) 
  id: string;

  @Column()
  name: string;

  @Column()
  district_id: number;
}
