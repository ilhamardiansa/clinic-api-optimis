import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { Record } from 'src/entity/latest/record.entity';

@Injectable()
export class LastMedicalRecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  async updateLastMedicalRecord(
    token: string,
    updaterecord: Partial<Record>,
  ): Promise<{ status: boolean; message: string; data: any }> {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const record = await this.recordRepository.findOne({
        where: { id: userId },
        order: { date_and_time_consultation: 'DESC' },
      });

      if (!record) {
        return {
          status: false,
          message: 'Medical record tidak di temukan',
          data: null,
        };
      }

      Object.assign(record, updaterecord);

      await this.recordRepository.save(record);

      return {
        status: true,
        message: 'Data medical record berhasil di ubah',
        data: record,
      };
    } else {
      return {
        status: false,
        message: 'Invalid Payload',
        data: null,
      };
    }
  }
}
