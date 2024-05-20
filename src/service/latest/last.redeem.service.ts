import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { LastRedeemDto } from 'src/dto/latest/last.redeem.dto';
import { LastRedeem } from 'src/entity/latest/last.redeem.entity';

@Injectable()
export class LastRedeemService {
  constructor(
    @InjectRepository(LastRedeem)
    private readonly lastRedeemRepository: Repository<LastRedeem>,
    private readonly jwtService: JwtService,
  ) {}

  async getLastRedeem(token: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const redeem = await this.lastRedeemRepository.findOne({
        where: { user_id: userId },
        order: { redemption_date_and_time: 'DESC' },
      });

      if (redeem) {
        return {
          status: true,
          message: 'Last redeem record retrieved successfully',
          data: redeem,
        };
      } else {
        return {
          status: false,
          message: 'No redeem records found for this user',
          data: null,
        };
      }
    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }

  async updateLastRedeem(token: string, updateRedeemDto: LastRedeemDto) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const newRedeem = this.lastRedeemRepository.create({
        ...updateRedeemDto,
        user_id: userId,
      });

      await this.lastRedeemRepository.save(newRedeem);

      return {
        status: true,
        message: 'Redeem record created successfully',
        data: newRedeem,
      };
    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }
}
