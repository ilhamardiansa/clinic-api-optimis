import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LastRedeemService } from 'src/service/latest/last.redeem.service';
import { LastRedeemController } from 'src/controller/latest/last.redeem.controller';
import { LastRedeem } from 'src/entity/latest/last.redeem.entity';
import { User } from 'src/entity/profile/user.entity';
import { UserModule } from '../user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LastRedeem, User]),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [LastRedeemService],
  controllers: [LastRedeemController],
})
export class LastRedeemModule {}
