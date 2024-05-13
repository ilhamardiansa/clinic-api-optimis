import { Reply } from 'src/entity/reply.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  review_text: string;

  @Column()
  drug_rating: number;

  @Column()
  review_date: Date;

  @Column()
  num_of_like: number;

  @Column()
  drug_id: number;

  @Column()
  user_id: number;

  @OneToMany((type) => Reply, (reply) => reply.review_id)
  reply: Reply[];
}
