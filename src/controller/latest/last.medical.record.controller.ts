import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LastMedicalRecordDto } from 'src/dto/latest/last.medical.record.dto';
import { format_json } from 'src/env';
import { LastMedicalRecordService } from 'src/service/latest/last.medical.record.service';

@Controller('api/users')
export class LastMedicalRecordController {
  constructor(
    private readonly lastMedicalRecordService: LastMedicalRecordService,
  ) {}

  @Post('last-medical-record')
  @UseGuards(AuthGuard('jwt'))
  async createLastMedicalRecord(
    @Body() lastmedicalrecordDto: LastMedicalRecordDto,
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

      const {
        consultation_date_time,
        doctor_name,
        polyclinic,
        clinic_name,
        condition,
      } = lastmedicalrecordDto;

      const medicalRecord = {
        consultation_date_time: consultation_date_time,
        doctor_name: doctor_name,
        polyclinic: polyclinic,
        clinic_name: clinic_name,
        condition: condition,
      };

      const updatedRecord =
        await this.lastMedicalRecordService.updateLastMedicalRecord(
          token,
          medicalRecord,
        );

      return format_json(
        true,
        null,
        null,
        'Medical record created successfully',
        { record: updatedRecord },
      );
    } catch (error) {
      return format_json(false, true, null, 'Server Error', error);
    }
  }
}
