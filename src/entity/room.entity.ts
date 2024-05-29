import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room_name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  clinic_id: number;
}
