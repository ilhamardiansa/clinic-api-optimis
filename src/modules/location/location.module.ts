import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Village } from 'src/entity/village.entity';
import { Cities } from 'src/entity/location/cities';
import { citiesController } from 'src/controller/location/location.controller';
import { CitiesService } from 'src/service/location/location.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cities])],
  controllers: [citiesController],
  providers: [CitiesService],
})
export class LocationModule {}
