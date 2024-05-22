import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../profile/user.entity';

@Entity('profile_configuration')
export class ProfileConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false, name: 'is_location' })
  isLocation: boolean;

  @Column({ default: false, name: 'is_push_notification' })
  isPushNotification: boolean;

  @Column({ default: false, name: 'is_email_notification' })
  isEmailNotification: boolean;

  @ManyToOne(() => User, (user) => user.profileConfigurations)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
