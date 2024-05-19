import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LastRedeemService } from 'src/service/latest/last.redeem.service';
import { LastRedeemDto } from 'src/dto/latest/last.redeem.dto';
import { format_json } from 'src/env';

@Controller('api/user')
export class LastRedeemController {
  constructor(private readonly lastRedeemService: LastRedeemService) {}

  @Post('last-redeem')
  @UseGuards(AuthGuard('jwt'))
  async updateLastRedeem(
    @Body() updateRedeemDto: LastRedeemDto,
    @Req() req: Request,
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return format_json(
          false,
          null,
          null,
          'Authorization header is missing',
          null,
        );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return format_json(false, null, null, 'Bearer token is missing', null);
      }

      const updateRedeemResult = await this.lastRedeemService.updateLastRedeem(
        token,
        updateRedeemDto,
      );

      if (updateRedeemResult.status) {
        return format_json(true, null, null, updateRedeemResult.message, {
          redeem: updateRedeemResult.data,
        });
      } else {
        return format_json(false, null, null, updateRedeemResult.message, null);
      }
    } catch (error) {
      return format_json(false, true, null, 'Server Error', error);
    }
  }
}
