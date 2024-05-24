import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Bank } from './entity/bank.entity';
import { Category } from './entity/category.entity';
import { Clinic } from './entity/clinic.entity';
import { Doctor } from './entity/doctor.entity';
import { Document } from './entity/document.entity';
import { Drug } from './entity/drug.entity';
import { LastRedeem } from './entity/latest/last.redeem.entity';
import { MedicalRecordDrug } from './entity/medical_record_drug.entity';
import { Menu } from './entity/menu.entity';
import { Payment } from './entity/payment.entity';
import { Profile } from './entity/profile/profile.entity';
import { Record } from './entity/latest/record.entity';
import { Reply } from './entity/reply.entity';
import { Review } from './entity/review.entity';
import { Role } from './entity/role.entity';
import { Room } from './entity/room.entity';
import { Schedule } from './entity/schedule.entity';
import { Transaction } from './entity/transaction.entity';
import { User } from './entity/profile/user.entity';
import { Otp } from './entity/otp.entity';
import { Village } from './entity/village.entity';
import { ProfileConfiguration } from './entity/profile_config/profile.config.entity';

export const DATABASE_ENTITIES = [
  Bank,
  Category,
  Clinic,
  Doctor,
  Document,
  Drug,
  LastRedeem,
  MedicalRecordDrug,
  Menu,
  Payment,
  Profile,
  ProfileConfiguration,
  Record,
  Reply,
  Review,
  Role,
  Room,
  Schedule,
  Transaction,
  User,
  Otp,
];

export const format_json = (
  status: number,
  success: boolean,
  error: any,
  meta: any,
  message: any,
  data: any,
) => ({
  status: status,
  success: success,
  errors: error,
  meta: meta,
  message: message,
  data: data,
});
