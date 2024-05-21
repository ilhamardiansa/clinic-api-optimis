import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reg_villages')
export class Village {
  @PrimaryColumn({ type: 'char', length: 255 }) 
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  district_id: number;
}
