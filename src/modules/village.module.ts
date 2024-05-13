import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VillageService } from '../service/village.service';
import { VillageController } from '../controller/village.controller';
import { Village } from '../entity/village.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Village])],
  controllers: [VillageController],
  providers: [VillageService],
})
export class VillageModule {}
