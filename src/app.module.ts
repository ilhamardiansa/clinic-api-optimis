import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_ENTITIES } from './env';
import { BankModule } from './modules/bank.module';
import { CategoryModule } from './modules/category.module';
import { CityModule } from './modules/city.module';
import { ClinicModule } from './modules/clinic.module';
import { CountryModule } from './modules/country.module';
import { DistrictModule } from './modules/district.module';
import { DoctorModule } from './modules/doctor.module';
import { DocumentModule } from './modules/document.module';
import { DrugModule } from './modules/drug.module';
import { MedicalRecordDrugModule } from './modules/medical_record_drug.module';
import { MenuModule } from './modules/menu.module';
import { PaymentModule } from './modules/payment.module';
import { ProfileModule } from './modules/profile.module';
import { RecordModule } from './modules/record.module';
import { RegionModule } from './modules/region.module';
import { ReplyModule } from './modules/reply.module';
import { ReviewModule } from './modules/review.module';
import { RoleModule } from './modules/role.module';
import { RoomModule } from './modules/room.module';
import { ScheduleModule } from './modules/schedule.module';
import { TransactionModule } from './modules/transaction.module';
import { UserModule } from './modules/user.module';
import { VillageModule } from './modules/village.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Authmodule } from './modules/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: DATABASE_ENTITIES,
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
    }),
    BankModule,
    CategoryModule,
    CityModule,
    ClinicModule,
    CountryModule,
    DistrictModule,
    DoctorModule,
    DocumentModule,
    DrugModule,
    MedicalRecordDrugModule,
    MenuModule,
    PaymentModule,
    ProfileModule,
    RecordModule,
    RegionModule,
    ReplyModule,
    ReviewModule,
    RoleModule,
    RoomModule,
    ScheduleModule,
    TransactionModule,
    UserModule,
    VillageModule,
    Authmodule,
  ],
})
export class AppModule {}
