import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosisController } from 'src/controller/diagnosis/diagnosis.controller';
import { DiagnosisEntity } from 'src/entity/diagnosis.entity';
import { DiagnosisService } from 'src/service/diagnosis/diagnosis.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosisEntity])],
  controllers: [DiagnosisController],
  providers: [DiagnosisService],
})
export class DiagnosisModule {}
