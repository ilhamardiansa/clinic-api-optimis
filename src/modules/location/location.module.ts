import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Village } from 'src/entity/village.entity';
import { LocationService } from 'src/service/location/location.service';
import { LocationController } from 'src/controller/location/location.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Village]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
