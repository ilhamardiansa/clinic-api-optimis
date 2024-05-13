import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugService } from '../service/drug.service';
import { DrugController } from '../controller/drug.controller';
import { Drug } from '../entity/drug.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drug])],
  controllers: [DrugController],
  providers: [DrugService],
})
export class DrugModule {}
