import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/service/auth.service';
import { AuthController } from 'src/controller/auth.controller';
import { User } from 'src/entity/user.entity';
import { mailService } from 'src/service/mailer/mailer.service';
import { Otp } from 'src/entity/otp.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Otp])],
  controllers: [AuthController],
  providers: [AuthService,mailService],
})
export class Authmodule {}
