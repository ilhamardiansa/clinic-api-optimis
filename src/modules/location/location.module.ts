import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/entity/city.entity';
import { Country } from 'src/entity/country.entity';
import { District } from 'src/entity/district.entity';
import { Region } from 'src/entity/region.entity';
import { Village } from 'src/entity/village.entity';
import { LocationService } from 'src/service/location/location.service';
import { LocationController } from 'src/controller/location/location.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([City, District, Village, Region, Country]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
