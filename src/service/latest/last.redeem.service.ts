import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LastRedeemDto } from 'src/dto/latest/last.redeem.dto';
import { LastRedeem } from 'src/entity/latest/last.redeem.entity';
import { User } from 'src/entity/profile/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LastRedeemService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(LastRedeem)
    private readonly lastRedeemRepository: Repository<LastRedeem>,
    private readonly jwtService: JwtService,
  ) {}

  async updateLastRedeem(
    token: string,
    updateRedeemDto: LastRedeemDto,
  ): Promise<{ status: boolean; message: string; data: any }> {
    try {
      const extracttoken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        const userId = extracttoken.userId;

        const user = await this.userRepository.findOne({
          where: { id: userId },
        });

        if (!user) {
          return {
            status: false,
            message: 'User not found',
            data: null,
          };
        }

        let lastRedeem = await this.lastRedeemRepository.findOne({
          where: { user_id: userId },
          order: { redemption_date_and_time: 'DESC' },
        });

        if (!lastRedeem) {
          lastRedeem = new LastRedeem();
          lastRedeem.user_id = userId; // Ensure user_id is set for new records
        }

        Object.assign(lastRedeem, updateRedeemDto);

        await this.lastRedeemRepository.save(lastRedeem);

        return {
          status: true,
          message: 'Last redeem record updated successfully',
          data: lastRedeem,
        };
      } else {
        return {
          status: false,
          message: 'Invalid Payload',
          data: null,
        };
      }
    } catch (error) {
      return {
        status: false,
        message: 'Error updating last redeem record',
        data: error,
      };
    }
  }
}
