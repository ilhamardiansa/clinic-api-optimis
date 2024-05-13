import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reply_text: string;

  @Column()
  reply_date: Date;

  @Column()
  review_id: number;

  @Column()
  user_id: number;
}
