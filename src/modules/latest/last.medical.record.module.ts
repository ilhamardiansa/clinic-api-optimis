import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LastMedicalRecordService } from 'src/service/latest/last.medical.record.service';
import { LastMedicalRecordController } from 'src/controller/latest/last.medical.record.controller';
import { Record } from 'src/entity/latest/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  controllers: [LastMedicalRecordController],
  providers: [LastMedicalRecordService],
})
export class LastMedicalRecordModule {}
