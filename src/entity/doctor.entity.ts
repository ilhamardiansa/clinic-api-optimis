import { Schedule } from 'src/entity/schedule.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctor_name: string;

  @Column()
  place_of_birth: string;

  @Column()
  date_of_birth: Date;

  @Column()
  specialist: string;

  @Column()
  graduate_of: string;

  @Column('text')
  bio: string;

  @Column()
  document_id: number;

  @OneToMany((type) => Schedule, (schedule) => schedule.doctor_id)
  schedule: Schedule[];
}
