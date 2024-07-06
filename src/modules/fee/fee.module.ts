import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeeController } from 'src/controller/fee/fee.controller';
import { Clinic } from 'src/entity/clinic/clinic.entity';
import { Fee } from 'src/entity/fee/fee.entity';
import { FeeService } from 'src/service/fee/fee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fee, Clinic])],
  controllers: [FeeController],
  providers: [FeeService],
})
export class FeeModule {}
