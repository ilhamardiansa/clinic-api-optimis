import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/service/auth/auth.service';
import { AuthController } from 'src/controller/auth/auth.controller';
import { User } from 'src/entity/profile/user.entity';
import { mailService } from 'src/service/mailer/mailer.service';
import { Otp } from 'src/entity/otp.entity';
import { JwtStrategy } from 'src/middleware/jwt.strategy';
import { Profile } from 'src/entity/profile/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Otp, Profile])],
  controllers: [AuthController],
  providers: [AuthService,mailService,JwtStrategy],
})
export class Authmodule {}
