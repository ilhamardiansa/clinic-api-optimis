import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { format_json } from 'src/env';
import { LastMedicalRecordService } from 'src/service/latest/last.medical.record.service';

@Controller('api/users')
export class LastMedicalRecordController {
  constructor(
    private readonly lastMedicalRecordService: LastMedicalRecordService,
  ) {}

  @Get('last-medical-record')
  @UseGuards(AuthGuard('jwt'))
  async getLastMedicalRecord(@Req() req: Request) {
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

      const lastMedicalRecord =
        await this.lastMedicalRecordService.getLastMedicalRecord(token);

      if (lastMedicalRecord.status) {
        return format_json(true, null, null, lastMedicalRecord.message, {
          record: lastMedicalRecord.data,
        });
      } else {
        return format_json(false, null, null, lastMedicalRecord.message, null);
      }
    } catch (error) {
      return format_json(false, true, null, 'Server Error', error);
    }
  }
}
