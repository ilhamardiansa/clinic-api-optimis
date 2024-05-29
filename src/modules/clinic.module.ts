import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from 'src/entity/clinic.entity';
import { ClinicService } from 'src/service/clinic/clinic.service';
import { ClinicController } from 'src/controller/clinic.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic])],
  providers: [ClinicService],
  controllers: [ClinicController],
})
export class ClinicModule {}
